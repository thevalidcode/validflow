from pydantic import BaseModel
from typing import Optional, Literal


class Operation(BaseModel):
    src: str
    dest: str
    action: Literal["move", "rename"]


class RuleCondition(BaseModel):
    extensions: list[str]
    name_regex: Optional[str] = None
    contains_text: Optional[str] = None
    size_min_kb: Optional[int] = None
    size_max_kb: Optional[int] = None
    source_contains: Optional[str] = None


class RuleAction(BaseModel):
    move_to: Optional[str] = None
    rename_template: Optional[str] = None
    delete: Optional[bool] = None


class RuleBase(BaseModel):
    name: str
    priority: int = 100
    enabled: bool = True
    stop_on_match: bool = True
    conditions: RuleCondition
    actions: RuleAction


class RuleCreate(RuleBase):
    pass


class RuleUpdate(RuleBase):
    pass


class RuleOut(RuleBase):
    id: int

    model_config = {
        "from_attributes": True
    }
