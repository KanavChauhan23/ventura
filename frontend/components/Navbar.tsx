'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#home',     label: 'Home' },
  { href: '#how',      label: 'How It Works' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#market',   label: 'Market' },
  { href: '#pricing',  label: 'Pricing' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = document.querySelectorAll('section[id]')
      let curr = 'home'
      sections.forEach((sec) => {
        if (window.scrollY >= (sec as HTMLElement).offsetTop - 80) curr = sec.id
      })
      setActive(curr)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all"
      style={{
        backdropFilter: 'blur(12px)',
        background: scrolled ? 'rgba(226,226,224,0.85)' : 'rgba(226,226,224,0.7)',
        borderBottom: scrolled ? '1px solid rgba(11,5,1,0.08)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 font-syne font-black text-[17px] text-brand-dark no-underline">
        <div className="w-8 h-8 bg-orange rounded-lg grid grid-cols-2 gap-0.5 p-1.5">
          <span className="bg-white rounded-sm" />
          <span className="bg-white rounded-sm" />
          <span className="bg-white rounded-sm" />
          <span className="bg-white rounded-sm" />
        </div>
        Ventura AI
      </Link>

      {/* Links pill */}
      <ul className="hidden md:flex items-center gap-1 bg-black/8 rounded-full px-1.5 py-1.5 list-none">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="block px-4 py-2 text-[13.5px] font-medium rounded-full no-underline transition-all"
              style={{
                background: active === l.href.slice(1) ? '#0B0501' : 'transparent',
                color: active === l.href.slice(1) ? '#fff' : '#0B0501',
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/dashboard"
        className="hidden md:inline-block bg-brand-dark text-white px-5 py-2.5 rounded-full text-[13.5px] font-medium no-underline transition-all hover:bg-orange"
      >
        Launch Dashboard →
      </Link>
    </nav>
  )
}
