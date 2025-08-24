from typing import Any
from sqlalchemy import JSON, String, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.core.db import Base

class Rule(Base):
    __tablename__ = "rules"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[int] = mapped_column(Integer, default=100)
    enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    stop_on_match: Mapped[bool] = mapped_column(Boolean, default=True)
    conditions: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    actions: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)