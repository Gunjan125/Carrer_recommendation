from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import joblib

app = Flask(__name__,template_folder="index.html")

@app.route('/carrer', methods=['POST'])
def carrer():
    user_data = request.json
    user_df = pd.DataFrame([user_data])

    logistic_model = joblib.load("logistic_model.pkl")
    label_encoder = joblib.load("label_encoder.pkl")

    predicted_class = logistic_model.predict(user_df)[0]
    career = label_encoder.inverse_transform([predicted_class])[0]
    return jsonify({"recommendedCareer": career})

if __name__ == '__main__':
    app.run(debug=True,port=3000)
