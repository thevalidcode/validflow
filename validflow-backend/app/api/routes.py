from fastapi import APIRouter
from app.core.config import settings
from app.models.file_log import get_all_logs

router = APIRouter()


@router.get("/status")
def status():
    return {"watching": settings.watch_dir}


@router.get("/logs")
def logs():
    return get_all_logs()
