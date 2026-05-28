import { useState } from 'react'
import { comma } from '../../lib/format.js'

const W = 1000
const H = 500

// Approximate equirectangular positions (normalised 0..1) for hub markers.
export const HUBS = {
  'United States': [0.222, 0.3],
  Germany: [0.528, 0.24],
  Japan: [0.883, 0.31],
  Brazil: [0.358, 0.6],
  India: [0.717, 0.4],
  'United Kingdom': [0.497, 0.22],
  France: [0.506, 0.26],
  Canada: [0.206, 0.2],
}

export default function WorldMap({ points }) {
  const [hover, setHover] = useState(null)
  const max = Math.max(...points.map((p) => p.users), 1)
  const hub = points[0]
  const hubPos = HUBS[hub?.name]

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={W} height={H} fill="url(#mapGlow)" rx="16" />

        {/* lon/lat grid */}
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={(i * W) / 12}
            y1="0"
            x2={(i * W) / 12}
            y2={H}
            stroke="var(--grid-line)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={(i * H) / 6}
            x2={W}
            y2={(i * H) / 6}
            stroke="var(--grid-line)"
            strokeWidth="1"
          />
        ))}

        {/* connection arcs from primary hub */}
        {hubPos &&
          points.slice(1).map((p) => {
            const pos = HUBS[p.name]
            if (!pos) return null
            const x1 = hubPos[0] * W
            const y1 = hubPos[1] * H
            const x2 = pos[0] * W
            const y2 = pos[1] * H
            const mx = (x1 + x2) / 2
            const my = Math.min(y1, y2) - 70
            return (
              <path
                key={`arc-${p.name}`}
                d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`}
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.28"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
            )
          })}

        {/* markers */}
        {points.map((p) => {
          const pos = HUBS[p.name]
          if (!pos) return null
          const cx = pos[0] * W
          const cy = pos[1] * H
          const r = 6 + (p.users / max) * 22
          const isHover = hover === p.name
          return (
            <g
              key={p.name}
              onMouseEnter={() => setHover(p.name)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={cx} cy={cy} r={r + 8} fill="var(--accent)" opacity={isHover ? 0.18 : 0.08}>
                <animate
                  attributeName="r"
                  values={`${r};${r + 14};${r}`}
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <animate attributeName="opacity" values="0.18;0;0.18" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="var(--accent)"
                fillOpacity={isHover ? 0.95 : 0.7}
                stroke="#fff"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />
            </g>
          )
        })}
      </svg>

      {hover && (
        <div
          className="rc-tooltip"
          style={{ position: 'absolute', top: 10, left: 10, pointerEvents: 'none' }}
        >
          <div className="rc-label">
            {points.find((p) => p.name === hover)?.flag} {hover}
          </div>
          <div className="rc-row">
            <span className="dot" style={{ background: 'var(--accent)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>Users</span>
            <b>{comma(points.find((p) => p.name === hover)?.users)}</b>
          </div>
        </div>
      )}
    </div>
  )
}
