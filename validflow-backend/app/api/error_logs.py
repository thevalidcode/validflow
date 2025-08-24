from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.core.db import SessionLocal
from app.crud.error_log import create_log, get_all_logs

router = APIRouter(prefix="/error-logs", tags=["error_logs"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def logs(db: Session = Depends(get_db)):
    return get_all_logs(db)


@router.post("/")
def add_log(
    error_name: str,
    category: str = "other",
    message: str | None = None,
    file_path: str | None = None,
    line_number: int | None = None,
    stack_trace: str | None = None,
    db: Session = Depends(get_db),
):
    return create_log(db, error_name, category, message, file_path, line_number, stack_trace)
