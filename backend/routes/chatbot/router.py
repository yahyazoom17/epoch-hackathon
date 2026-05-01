from fastapi import APIRouter, UploadFile, File # type: ignore
from services.chatbot.utils import chatbot_crew
from routes.chatbot.schemas import ChatbotInputSchema
from services.chatbot.analysis import analyze_with_ai
import base64

chatbot_router = APIRouter(prefix="/api/chatbot", tags=["chatbot"])

@chatbot_router.get("/")
def health():
    return {"message":"chatbot is running!", "status":"ok"}

@chatbot_router.post("/chat")
def ask_chatbot(user_input:ChatbotInputSchema):
    response = chatbot_crew.kickoff(inputs={
    "input": f"{user_input.query}"
    })
    return {"status":"ok", "message":"agent responded", "response":response}

@chatbot_router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    contents = await file.read()
    encoded = base64.b64encode(contents).decode("utf-8")
    result = analyze_with_ai(encoded)
    return {"analysis": result}