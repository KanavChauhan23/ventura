"""
Base AI Agent — wraps LangChain LLM with a structured output contract.
All four domain agents inherit from this class.

FREE API providers used:
  • Groq  (primary)  — https://console.groq.com    — 100% free, no card
  • Gemini (fallback) — https://aistudio.google.com — free tier 60 req/min
  • Tavily (search)   — https://tavily.com          — free 1000 searches/mo
"""

import json
import time
from abc import ABC, abstractmethod
from typing import Any

from langchain.prompts import ChatPromptTemplate
from langchain_community.tools.tavily_search import TavilySearchResults

from core.config import settings


def get_llm():
    """
    Factory: return the configured FREE LLM.

    Priority:
      1. groq   → ChatGroq   (llama3-70b — recommended, totally free)
      2. gemini → ChatGoogleGenerativeAI (gemini-1.5-flash — free tier)

    Both require NO credit card.
    """
    if settings.LLM_PROVIDER == "gemini":
        # ── Google Gemini (free tier) ──────────────────────────────────────
        # Free: gemini-1.5-flash = 60 req/min | gemini-1.5-pro = 2 req/min
        # Get key: https://aistudio.google.com/app/apikey
        from langchain_google_genai import ChatGoogleGenerativeAI

        if not settings.GOOGLE_API_KEY:
            raise ValueError(
                "GOOGLE_API_KEY is not set.\n"
                "Get your FREE key at: https://aistudio.google.com/app/apikey\n"
                "Then add it to your .env file."
            )
        return ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0.7,
            convert_system_message_to_human=True,  # Gemini requirement
        )

    # ── Groq (default, 100% free) ──────────────────────────────────────────
    # Free models: llama3-70b-8192, llama3-8b-8192, mixtral-8x7b-32768
    # Get key: https://console.groq.com  (no credit card needed)
    from langchain_groq import ChatGroq

    if not settings.GROQ_API_KEY:
        raise ValueError(
            "GROQ_API_KEY is not set.\n"
            "Get your FREE key at: https://console.groq.com\n"
            "Then add it to your .env file:\n"
            "  GROQ_API_KEY=gsk_..."
        )
    return ChatGroq(
        model=settings.LLM_MODEL,
        groq_api_key=settings.GROQ_API_KEY,
        temperature=0.7,
        # Groq is extremely fast — typical response in < 1 second
    )


def _clean_json(raw: str) -> str:
    """Strip markdown code fences and whitespace from LLM output."""
    clean = raw.strip()

    # Remove ```json ... ``` or ``` ... ```
    if clean.startswith("```"):
        lines = clean.split("\n")
        # Remove first line (```json or ```) and last line (```)
        lines = lines[1:] if lines[0].startswith("```") else lines
        lines = lines[:-1] if lines and lines[-1].strip() == "```" else lines
        clean = "\n".join(lines).strip()

    # Sometimes model wraps in single backticks
    if clean.startswith("`") and clean.endswith("`"):
        clean = clean[1:-1].strip()

    return clean


class BaseAgent(ABC):
    """Abstract base for all Ventura AI agents."""

    name: str = "base"
    description: str = ""

    def __init__(self):
        self.llm = get_llm()

        # Tavily web search — free tier (1000 searches/month)
        # Get key: https://tavily.com
        # Optional — if not set, agents skip live web search
        self.search_tool = (
            TavilySearchResults(
                max_results=5,
                tavily_api_key=settings.TAVILY_API_KEY,
            )
            if settings.TAVILY_API_KEY
            else None
        )

    @abstractmethod
    def _build_prompt(self) -> str:
        """Return the system prompt for this agent."""

    @abstractmethod
    def _parse_output(self, raw: str) -> dict[str, Any]:
        """Fallback parser if JSON parsing fails."""

    async def run(self, startup_idea: str) -> dict[str, Any]:
        """
        Execute the agent for the given startup idea.
        Returns structured output + metadata.
        """
        start = time.time()

        system_prompt = self._build_prompt()

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            (
                "human",
                "Startup idea: {input}\n\n"
                "IMPORTANT: Respond ONLY with a valid JSON object.\n"
                "No markdown, no code fences, no explanation — pure JSON only.",
            ),
        ])

        chain = prompt | self.llm
        response = await chain.ainvoke({"input": startup_idea})
        raw_text: str = response.content

        # Parse JSON output
        try:
            output = json.loads(_clean_json(raw_text))
        except json.JSONDecodeError:
            # Second attempt: find JSON object inside the text
            try:
                start_idx = raw_text.index("{")
                end_idx = raw_text.rindex("}") + 1
                output = json.loads(raw_text[start_idx:end_idx])
            except (ValueError, json.JSONDecodeError):
                # Final fallback — use hardcoded defaults from subclass
                output = self._parse_output(raw_text)

        # Token counting (Groq returns usage in response_metadata)
        meta = getattr(response, "response_metadata", {})
        usage = meta.get("token_usage") or meta.get("usage", {})
        total_tokens = usage.get("total_tokens", 0) if isinstance(usage, dict) else 0

        duration = round(time.time() - start, 2)

        return {
            "agent_type": self.name,
            "output": output,
            "tokens_used": total_tokens,
            "duration_seconds": duration,
        }
