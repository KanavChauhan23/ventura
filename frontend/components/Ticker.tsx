const ITEMS = [
  'MARKET RESEARCH AGENT',
  'PRODUCT BUILDER AGENT',
  'MARKETING AUTOMATION',
  'SALES AGENT AI',
  'AUTONOMOUS DEPLOYMENT',
  'REVENUE OPTIMIZATION',
  'LANGCHAIN WORKFLOWS',
  'FASTAPI BACKEND',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="bg-orange overflow-hidden py-3.5">
      <div className="ticker-inner inline-flex gap-0 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 font-syne font-bold text-[15px] text-white px-7 tracking-wide">
            {item}
            <span className="text-white/40 text-[8px]">●</span>
          </span>
        ))}
      </div>
    </div>
  )
}
