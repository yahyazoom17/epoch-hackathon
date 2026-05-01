from pdf2image import convert_from_path
import pytesseract
import base64
from openai import OpenAI
import base64

client = OpenAI(api_key="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")

def get_report_from_pdf():
    images = convert_from_path("uploads/sample.pdf")
    report = ""
    for img in images:
        report += pytesseract.image_to_string(img)
    return report

def get_analysis_from_image():
    with open("uploads/sample.jpeg", "rb") as f:
        img_b64 = base64.b64encode(f.read()).decode()

    response = client.responses.create(
        model="gpt-4.1",
        input=[{
            "role": "user",
            "content": [
                {"type": "input_text", "text": "What do you observe in this scan?"},
                {
                    "type": "input_image",
                    "image_url": f"data:image/jpeg;base64,{img_b64}"
                }
            ]
        }]
    )

    return response.output_text
