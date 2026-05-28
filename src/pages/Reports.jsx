import { FileBarChart, Plus, Download, FileText, Clock, CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import DataTable from '../components/widgets/DataTable.jsx'
import { StatusBadge } from '../components/ui/bits.jsx'

const REPORTS = [
  { id: 'RPT-2041', name: 'Q2 Revenue Summary', type: 'Financial', status: 'paid', size: '2.4 MB', created: '2026-05-27', owner: 'Kavalan W.' },
  { id: 'RPT-2040', name: 'Customer Cohort Analysis', type: 'Growth', status: 'paid', size: '1.1 MB', created: '2026-05-26', owner: 'Mia C.' },
  { id: 'RPT-2039', name: 'Marketing Attribution', type: 'Marketing', status: 'pending', size: '—', created: '2026-05-26', owner: 'Liam P.' },
  { id: 'RPT-2038', name: 'Churn Deep Dive', type: 'Growth', status: 'paid', size: '3.8 MB', created: '2026-05-24', owner: 'Zoe K.' },
  { id: 'RPT-2037', name: 'Infra Cost Breakdown', type: 'Financial', status: 'paid', size: '0.9 MB', created: '2026-05-22', owner: 'Noah G.' },
  { id: 'RPT-2036', name: 'NPS Survey Results', type: 'Product', status: 'paid', size: '1.6 MB', created: '2026-05-20', owner: 'Aria S.' },
  { id: 'RPT-2035', name: 'A/B Test · Checkout', type: 'Product', status: 'refunded', size: '0.4 MB', created: '2026-05-18', owner: 'Eli H.' },
]

const SCHEDULED = [
  { name: 'Weekly Exec Digest', cadence: 'Every Monday · 08:00', next: 'in 2 days' },
  { name: 'Daily Sales Snapshot', cadence: 'Daily · 23:00', next: 'in 6 hours' },
  { name: 'Monthly Board Pack', cadence: '1st of month · 06:00', next: 'in 4 days' },
]

export default function Reports() {
  const columns = [
    { key: 'id', label: 'ID', render: (r) => <span className="mono">{r.id}</span> },
    {
      key: 'name',
      label: 'Report',
      render: (r) => (
        <span className="flex items-center gap-12">
          <span className="feed-icon" style={{ width: 34, height: 34, background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <FileText size={17} />
          </span>
          <strong style={{ fontSize: 13.5 }}>{r.name}</strong>
        </span>
      ),
    },
    { key: 'type', label: 'Type', render: (r) => <span className="badge neutral">{r.type}</span> },
    { key: 'owner', label: 'Owner' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'size', label: 'Size', align: 'right', render: (r) => <span className="mono muted">{r.size}</span> },
    { key: 'created', label: 'Created', render: (r) => <span className="muted mono">{r.created}</span> },
    {
      key: 'actions',
      label: '',
      sortable: false,
      align: 'right',
      render: () => (
        <button className="btn ghost sm"><Download size={15} /></button>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        icon={FileBarChart}
        title="Reports"
        subtitle="Generate, schedule and export analytical reports."
        crumbs={['Home', 'Workspace', 'Reports']}
        actions={
          <>
            <button className="btn"><Download size={16} /> Export all</button>
            <button className="btn primary"><Plus size={16} /> Generate report</button>
          </>
        }
      />

      <div className="grid grid-3 stagger">
        {[
          { icon: FileText, label: 'Total reports', value: '142', tone: 'accent' },
          { icon: CheckCircle2, label: 'Completed', value: '128', tone: 'success' },
          { icon: Clock, label: 'Scheduled', value: '14', tone: 'info' },
        ].map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="card-pad" hoverable>
              <div className="flex items-center gap-16">
                <div className="kpi-icon" style={{ background: `var(--${s.tone}-soft)`, color: `var(--${s.tone})` }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div className="kpi-label">{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800 }} className="mono">{s.value}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-8">
          <CardHead title="Generated Reports" hint="Search, sort and download" menu={false} />
          <DataTable
            columns={columns}
            rows={REPORTS}
            searchKeys={['id', 'name', 'type', 'owner']}
            initialSort={{ key: 'created', dir: 'desc' }}
            exportName="reports"
            pageSize={6}
          />
        </Card>

        <Card className="span-4" hoverable>
          <CardHead title="Scheduled" hint="Automated delivery" menu={false} />
          <div className="card-body">
            {SCHEDULED.map((s) => (
              <div key={s.name} className="stat-row" style={{ alignItems: 'flex-start' }}>
                <div className="label" style={{ alignItems: 'flex-start' }}>
                  <Clock size={17} style={{ color: 'var(--accent)', marginTop: 2 }} />
                  <div>
                    <strong style={{ fontSize: 13.5, display: 'block' }}>{s.name}</strong>
                    <span className="muted">{s.cadence}</span>
                  </div>
                </div>
                <span className="badge info">{s.next}</span>
              </div>
            ))}
            <button className="btn" style={{ width: '100%', marginTop: 16 }}>
              <Plus size={15} /> New schedule
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
