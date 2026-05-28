import { LayoutDashboard, Download, TrendingUp, ArrowUpRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import RangePicker from '../components/ui/RangePicker.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import RevenueArea from '../components/charts/RevenueArea.jsx'
import VisitorLine from '../components/charts/VisitorLine.jsx'
import TrafficDonut from '../components/charts/TrafficDonut.jsx'
import ActivityFeed from '../components/widgets/ActivityFeed.jsx'
import { TrendPill } from '../components/ui/bits.jsx'
import { useData } from '../context/DataContext.jsx'
import { currency, comma } from '../lib/format.js'

export default function Overview() {
  const { kpis, revenue, visitors, traffic, products } = useData()

  return (
    <>
      <PageHeader
        icon={LayoutDashboard}
        title="Overview"
        subtitle="Welcome back, Kavalan — here's what's happening across your workspace today."
        crumbs={['Home', 'Dashboard', 'Overview']}
        actions={
          <>
            <RangePicker />
            <button className="btn">
              <Download size={16} /> Export
            </button>
            <button className="btn primary">
              <TrendingUp size={16} /> New report
            </button>
          </>
        }
      />

      <div className="grid grid-kpi stagger">
        {kpis.map((k) => (
          <KpiCard key={k.key} kpi={k} />
        ))}
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-8" hoverable>
          <CardHead
            title="Revenue vs Expenses"
            hint="Monthly performance across the selected range"
            icon={TrendingUp}
            action={<span className="badge success"><span className="dot" style={{ background: 'var(--success)' }} /> +18.2% YoY</span>}
          />
          <div className="card-body">
            <RevenueArea data={revenue} />
          </div>
        </Card>

        <Card className="span-4" hoverable>
          <CardHead title="Traffic Sources" hint="Where your visitors come from" />
          <div className="card-body">
            <TrafficDonut data={traffic} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-8" hoverable>
          <CardHead
            title="Visitors & Sessions"
            hint="Live engagement over the last 30 days"
            action={<span className="live-pill"><span className="live-pulse" /> Live</span>}
          />
          <div className="card-body">
            <VisitorLine data={visitors} />
          </div>
        </Card>

        <Card className="span-4">
          <CardHead title="Recent Activity" menu={false} action={<button className="btn ghost sm">View all</button>} />
          <div className="card-body" style={{ paddingTop: 6, paddingBottom: 6 }}>
            <ActivityFeed limit={6} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-8" hoverable>
          <CardHead title="Top Performing Products" hint="By revenue contribution this period" />
          <div className="card-body" style={{ paddingTop: 8 }}>
            {products.map((p, i) => {
              const max = products[0].revenue
              return (
                <div key={p.name} className="stat-row">
                  <div className="label" style={{ flex: 1 }}>
                    <span
                      className="mono"
                      style={{
                        color: 'var(--text-muted)',
                        width: 22,
                        fontSize: 13,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                        <strong style={{ fontSize: 13.5 }}>{p.name}</strong>
                        <span className="flex items-center gap-12">
                          <span className="mono" style={{ fontSize: 13 }}>{currency(p.revenue)}</span>
                          <TrendPill value={p.change} />
                        </span>
                      </div>
                      <div className="progress">
                        <span style={{ width: `${(p.revenue / max) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="span-4" hoverable>
          <CardHead title="Quick Stats" menu={false} />
          <div className="card-body">
            {[
              { label: 'Avg. Order Value', value: '$148.20', trend: 6.2 },
              { label: 'Refund Rate', value: '1.8%', trend: -0.4 },
              { label: 'Customer LTV', value: '$2,840', trend: 11.3 },
              { label: 'Churn Rate', value: '3.1%', trend: -1.2 },
              { label: 'Support Tickets', value: comma(284), trend: 4.0 },
            ].map((s) => (
              <div className="stat-row" key={s.label}>
                <span className="label">{s.label}</span>
                <span className="flex items-center gap-12">
                  <b className="mono">{s.value}</b>
                  <TrendPill value={s.trend} />
                </span>
              </div>
            ))}
            <button className="btn" style={{ width: '100%', marginTop: 16 }}>
              Full breakdown <ArrowUpRight size={15} />
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
