import { useMemo } from 'react'

function shade(v, max) {
  if (v === 0) return 'var(--bg-surface-2)'
  const t = v / max
  const op = 0.18 + t * 0.82
  return `color-mix(in srgb, var(--accent) ${Math.round(op * 100)}%, transparent)`
}

export default function Heatmap({ data }) {
  const { grid, days, weeks } = data
  const max = useMemo(() => Math.max(...grid.flat(), 1), [grid])

  return (
    <div>
      <div className="flex" style={{ gap: 6 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 0 }}>
          {days.map((d) => (
            <div
              key={d}
              style={{ fontSize: 10, color: 'var(--text-muted)', height: 'auto', flex: 1, lineHeight: '14px' }}
            >
              {d[0]}
            </div>
          ))}
        </div>
        <div className="heatmap" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)`, flex: 1 }}>
          {Array.from({ length: 7 }).map((_, day) =>
            Array.from({ length: weeks }).map((__, week) => {
              const v = grid[day][week]
              return (
                <div
                  key={`${day}-${week}`}
                  className="heat-cell"
                  style={{ background: shade(v, max), gridColumn: week + 1, gridRow: day + 1 }}
                  title={`${days[day]} · week ${week + 1}: ${v} events`}
                />
              )
            }),
          )}
        </div>
      </div>
      <div className="flex items-center gap-8" style={{ justifyContent: 'flex-end', marginTop: 14 }}>
        <span className="muted">Less</span>
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <span
            key={t}
            className="heat-cell"
            style={{ width: 13, height: 13, background: shade(t * max, max), cursor: 'default' }}
          />
        ))}
        <span className="muted">More</span>
      </div>
    </div>
  )
}
