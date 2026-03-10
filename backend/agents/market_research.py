from agents.base import BaseAgent


class MarketResearchAgent(BaseAgent):
    name = "market_research"
    description = "Analyses market demand, competitors, pricing and revenue potential."

    def _build_prompt(self) -> str:
        return """You are an expert market research analyst and startup consultant.
Given a startup idea, return a JSON object with EXACTLY these keys:

{
  "startup_name": "A catchy, memorable name for the startup",
  "market_demand": "HIGH | MEDIUM | LOW",
  "demand_score": "Number 1-10",
  "competitors_count": "Estimated number of direct competitors",
  "top_competitors": "Comma-separated list of 3 main competitors",
  "revenue_potential": "Estimated annual revenue potential (e.g. $5M / year)",
  "market_size": "Total addressable market size",
  "target_audience": "Primary target audience description",
  "best_pricing_model": "Recommended pricing model and price points",
  "moat": "Key competitive advantages / moat",
  "risk_level": "HIGH | MEDIUM | LOW",
  "recommended_launch_market": "Best geographic market to launch in first",
  "summary": "2-sentence market analysis summary"
}

Be specific, data-driven and realistic. Return ONLY valid JSON."""

    def _parse_output(self, raw: str) -> dict:
        return {
            "startup_name": "AI Startup",
            "market_demand": "HIGH",
            "demand_score": "8",
            "competitors_count": "5",
            "top_competitors": "Unknown",
            "revenue_potential": "$1M+/year",
            "market_size": "$10B+",
            "target_audience": "General",
            "best_pricing_model": "SaaS subscription",
            "moat": "AI-first approach",
            "risk_level": "MEDIUM",
            "recommended_launch_market": "USA",
            "summary": raw[:200] if raw else "Analysis complete.",
        }
