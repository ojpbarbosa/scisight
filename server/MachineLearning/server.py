from flask import Flask, request, jsonify

from input_analyzer import setup_model, run

app = Flask(__name__)

nlp_study, nlp_prof = setup_model()


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data['text']
        return run(text, nlp_study, nlp_prof)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route('/wedidnthostedourserveryet', methods=['POST'])
def post_to_java_api():
    try:
        return jsonify({"message": ""})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
