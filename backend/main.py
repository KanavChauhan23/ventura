from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager

from core.config import settings
from core.database import init_db
from routers import agents, startups, auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    print(f"🚀 Ventura AI API running — {settings.ENV} mode")
    yield
    # Shutdown
    print("⏹  Shutting down...")


app = FastAPI(
    title="Ventura AI API",
    description="Autonomous AI Company Builder — Backend API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── Middleware ──────────────────────────────────────────────────────────────
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ─────────────────────────────────────────────────────────────────
app.include_router(auth.router,     prefix="/auth",     tags=["Auth"])
app.include_router(agents.router,   prefix="/agents",   tags=["Agents"])
app.include_router(startups.router, prefix="/startups", tags=["Startups"])


# ── Health check ─────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok", "version": "1.0.0", "env": settings.ENV}


@app.get("/", tags=["System"])
async def root():
    return {
        "name": "Ventura AI API",
        "docs": "/docs",
        "health": "/health",
    }
