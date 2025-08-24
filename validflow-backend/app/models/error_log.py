from sqlalchemy import String, Integer, DateTime, Text, Enum, text
from sqlalchemy.orm import Mapped, mapped_column
from app.core.db import Base
import enum


class ErrorCategory(enum.Enum):
    SYSTEM = "system"
    APPLICATION = "application"
    FILE = "file"
    DATABASE = "database"
    OTHER = "other"


class ErrorLog(Base):
    __tablename__ = "error_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    error_name: Mapped[str] = mapped_column(String(255), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=True)
    category: Mapped[ErrorCategory] = mapped_column(
        Enum(ErrorCategory), default=ErrorCategory.OTHER)
    # optional file that caused the error
    file_path: Mapped[str] = mapped_column(String(1024), nullable=True)
    line_number: Mapped[int] = mapped_column(
        Integer, nullable=True)  # optional line number
    stack_trace: Mapped[str] = mapped_column(
        Text, nullable=True)  # full stack trace if available
    timestamp: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), server_default=text("CURRENT_TIMESTAMP")
    )
