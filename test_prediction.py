import joblib
import pandas as pd


# Load model

model = joblib.load("model.pkl")


# Sample house details

sample = pd.DataFrame({

    "Location":[2],
    "Area_sqft":[1500],
    "Bedrooms":[3],
    "Bathrooms":[2],
    "Floors":[1],
    "Material_Quality":[2],
    "Interior_Type":[1],
    "Parking":[1],
    "Balcony":[1],
    "Garden":[0],
    "Material_Cost":[1800000],
    "Labour_Cost":[800000],
    "Finishing_Cost":[600000]

})


prediction = model.predict(sample)


print("Estimated Construction Cost:")
print("₹", round(prediction[0]))
