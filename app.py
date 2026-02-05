import json
import os

import joblib
import numpy as np
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Load model and metadata at startup
model = joblib.load(os.path.join(MODELS_DIR, "model.pkl"))
with open(os.path.join(MODELS_DIR, "metadata.json")) as f:
    metadata = json.load(f)

metrics = metadata["metrics"]
stats = metadata["stats"]


def prepare_features(data):
    """Convert raw input to model feature vector."""
    sex_encoded = 1 if data["sex"] == "female" else 0
    embarked = data.get("embarked", "S")
    # Map Liverpool to Southampton (both English ports, model trained on S/C/Q)
    if embarked == "L":
        embarked = "S"
    embarked_C = 1 if embarked == "C" else 0
    embarked_Q = 1 if embarked == "Q" else 0
    embarked_S = 1 if embarked == "S" else 0
    sibsp = int(data.get("sibsp", 0))
    parch = int(data.get("parch", 0))
    family_size = sibsp + parch + 1
    is_alone = 1 if family_size == 1 else 0

    features = np.array([[
        int(data["pclass"]),
        sex_encoded,
        float(data["age"]),
        sibsp,
        parch,
        float(data["fare"]),
        embarked_C,
        embarked_Q,
        embarked_S,
        family_size,
        is_alone,
    ]])
    return features


@app.route("/")
def welcome():
    return render_template("welcome.html")


@app.route("/dashboard")
def index():
    return render_template("index.html", stats=stats, metrics=metrics)


@app.route("/predict", methods=["POST"])
def predict():
    data = {
        "pclass": request.form.get("pclass"),
        "sex": request.form.get("sex"),
        "age": request.form.get("age"),
        "sibsp": request.form.get("sibsp"),
        "parch": request.form.get("parch"),
        "fare": request.form.get("fare"),
        "embarked": request.form.get("embarked"),
    }
    features = prepare_features(data)
    prediction = int(model.predict(features)[0])
    probability = model.predict_proba(features)[0]

    result = {
        "prediction": prediction,
        "survived": bool(prediction),
        "probability_survived": round(float(probability[1]) * 100, 1),
        "probability_died": round(float(probability[0]) * 100, 1),
        "input": data,
    }
    return render_template("results.html", result=result)


@app.route("/api/predict", methods=["POST"])
def api_predict():
    data = request.get_json()
    features = prepare_features(data)
    prediction = int(model.predict(features)[0])
    probability = model.predict_proba(features)[0]

    return jsonify({
        "prediction": prediction,
        "survived": bool(prediction),
        "probability_survived": round(float(probability[1]) * 100, 1),
        "probability_died": round(float(probability[0]) * 100, 1),
    })


@app.route("/explore")
def explore():
    return render_template("explore.html", stats=stats)


@app.route("/performance")
def performance():
    return render_template("performance.html", metrics=metrics)


@app.route("/api/stats")
def api_stats():
    return jsonify({"stats": stats, "metrics": metrics})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
