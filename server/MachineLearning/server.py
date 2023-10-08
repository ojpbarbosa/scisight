import random
from flask import Flask, request, jsonify
from flask_cors import CORS

from input_analyzer import setup_model, run
from ml_model import train_texts

app = Flask(__name__)
CORS(app)

nlp_study, nlp_prof = setup_model()


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        query = data["query"]
        return run(query, nlp_study, nlp_prof)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/random-train-texts", methods=["GET"])
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
    app.run(debug=True)
