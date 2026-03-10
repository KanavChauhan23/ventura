from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    ENV: str = "development"
    SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./ventura.db"

    # Redis (for Celery task queue)
    REDIS_URL: str = "redis://localhost:6379/0"

    # ── FREE AI Keys ─────────────────────────────────────────────────────────
    # PRIMARY  : Groq  — 100% free, very fast, no credit card needed
    #            Sign up at https://console.groq.com
    GROQ_API_KEY: str = ""

    # FALLBACK : Google Gemini — free tier (60 req/min on Flash)
    #            Sign up at https://aistudio.google.com
    GOOGLE_API_KEY: str = ""

    # Provider selection: "groq" | "gemini"
    # Default is groq — change to "gemini" if you prefer Google
    LLM_PROVIDER: str = "groq"

    # Groq models (all free):
    #   llama3-70b-8192        ← best quality, recommended
    #   llama3-8b-8192         ← fastest
    #   mixtral-8x7b-32768     ← great for structured output
    #   gemma2-9b-it           ← good alternative
    LLM_MODEL: str = "llama3-70b-8192"

    # Gemini models (free tier):
    #   gemini-1.5-flash       ← fastest, 60 req/min free
    #   gemini-1.5-pro         ← more capable, 2 req/min free
    GEMINI_MODEL: str = "gemini-1.5-flash"

    # ── LangSmith tracing (optional, free tier available) ─────────────────
    # Sign up at https://smith.langchain.com
    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""

    # ── CORS ─────────────────────────────────────────────────────────────────
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # ── Tavily web search (free — 1000 searches/month) ────────────────────
    # Sign up at https://tavily.com — enhances market research agent
    TAVILY_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
