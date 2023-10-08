from flask import Flask, request, jsonify
from flask_cors import CORS

from input_analyzer import setup_model, run

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

nlp_study, nlp_prof = setup_model()


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        query = data["query"]
        return run(query, nlp_study, nlp_prof)
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
