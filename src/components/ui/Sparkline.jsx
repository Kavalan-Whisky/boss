import { useId } from 'react'

// Lightweight inline SVG sparkline (area + line) — no chart lib needed.
export default function Sparkline({
  data = [],
  width = 140,
  height = 46,
  stroke = 'var(--accent)',
  fill = true,
  strokeWidth = 2,
}) {
  const gid = useId()
  const vals = data.map((d) => (typeof d === 'number' ? d : d.v))
  if (vals.length < 2) return null

  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const span = max - min || 1
  const stepX = width / (vals.length - 1)
  const pad = 3

  const pts = vals.map((v, i) => {
    const x = i * stepX
    const y = height - pad - ((v - min) / span) * (height - pad * 2)
    return [x, y]
  })

  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${width},${height} L0,${height} Z`

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.32" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#spark-${gid})`} stroke="none" />}
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
