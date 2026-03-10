'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

const PILLS = [
  { label: 'Market Research Live',     color: '#7DFFB3', pos: 'top-[10%] left-[-8%]',  cls: 'float-pill-1' },
  { label: 'Product Generated ✓',      color: '#FF6803', pos: 'top-[28%] right-[-12%]', cls: 'float-pill-2' },
  { label: 'Ads Running — 3 Campaigns',color: '#60A5FA', pos: 'bottom-[22%] left-[-12%]', cls: 'float-pill-3' },
  { label: '12 Leads Today 🔥',        color: '#F472B6', pos: 'bottom-[8%] right-[-8%]', cls: 'float-pill-4' },
]

export default function Hero() {
  const orbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (orbRef.current) {
        orbRef.current.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.15}px))`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28 pb-16 px-12"
      style={{ background: '#E2E2E0' }}
    >
      {/* BG watermark */}
      <div
        className="absolute bottom-[-20px] left-[-10px] pointer-events-none select-none font-syne font-black leading-none whitespace-nowrap"
        style={{ fontSize: 'clamp(80px,14vw,220px)', color: 'rgba(11,5,1,0.065)', letterSpacing: '-4px' }}
      >
        VENTURA&nbsp;&nbsp;AI
      </div>

      {/* Slide counter */}
      <div className="text-xs font-medium text-black/45 tracking-wide mb-5">[1/5]</div>

      {/* Title */}
      <h1
        className="reveal font-syne font-black leading-none max-w-xl z-10 relative"
        style={{ fontSize: 'clamp(42px,6.5vw,96px)', letterSpacing: '-3px' }}
      >
        BUILD YOUR<br />
        <span className="text-orange">AI-POWERED</span><br />
        COMPANY IN<br />
        MINUTES
      </h1>

      <p className="reveal reveal-delay-1 mt-6 text-[15px] text-black/55 max-w-sm leading-relaxed z-10 relative">
        We craft brand identities, campaigns, and entire companies — powered by autonomous AI agents
        that do the heavy lifting for you.
      </p>

      <div className="reveal reveal-delay-2 flex gap-3 mt-9 z-10 relative">
        <Link
          href="/dashboard"
          className="bg-orange text-white px-7 py-3.5 rounded-full text-sm font-semibold no-underline transition-all hover:bg-orange-dark"
          style={{ boxShadow: '0 8px 28px rgba(255,104,3,0.35)' }}
        >
          Start Building →
        </Link>
        <a
          href="#how"
          className="bg-black/10 text-brand-dark px-7 py-3.5 rounded-full text-sm font-medium no-underline transition-all hover:bg-black/17"
        >
          See How It Works
        </a>
      </div>

      {/* 3D Orb */}
      <div
        ref={orbRef}
        className="absolute right-[8%] top-1/2 z-10"
        style={{
          width: 'clamp(260px,34vw,480px)',
          height: 'clamp(260px,34vw,480px)',
          transform: 'translateY(-50%)',
          animation: 'float 7s ease-in-out infinite',
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FF8C38, #FF6803 40%, #AE3A02 75%, #6B2200)',
            boxShadow: '0 0 80px rgba(255,104,3,0.4), inset 0 -20px 60px rgba(0,0,0,0.3), inset 10px 10px 40px rgba(255,180,80,0.35)',
          }}
        >
          {/* Shine */}
          <div
            className="absolute rounded-full"
            style={{ top: '12%', left: '20%', width: '40%', height: '22%', background: 'rgba(255,255,255,0.18)', transform: 'rotate(-30deg)', filter: 'blur(8px)' }}
          />
          <div className="text-center z-10 relative font-syne font-black text-white/95 leading-snug px-8">
            <div className="text-[11px] font-normal opacity-70 uppercase tracking-widest mb-1">Powered by</div>
            <div style={{ fontSize: 'clamp(18px,2.5vw,34px)' }}>AI Agents<br />Building<br />Companies</div>
          </div>
        </div>

        {/* Floating pills */}
        {PILLS.map((p) => (
          <div
            key={p.label}
            className={`absolute flex items-center gap-2.5 bg-white rounded-full px-4 py-2.5 text-[12px] font-semibold whitespace-nowrap shadow-xl ${p.pos} ${p.cls}`}
          >
            <div className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ background: p.color }} />
            {p.label}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="reveal reveal-delay-3 absolute right-12 top-36 z-10 text-right">
        <div className="flex items-start justify-end gap-1">
          <span className="text-black/45 text-3xl">↑</span>
          <span className="font-syne font-black text-[48px] tracking-tight text-brand-dark leading-none">132</span>
          <span className="font-syne font-black text-[18px] text-black/50 self-end mb-2">%</span>
        </div>
        <div className="font-syne font-bold text-sm tracking-widest mb-1">GROWTH</div>
        <div className="text-[12px] text-black/45 max-w-[200px] ml-auto leading-relaxed">
          Our clients see measurable brand growth through AI-driven company building.
        </div>
      </div>

      <div className="reveal reveal-delay-4 absolute right-12 bottom-32 z-10 text-right text-[13px] text-black/45 max-w-[220px] leading-relaxed">
        From a single idea to a fully launched startup — we partner with founders at every stage.
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[11px] text-black/40 tracking-wide z-10">
        <div
          className="w-6 h-6 rounded-full border border-black/25 flex items-center justify-center scroll-dot"
        />
        Scroll to explore more
      </div>
    </section>
  )
}
