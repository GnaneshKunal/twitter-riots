val Http4sVersion = "0.18.0-M3"
val LogbackVersion = "1.2.3"

lazy val root = (project in file("."))
  .settings(
    organization := "com.gk",
    name := "twitter-scala",
    version := "0.0.1-SNAPSHOT",
    scalaVersion := "2.12.3",
    libraryDependencies ++= Seq(
      "org.http4s"      %% "http4s-blaze-server" % Http4sVersion,
      "org.http4s"      %% "http4s-circe"        % Http4sVersion,
      "org.http4s"      %% "http4s-dsl"          % Http4sVersion,
      "org.http4s"      %% "http4s-blaze-client" % Http4sVersion,
      "ch.qos.logback"  %  "logback-classic"     % LogbackVersion
      )
  )

val circeVersion = "0.8.0"

libraryDependencies ++= Seq(
  "io.circe" %% "circe-core",
  "io.circe" %% "circe-generic",
  "io.circe" %% "circe-parser"
).map(_ % circeVersion)


libraryDependencies += "edu.stanford.nlp" % "stanford-corenlp" % "3.8.0" artifacts (Artifact("stanford-corenlp", "models"), Artifact("stanford-corenlp"))

libraryDependencies += "org.twitter4j" % "twitter4j-stream" % "4.0.4"
libraryDependencies += "org.scala-lang.modules" % "scala-xml_2.12" % "1.0.6"
libraryDependencies += "com.ibm.watson.developer_cloud" % "java-sdk" % "3.7.2"
libraryDependencies += "org.ccil.cowan.tagsoup" %  "tagsoup"   % "1.2.1"

cancelable in Global := true