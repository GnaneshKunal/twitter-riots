package com.gk.twitterscala

import java.util
import javax.tools.JavaFileManager.Location
import java.net.URLEncoder
import java.io.UnsupportedEncodingException

import cats.effect.IO
import io.circe._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl.Http4sDsl
import org.http4s.server._
import org.http4s.server.blaze.BlazeBuilder
import org.http4s.util.StreamApp
import org.http4s.client.blaze._
import twitter4j.{Query, Status, _}
import twitter4j.conf.ConfigurationBuilder
import cats.syntax.either._
import io.circe._
import io.circe.parser._
import org.http4s.server.middleware._


import scala.collection.mutable.ArrayBuffer
import scala.xml._

class URLEncode(val text: String) extends UnsupportedEncodingException {
  val encodedString = URLEncoder.encode(text, "UTF-8")
}


object Main extends StreamApp[IO] with Http4sDsl[IO] {

  import com.gk.ibmnlp.Main._

  val cb = new ConfigurationBuilder()
  cb.setDebugEnabled(true)
    .setOAuthConsumerKey(sys.env("CONSUMER_KEY"))
    .setOAuthConsumerSecret(sys.env("CONSUMER_SECRET"))
    .setOAuthAccessToken(sys.env("ACCESS_TOKEN"))
    .setOAuthAccessTokenSecret(sys.env("ACCESS_TOKEN_SECRET"))
  val tf = new TwitterFactory(cb.build())
  val twitter: Twitter = tf.getInstance()

  val route: HttpService[IO] = CORS(HttpService[IO] {
    case GET -> Root / "hello" / name =>
      Ok(Json.obj("message" -> Json.fromString(s"Hello, $name")))

    case GET -> Root / "getTrends" / location =>

      val (lat, long) = getLatAndLong(location)
      val geoL: GeoLocation = new GeoLocation(lat, long)

      val m = twitter.getClosestTrends(geoL)
      val k = m.get(0).getWoeid
      val trendsL = twitter.getPlaceTrends(k)
      val (la, lo) = getLatAndLong(trendsL.getLocation.getName)

      val trends = trendsL.getTrends

      val arr = for (x <- trends) yield {
        Json.obj(
          "name" -> Json.fromString(x.getName),
          "query" -> Json.fromString(x.getQuery),
          "url" -> Json.fromString(x.getURL)
        )
      }

      Ok(
        Json.obj("trends" -> Json.fromValues(arr),
        "geo" -> Json.obj(
          "lat" -> Json.fromDoubleOrNull(la),
          "long" -> Json.fromDoubleOrNull(lo),
          "woeid" -> Json.fromInt(k),
          "location" -> Json.fromString(trendsL.getLocation.getName)
          )
        )
      )

    case GET -> Root / "getTweets" / hashtag =>

      val query: twitter4j.Query = new twitter4j.Query(hashtag)
      query.setCount(10)

      val tweets = twitter.search(query).getTweets
      val iTweets = tweets.listIterator()

      val tweetsJson = new ArrayBuffer[Json]()
      while (iTweets.hasNext) {
        val t: twitter4j.Status = iTweets.next
        val tu = t.getUser

        var (la, lo) = (0.0, 0.0)

        if (tu.getLocation != "") {
          try {
            val (laTemp, loTemp) = getLatAndLong(tu.getLocation)
            la = laTemp
            lo = loTemp
          }
          catch {
            case e: Exception =>
              try {
                val (laTemp, loTemp) = getLatAndLong(tu.getLocation.trim.split(' ')(0))
                la = laTemp
                lo = loTemp
              }
              catch {
                case e: Exception => println { "Retry also failed" }
              }
          }
        }

        tweetsJson += Json.obj(
          "id" -> Json.fromBigInt(t.getId),
          "tweet" -> Json.fromString(t.getText),
          "sentiment" -> Json.fromInt(classifyText(t.getText)),
          "tweetID" -> Json.fromLong(t.getId),
          "favouriteCount" -> Json.fromLong(t.getFavoriteCount),
          "retweetCount" -> Json.fromLong(t.getRetweetCount),
          "user" -> Json.obj(
            "id" -> Json.fromLong(tu.getId),
            "name" -> Json.fromString(tu.getName),
            "screenName" -> Json.fromString(tu.getScreenName),
            "followers" -> Json.fromInt(tu.getFollowersCount),
            "friendsCount" -> Json.fromInt(tu.getFriendsCount),
            "location" -> Json.fromString(tu.getLocation),
            "latLong" -> Json.obj(
              "lat" -> Json.fromDoubleOrNull(la),
              "long" -> Json.fromDoubleOrNull(lo)
            )
          )
        )
      }

      Ok(Json.fromValues(tweetsJson))


    case GET -> Root / "getUserTweets" / screenName / hashtag =>

      val tweets = twitter.getUserTimeline(screenName)
      val iTweets = tweets.iterator()

      val tweetsJson = new ArrayBuffer[Json]()
      while (iTweets.hasNext) {
        val t: twitter4j.Status = iTweets.next
        if (t.getText.contains(hashtag))
          tweetsJson += Json.obj(
            t.getId.toString -> Json.obj (
              "tweet" -> Json.fromString(t.getText),
              "sentiment" -> Json.fromInt(classifyText(t.getText)),
              "favouriteCount" -> Json.fromLong(t.getFavoriteCount),
              "retweetCount" -> Json.fromLong(t.getRetweetCount)
            )
          )
      }

      Ok(Json.fromValues(tweetsJson))

    case req @ GET -> Root / "classifyTweet" =>
      val text = req.params("text").toString

      val strength = classifyText(text)

      Ok(Json.obj(
        text -> Json.fromInt(strength)
      ))

    }, CORSConfig(
    anyOrigin = true,
    allowCredentials = false,
    maxAge = 0,
    allowedOrigins = Set("http://localhost:8080/"),
    allowedHeaders = Some(Set("User-Agent", "Keep-Alive", "Content-Type")),
    exposedHeaders = Some(Set("x-header"))
  ))



