# Titanic Survival Prediction Dashboard

A machine learning web application that predicts Titanic passenger survival using a Random Forest classifier. Includes an interactive prediction form, dataset exploration, and a full model performance page.

## Features

- **Survival Predictor** — Enter passenger details and get an instant survival prediction with probability breakdown
- **Dashboard** — Key dataset statistics and charts (survival by class, sex, age, embarkation port)
- **Dataset Explorer** — Browse sample data and descriptive statistics for all key features
- **Model Performance** — Accuracy, precision, recall, F1 score, confusion matrix, 5-fold cross-validation, and feature importance chart
- **REST API** — JSON endpoint for programmatic predictions

## Tech Stack

- **Backend** — Python, Flask
- **Machine Learning** — scikit-learn (Random Forest), pandas, numpy, seaborn, joblib
- **Frontend** — HTML, CSS, JavaScript (no frameworks)
- **Dataset** — Titanic dataset via seaborn (`sns.load_dataset("titanic")`)

## Model Details

| Property | Value |
|----------|-------|
| Algorithm | Random Forest Classifier |
| Estimators | 200 trees |
| Max Depth | 8 |
| Validation | 5-fold cross-validation |
| Features | 11 (Pclass, Sex, Age, SibSp, Parch, Fare, Embarked, Family Size, Is Alone) |

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/saoudm1007-design/Titanic-Project.git
cd Titanic-Project
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the model

```bash
python3 train_model.py
```

This generates `models/model.pkl` and `models/metadata.json`.

### 5. Run the application

```bash
python3 app.py
```

App runs at `http://localhost:5000`

## Project Structure

```
├── app.py              # Flask backend — routes and prediction logic
├── train_model.py      # Model training, evaluation, and metadata export
├── requirements.txt    # Python dependencies
├── models/
│   ├── model.pkl       # Trained Random Forest model (generated)
│   └── metadata.json   # Model metrics and dataset stats (generated)
├── templates/
│   ├── base.html       # Base layout
│   ├── welcome.html    # Landing page
│   ├── index.html      # Dashboard with prediction form and charts
│   ├── results.html    # Prediction result page
│   ├── explore.html    # Dataset exploration page
│   └── performance.html# Model metrics and feature importance
└── static/
    ├── css/
    ├── js/
    └── img/
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome / landing page |
| GET | `/dashboard` | Main dashboard with prediction form |
| POST | `/predict` | Form-based survival prediction |
| GET | `/explore` | Dataset exploration page |
| GET | `/performance` | Model performance metrics |
| POST | `/api/predict` | JSON prediction API |
| GET | `/api/stats` | Dataset stats and model metrics (JSON) |

### API Example

```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "pclass": 1,
    "sex": "female",
    "age": 29,
    "sibsp": 0,
    "parch": 0,
    "fare": 211.34,
    "embarked": "S"
  }'
```

```json
{
  "prediction": 1,
  "survived": true,
  "probability_survived": 96.3,
  "probability_died": 3.7
}
```

## License

MIT
