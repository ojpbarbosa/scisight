import random
from flask import Flask, request, jsonify
from flask_cors import CORS

import input_analyzer_v1
import ml_model_v1
import input_analyzer_v2
import ml_model_v2

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


@app.route("/api/v1/random-train-texts", methods=["GET"])
def v1_random_train_texts():
    try:
        n = int(request.args.get('n', 1))

        if n > len(ml_model_v1.train_texts):
            return jsonify({"error": "n is greater than the number of available training texts"})

        random_texts = random.sample(ml_model_v1.train_texts, n)

        return jsonify(random_texts)

    except ValueError as e:
        return jsonify({"error": "Provide a valid integer value for n"})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v2/random-train-texts", methods=["GET"])
def v2_random_train_texts():
    try:
        n = int(request.args.get('n', 1))

        if n > len(ml_model_v2.train_texts):
            return jsonify({"error": "n is greater than the number of available training texts"})

        random_texts = random.sample(ml_model_v2.train_texts, n)

        return jsonify(random_texts)

    except ValueError as e:
        return jsonify({"error": "Provide a valid integer value for n"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
