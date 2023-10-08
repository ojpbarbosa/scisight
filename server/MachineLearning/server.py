from flask import Flask, request, jsonify

from input_analyzer import run

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data['text']
        return run(text)
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
