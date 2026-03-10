from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Literal
import asyncio

from agents import AGENT_MAP

router = APIRouter()


class RunAgentRequest(BaseModel):
    agent_type: Literal["market_research", "product_builder", "marketing", "sales"]
    startup_idea: str


class RunAllRequest(BaseModel):
    startup_idea: str


@router.post("/run")
async def run_agent(req: RunAgentRequest):
    """Run a single AI agent for the given startup idea."""
    AgentClass = AGENT_MAP.get(req.agent_type)
    if not AgentClass:
        raise HTTPException(status_code=400, detail=f"Unknown agent type: {req.agent_type}")

    agent = AgentClass()
    try:
        result = await agent.run(req.startup_idea)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/run-all")
async def run_all_agents(req: RunAllRequest):
    """Run all 4 agents concurrently and return combined output."""
    results = {}
    errors = {}

    async def run_one(key: str):
        AgentClass = AGENT_MAP[key]
        agent = AgentClass()
        try:
            res = await agent.run(req.startup_idea)
            results[key] = res
        except Exception as e:
            errors[key] = str(e)

    await asyncio.gather(*[run_one(k) for k in AGENT_MAP])

    startup_name = results.get("market_research", {}).get("output", {}).get("startup_name", "Your Startup")

    return {
        "startup_idea": req.startup_idea,
        "startup_name": startup_name,
        "agents": results,
        "errors": errors,
    }


@router.get("/list")
async def list_agents():
    """List available agent types."""
    return {
        "agents": [
            {"type": k, "name": cls.name, "description": cls.description}
            for k, cls in AGENT_MAP.items()
        ]
    }
