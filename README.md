# 🚀 Ventura AI — Autonomous Company Builder

> **AI agents that automatically build and launch your entire startup from a single idea.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![LangChain](https://img.shields.io/badge/LangChain-0.2-1C3C3C?logo=langchain)](https://langchain.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docker.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)

---

## 🧠 What Is This?

Ventura AI lets users type a single startup idea and receive:

| Output | Details |
|--------|---------|
| 📊 **Market Research** | Competitors, demand score, revenue potential |
| ⚙️ **Product Blueprint** | Tech stack, features, API design, MVP plan |
| 📣 **Marketing Plan** | Content calendar, SEO, ads, email sequences |
| 💼 **Sales Playbook** | ICP, outreach templates, CRM pipeline |

---

## 🗂 Project Structure

```
ventura-ai/
├── frontend/                  ← Next.js 14 + Tailwind CSS
│   ├── app/
│   │   ├── page.tsx           ← Landing page
│   │   └── dashboard/         ← Agent runner dashboard
│   ├── components/            ← All UI components
│   └── lib/api.ts             ← Axios API client
│
├── backend/                   ← Python + FastAPI
│   ├── main.py                ← App entry point
│   ├── agents/                ← LangChain AI agents
│   │   ├── base.py            ← Abstract agent base
│   │   ├── market_research.py ← Market Research Agent
│   │   └── agents_impl.py     ← Product, Marketing, Sales agents
│   ├── routers/               ← API route handlers
│   ├── models/                ← SQLAlchemy ORM models
│   └── core/                  ← Config, database
│
├── nginx/                     ← Reverse proxy config
├── docker-compose.yml         ← Full stack orchestration
└── .env.example               ← Environment template
```

---

## ⚡ Quick Start

### 1. Clone & Configure

```bash
git clone https://github.com/yourusername/ventura-ai
cd ventura-ai
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
# PRIMARY — 100% free, no credit card needed
# Get at: https://console.groq.com
GROQ_API_KEY=gsk_...

# OPTIONAL fallback — also free (60 req/min)
# Get at: https://aistudio.google.com
GOOGLE_API_KEY=AIza_...

# OPTIONAL — enhances market research with live web search
# Get at: https://tavily.com (1000 free searches/month)
TAVILY_API_KEY=tvly_...
```

### 2. Run with Docker (Recommended)

```bash
docker-compose up --build
```

Visit:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **API Health**: http://localhost:8000/health

### 3. Run Locally (Development)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🤖 AI Agents

All agents are in `backend/agents/` and inherit from `BaseAgent`.

### Creating a Custom Agent

```python
from agents.base import BaseAgent

class MyCustomAgent(BaseAgent):
    name = "my_agent"
    description = "Does something awesome"

    def _build_prompt(self) -> str:
        return """You are an expert in X.
Given a startup idea, return JSON with these keys:
{ "key1": "...", "key2": "..." }"""

    def _parse_output(self, raw: str) -> dict:
        return {"key1": "fallback", "key2": "fallback"}
```

Register it in `agents/__init__.py`:
```python
AGENT_MAP["my_agent"] = MyCustomAgent
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Python 3.12, FastAPI, Uvicorn |
| AI | LangChain 0.2, Groq (Llama 3 — free) / Gemini 1.5 Flash (free), LangSmith |
| Database | PostgreSQL (prod) / SQLite (dev), SQLAlchemy async |
| Cache/Queue | Redis, Celery |
| Infrastructure | Docker, Docker Compose, Nginx |
| Auth | JWT (python-jose), bcrypt |

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/agents/run` | Run a single AI agent |
| `POST` | `/agents/run-all` | Run all 4 agents concurrently |
| `GET` | `/agents/list` | List available agents |
| `GET` | `/startups` | List all startup builds |
| `GET` | `/startups/{id}` | Get startup with all agent results |
| `DELETE` | `/startups/{id}` | Delete a startup |
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Get JWT token |
| `GET` | `/auth/me` | Get current user |

---

## 🚀 Deployment

### Environment Variables for Production

```env
ENV=production
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/dbname
REDIS_URL=redis://your-redis-host:6379/0
SECRET_KEY=<openssl rand -hex 32>
# Free AI keys
GROQ_API_KEY=gsk_...
GOOGLE_API_KEY=AIza_...          # optional fallback
TAVILY_API_KEY=tvly_...          # optional web search
LLM_PROVIDER=groq
LLM_MODEL=llama3-70b-8192
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Deploy to AWS / GCP / DigitalOcean

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Push to registry
docker push yourregistry/ventura-backend:latest
docker push yourregistry/ventura-frontend:latest
```

---

## 🏗 Roadmap

- [x] 4 core AI agents
- [x] FastAPI backend with JWT auth
- [x] Next.js 14 frontend with Tailwind
- [x] Docker Compose full stack
- [ ] WebSocket real-time agent streaming
- [ ] Stripe billing integration
- [ ] Export to Notion / PDF
- [ ] Multi-tenant support
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-agent`
3. Commit: `git commit -m 'Add amazing agent'`
4. Push: `git push origin feature/amazing-agent`
5. Open a Pull Request

---

## 📄 License

MIT License — build freely, ship boldly.

---

**Built with ❤️ for ambitious founders.**
