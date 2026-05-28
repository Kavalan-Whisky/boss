import { LineChart as LineIcon, Filter, RefreshCcw } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import RangePicker from '../components/ui/RangePicker.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import VisitorLine from '../components/charts/VisitorLine.jsx'
import CategoryBar from '../components/charts/CategoryBar.jsx'
import PerformanceRadar from '../components/charts/PerformanceRadar.jsx'
import GoalsRadial from '../components/charts/GoalsRadial.jsx'
import Funnel from '../components/widgets/Funnel.jsx'
import Heatmap from '../components/widgets/Heatmap.jsx'
import { useData } from '../context/DataContext.jsx'
import { comma, pct } from '../lib/format.js'

export default function Analytics() {
  const { visitors, categories, radar, goals, funnel, heatmap } = useData()

  const summary = [
    { label: 'Page Views', value: 1_284_920, delta: 9.2 },
    { label: 'Unique Visitors', value: 482_140, delta: 5.1 },
    { label: 'Avg. Session', value: '4m 12s', delta: 2.8, raw: true },
    { label: 'Bounce Rate', value: '38.4%', delta: -1.6, raw: true },
  ]

  return (
    <>
      <PageHeader
        icon={LineIcon}
        title="Analytics"
        subtitle="Deep-dive into traffic, engagement, conversion and performance."
        crumbs={['Home', 'Analytics']}
        actions={
          <>
            <RangePicker />
            <button className="btn"><Filter size={16} /> Filters</button>
            <button className="btn"><RefreshCcw size={16} /> Refresh</button>
          </>
        }
      />

      <div className="grid grid-kpi stagger">
        {summary.map((s) => (
          <Card key={s.label} className="card-pad" hoverable>
            <div className="kpi-label">{s.label}</div>
            <div className="kpi-value" style={{ fontSize: 24, marginTop: 6 }}>
              {s.raw ? s.value : comma(s.value)}
            </div>
            <div className="kpi-foot">
              <span className={`trend ${s.delta >= 0 ? 'up' : 'down'}`}>{pct(s.delta)}</span>
              <span className="muted">vs last period</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-8" hoverable>
          <CardHead title="Engagement Trend" hint="Visitors and sessions over time" />
          <div className="card-body">
            <VisitorLine data={visitors} height={320} />
          </div>
        </Card>
        <Card className="span-4" hoverable>
          <CardHead title="Conversion Funnel" hint="From visit to retention" menu={false} />
          <div className="card-body">
            <Funnel data={funnel} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-6" hoverable>
          <CardHead title="Sales by Category" hint="Online vs retail channels" />
          <div className="card-body">
            <CategoryBar data={categories} />
          </div>
        </Card>
        <Card className="span-3" hoverable>
          <CardHead title="System Performance" menu={false} />
          <div className="card-body">
            <PerformanceRadar data={radar} />
          </div>
        </Card>
        <Card className="span-3" hoverable>
          <CardHead title="Quarterly Goals" menu={false} />
          <div className="card-body">
            <GoalsRadial data={goals} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-12" hoverable>
          <CardHead
            title="Activity Heatmap"
            hint="Event density by day of week across 24 weeks"
            menu={false}
          />
          <div className="card-body">
            <Heatmap data={heatmap} />
          </div>
        </Card>
      </div>
    </>
  )
}
