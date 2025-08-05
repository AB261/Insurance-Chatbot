from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

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
    insured_zip: str
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
    incident_hour_of_the_day: str
    number_of_vehicles_involved: int
    property_damage: str
    bodily_injuries: int
    witnesses: int
    police_report_available: str
    total_claim_amount: float
    injury_claim: float
    property_claim: float
    vehicle_claim: float
    auto_make: str
    auto_model: str
    auto_year: str

# ------------------- Step 3: Load model and preprocessing components -------------------
model = joblib.load("fraud_detection_voting_model.pkl")
scaler = joblib.load("scaler.pkl")
encoder = joblib.load("encoder.pkl")
encoded_feature_names = joblib.load("get_feature_names.pkl")

# ------------------- Step 4: Define the API endpoint -------------------
@app.post("/predict")
def predict_fraud(user_input: FraudInput):
    try:
        # Step 4.1: Convert incoming JSON to DataFrame
        df_input = pd.DataFrame([user_input.dict()])

        # Step 4.2: Add derived features
        df_input['policy_bind_date'] = pd.to_datetime(df_input['policy_bind_date'])
        df_input['incident_date'] = pd.to_datetime(df_input['incident_date'])
        df_input['vehicle_age'] = df_input['incident_date'].dt.year - df_input['auto_year'].astype(int)
        df_input['days_between_bind_and_incident'] = (df_input['incident_date'] - df_input['policy_bind_date']).dt.days

        # Step 4.3: Convert specific numeric fields to categorical (as string)
        df_input['insured_zip'] = df_input['insured_zip'].astype(str)
        df_input['incident_hour_of_the_day'] = df_input['incident_hour_of_the_day'].astype(str)
        df_input['auto_year'] = df_input['auto_year'].astype(str)

        # Step 4.4: Define categorical columns
        categorical_cols = [
            'policy_state', 'policy_csl', 'insured_zip', 'insured_sex', 'insured_education_level',
            'insured_occupation', 'insured_hobbies', 'insured_relationship', 'incident_type',
            'collision_type', 'incident_severity', 'authorities_contacted', 'incident_state',
            'incident_city', 'incident_location', 'incident_hour_of_the_day', 'property_damage',
            'police_report_available', 'auto_make', 'auto_model', 'auto_year'
        ]

        # Step 4.5: Encode categorical columns
        df_encoded = encoder.transform(df_input[categorical_cols])
        df_encoded = pd.DataFrame(df_encoded, columns=encoded_feature_names, index=df_input.index)

        # Step 4.6: Drop original categorical columns and date fields
        df_input = df_input.drop(columns=categorical_cols + ['policy_bind_date', 'incident_date'])

        # Step 4.7: Concatenate encoded and numeric fields
        df_input = pd.concat([df_input, df_encoded], axis=1)

        # Step 4.8: Scale all features
        df_input[df_input.columns] = scaler.transform(df_input[df_input.columns])
        df_processed = df_input.copy()

    except Exception as e:
        return {"error": f"Preprocessing failed: {str(e)}"}

    # Step 4.9: Make prediction
    try:
        prediction = model.predict(df_processed)[0]
        result = "Fraudulent Claim" if prediction == 1 else "Genuine Claim"
        return {"prediction": result}
    except Exception as e:
        return {"error": f"Model prediction failed: {str(e)}"}