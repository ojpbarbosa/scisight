#![allow(dead_code)]
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, time::Instant};

const ML_SERVICE_URL: &str = "https://ml.scisight.earth";
const CORE_SERVICE_URL: &str = "https://core.scisight.earth";

const RANDOM_QUERIES_COUNT: i16 = 10; // up to 1280 queries, so i16 should be more than enough

const KEEP_ALIVE_SECONDS_TIMEOUT: u64 = 60 * 3; // 3 minutes

#[derive(Debug, Deserialize, Serialize)]
struct PredictedMetadata {
    api: String,
    field: String,
    context: String,
    input: String,
}

#[derive(Debug, Deserialize)]
struct SearchResult {
    r#type: SearchType,
    weather: Option<Weather>,
    #[serde(rename = "nasaEvents")]
    nasa_events: Option<NasaEvents>,
    #[serde(rename = "relatedScientificInfo")]
    related_scientific_info: Vec<String>,
    #[serde(rename = "bestAPIsOptions")]
    best_apis_options: Vec<BestAPIsOptions>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
enum SearchType {
    Weather,
    Nasa,
}

#[derive(Debug, Deserialize)]
struct Weather {
    features: Vec<Feature>,
    title: String,
    updated: String,
}

#[derive(Debug, Deserialize)]
struct Feature {
    properties: Properties,
}

#[derive(Debug, Deserialize)]
struct Properties {
    #[serde(rename = "areaDesc")]
    area_desc: Option<String>,
    severity: Option<String>,
    urgency: Option<String>,
    event: Option<String>,
    headline: Option<String>,
    description: Option<String>,
    instruction: Option<String>,
}

#[derive(Debug, Deserialize)]
struct NasaEvents {
    title: String,
    description: String,
    link: String,
    events: Vec<Event>,
}

#[derive(Debug, Deserialize)]
struct Event {
    id: String,
    title: String,
    geometries: Vec<Geometry>,
}

#[derive(Debug, Deserialize)]
struct Geometry {
    date: String,
    r#type: String,
    coordinates: (String, String),
}

#[derive(Debug, Deserialize)]
struct BestAPIsOptions {
    api: String,
    reason: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    loop {
        let mut now = chrono::Local::now();
        println!(
            "Keeping \x1b[92mSciSight\x1b[0m alive on {}",
            now.format("%B %-d, %Y, %H:%M").to_string()
        );

        println!("\nFetching random queries from {}", ML_SERVICE_URL);

        let mut start_time = Instant::now();
        let random_queries = reqwest::get(format!(
            "{}/api/v2/texts?n={}",
            ML_SERVICE_URL, RANDOM_QUERIES_COUNT
        ))
        .await?
        .json::<Vec<String>>()
        .await?;
        let mut elapsed_time = start_time.elapsed();

        now = chrono::Local::now();
        println!(
            "Succesfully fetched {} random queries at {} ({} ms)",
            RANDOM_QUERIES_COUNT,
            now.format("%H:%M:%S").to_string(),
            elapsed_time.as_millis()
        );

        println!("\nPredicting random query using {}", ML_SERVICE_URL);

        let random_query = random_queries.get(0).unwrap();
        let mut predict_query = HashMap::new();
        predict_query.insert("query", &random_query);

        let client = reqwest::Client::new();

        start_time = Instant::now();
        let predicted_data = client
            .post(format!("{}/api/v2/predict", ML_SERVICE_URL))
            .header("content-type", "application/json")
            .header("accept", "application/json")
            .json(&predict_query)
            .send()
            .await?;
        elapsed_time = start_time.elapsed();

        now = chrono::Local::now();
        println!(
            "Succesfully predicted random query at {} ({} ms)",
            now.format("%H:%M:%S").to_string(),
            elapsed_time.as_millis()
        );

        let mut predicted_query = predicted_data.json::<PredictedMetadata>().await?;

        if predicted_query.api == "Health" {
            if [
                "nasa",
                "space",
                "galaxy",
                "planet",
                "astronaut",
                "terrestrial",
            ]
            .iter()
            .any(|word| predicted_query.input.to_lowercase().contains(word))
            {
                predicted_query.api = String::from("nasa");
            } else {
                predicted_query.api = String::from("weather");
            }
        }

        start_time = Instant::now();
        let search_data = client
            .post(format!(
                "{}/search/{}",
                CORE_SERVICE_URL,
                predicted_query.api.to_lowercase()
            ))
            .header("content-type", "application/json")
            .header("accept", "application/json")
            .json(&predicted_query)
            .send()
            .await?;
        elapsed_time = start_time.elapsed();

        let _search_result = search_data.json::<SearchResult>().await?;

        now = chrono::Local::now();
        println!(
            "\nSuccesfully fetched random query search results from {} at {} ({} ms)\n",
            CORE_SERVICE_URL,
            now.format("%H:%M:%S").to_string(),
            elapsed_time.as_millis()
        );

        tokio::time::sleep(tokio::time::Duration::from_secs(KEEP_ALIVE_SECONDS_TIMEOUT)).await;
    }
}
