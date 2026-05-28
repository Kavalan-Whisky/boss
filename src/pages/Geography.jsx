import { Globe2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import RangePicker from '../components/ui/RangePicker.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import WorldMap from '../components/widgets/WorldMap.jsx'
import { useData } from '../context/DataContext.jsx'
import { comma } from '../lib/format.js'

export default function Geography() {
  const { geo } = useData()
  const max = geo[0]?.users || 1

  return (
    <>
      <PageHeader
        icon={Globe2}
        title="Geography"
        subtitle="Where your users are around the world."
        crumbs={['Home', 'Operations', 'Geography']}
        actions={<RangePicker />}
      />

      <div className="grid grid-12 stagger">
        <Card className="span-8" hoverable>
          <CardHead title="Global Distribution" hint="Live user hubs and traffic routes" menu={false} />
          <div className="card-body">
            <WorldMap points={geo} />
          </div>
        </Card>

        <Card className="span-4" hoverable>
          <CardHead title="Top Countries" menu={false} />
          <div className="card-body" style={{ paddingTop: 8 }}>
            {geo.map((c, i) => (
              <div key={c.name} className="stat-row">
                <div className="label" style={{ flex: 1 }}>
                  <span className="mono muted" style={{ width: 20 }}>{i + 1}</span>
                  <span style={{ fontSize: 18 }}>{c.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                      <strong style={{ fontSize: 13.5 }}>{c.name}</strong>
                      <span className="flex items-center gap-8">
                        <span className="mono">{comma(c.users)}</span>
                        <span className="badge neutral" style={{ fontSize: 11 }}>{c.share}%</span>
                      </span>
                    </div>
                    <div className="progress" style={{ height: 6 }}>
                      <span style={{ width: `${(c.users / max) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-3 mt-20 stagger">
        {[
          { region: 'Americas', value: 46, color: 'var(--accent)' },
          { region: 'EMEA', value: 34, color: 'var(--accent-2)' },
          { region: 'APAC', value: 20, color: 'var(--accent-3)' },
        ].map((r) => (
          <Card key={r.region} className="card-pad" hoverable>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <strong>{r.region}</strong>
              <b className="mono" style={{ fontSize: 20 }}>{r.value}%</b>
            </div>
            <div className="progress">
              <span style={{ width: `${r.value}%`, background: r.color }} />
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
