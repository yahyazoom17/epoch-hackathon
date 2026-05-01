from crewai import Task
from services.chatbot.agents import triage_agent, doctor_agent

triage_task = Task(
    description="Analyze patient input: {input}. Identify symptoms and urgency level.",
    agent=triage_agent,
    expected_output="Symptoms list + urgency (low/medium/high)"
)

doctor_task = Task(
    description="Based on triage result, provide safe advice. Avoid diagnosis.",
    agent=doctor_agent,
    expected_output="Helpful guidance + next steps"
)