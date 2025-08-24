import os
import shutil
from sqlalchemy.orm import Session
from app.models.rule import Rule
from app.schemas.rule import RuleCreate, RuleUpdate


def create_rule(db: Session, data: RuleCreate):
    rule = Rule(
        name=data.name,
        priority=data.priority,
        enabled=data.enabled,
        stop_on_match=data.stop_on_match,
        conditions=data.conditions.model_dump(),
        actions=data.actions.model_dump()
    )
    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule


def update_rule(db: Session, rule_id: int, data: RuleUpdate):
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if not rule:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        if key in ["conditions", "actions"] and isinstance(value, dict):
            setattr(rule, key, value)
        else:
            setattr(rule, key, value)
    db.commit()
    db.refresh(rule)
    return rule


def get_rules(db: Session):
    return db.query(Rule).all()


def delete_rule(db: Session, rule_id: int):
    rule = db.query(Rule).filter(Rule.id == rule_id).first()
    if rule:
        db.delete(rule)
        db.commit()
        return True
    return False


def move_file(src: str, dest: str):
    if not os.path.exists(dest):
        os.makedirs(dest)
    destination_path = os.path.join(dest, os.path.basename(src))
    if os.path.exists(destination_path):
        base, ext = os.path.splitext(destination_path)
        counter = 1
        while os.path.exists(destination_path):
            destination_path = f"{base}({counter}){ext}"
            counter += 1
    shutil.move(src, destination_path)
    return destination_path
