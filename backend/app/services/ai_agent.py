from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_community.chat_models import ChatOpenAI # Standard placeholder
import os

class AdmissionAIAgent:
    """
    AI Agent responsible for scoring applications with Citations.
    Ensures 'No-Training' by wrapping service calls.
    """
    def __init__(self):
        self.model_name = os.getenv("LLM_MODEL", "gpt-4-turbo")
        # Placeholder for LangChain setup
        self.parser = JsonOutputParser()
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert Admissions Reviewer. Score the following application out of 100. "
                       "For every scoring point, provide a 'Citation' from the source documents. "
                       "Output format: {{\"score\": int, \"summary\": str, \"points\": [{{\"topic\": str, \"score\": float, \"citation\": str}}]}}"),
            ("user", "Applicant Name: {name}\nGPA: {gpa}\nExtracurriculars: {activities}")
        ])

    async def analyze_application(self, applicant_data: dict):
        """
        Simulate AI analysis with Citations.
        In production, this would invoke the LangChain chain.
        """
        # Simulate logic for Citation generation
        return {
            "score": 88,
            "summary": "Strong academic candidate with significant leadership potential.",
            "metrics": [
                {
                    "name": "Academic Excellence",
                    "score": 9.2,
                    "comment": "Maintains a consistent 3.9+ GPA in advanced mathematics modules.",
                    "citation": "Official_Transcript.pdf"
                },
                {
                    "name": "Leadership Skills",
                    "score": 8.5,
                    "comment": "Evidence of project management in high-impact student organizations.",
                    "citation": "Personal_Statement.pdf"
                }
            ]
        }
