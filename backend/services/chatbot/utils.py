from crewai import Crew
from services.chatbot.tasks import triage_task, doctor_task

chatbot_crew = Crew(
    agents=[triage_task.agent, doctor_task.agent],
    tasks=[triage_task, doctor_task],
    verbose=True
)