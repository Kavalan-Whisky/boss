import { comma } from '../../lib/format.js'

// Shared Recharts tooltip with the dashboard's visual language.
export default function ChartTooltip({ active, payload, label, format = comma, prefix = '' }) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rc-tooltip">
      {label !== undefined && <div className="rc-label">{label}</div>}
      {payload.map((p) => (
        <div className="rc-row" key={p.dataKey ?? p.name}>
          <span className="dot" style={{ background: p.color || p.fill || p.stroke }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
          <b>
            {prefix}
            {format(p.value)}
          </b>
        </div>
      ))}
    </div>
  )
}
