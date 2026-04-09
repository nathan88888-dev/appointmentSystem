from fastapi import APIRouter
from app.services.ai_agent import AdmissionAIAgent

router = APIRouter()

@router.get("/")
async def list_applications():
    return {
        "applications": [
            {"id": 1, "name": "Sarah Connor", "status": "Pending", "score": 92, "date": "2026-03-24", "school": "Tech Institute"},
            {"id": 2, "name": "John Doe", "status": "Reviewing", "score": 78, "date": "2026-03-23", "school": "Skyline Academy"},
            {"id": 3, "name": "Ellen Ripley", "status": "Urgent", "score": 99, "date": "2026-03-22", "school": "Nostromo High"},
            {"id": 4, "name": "T-800", "status": "Flagged", "score": 45, "date": "2026-03-21", "school": "Cyberdyne Systems"}
        ]
    }

@router.post("/")
async def submit_application(data: dict):
    return {"message": "Application submitted successfully", "id": "app_123"}

@router.get("/{app_id}/analyze")
async def analyze_app(app_id: str):
    agent = AdmissionAIAgent()
    # Mock fetching application data
    mock_data = {"name": "Test User", "gpa": "3.8", "activities": "Volunteering"}
    analysis = await agent.analyze_application(mock_data)
    return {
        "app_id": app_id,
        "analysis": analysis
    }
