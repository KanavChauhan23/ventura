from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import List

from core.database import get_db
from models.schemas import Startup, AgentResult

router = APIRouter()


class StartupOut(BaseModel):
    id: str
    idea: str
    name: str
    status: str
    agents_completed: list
    created_at: str

    class Config:
        from_attributes = True


@router.get("/", response_model=List[StartupOut])
async def list_startups(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Startup).order_by(Startup.created_at.desc()))
    rows = result.scalars().all()
    return [
        StartupOut(
            id=r.id, idea=r.idea, name=r.name, status=r.status,
            agents_completed=r.agents_completed,
            created_at=r.created_at.isoformat(),
        )
        for r in rows
    ]


@router.get("/{startup_id}")
async def get_startup(startup_id: str, db: AsyncSession = Depends(get_db)):
    startup = await db.get(Startup, startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")

    results_q = await db.execute(
        select(AgentResult).where(AgentResult.startup_id == startup_id)
    )
    agent_results = results_q.scalars().all()

    return {
        "id": startup.id,
        "idea": startup.idea,
        "name": startup.name,
        "status": startup.status,
        "agents_completed": startup.agents_completed,
        "created_at": startup.created_at.isoformat(),
        "agent_results": [
            {"agent_type": r.agent_type, "output": r.output, "duration": r.duration_seconds}
            for r in agent_results
        ],
    }


@router.delete("/{startup_id}")
async def delete_startup(startup_id: str, db: AsyncSession = Depends(get_db)):
    startup = await db.get(Startup, startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    await db.delete(startup)
    return {"deleted": True}
