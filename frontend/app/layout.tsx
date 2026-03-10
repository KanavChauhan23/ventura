import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Ventura AI — Autonomous Company Builder',
  description: 'AI agents that automatically build and launch your entire startup from a single idea. Market research, product, marketing & sales — all automated.',
  keywords: 'AI startup builder, autonomous agents, LangChain, company builder, AI automation',
  openGraph: {
    title: 'Ventura AI',
    description: 'Build your entire company with AI agents',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0B0501',
              color: '#fff',
              border: '1px solid rgba(255,104,3,0.3)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13.5px',
            },
          }}
        />
      </body>
    </html>
  )
}
