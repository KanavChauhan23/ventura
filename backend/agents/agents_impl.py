from agents.base import BaseAgent


class ProductBuilderAgent(BaseAgent):
    name = "product_builder"
    description = "Designs and plans the full-stack product architecture."

    def _build_prompt(self) -> str:
        return """You are a senior full-stack architect and product designer.
Given a startup idea, design the complete product and return a JSON object with EXACTLY these keys:

{{
  "product_name": "Product name",
  "tagline": "One-line product tagline",
  "core_features": "5 core features comma-separated",
  "tech_stack_frontend": "Frontend stack recommendation",
  "tech_stack_backend": "Backend stack recommendation",
  "tech_stack_database": "Database recommendation",
  "tech_stack_ai": "AI/ML stack",
  "tech_stack_infra": "Infrastructure recommendation",
  "mvp_timeline_weeks": "Estimated weeks to build MVP",
  "mvp_features": "3 MVP features comma-separated",
  "api_endpoints": "5 key REST API endpoints comma-separated",
  "revenue_model": "Subscription | One-time | Freemium | Usage-based",
  "pricing_tiers": "3 pricing tiers with prices",
  "design_system": "Color palette and design approach",
  "deployment_strategy": "How to deploy and scale",
  "integrations": "Key third-party integrations needed"
}}

Return ONLY valid JSON."""

    def _parse_output(self, raw: str) -> dict:
        return {
            "product_name": "AI Product",
            "tagline": "Powered by AI",
            "core_features": "Authentication, Dashboard, AI Engine, Analytics, API",
            "tech_stack_frontend": "Next.js 14 + Tailwind",
            "tech_stack_backend": "Python + FastAPI",
            "tech_stack_database": "PostgreSQL + Redis",
            "tech_stack_ai": "LangChain + Groq",
            "tech_stack_infra": "Docker + AWS",
            "mvp_timeline_weeks": "6",
            "mvp_features": "Auth, Core AI feature, Basic dashboard",
            "api_endpoints": "/api/auth, /api/users, /api/ai/generate, /api/dashboard, /api/billing",
            "revenue_model": "Subscription",
            "pricing_tiers": "$29/mo Starter, $99/mo Pro, $499/mo Enterprise",
            "design_system": "Orange primary, dark background, clean minimal UI",
            "deployment_strategy": "Docker + AWS ECS + CloudFront CDN",
            "integrations": "Stripe, Groq AI, SendGrid, Slack",
        }


class MarketingAgent(BaseAgent):
    name = "marketing"
    description = "Creates complete marketing strategy, content calendar, and campaigns."

    def _build_prompt(self) -> str:
        return """You are a world-class growth marketer and content strategist.
Given a startup idea, create a full marketing plan and return a JSON object with EXACTLY these keys:

{{
  "brand_voice": "Brand personality and tone description",
  "unique_value_proposition": "One clear UVP statement",
  "primary_channels": "Top 3 marketing channels",
  "content_pillars": "4 content pillars comma-separated",
  "instagram_post_ideas": "5 Instagram post ideas comma-separated",
  "twitter_strategy": "Twitter/X engagement strategy",
  "seo_keywords": "10 target keywords comma-separated",
  "blog_topics": "5 SEO blog post titles comma-separated",
  "email_subject_lines": "5 email subject lines comma-separated",
  "ad_headline_1": "Google/Meta ad headline 1",
  "ad_headline_2": "Google/Meta ad headline 2",
  "ad_headline_3": "Google/Meta ad headline 3",
  "launch_strategy": "Product launch strategy in 100 words max",
  "growth_hacks": "3 growth hacks comma-separated",
  "influencer_strategy": "Influencer marketing approach",
  "monthly_content_pieces": "Estimated content pieces per month"
}}

Return ONLY valid JSON."""

    def _parse_output(self, raw: str) -> dict:
        return {
            "brand_voice": "Bold, innovative, results-driven",
            "unique_value_proposition": "AI-powered company building in minutes",
            "primary_channels": "Instagram, LinkedIn, Google Ads",
            "content_pillars": "Education, Success stories, Behind-scenes, Product demos",
            "instagram_post_ideas": "Before/after, Tutorial, Testimonial, Feature spotlight, Meme",
            "twitter_strategy": "Daily tips, Thread breakdowns, Founder journey",
            "seo_keywords": "AI startup builder, autonomous agents, launch startup fast",
            "blog_topics": "How to launch a startup with AI, Top 10 AI tools for founders",
            "email_subject_lines": "Your startup idea is live in 24 hours",
            "ad_headline_1": "Build Your Startup with AI",
            "ad_headline_2": "From Idea to Launch in Minutes",
            "ad_headline_3": "AI Agents Build Your Company",
            "launch_strategy": "ProductHunt launch + 30-day content sprint + influencer seeding",
            "growth_hacks": "Viral referral loop, Free tier with watermark, Founder Twitter threads",
            "influencer_strategy": "Partner with startup YouTubers and indie hacker community",
            "monthly_content_pieces": "45",
        }


