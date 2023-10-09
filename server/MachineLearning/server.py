import random
from flask import Flask, request, jsonify
from flask_cors import CORS

import input_analyzer_v1
import ml_model_v1
import input_analyzer_v2
import ml_model_v2
from util import most_related_phrases

app = Flask(__name__)
CORS(app)

field_nlp, occupation_nlp = input_analyzer_v1.setup_models()
social_field_nlp, use_api_nlp, social_context_nlp = input_analyzer_v2.setup_models()


@app.route("/api/v1/predict", methods=["POST"])
def v1_predict():
    try:
        data = request.get_json()
        query = data["query"]

        if field_nlp is None or occupation_nlp is None:
            return jsonify({"error": "Models not initialized yet"})

        return input_analyzer_v1.run(query, field_nlp, occupation_nlp)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v2/predict", methods=["POST"])
def v2_predict():
    try:
        data = request.get_json()
        query = data["query"]

        return input_analyzer_v2.run(query, social_field_nlp, use_api_nlp, social_context_nlp)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v1/texts", methods=["GET"])
def v1_texts():
    try:
        n = int(request.args.get("n", 1))

        if n > len(ml_model_v1.train_texts):
            return jsonify({"error": "n is greater than the number of available training texts"})

        random_texts = random.sample(ml_model_v1.train_texts, n)

        return jsonify(random_texts)

    except ValueError as e:
        return jsonify({"error": "Provide a valid integer value for n"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v2/texts", methods=["GET"])
def v2_texts():
    try:
        n = int(request.args.get("n", 1))

        if n > len(ml_model_v2.train_texts):
            return jsonify({"error": "n is greater than the number of available training texts"})

        field = request.args.get("field", None)
        api = request.args.get("api", None)
        context = request.args.get("context", None)
        input_text = request.args.get("input", None)

        if field is None or context is None or api is None or input_text is None:
            return jsonify(random.sample(ml_model_v2.train_texts, n))

        sample_texts = []
        if ["space", "climate", "health"].count(field) == 0:
            return jsonify({"error": "Invalid field"})
        elif ["nasa", "weather"].count(api) == 0:
            return jsonify({"error": "Invalid api"})
        elif ["individual", "community"].count(context) == 0:
            return jsonify({"error": "Invalid context"})

        match (field, api, context):
            case ("space", "nasa", "individual"):
                sample_texts = ml_model_v2.space_from_individual_space
            case ("space", "nasa", "community"):
                sample_texts = ml_model_v2.space_from_community_space
            # can be space from space and space form health
            case ("space", "weather", "individual"):
                # concatening space from individual climate with space from individual health since health api is not implemented
                sample_texts = ml_model_v2.space_from_individual_climate
                sample_texts.extend(
                    ml_model_v2.climate_from_individual_space)
                sample_texts.extend(
                    ml_model_v2.space_from_individual_health)
            case ("space", "weather", "community"):
                # same as above, but for climate community
                sample_texts = ml_model_v2.space_from_community_climate
                sample_texts.extend(
                    ml_model_v2.climate_from_community_space
                )
                sample_texts.extend(
                    ml_model_v2.space_from_community_health)
            case ("climate", "nasa", "individual"):
                sample_texts = ml_model_v2.climate_from_individual_space
            case ("climate", "nasa", "community"):
                sample_texts = ml_model_v2.climate_from_community_space
            case ("climate", "weather", "individual"):
                sample_texts = ml_model_v2.climate_from_individual_climate
                sample_texts.extend(
                    ml_model_v2.health_from_individual_climate
                )
                sample_texts.extend(
                    ml_model_v2.climate_from_individual_health)
            case ("climate", "weather", "community"):
                sample_texts = ml_model_v2.climate_from_community_climate
                sample_texts.extend(
                    ml_model_v2.health_from_community_climate
                )
                sample_texts.extend(
                    ml_model_v2.climate_from_community_health)
            case ("health", "nasa", "individual"):
                sample_texts = ml_model_v2.health_from_individual_space
            case ("health", "nasa", "community"):
                sample_texts = ml_model_v2.health_from_community_space
            case ("health", "weather", "individual"):
                sample_texts = ml_model_v2.health_from_individual_health
                sample_texts.extend(
                    ml_model_v2.health_from_individual_space)
                sample_texts.extend(
                    ml_model_v2.health_from_individual_climate)
            case ("health", "weather", "community"):
                sample_texts = ml_model_v2.health_from_community_health
                sample_texts.extend(
                    ml_model_v2.health_from_community_space)
                sample_texts.extend(
                    ml_model_v2.health_from_community_climate)

        return jsonify(most_related_phrases(sample_texts, input_text, n))

    except ValueError as e:
        return jsonify({"error": "Provide a valid integer value for n"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