  def getLatAndLong(location: String): (Double, Double) = {
    val httpClient = PooledHttp1Client[IO]()
    def getParseXML(location: String): IO[String] = {
      val encodedLocation = new URLEncode(location).encodedString
      val target = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22"+ encodedLocation +"%22&appid=49b44e61ea5af9b80a3b3cf9b3ace7a4a0f5924a"
      httpClient.expect[String](target)
    }

    val result = getParseXML(location).unsafeRunSync()
    val xml = XML.loadString(result)
    val centroid = xml \\ "results" \\ "place" \\ "centroid"
    val lat = (centroid \\ "latitude").head text
    val long = (centroid \\ "longitude").head text

    (lat.toDouble, long.toDouble)
  }

  def classifyText(text: String): Int = {
    def requestForClassify(text: String) = {
      val encodedStr = new URLEncode(text).encodedString
      val target = "http://sentistrength.wlv.ac.uk/results.php?text=" + encodedStr + "&domain=Riots&submit=Detect+Sentiment+in+Domain"
      val parserFactory = new org.ccil.cowan.tagsoup.jaxp.SAXFactoryImpl
      val parser = parserFactory.newSAXParser()
      val source = new org.xml.sax.InputSource(target)
      val adapter = new scala.xml.parsing.NoBindingFactoryAdapter
      val feed = adapter.loadXML(source, parser)

      feed
    }
    val html = requestForClassify(text)
    val entities = html \\ "span" \\ "b"

    (for (entity <- entities) yield entity.text.toInt).toArray.sum
  }

  def breakText(str: String): String = {
    def splitCamelCase(s: String): String =
      s.replaceAll(
        String.format("%s|%s|%s",
          "(?<=[A-Z])(?=[A-Z][a-z])",
          "(?<=[^A-Z])(?=[A-Z])",
          "(?<=[A-Za-z])(?=[^A-Za-z])"
        ),
        " "
      ).replaceAll("  ", " ")
    import scala.language._
    val a = splitCamelCase(str) split ' '
    if (str.indexOf('#') != -1)
      a.tail filter(_.nonEmpty) mkString " "
    else
      a filter(_.nonEmpty) mkString " "
  }

  def stream(args: List[String], requestShutdown: IO[Unit]): fs2.Stream[IO, Nothing] = {
    BlazeBuilder[IO]
      .bindHttp(8080, "0.0.0.0")
      .mountService(route,"/")
      .serve
  }

}

