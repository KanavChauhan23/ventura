import traceback
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
        # Print full traceback to Render logs so we can see the real error
        print(f"\n❌ AGENT ERROR [{req.agent_type}]:")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Agent '{req.agent_type}' failed: {str(e)}"
        )


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
            print(f"\n❌ AGENT ERROR [{key}]:")
            print(traceback.format_exc())
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


@router.get("/test-groq")
async def test_groq():
    """Test Groq connection directly — visit /agents/test-groq to debug."""
    import os
    from core.config import settings

    groq_key = settings.GROQ_API_KEY
    provider = settings.LLM_PROVIDER
    model = settings.LLM_MODEL

    # Check key exists
    if not groq_key:
        return {
            "status": "error",
            "message": "GROQ_API_KEY is not set in environment variables",
            "provider": provider,
            "model": model,
        }

    # Try importing and calling Groq
    try:
        from langchain_groq import ChatGroq
        llm = ChatGroq(
            model=model,
            groq_api_key=groq_key,
            temperature=0.7,
        )
        response = await llm.ainvoke("Say hello in one word.")
        return {
            "status": "success ✅",
            "provider": provider,
            "model": model,
            "key_prefix": groq_key[:8] + "...",
            "response": response.content,
        }
    except Exception as e:
        return {
            "status": "error ❌",
            "provider": provider,
            "model": model,
            "key_prefix": groq_key[:8] + "..." if groq_key else "MISSING",
            "error": str(e),
            "traceback": traceback.format_exc(),
        }
