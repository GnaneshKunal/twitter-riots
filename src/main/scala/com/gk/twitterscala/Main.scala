package com.gk.twitterscala

import java.util
import javax.tools.JavaFileManager.Location

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

import scala.collection.mutable.ArrayBuffer
import scala.xml._


object Main extends StreamApp[IO] with Http4sDsl[IO] {

  val cb = new ConfigurationBuilder()
  cb.setDebugEnabled(true)
    .setOAuthConsumerKey(sys.env("CONSUMER_KEY"))
    .setOAuthConsumerSecret(sys.env("CONSUMER_SECRET"))
    .setOAuthAccessToken(sys.env("ACCESS_TOKEN"))
    .setOAuthAccessTokenSecret(sys.env("ACCESS_TOKEN_SECRET"))
  val tf = new TwitterFactory(cb.build())
  val twitter: Twitter = tf.getInstance()

  val route: HttpService[IO] = HttpService[IO] {
    case GET -> Root / "hello" / name =>
      Ok(Json.obj("message" -> Json.fromString(s"Hello, $name")))

    case GET -> Root / "getTrends" / location =>

      val (lat, long) = getLatAndLong(location)
      val geoL: GeoLocation = new GeoLocation(lat, long)
      val geoQ: GeoQuery = new GeoQuery(geoL)

      val m = twitter.getClosestTrends(geoL)
      val k = m.get(0).getWoeid
      val trends = twitter.getPlaceTrends(k).getTrends

      val arr = for (x <- trends) yield {
        Json.obj("name" -> Json.fromString(x.getName), "query" -> Json.fromString(x.getQuery), "url" -> Json.fromString(x.getURL))
      }

      Ok(
        Json.fromValues(arr)
      )

    case GET -> Root / "getTweets" / hashtag =>

      val query: twitter4j.Query = new twitter4j.Query(hashtag)
      query.setCount(3)

      val tweets = twitter.search(query).getTweets
      val iTweets = tweets.listIterator()

      val tweetsJson = new ArrayBuffer[Json]()
      while (iTweets.hasNext) {
        val t: twitter4j.Status = iTweets.next
        val tu = t.getUser
        tweetsJson += Json.obj(
          t.getId.toString -> Json.obj (
            "tweet" -> Json.fromString(t.getText),
            "user" -> Json.obj(
              "id" -> Json.fromLong(tu.getId),
              "name" -> Json.fromString(tu.getName),
              "screenName" -> Json.fromString(tu.getScreenName),
              "followers" -> Json.fromInt(tu.getFollowersCount),
              "friendsCount" -> Json.fromInt(tu.getFriendsCount)
            )
          )
        )
      }

      Ok(Json.fromValues(tweetsJson))
    }



  def getLatAndLong(location: String): (Double, Double) = {
    val httpClient = PooledHttp1Client[IO]()
    def getParseXML(location: String): IO[String] = {
      val target = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + location + "%22&appid=49b44e61ea5af9b80a3b3cf9b3ace7a4a0f5924a"
      httpClient.expect[String](target)
    }

    val result = getParseXML(location).unsafeRunSync()
    val xml = XML.loadString(result)
    val centroid = xml \\ "results" \\ "place" \\ "centroid"
    val lat = (centroid \\ "latitude").head text
    val long = (centroid \\ "longitude").head text

    (lat.toDouble, long.toDouble)
  }

  def stream(args: List[String], requestShutdown: IO[Unit]): fs2.Stream[IO, Nothing] = {
    BlazeBuilder[IO]
      .bindHttp(8080, "0.0.0.0")
      .mountService(route,"/")
      .serve
  }
}

