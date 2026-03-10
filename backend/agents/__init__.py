from agents.market_research import MarketResearchAgent
from agents.agents_impl import ProductBuilderAgent, MarketingAgent, SalesAgent

AGENT_MAP = {
    "market_research": MarketResearchAgent,
    "product_builder": ProductBuilderAgent,
    "marketing": MarketingAgent,
    "sales": SalesAgent,
}

__all__ = ["MarketResearchAgent", "ProductBuilderAgent", "MarketingAgent", "SalesAgent", "AGENT_MAP"]
