import Link from 'next/link'

export function CTA() {
  return (
    <section id="cta" className="py-24 px-12" style={{ background: '#E2E2E0' }}>
      <div
        className="reveal rounded-[28px] p-20 text-center relative overflow-hidden"
        style={{ background: '#FF6803' }}
      >
        <div
          className="absolute bottom-[-30px] right-[-20px] font-syne font-black pointer-events-none select-none"
          style={{ fontSize: '140px', color: 'rgba(255,255,255,0.08)', letterSpacing: '-5px' }}
        >
          START NOW
        </div>
        <h2
          className="font-syne font-black text-white leading-tight mb-4 relative z-10"
          style={{ fontSize: 'clamp(36px,5vw,72px)', letterSpacing: '-3px' }}
        >
          Ready to Build<br />Your Company?
        </h2>
        <p className="text-white/75 text-base mb-9 max-w-lg mx-auto leading-relaxed relative z-10">
          Type your idea. Let AI agents handle the rest. From concept to launch — faster than you ever thought possible.
        </p>
        <div className="flex gap-3 justify-center relative z-10">
          <Link
            href="/dashboard"
            className="bg-white text-orange px-9 py-4 rounded-full text-[14.5px] font-bold no-underline transition-all hover:-translate-y-0.5"
            style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
          >
            Get Started Free →
          </Link>
          <a
            href="#how"
            className="border-2 border-white/50 text-white px-9 py-4 rounded-full text-[14.5px] font-semibold no-underline transition-all hover:border-white hover:bg-white/10"
          >
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="px-12 pt-16 pb-8" style={{ background: '#0B0501', color: 'white' }}>
      <div className="flex flex-wrap justify-between gap-10 pb-12 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2.5 font-syne font-black text-[17px] mb-4">
            <div className="w-8 h-8 bg-orange rounded-lg grid grid-cols-2 gap-0.5 p-1.5">
              <span className="bg-white rounded-sm" /><span className="bg-white rounded-sm" />
              <span className="bg-white rounded-sm" /><span className="bg-white rounded-sm" />
            </div>
            Ventura AI
          </div>
          <p className="text-[13.5px] text-white/35 max-w-[260px] leading-[1.75]">
            Autonomous AI agents that build entire companies from a single idea. The future of entrepreneurship.
          </p>
        </div>
        {[
          { heading: 'Product', links: [['#how','How It Works'],['#market','Market Research'],['#tech','Tech Stack'],['#pricing','Pricing']] },
          { heading: 'Company', links: [['#','About Us'],['#','Blog'],['#','Careers'],['#','Press Kit']] },
          { heading: 'Legal',   links: [['#','Privacy Policy'],['#','Terms of Service'],['#','Cookie Policy']] },
        ].map((col) => (
          <div key={col.heading}>
            <h4 className="text-[13px] uppercase tracking-wide text-white/50 font-semibold mb-4">{col.heading}</h4>
            {col.links.map(([href, label]) => (
              <a key={label} href={href} className="block text-[13.5px] text-white/65 no-underline mb-2.5 transition-colors hover:text-orange">{label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-3 pt-6 text-[12.5px] text-white/25">
        <span>© 2025 Ventura AI. All rights reserved.</span>
        <span>Built with ❤️ for ambitious founders.</span>
      </div>
    </footer>
  )
}

export function SocialBar() {
  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {[
        { title: 'Instagram', svg: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
        { title: 'Twitter',   svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.731-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
        { title: 'GitHub',    svg: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
      ].map((s) => (
        <a
          key={s.title}
          href="#"
          title={s.title}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-brand-dark transition-all hover:bg-orange hover:text-white hover:scale-110"
          style={{ background: 'rgba(11,5,1,0.08)', backdropFilter: 'blur(8px)' }}
        >
          {s.svg}
        </a>
      ))}
    </aside>
  )
}

export default CTA
