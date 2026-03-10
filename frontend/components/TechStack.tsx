const STACK = [
  { cat: 'AI Core', title: 'Large Language Models', items: ['GPT-4 / Claude 3 Opus', 'LangChain Agent Framework', 'AutoGPT-style workflows', 'RAG + vector memory'] },
  { cat: 'Backend', title: 'Scalable Infrastructure', items: ['Python + FastAPI', 'PostgreSQL + Redis', 'Celery task queues', 'REST & GraphQL APIs'] },
  { cat: 'Frontend', title: 'Modern Web Stack', items: ['Next.js 14 + React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'] },
  { cat: 'Infrastructure', title: 'Cloud & DevOps', items: ['Docker + Kubernetes', 'AWS / GCP deployment', 'CI/CD pipelines', 'Auto-scaling clusters'] },
]

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-12 pb-16" style={{ background: '#E2E2E0' }}>
      <div className="text-xs font-semibold tracking-[2px] uppercase text-orange flex items-center gap-2 mb-5 reveal">
        <span className="w-5 h-0.5 bg-orange inline-block" />Under The Hood
      </div>
      <h2 className="reveal reveal-delay-1 font-syne font-black leading-tight mb-14" style={{ fontSize: 'clamp(32px,4.5vw,62px)', letterSpacing: '-2px' }}>
        Built on Industry-<br />Leading Technology.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {STACK.map((s, i) => (
          <div
            key={s.cat}
            className={`reveal reveal-delay-${i + 1} bg-white rounded-[18px] p-7 border border-black/6 transition-all hover:-translate-y-1.5`}
            style={{ ':hover': { borderColor: '#FF6803' } } as React.CSSProperties}
          >
            <div className="text-[10px] uppercase tracking-[1.5px] text-orange font-semibold mb-3.5">{s.cat}</div>
            <div className="font-syne font-bold text-[17px] mb-4 tracking-[-0.3px]">{s.title}</div>
            <div className="flex flex-col gap-2">
              {s.items.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[13px] text-black/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
