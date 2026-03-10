'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px'
        cursorRef.current.style.top = my + 'px'
      }
    }

    const animRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px'
        ringRef.current.style.top = ry + 'px'
      }
      requestAnimationFrame(animRing)
    }

    const onEnter = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '20px'; cursorRef.current.style.height = '20px' }
      if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px' }
    }
    const onLeave = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '12px'; cursorRef.current.style.height = '12px' }
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px' }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    animRing()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