class SalesAgent(BaseAgent):
    name = "sales"
    description = "Builds complete sales pipeline, outreach sequences, and lead gen strategy."

    def _build_prompt(self) -> str:
        return """You are an elite B2B sales strategist and revenue operations expert.
Given a startup idea, build the complete sales playbook and return a JSON object with EXACTLY these keys:

{{
  "ideal_customer_profile": "Detailed ICP description",
  "lead_sources": "Top 5 lead sources comma-separated",
  "outreach_channel_1": "Primary outreach channel",
  "outreach_channel_2": "Secondary outreach channel",
  "email_sequence_subject_1": "Cold email subject line day 1",
  "email_sequence_body_1": "Cold email body day 1 in 50 words",
  "email_sequence_subject_2": "Follow-up subject line day 3",
  "email_sequence_body_2": "Follow-up body day 3 in 30 words",
  "linkedin_message": "LinkedIn connection message in 50 words",
  "sales_pitch": "60-second elevator pitch",
  "objection_handling": "Top 3 objections and responses comma-separated",
  "deal_closing_tactics": "3 closing tactics comma-separated",
  "crm_pipeline_stages": "CRM stages comma-separated",
  "monthly_outreach_target": "Target outreach contacts per month",
  "expected_conversion_rate": "Expected lead-to-customer conversion percent",
  "average_deal_size": "Expected average deal value",
  "sales_tools": "Recommended sales tools stack"
}}

Return ONLY valid JSON."""

    def _parse_output(self, raw: str) -> dict:
        return {
            "ideal_customer_profile": "Founders, solopreneurs, indie hackers aged 25-40",
            "lead_sources": "LinkedIn, Twitter, ProductHunt, Indie Hackers, cold email",
            "outreach_channel_1": "Email",
            "outreach_channel_2": "LinkedIn DM",
            "email_sequence_subject_1": "Quick question about your startup",
            "email_sequence_body_1": "Hey, I saw you are building in this space. We help founders launch their entire company with AI in minutes. Worth a 15-min call?",
            "email_sequence_subject_2": "Following up on Ventura AI",
            "email_sequence_body_2": "Just bumping this up. Founders using us are launching 10x faster. Happy to show you a demo.",
            "linkedin_message": "Hey! Love what you are building. We help founders automate the whole company-building process with AI. Happy to share how!",
            "sales_pitch": "Ventura AI builds your entire company using autonomous AI agents. You describe the idea, we handle market research, product, marketing and sales.",
            "objection_handling": "Too expensive - ROI calculator, Not ready - free trial, Already have tools - integration demo",
            "deal_closing_tactics": "Limited-time offer, Case study proof, Money-back guarantee",
            "crm_pipeline_stages": "Lead, Contacted, Demo Booked, Proposal Sent, Negotiation, Closed Won, Closed Lost",
            "monthly_outreach_target": "500",
            "expected_conversion_rate": "8%",
            "average_deal_size": "$99/mo",
            "sales_tools": "HubSpot CRM, Apollo.io, Lemlist, Loom",
        }
