from fastapi import FastAPI
from routes.chatbot.router import chatbot_router

app = FastAPI(title="Nidana API v0.1")

@app.get("/")
def read_root():
    return {"message": "Healthcare API is running 🚀"}

app.include_router(chatbot_router)