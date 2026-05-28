import { comma } from '../../lib/format.js'

export default function Funnel({ data }) {
  const max = data[0]?.value || 1
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {data.map((step, i) => {
        const widthPct = (step.value / max) * 100
        const conv = i === 0 ? 100 : (step.value / data[i - 1].value) * 100
        return (
          <div key={step.stage}>
            <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{step.stage}</span>
              <span className="flex items-center gap-8">
                <b className="mono" style={{ fontSize: 13.5 }}>{comma(step.value)}</b>
                {i > 0 && (
                  <span className="badge neutral" style={{ fontSize: 11 }}>
                    {conv.toFixed(0)}%
                  </span>
                )}
              </span>
            </div>
            <div
              style={{
                height: 30,
                borderRadius: 8,
                width: `${widthPct}%`,
                minWidth: 40,
                background: `linear-gradient(90deg, ${step.color}, color-mix(in srgb, ${step.color} 60%, transparent))`,
                transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {widthPct > 18 && `${conv.toFixed(0)}%`}
            </div>
          </div>
        )
      })}
    </div>
  )
}
