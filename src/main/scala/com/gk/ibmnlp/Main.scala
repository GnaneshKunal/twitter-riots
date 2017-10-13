package com.gk.ibmnlp
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.NaturalLanguageUnderstanding
import com.ibm.watson.developer_cloud.natural_language_understanding.v1.model._

object Main {
  val service = new NaturalLanguageUnderstanding(
    NaturalLanguageUnderstanding.VERSION_DATE_2017_02_27,
    "Gnanesh", "Monster"
  )

  val entitiesOptions: EntitiesOptions = new EntitiesOptions.Builder()
    .emotion(true)
    .sentiment(true)
    .limit(2)
    .build()

  val keywordOptions: KeywordsOptions = new KeywordsOptions.Builder()
    .emotion(true)
    .sentiment(true)
    .limit(2)
    .build()

  val features: Features = new Features.Builder()
    .entities(entitiesOptions)
    .keywords(keywordOptions)
    .build()


  def analyze(text: String): AnalysisResults = {
    val parameters: AnalyzeOptions = new AnalyzeOptions.Builder()
      .text(text)
      .features(features)
      .build()

    service.analyze(parameters).execute()
  }
}
