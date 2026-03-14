'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import Cursor from '@/components/Cursor'

type AgentStatus = 'idle' | 'running' | 'done' | 'error'

interface AgentResult {
  name: string
  status: AgentStatus
  output: Record<string, string> | null
  progress: number
}

const AGENTS: { key: string; label: string; icon: string; color: string }[] = [
  { key: 'market_research', label: 'Market Research', icon: '🔍', color: '#60A5FA' },
  { key: 'product_builder', label: 'Product Builder', icon: '⚙️', color: '#FF6803' },
  { key: 'marketing',       label: 'Marketing',       icon: '📣', color: '#F472B6' },
  { key: 'sales',           label: 'Sales Agent',     icon: '💼', color: '#7DFFB3' },
]

export default function Dashboard() {
  const [idea, setIdea] = useState('')
  const [building, setBuilding] = useState(false)
  const [results, setResults] = useState<AgentResult[]>([])
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [startupName, setStartupName] = useState('')

  async function handleBuild() {
    if (!idea.trim()) {
      toast.error('Please enter your startup idea first!')
      return
    }
    setBuilding(true)
    setResults([])
    setStartupName('')

    const initialResults: AgentResult[] = AGENTS.map((a) => ({
      name: a.key,
      status: 'idle',
      output: null,
      progress: 0,
    }))
    setResults(initialResults)

    // Run agents sequentially with simulated streaming
    for (let i = 0; i < AGENTS.length; i++) {
      const agent = AGENTS[i]
      setActiveAgent(agent.key)

      // Mark as running
      setResults((prev) =>
        prev.map((r) => (r.name === agent.key ? { ...r, status: 'running', progress: 0 } : r))
      )

      // Animate progress
      for (let p = 0; p <= 90; p += 10) {
        await sleep(180)
        setResults((prev) =>
          prev.map((r) => (r.name === agent.key ? { ...r, progress: p } : r))
        )
      }

      try {
        const response = await api.post('/agents/run', {
          agent_type: agent.key,
          startup_idea: idea,
        })
        const data = response.data

        if (i === 0 && data.output?.startup_name) {
          setStartupName(data.output.startup_name)
        }

        setResults((prev) =>
          prev.map((r) =>
            r.name === agent.key
              ? { ...r, status: 'done', output: data.output, progress: 100 }
              : r
          )
        )
        toast.success(`${agent.label} completed!`)
      } catch {
        setResults((prev) =>
          prev.map((r) =>
            r.name === agent.key ? { ...r, status: 'error', progress: 0 } : r
          )
        )
        toast.error(`${agent.label} failed. Check your API keys.`)
      }
    }

    setActiveAgent(null)
    setBuilding(false)
    toast.success('🚀 Your startup has been built!')
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      <Cursor />
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 font-syne font-black text-lg">
          <div className="w-8 h-8 bg-orange rounded-lg grid grid-cols-2 gap-0.5 p-1.5">
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
            <span className="bg-white rounded-sm" />
          </div>
          Ventura AI
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/40">Dashboard</span>
          <Link href="/" className="px-4 py-2 text-sm border border-white/10 rounded-full hover:border-orange transition-colors">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Input */}
        <div className="mb-12">
          <h1 className="font-syne font-black text-4xl md:text-5xl mb-3 tracking-tight">
            Build Your <span className="text-orange">Startup</span>
          </h1>
          <p className="text-white/40 text-base mb-8">
            Describe your idea in plain English. Our AI agents handle the rest.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuild()}
              placeholder='e.g. "Build a startup for AI fitness coaching"'
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/25 focus:outline-none focus:border-orange text-sm transition-colors"
            />
            <button
              onClick={handleBuild}
              disabled={building}
              className="px-8 py-4 bg-orange text-white rounded-2xl font-semibold text-sm transition-all hover:bg-orange-dark disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              style={{ cursor: 'none' }}
            >
              {building ? (
                <span className="flex items-center gap-2">
                  <svg className="loading-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Building...
                </span>
              ) : (
                'Launch Agents →'
              )}
            </button>
          </div>

          {/* Example ideas */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {[
              'AI tools for Instagram creators',
              'SaaS for freelance invoicing',
              'AI fitness coaching app',
              'Newsletter monetization platform',
            ].map((ex) => (
              <button
                key={ex}
                onClick={() => setIdea(ex)}
                className="px-3 py-1.5 text-xs border border-white/10 rounded-full text-white/40 hover:text-orange hover:border-orange transition-colors"
                style={{ cursor: 'none' }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Startup name reveal */}
        <AnimatePresence>
          {startupName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-orange/10 border border-orange/30 rounded-2xl"
            >
              <div className="text-xs text-orange/70 uppercase tracking-widest mb-1">Startup Name Generated</div>
              <div className="font-syne font-black text-3xl text-orange">{startupName}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent Cards */}
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {AGENTS.map((agent, i) => {
              const result = results.find((r) => r.name === agent.key)
              if (!result) return null
              return (
                <AgentCard
                  key={agent.key}
                  agent={agent}
                  result={result}
                  isActive={activeAgent === agent.key}
                />
              )
            })}
          </div>
        )}

        {/* Empty state */}
        {results.length === 0 && !building && (
          <div className="text-center py-20 text-white/20">
            <div className="text-5xl mb-4">🚀</div>
            <div className="text-base">Enter your idea above and hit Launch Agents</div>
          </div>
        )}
      </div>
    </div>
  )
}

function AgentCard({
  agent,
  result,
  isActive,
}: {
  agent: { key: string; label: string; icon: string; color: string }
  result: AgentResult
  isActive: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden"
      style={{ borderColor: isActive ? agent.color + '40' : undefined }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: agent.color + '20' }}
            >
              {agent.icon}
            </div>
            <div>
              <div className="font-syne font-bold text-sm text-white">{agent.label}</div>
              <div className="text-xs mt-0.5" style={{ color: statusColor(result.status) }}>
                {statusLabel(result.status)}
              </div>
            </div>
          </div>
          {result.status === 'done' && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-white/30 hover:text-white transition-colors"
              style={{ cursor: 'none' }}
            >
              {expanded ? 'Hide ↑' : 'Details ↓'}
            </button>
          )}
        </div>

        {/* Progress bar */}
        {result.status === 'running' && (
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: agent.color }}
              animate={{ width: `${result.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {result.status === 'done' && (
          <div className="h-1 rounded-full" style={{ background: agent.color }} />
        )}
      </div>

      <AnimatePresence>
        {expanded && result.output && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5"
          >
            <div className="p-5 agent-code text-xs text-white/50 space-y-1">
              {Object.entries(result.output).map(([k, v]) => (
                <div key={k}>
                  <span style={{ color: '#FF6803' }}>{k.replace(/_/g, ' ')}:</span>{' '}
                  <span style={{ color: '#7DFFB3' }}>{String(v)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function statusLabel(s: AgentStatus) {
  if (s === 'idle') return 'Waiting...'
  if (s === 'running') return 'Running...'
  if (s === 'done') return '✓ Complete'
  return '✗ Error'
}

function statusColor(s: AgentStatus) {
  if (s === 'idle') return 'rgba(255,255,255,0.2)'
  if (s === 'running') return '#FF6803'
  if (s === 'done') return '#7DFFB3'
  return '#F87171'
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
