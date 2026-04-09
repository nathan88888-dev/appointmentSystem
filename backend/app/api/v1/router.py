from fastapi import APIRouter
from app.api.v1.endpoints import documents, applications, reports

api_router = APIRouter()
api_router.include_router(documents.router, prefix="/docs", tags=["documents"])
api_router.include_router(applications.router, prefix="/applications", tags=["applications"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
