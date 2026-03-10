const CARDS = [
  { icon: '🚀', title: 'Entrepreneurs',           desc: 'Launch startups 10x faster — from idea to market in days, not months.', val: '~50M',  unit: 'potential users worldwide' },
  { icon: '🏪', title: 'Small Businesses',         desc: 'Automate marketing, product and sales without a full team.', val: '$28B',  unit: 'SMB software market' },
  { icon: '🎨', title: 'Creators & Solopreneurs', desc: 'Build online businesses and SaaS tools with zero coding needed.', val: '200M+', unit: 'content creators globally' },
  { icon: '💡', title: 'Investors & VCs',          desc: 'Validate startup ideas before committing capital — test 10 in the time of one.', val: '$15B',  unit: 'early-stage VC deployed annually' },
]

export default function Market() {
  return (
    <section id="market" className="py-24 px-12" style={{ background: '#E2E2E0' }}>
      <div className="text-xs font-semibold tracking-[2px] uppercase text-orange flex items-center gap-2 mb-5 reveal">
        <span className="w-5 h-0.5 bg-orange inline-block" />Why Now
      </div>
      <h2 className="reveal reveal-delay-1 font-syne font-black leading-tight mb-14" style={{ fontSize: 'clamp(32px,4.5vw,62px)', letterSpacing: '-2px' }}>
        A Billion-Dollar<br />Opportunity.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Big TAM card */}
        <div
          className="col-span-full reveal reveal-delay-2 rounded-2xl p-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
          style={{ background: '#FF6803' }}
        >
          <div
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-syne font-black pointer-events-none select-none"
            style={{ fontSize: '120px', color: 'rgba(255,255,255,0.1)', letterSpacing: '-4px' }}
          >
            $100B+
          </div>
          <div className="z-10">
            <div className="font-syne font-black text-white leading-tight mb-3" style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-2px' }}>
              Total Addressable<br />Market
            </div>
            <div className="text-white/75 text-[15px] max-w-md leading-relaxed">
              Combining AI tools, startup platforms, SaaS automation, and business infrastructure — largely untapped.
            </div>
          </div>
          <div className="text-right flex-shrink-0 z-10">
            <div className="font-syne font-black text-white leading-none" style={{ fontSize: 'clamp(48px,7vw,100px)', letterSpacing: '-4px' }}>$100B+</div>
            <div className="text-white/60 text-base mt-1">Total Market Size</div>
          </div>
        </div>

        {/* Audience cards */}
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            className={`reveal reveal-delay-${i + 1} rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-1`}
            style={{ background: '#0B0501' }}
          >
            <div className="text-3xl mb-4">{c.icon}</div>
            <div className="font-syne font-bold text-lg text-white mb-2">{c.title}</div>
            <div className="text-[13.5px] text-white/40 leading-[1.75] mb-5">{c.desc}</div>
            <div className="font-syne font-black text-[32px] text-orange leading-none">{c.val}</div>
            <div className="text-[12px] text-white/30 mt-1">{c.unit}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
