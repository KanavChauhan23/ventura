import Link from 'next/link'

const PLANS = [
  {
    tier: 'Starter', price: '$29', period: '/month', featured: false,
    features: ['1 AI Company Build/month', 'Market Research Agent', 'Basic product prototype', 'Marketing calendar (7-day)', 'Email support', 'Export to PDF/Notion'],
    cta: 'Get Started',
  },
  {
    tier: 'Pro Builder', price: '$99', period: '/month', featured: true,
    features: ['5 AI Company Builds/month', 'All 4 AI Agents active', 'Full React + backend codebase', '30-day marketing automation', 'Sales pipeline + CRM', 'Stripe payment integration', 'Priority Slack support'],
    cta: 'Start Building',
  },
  {
    tier: 'Enterprise', price: '$499', period: '/month', featured: false,
    features: ['Unlimited builds', 'Custom AI agent workflows', 'White-label option', 'Dedicated infrastructure', 'Team collaboration (20+)', 'API access + webhooks', '24/7 dedicated support'],
    cta: 'Contact Sales',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-12" style={{ background: '#0B0501' }}>
      <div className="text-xs font-semibold tracking-[2px] uppercase text-orange flex items-center gap-2 mb-5 reveal">
        <span className="w-5 h-0.5 bg-orange inline-block" />Simple Pricing
      </div>
      <h2 className="reveal reveal-delay-1 font-syne font-black text-white leading-tight mb-14" style={{ fontSize: 'clamp(32px,4.5vw,62px)', letterSpacing: '-2px' }}>
        Build at Any Scale.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PLANS.map((p, i) => (
          <div
            key={p.tier}
            className={`reveal reveal-delay-${i + 1} rounded-3xl p-9 flex flex-col relative overflow-hidden transition-all hover:-translate-y-1.5 ${p.featured ? '' : 'border border-white/8 bg-white/4'}`}
            style={p.featured ? { background: '#FF6803' } : {}}
          >
            {p.featured && (
              <div className="absolute top-5 right-[-30px] bg-white text-orange text-[9px] font-bold tracking-[1.5px] px-10 py-1.5 rotate-45">
                MOST POPULAR
              </div>
            )}
            <div className={`text-[11px] uppercase tracking-[1.5px] font-semibold mb-2 ${p.featured ? 'text-white/70' : 'text-white/45'}`}>{p.tier}</div>
            <div className={`font-syne font-black text-[52px] leading-none tracking-[-3px] mb-1 ${p.featured ? 'text-white' : 'text-white'}`}>{p.price}</div>
            <div className={`text-[13px] mb-6 ${p.featured ? 'text-white/70' : 'text-white/40'}`}>{p.period}</div>
            <div className={`h-px mb-6 ${p.featured ? 'bg-white/25' : 'bg-white/8'}`} />
            <ul className="flex flex-col gap-3 flex-1 list-none">
              {p.features.map((f) => (
                <li key={f} className={`flex items-start gap-2.5 text-[13.5px] leading-snug ${p.featured ? 'text-white/90' : 'text-white/65'}`}>
                  <span className={`font-bold flex-shrink-0 mt-0.5 ${p.featured ? 'text-white' : 'text-orange'}`}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className={`mt-7 py-3.5 rounded-full text-sm font-semibold text-center no-underline block transition-all hover:scale-[1.02] ${p.featured ? 'bg-white text-orange hover:bg-white/90' : 'bg-white/10 text-white hover:bg-white/18'}`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
