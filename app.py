from flask import Flask, render_template, request
from vastu import check_vastu
import joblib
import pandas as pd


app = Flask(__name__)


# ===============================
# Load ML Model
# ===============================

model = joblib.load("model.pkl")



# ===============================
# Home Page
# ===============================

@app.route("/")
def home():

    return render_template("index.html")



# ===============================
# Vastu Analysis
# ===============================

@app.route("/vastu", methods=["POST"])
def vastu_analysis():


    entrance = request.form["entrance"]

    kitchen = request.form["kitchen"]

    bedroom = request.form["bedroom"]

    pooja = request.form["pooja"]

    bathroom = request.form["bathroom"]



    score, suggestions = check_vastu(

        entrance,

        kitchen,

        bedroom,

        pooja,

        bathroom

    )



    return render_template(

        "vastu.html",

        score=score,

        suggestions=suggestions

    )





# ===============================
# 2D Layout Generator
# ===============================

@app.route("/layout", methods=["POST"])
def layout_generator():


    bedrooms = int(request.form["bedrooms"])

    bathrooms = int(request.form["bathrooms"])

    floors = int(request.form["floors"])




    layout = {


        "North-East": "🛕 Pooja Room",


        "South-East": "🍳 Kitchen",


        "South-West": "🛏️ Master Bedroom",


        "North-West": "🚿 Bathroom",


        "Center": "🛋️ Living Room"


    }




    for i in range(1, bedrooms):

        layout[f"Bedroom {i+1}"] = "🛏️ Bedroom"





    return render_template(

        "layout.html",

        layout=layout,

        bedrooms=bedrooms,

        bathrooms=bathrooms,

        floors=floors

    )





# ===============================
# 3D Home Visualization
# ===============================


@app.route("/3d")
def home_3d():


    bedrooms = int(

        request.args.get(

            "bedrooms",

            2

        )

    )


    bathrooms = int(

        request.args.get(

            "bathrooms",

            1

        )

    )


    floors = int(

        request.args.get(

            "floors",

            1

        )

    )



    return render_template(

        "3d_home.html",

        bedrooms=bedrooms,

        bathrooms=bathrooms,

        floors=floors

    )





# ===============================
# Cost Prediction
# ===============================


@app.route("/predict", methods=["POST"])
def predict():



    location = request.form["location"]


    area = int(request.form["area"])


    bedrooms = int(request.form["bedrooms"])


    bathrooms = int(request.form["bathrooms"])


    floors = int(request.form["floors"])



    material = request.form["material"]


    interior = request.form["interior"]


    parking = request.form["parking"]


    balcony = request.form["balcony"]


    garden = request.form["garden"]




    # ===============================
    # Encoding
    # ===============================


    location_map = {


        "Gajuwaka":0,

        "Madhurawada":1,

        "MVP Colony":2,

        "Seethammadhara":3,

        "Pendurthi":4,

        "Kommadi":5,

        "Anandapuram":6,

        "Bheemili":7,

        "Tagarapuvalasa":8,

        "Sabbavaram":9,

        "Parawada":10,

        "Padmanabham":11,

        "Rambilli":12,

        "Atchutapuram":13,

        "Kothavalasa":14


    }





    quality_map = {


        "Basic":0,

        "Standard":1,

        "Premium":2


    }




    interior_map = {


        "Normal":0,

        "Modern":1,

        "Luxury":2


    }




    yes_no = {


        "No":0,

        "Yes":1


    }





    input_data = pd.DataFrame({



        "Location":[location_map[location]],


        "Area_sqft":[area],


        "Bedrooms":[bedrooms],


        "Bathrooms":[bathrooms],


        "Floors":[floors],


        "Material_Quality":[quality_map[material]],


        "Interior_Type":[interior_map[interior]],


        "Parking":[yes_no[parking]],


        "Balcony":[yes_no[balcony]],


        "Garden":[yes_no[garden]],



        "Material_Cost":[0],


        "Labour_Cost":[0],


        "Finishing_Cost":[0]


    })






    prediction = model.predict(input_data)



    cost = round(prediction[0])





    material_cost = round(cost * 0.55)


    labour_cost = round(cost * 0.25)


    finishing_cost = round(cost * 0.20)






    return render_template(


        "result.html",


        cost=cost,


        material=material_cost,


        labour=labour_cost,


        finishing=finishing_cost,


        bedrooms=bedrooms,


        bathrooms=bathrooms,


        floors=floors


    )

@app.route("/planner")
def planner():
    return render_template("planner.html")





if __name__ == "__main__":

    app.run(debug=True)
