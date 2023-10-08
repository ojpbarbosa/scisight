import random
from flask import Flask, request, jsonify
from flask_cors import CORS

import input_analyzer
import input_analyzer_v2
from ml_model import train_texts

app = Flask(__name__)
CORS(app)

field_nlp, occupation_nlp = None, None
social_field_nlp, use_api_nlp, social_context_nlp = None, None, None


@app.route("/api/v1/predict", methods=["POST"])
def v1_predict():
    try:
        data = request.get_json()
        query = data["query"]

        if field_nlp is None or occupation_nlp is None:
            return jsonify({"error": "Models not initialized yet"})

        return input_analyzer.run(query, field_nlp, occupation_nlp)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v2/predict", methods=["POST"])
def v2_predict():
    try:
        data = request.get_json()
        query = data["query"]

        if social_field_nlp is None or use_api_nlp is None or social_context_nlp is None:
            return jsonify({"error": "Models not initialized yet"})

        return input_analyzer_v2.run(query, social_field_nlp, use_api_nlp, social_context_nlp)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/v1/random-train-texts", methods=["GET"])
def random_train_texts():
    try:
        n = int(request.args.get('n', 1))

        if n > len(train_texts):
            return jsonify({"error": "n is greater than the number of available training texts"})

        random_texts = random.sample(train_texts, n)

        return jsonify(random_texts)

    except ValueError as e:
        return jsonify({"error": "Provide a valid integer value for n"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    field_nlp, occupation_nlp = input_analyzer.setup_models()
    print('v1 ready!')

    social_field_nlp, use_api_nlp, social_context_nlp = input_analyzer_v2.setup_models()
    print('v2 ready!')

    app.run(debug=True)
