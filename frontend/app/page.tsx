'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import HowItWorks from '@/components/HowItWorks'
import Workflow from '@/components/Workflow'
import Market from '@/components/Market'
import TechStack from '@/components/TechStack'
import Pricing from '@/components/Pricing'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
import SocialBar from '@/components/SocialBar'

export default function Home() {
  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    // Trigger hero immediately
    document.querySelectorAll('.hero-reveal').forEach((el) =>
      el.classList.add('reveal', 'visible')
    )

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <Navbar />
      <SocialBar />
      <main>
        <Hero />
        <Ticker />
        <HowItWorks />
        <Workflow />
        <Market />
        <TechStack />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
