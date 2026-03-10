import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base


def gen_uuid() -> str:
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    startups: Mapped[list["Startup"]] = relationship("Startup", back_populates="user")


class Startup(Base):
    __tablename__ = "startups"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False)
    idea: Mapped[str] = mapped_column(Text, nullable=False)
    name: Mapped[str] = mapped_column(String(255), default="")
    status: Mapped[str] = mapped_column(String(50), default="building")
    agents_completed: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user: Mapped["User"] = relationship("User", back_populates="startups")
    agent_results: Mapped[list["AgentResult"]] = relationship("AgentResult", back_populates="startup")


class AgentResult(Base):
    __tablename__ = "agent_results"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=gen_uuid)
    startup_id: Mapped[str] = mapped_column(String(36), ForeignKey("startups.id"), nullable=False)
    agent_type: Mapped[str] = mapped_column(String(50), nullable=False)
    output: Mapped[dict] = mapped_column(JSON, default=dict)
    tokens_used: Mapped[int] = mapped_column(default=0)
    duration_seconds: Mapped[float] = mapped_column(default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    startup: Mapped["Startup"] = relationship("Startup", back_populates="agent_results")
