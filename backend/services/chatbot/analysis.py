from services.chatbot.config import openai_client

def analyze_with_ai(base64_image):
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",  # supports vision
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a medical assistant. "
                    "Do NOT diagnose. "
                    "Describe visible features, possible concerns, "
                    "and suggest next steps safely."
                )
            },
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "Analyze this medical image"},
                    {
                        "type": "image_url",
                        "image_url": f"data:image/jpeg;base64,{base64_image}"
                    }
                ]
            }
        ]
    )

    return response.choices[0].message.content