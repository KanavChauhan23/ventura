const STEPS = [
  { icon: '🔍', label: 'Research', sub: 'Market scan, competitor analysis, demand validation' },
  { icon: '🏗️', label: 'Build',    sub: 'Full-stack product design, code, and deployment' },
  { icon: '📣', label: 'Market',   sub: 'Content, ads, SEO, and social campaigns go live' },
  { icon: '💰', label: 'Scale',    sub: 'Sales automation, leads, MRR tracking' },
]

const OUTPUTS = [
  { label: 'Startup Name',   val: 'FitMind AI',         status: 'Deployed Live' },
  { label: 'Website',        val: 'Generated & Live',    status: 'fitmindai.com' },
  { label: 'Business Plan',  val: '42-Page Document',    status: 'Ready to Download' },
  { label: 'Revenue Model',  val: 'Subscription SaaS',   status: '$29 / $79 / $199' },
  { label: 'Marketing Plan', val: 'Full Campaigns',      status: '30-day calendar' },
  { label: 'App Prototype',  val: 'Interactive Figma',   status: '+ React codebase' },
]

export default function Workflow() {
  return (
    <section id="workflow" className="py-24 px-12" style={{ background: '#E2E2E0' }}>
      {/* Header */}
      <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
        <div>
          <div className="text-xs font-semibold tracking-[2px] uppercase text-orange flex items-center gap-2 mb-5 reveal">
            <span className="w-5 h-0.5 bg-orange inline-block" />Example Workflow
          </div>
          <h2
            className="reveal reveal-delay-1 font-syne font-black leading-tight"
            style={{ fontSize: 'clamp(32px,4.5vw,62px)', letterSpacing: '-2px' }}
          >
            One Input.<br />Full Company Output.
          </h2>
        </div>
        <div className="reveal reveal-delay-2 rounded-2xl p-5 font-mono text-sm" style={{ background: '#0B0501', color: 'rgba(255,255,255,0.8)' }}>
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">User Input</div>
          <div style={{ color: '#FF6803' }}>"Create a startup for AI fitness coaching"</div>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative mb-16">
        <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5" style={{ background: 'linear-gradient(90deg,#FF6803,#AE3A02,#FF6803)' }} />
        {STEPS.map((s, i) => (
          <div key={s.label} className={`flex flex-col items-center text-center z-10 reveal reveal-delay-${i + 1}`}>
            <div
              className="w-20 h-20 rounded-full bg-white border-[3px] flex items-center justify-center text-3xl mb-5 transition-all hover:scale-110"
              style={{ borderColor: '#D8D8D5', boxShadow: '0 8px 28px rgba(0,0,0,0.1)' }}
            >
              {s.icon}
            </div>
            <div className="font-syne font-bold text-sm mb-2">{s.label}</div>
            <div className="text-xs text-black/45 leading-relaxed">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Output grid */}
      <div className="reveal rounded-2xl p-9 grid grid-cols-1 md:grid-cols-3 gap-5" style={{ background: '#0B0501' }}>
        {OUTPUTS.map((o) => (
          <div key={o.label} className="rounded-xl p-5 bg-white/4 border border-white/6">
            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{o.label}</div>
            <div className="font-syne font-bold text-base text-white">{o.val}</div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11.5px]" style={{ color: '#7DFFB3' }}>
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#7DFFB3' }} />
              {o.status}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
