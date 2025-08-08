import datetime
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import holidays

# ------------------- Step 1: Define the FastAPI app -------------------
app = FastAPI()

# ------------------- Step 2: Define the expected input schema -------------------
class FraudInput(BaseModel):
    months_as_customer: int
    age: int
    policy_number: int
    policy_bind_date: str
    policy_state: str
    policy_csl: str
    policy_deductable: int
    policy_annual_premium: float
    umbrella_limit: int
    insured_zip: int
    insured_sex: str
    insured_education_level: str
    insured_occupation: str
    insured_hobbies: str
    insured_relationship: str
    capital_gains: int
    capital_loss: int
    incident_date: str
    incident_type: str
    collision_type: str
    incident_severity: str
    authorities_contacted: str
    incident_state: str
    incident_city: str
    incident_location: str
    incident_hour_of_the_day: int
    number_of_vehicles_involved: int
    property_damage: str
    bodily_injuries: int
    witnesses: int
    police_report_available: str
    total_claim_amount: int
    injury_claim: int
    property_claim: int
    vehicle_claim: int
    auto_make: str
    auto_model: str
    auto_year: int

# ------------------- Step 3: Load model and preprocessing components -------------------
model = joblib.load("fraud_detection_voting_model.pkl")
scaler = joblib.load("scaler.pkl")
encoder = joblib.load("encoder.pkl")
encoded_feature_names = joblib.load("encoded_feature_names.pkl")
final_feature_columns = joblib.load("final_feature_columns.pkl")

# ------------------- Step 4: Define the API endpoint -------------------
@app.post("/predict")
def predict_fraud(user_input: FraudInput):
    try:
        payload = user_input.model_dump()
        df_input = pd.DataFrame([payload])
        # ------------------ Step 3: Preprocessing ------------------
        # Changing column names of capital-gains and capital-loss to match training data
        df_input.rename(columns={'capital_gains': 'capital-gains', 'capital_loss': 'capital-loss'}, inplace=True)

        # Dates
        df_input['policy_bind_date'] = pd.to_datetime(df_input['policy_bind_date'])
        df_input['incident_date']   = pd.to_datetime(df_input['incident_date'])

        # Derived features (must match training logic)
        df_input['vehicle_age'] = df_input['incident_date'].dt.year - df_input['auto_year'].astype(int)
        df_input['days_between_bind_and_incident'] = (df_input['incident_date'] - df_input['policy_bind_date']).dt.days


        us_holidays = holidays.US(years=[2014, 2015, 2016])
        df_input["day_type"] = df_input["incident_date"].apply(
            lambda x: "Holiday" if x in us_holidays else ("Weekend" if x.weekday() >= 5 else "Weekday")
        )

        # Drop fields you didn’t train on
        data_input = df_input.drop(columns=['incident_date', 'policy_bind_date', 'policy_number', 'insured_zip', 'total_claim_amount'])

        # Make sure int-as-category cols are strings (as in training)
        cols_to_convert = ['incident_hour_of_the_day', 'auto_year']
        data_input[cols_to_convert] = data_input[cols_to_convert].astype(str)

        # Use the SAME categorical columns the encoder was FIT on
        categorical_cols_used = list(encoder.feature_names_in_)
        categorical_df = data_input[categorical_cols_used].astype(str)

        # Everything else is numeric
        numerical_df = data_input.drop(columns=categorical_cols_used)

        # Transform with pre-fit encoder
        X_cat = encoder.transform(categorical_df)
        cat_df = pd.DataFrame(X_cat, columns=encoded_feature_names, index=data_input.index)

        # Combine numeric + encoded cat
        combined = pd.concat([numerical_df.reset_index(drop=True), cat_df.reset_index(drop=True)], axis=1)

        combined_aligned = combined.reindex(columns=final_feature_columns, fill_value=0)

        # Scale with pre-fit scaler
        scaled_df_input = scaler.transform(combined_aligned)
        

    except Exception as e:
        return {"error": f"Preprocessing failed: {str(e)}"}

    # Step 4.9: Make prediction
    try:
        prediction = model.predict(scaled_df_input)[0]
        result = "Fraudulent Claim" if prediction == 1 else "Genuine Claim"
        return {"prediction": result}
    except Exception as e:
        return {"error": f"Model prediction failed: {str(e)}"}
    
@app.get("/")
def read_root():
    return {"message": "Welcome to the Fraud Detection API. Use POST /predict to make predictions."}