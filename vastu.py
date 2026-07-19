def check_vastu(entrance, kitchen, bedroom, pooja, bathroom):


    score = 100

    suggestions = []



    # ===============================
    # Entrance Direction
    # ===============================

    if entrance not in ["East", "North"]:

        score -= 10

        suggestions.append(
            "🚪 Main entrance should preferably be in East or North direction."
        )



    # ===============================
    # Kitchen Direction
    # ===============================

    if kitchen != "South-East":

        score -= 15

        suggestions.append(
            "🍳 Kitchen is recommended in South-East direction."
        )



    # ===============================
    # Master Bedroom
    # ===============================

    if bedroom != "South-West":

        score -= 10

        suggestions.append(
            "🛏️ Master bedroom is recommended in South-West direction."
        )



    # ===============================
    # Pooja Room
    # ===============================

    if pooja != "North-East":

        score -= 10

        suggestions.append(
            "🛕 Pooja room is preferred in North-East direction."
        )



    # ===============================
    # Bathroom
    # ===============================

    if bathroom not in ["North-West", "West"]:

        score -= 15

        suggestions.append(
            "🚿 Bathroom is better placed in North-West or West direction."
        )



    # Score limit

    if score < 0:

        score = 0



    # Final Message

    if score >= 90:

        suggestions.insert(
            0,
            "✅ Excellent Vastu alignment!"
        )


    elif score >= 70:

        suggestions.insert(
            0,
            "👍 Good Vastu plan with few improvements."
        )


    else:

        suggestions.insert(
            0,
            "⚠️ Several Vastu improvements are recommended."
        )



    return score, suggestions
