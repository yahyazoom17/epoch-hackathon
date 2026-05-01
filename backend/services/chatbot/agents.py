from crewai import Agent
from services.chatbot.config import nvidia_llm

triage_agent = Agent(
    role="Triage Nurse",
    goal="Understand patient symptoms and assess urgency",
    backstory="Experienced nurse trained in patient intake and risk detection",
    llm=nvidia_llm,
    verbose=True
)

doctor_agent = Agent(
    role="Doctor",
    goal="Provide safe medical guidance. Never diagnose. Always suggest professional help when needed.",
    backstory="General physician focused on safe and conservative advice",
    llm=nvidia_llm,
    verbose=True
)