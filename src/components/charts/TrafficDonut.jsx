import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { comma } from '../../lib/format.js'

export default function TrafficDonut({ data, height = 230 }) {
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="flex items-center gap-16 wrap" style={{ justifyContent: 'space-between' }}>
      <div style={{ position: 'relative', width: height, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="64%"
              outerRadius="100%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <div className="rc-tooltip">
                    <div className="rc-row">
                      <span className="dot" style={{ background: payload[0].payload.color }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{payload[0].name}</span>
                      <b>{comma(payload[0].value)}</b>
                    </div>
                  </div>
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px' }}>
              {comma(total)}
            </div>
            <div className="muted">Total visits</div>
          </div>
        </div>
      </div>

      <div className="legend" style={{ flex: 1, minWidth: 180 }}>
        {data.map((d) => (
          <div className="legend-row" key={d.name}>
            <span className="dot" style={{ background: d.color }} />
            <span>{d.name}</span>
            <span className="legend-val">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
