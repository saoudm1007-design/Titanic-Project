import json
import os

import joblib
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import cross_val_score, train_test_split

MODELS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")


def load_and_prepare_data():
    df = sns.load_dataset("titanic")

    # Fill missing age with median grouped by pclass + sex
    df["age"] = df.groupby(["pclass", "sex"])["age"].transform(
        lambda x: x.fillna(x.median())
    )
    # Fill any remaining missing ages with overall median
    df["age"] = df["age"].fillna(df["age"].median())

    # Fill missing embarked with mode
    df["embarked"] = df["embarked"].fillna("S")

    # Fill missing fare with median
    df["fare"] = df["fare"].fillna(df["fare"].median())

    # Encode sex
    df["sex_encoded"] = df["sex"].map({"male": 0, "female": 1})

    # One-hot encode embarked
    df["embarked_C"] = (df["embarked"] == "C").astype(int)
    df["embarked_Q"] = (df["embarked"] == "Q").astype(int)
    df["embarked_S"] = (df["embarked"] == "S").astype(int)

    # Derive family_size and is_alone
    df["family_size"] = df["sibsp"] + df["parch"] + 1
    df["is_alone"] = (df["family_size"] == 1).astype(int)

    return df


def compute_dataset_stats(df):
    stats = {}

    # Survival by class
    survival_by_class = df.groupby("pclass")["survived"].mean().to_dict()
    stats["survival_by_class"] = {str(k): round(v, 4) for k, v in survival_by_class.items()}

    # Survival by sex
    survival_by_sex = df.groupby("sex")["survived"].mean().to_dict()
    stats["survival_by_sex"] = {k: round(v, 4) for k, v in survival_by_sex.items()}

    # Age distribution (binned)
    age_bins = [0, 10, 20, 30, 40, 50, 60, 70, 80]
    age_labels = ["0-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80"]
    df["age_bin"] = pd.cut(df["age"], bins=age_bins, labels=age_labels, right=True)
    age_dist = df["age_bin"].value_counts().sort_index().to_dict()
    stats["age_distribution"] = {str(k): int(v) for k, v in age_dist.items()}

    # Survival by age bin
    survival_by_age = df.groupby("age_bin", observed=False)["survived"].mean().to_dict()
    stats["survival_by_age"] = {str(k): round(float(v), 4) for k, v in survival_by_age.items()}

    # Embarked distribution
    embarked_dist = df["embarked"].value_counts().to_dict()
    stats["embarked_distribution"] = {k: int(v) for k, v in embarked_dist.items()}

    # Survival by embarked
    survival_by_embarked = df.groupby("embarked")["survived"].mean().to_dict()
    stats["survival_by_embarked"] = {k: round(v, 4) for k, v in survival_by_embarked.items()}

    # Overall stats
    stats["total_passengers"] = int(len(df))
    stats["survival_rate"] = round(df["survived"].mean(), 4)
    stats["avg_age"] = round(df["age"].mean(), 2)
    stats["avg_fare"] = round(df["fare"].mean(), 2)

    # Class distribution
    class_dist = df["pclass"].value_counts().sort_index().to_dict()
    stats["class_distribution"] = {str(k): int(v) for k, v in class_dist.items()}

    # Sample data for explore page (20 rows)
    sample_cols = ["survived", "pclass", "sex", "age", "sibsp", "parch", "fare", "embarked"]
    stats["sample_data"] = df[sample_cols].head(20).to_dict(orient="records")

    # Descriptive statistics
    desc = df[["age", "fare", "sibsp", "parch"]].describe().round(2).to_dict()
    stats["descriptive_stats"] = {
        col: {k: float(v) for k, v in vals.items()} for col, vals in desc.items()
    }

    return stats


def train_and_evaluate(df):
    feature_cols = [
        "pclass", "sex_encoded", "age", "sibsp", "parch", "fare",
        "embarked_C", "embarked_Q", "embarked_S", "family_size", "is_alone",
    ]
    feature_names = [
        "Pclass", "Sex", "Age", "SibSp", "Parch", "Fare",
        "Embarked_C", "Embarked_Q", "Embarked_S", "Family Size", "Is Alone",
    ]

    X = df[feature_cols].values
    y = df["survived"].values

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(
        n_estimators=200, max_depth=8, random_state=42, n_jobs=-1
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)

    # 5-fold cross-validation
    cv_scores = cross_val_score(model, X, y, cv=5, scoring="accuracy")

    print(f"Accuracy:  {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall:    {recall:.4f}")
    print(f"F1 Score:  {f1:.4f}")
    print(f"CV Scores: {cv_scores.round(4)}")
    print(f"CV Mean:   {cv_scores.mean():.4f} (+/- {cv_scores.std():.4f})")

    # Feature importance
    importances = model.feature_importances_
    feature_importance = {
        name: round(float(imp), 4)
        for name, imp in sorted(zip(feature_names, importances), key=lambda x: -x[1])
    }

    metrics = {
        "accuracy": round(float(accuracy), 4),
        "precision": round(float(precision), 4),
        "recall": round(float(recall), 4),
        "f1_score": round(float(f1), 4),
        "confusion_matrix": cm.tolist(),
        "cv_scores": cv_scores.round(4).tolist(),
        "cv_mean": round(float(cv_scores.mean()), 4),
        "cv_std": round(float(cv_scores.std()), 4),
        "feature_importance": feature_importance,
        "feature_names": feature_names,
        "feature_cols": feature_cols,
    }

    return model, metrics


def main():
    os.makedirs(MODELS_DIR, exist_ok=True)

    print("Loading and preparing data...")
    df = load_and_prepare_data()

    print("Computing dataset statistics...")
    stats = compute_dataset_stats(df)

    print("Training model...")
    model, metrics = train_and_evaluate(df)

    # Save model
    model_path = os.path.join(MODELS_DIR, "model.pkl")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

    # Save metadata
    metadata = {"metrics": metrics, "stats": stats}
    metadata_path = os.path.join(MODELS_DIR, "metadata.json")
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata saved to {metadata_path}")


if __name__ == "__main__":
    main()
