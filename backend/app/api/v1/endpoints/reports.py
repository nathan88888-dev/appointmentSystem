from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import io
import csv

router = APIRouter()

@router.get("/stats")
async def get_system_stats():
    return {
        "total_applicants": 2841,
        "admission_rate": 0.184,
        "ai_avg_score": 76.2,
        "reviews_completed_percent": 92
    }

@router.get("/export")
async def export_applicants():
    """
    Generates a CSV export of applicants.
    """
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "School", "AI Score", "Status"])
    writer.writerow(["1", "Sarah Connor", "Tech Institute", "92", "Pending"])
    writer.writerow(["2", "John Doe", "Skyline Academy", "78", "Reviewing"])
    
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=applicants_report.csv"}
    )
