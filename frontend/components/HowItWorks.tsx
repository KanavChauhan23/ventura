const AGENTS = [
  {
    num: '01', icon: '🔍', title: 'Market Research Agent',
    desc: 'Autonomously scans the competitive landscape, validates demand, identifies pricing strategies, and maps your path to revenue.',
    tags: ['Competitor Analysis', 'Demand Score', 'Revenue Forecast', 'Pricing Strategy'],
    code: [
      { k: 'Market demand', v: 'HIGH ●' },
      { k: 'Competitors', v: '7 identified' },
      { k: 'Revenue potential', v: '$5M / year' },
      { k: 'Best pricing', v: '$29–$99/mo SaaS' },
    ],
  },
  {
    num: '02', icon: '⚙️', title: 'Product Builder Agent',
    desc: 'Generates complete, production-ready products — UI/UX design, full-stack code, API integrations, and cloud deployment automatically.',
    tags: ['React Frontend', 'Node.js Backend', 'Stripe Payments', 'Cloud Deploy'],
    code: [
      { k: 'Generated', v: '• React website (deployed)' },
      { k: '', v: '• Node.js + FastAPI backend' },
      { k: '', v: '• Stripe payment integration' },
      { k: '', v: '• Docker + AWS deployment' },
    ],
  },
  {
    num: '03', icon: '📣', title: 'Marketing Agent',
    desc: 'Creates and executes complete marketing campaigns — Instagram posts, ad creatives, landing pages, SEO articles, and email sequences.',
    tags: ['Social Posts', 'Ad Creatives', 'SEO Blogs', 'Email Flows'],
    code: [
      { k: 'Campaigns launched', v: '3 active' },
      { k: 'Posts scheduled', v: '30 days' },
      { k: 'Blogs published', v: '8 articles' },
      { k: 'Email sequences', v: '5 flows' },
    ],
  },
  {
    num: '04', icon: '💼', title: 'Sales Agent',
    desc: 'Handles the entire sales pipeline — automated outreach, lead qualification, personalized follow-ups, and customer onboarding sequences.',
    tags: ['Lead Gen', 'Email Outreach', 'CRM Pipeline', 'Onboarding'],
    code: [
      { k: 'Leads generated', v: '247 this week' },
      { k: 'Emails sent', v: '1,200 automated' },
      { k: 'Conversion rate', v: '8.4% ↑' },
      { k: 'Revenue closed', v: '$12,400 MRR' },
    ],
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="py-24 px-12 relative overflow-hidden" style={{ background: '#0B0501' }}>
      {/* BG watermark */}
      <div
        className="absolute top-[-20px] right-[-20px] font-syne font-black pointer-events-none select-none leading-none"
        style={{ fontSize: 'clamp(80px,12vw,180px)', color: 'rgba(255,255,255,0.03)', letterSpacing: '-4px' }}
      >
        AGENTS
      </div>

      <div className="text-xs font-semibold tracking-[2px] uppercase text-orange flex items-center gap-2 mb-5 reveal">
        <span className="w-5 h-0.5 bg-orange inline-block" />The System
      </div>
      <h2
        className="reveal reveal-delay-1 font-syne font-black text-white leading-tight mb-14"
        style={{ fontSize: 'clamp(32px,4.5vw,62px)', letterSpacing: '-2px' }}
      >
        Four AI Agents.<br />One Complete Company.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AGENTS.map((a, i) => (
          <div
            key={a.num}
            className={`agent-card relative bg-white/4 border border-white/8 rounded-2xl p-9 overflow-hidden reveal reveal-delay-${i + 1}`}
          >
            <div
              className="absolute top-4 right-6 font-syne font-black text-[64px] leading-none pointer-events-none select-none"
              style={{ color: 'rgba(255,255,255,0.04)' }}
            >
              {a.num}
            </div>

            <div
              className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl mb-5"
              style={{ background: 'linear-gradient(135deg,#FF6803,#AE3A02)', boxShadow: '0 8px 24px rgba(255,104,3,0.3)' }}
            >
              {a.icon}
            </div>

            <div className="font-syne font-bold text-xl text-white mb-2.5 tracking-[-0.5px]">{a.title}</div>
            <div className="text-sm text-white/45 leading-[1.75] mb-5">{a.desc}</div>

            <div className="flex flex-wrap gap-2 mb-5">
              {a.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-[11.5px] font-medium text-orange border border-orange/20 bg-orange/10">
                  {t}
                </span>
              ))}
            </div>

            <div className="bg-black/40 rounded-xl p-4 border border-white/5 agent-code text-[12px] text-white/60 leading-[1.8]">
              {a.code.map((line, j) => (
                <div key={j}>
                  {line.k && <span className="text-orange">{line.k}:</span>}
                  {line.k && ' '}
                  <span style={{ color: '#7DFFB3' }}>{line.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
