import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

// Request interceptor — attach auth token if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('ventura_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor — handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('ventura_token')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

// --- Typed API helpers ---

export interface BuildStartupPayload {
  agent_type: 'market_research' | 'product_builder' | 'marketing' | 'sales'
  startup_idea: string
}

export interface AgentResponse {
  agent_type: string
  output: Record<string, string>
  tokens_used: number
  duration_seconds: number
}

export interface StartupRecord {
  id: string
  idea: string
  name: string
  created_at: string
  status: 'building' | 'complete' | 'failed'
  agents_completed: string[]
}

export const agentsApi = {
  run: (payload: BuildStartupPayload) =>
    api.post<AgentResponse>('/agents/run', payload),

  runAll: (idea: string) =>
    api.post<{ startup_id: string; startup_name: string }>('/agents/run-all', { startup_idea: idea }),

  getStatus: (jobId: string) =>
    api.get<{ status: string; progress: number; agents: AgentResponse[] }>(`/agents/status/${jobId}`),
}

export const startupsApi = {
  list: () => api.get<StartupRecord[]>('/startups'),
  get: (id: string) => api.get<StartupRecord>(`/startups/${id}`),
  delete: (id: string) => api.delete(`/startups/${id}`),
}
