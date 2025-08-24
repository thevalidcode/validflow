
from pydantic import BaseModel
from typing import List, Dict
import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.schemas.rule import Operation
from app.schemas.rule import RuleCreate, RuleUpdate, RuleOut
from app.crud import rule as crud_rule
from app.crud.error_log import create_log
from app.core.config import settings

router = APIRouter(prefix="/rules", tags=["rules"])


class PreviewRequest(BaseModel):
    folder: str
    limit_files: int = 1000


class ApplyRequest(BaseModel):
    operations: List[Operation]


class UndoRequest(BaseModel):
    job_id: str


@router.get("/")
def list_rules(db: Session = Depends(get_db)):
    return crud_rule.get_rules(db)


@router.post("/", response_model=RuleOut)
def add_rule(data: RuleCreate, db: Session = Depends(get_db)):
    return crud_rule.create_rule(db, data)


@router.put("/{rule_id}", response_model=RuleOut)
def edit_rule(rule_id: int, data: RuleUpdate, db: Session = Depends(get_db)):
    updated_rule = crud_rule.update_rule(db, rule_id, data)
    if not updated_rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    return updated_rule


@router.delete("/{rule_id}")
def remove_rule(rule_id: int, db: Session = Depends(get_db)):
    return crud_rule.delete_rule(db, rule_id)


@router.post("/preview")
async def preview(req: PreviewRequest):
    folder = req.folder
    limit_files = req.limit_files
    if not os.path.exists(folder):
        raise HTTPException(status_code=404, detail="Folder not found")

    files = os.listdir(folder)[:limit_files]
    operations: List[Operation] = []
    for f in files:
        operations.append(Operation(
            src=os.path.join(folder, f), dest="", action="move"))
    return operations


@router.post("/apply", response_model=List[Dict[str, str]])
async def apply(req: ApplyRequest, db: Session = Depends(get_db)) -> List[Dict[str, str]]:
    applied: List[Dict[str, str]] = []

    for op in req.operations:
        try:
            dest: str = op.dest if op.dest else str(settings.watch_dir)
            result_path: str = crud_rule.move_file(op.src, dest)
            applied.append({"src": op.src, "dest": result_path})
        except Exception as e:
            # Log the error
            create_log(
                db,
                error_name="Apply Operation Failed",
                category="file",
                message=str(e),
                file_path=op.src,
                stack_trace=None
            )
            # make sure value is str for the response
            applied.append({"src": op.src, "dest": str(e)})

    return applied


@router.post("/undo")
async def undo(req: UndoRequest):
    # This requires storing job operations in DB with a job_id
    # For now, just return a placeholder
    return {"job_id": req.job_id, "status": "undo not implemented yet"}
