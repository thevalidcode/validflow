from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.error_log import ErrorLog, ErrorCategory


def create_log(
    db: Session,
    error_name: str,
    category: str = "other",
    message: str | None = None,
    file_path: str | None = None,
    line_number: int | None = None,
    stack_trace: str | None = None,
):
    try:
        # Validate category against enum
        cat_enum = ErrorCategory(category.lower())
    except ValueError:
        raise HTTPException(status_code=400, detail=f"Invalid category: {category}")

    log = ErrorLog(
        error_name=error_name,
        category=cat_enum,
        message=message,
        file_path=file_path,
        line_number=line_number,
        stack_trace=stack_trace,
    )
    db.add(log)
    db.commit()
    db.refresh(log)
    return log


def get_all_logs(db: Session):
    return db.query(ErrorLog).order_by(ErrorLog.timestamp.desc()).all()
