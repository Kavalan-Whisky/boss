import { Users, UserPlus, Mail } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import DataTable from '../components/widgets/DataTable.jsx'
import GoalsRadial from '../components/charts/GoalsRadial.jsx'
import { Avatar, StatusBadge, PlanBadge } from '../components/ui/bits.jsx'
import { useData } from '../context/DataContext.jsx'
import { currency, comma } from '../lib/format.js'

export default function Customers() {
  const { users, goals } = useData()

  const stats = [
    { label: 'Total Customers', value: comma(38214) },
    { label: 'New this month', value: comma(2841) },
    { label: 'Paying', value: comma(9648) },
    { label: 'Avg. MRR / user', value: '$64' },
  ]

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (r) => (
        <div className="cell-user">
          <Avatar initials={r.initials} seed={r.id} />
          <div className="cell-user-meta">
            <strong>{r.name}</strong>
            <span>{r.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'country',
      label: 'Country',
      render: (r) => (
        <span className="flex items-center gap-8">
          <span style={{ fontSize: 17 }}>{r.flag}</span> {r.country}
        </span>
      ),
    },
    { key: 'plan', label: 'Plan', render: (r) => <PlanBadge plan={r.plan} /> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'mrr',
      label: 'MRR',
      align: 'right',
      render: (r) => <span className="mono">{r.mrr ? currency(r.mrr) : '—'}</span>,
    },
    {
      key: 'spend',
      label: 'Lifetime',
      align: 'right',
      render: (r) => <span className="mono" style={{ fontWeight: 700 }}>{currency(r.spend)}</span>,
    },
    { key: 'lastSeen', label: 'Last seen', render: (r) => <span className="muted">{r.lastSeen}</span> },
  ]

  return (
    <>
      <PageHeader
        icon={Users}
        title="Customers"
        subtitle="Manage your customer base, plans and lifecycle."
        crumbs={['Home', 'Operations', 'Customers']}
        actions={
          <>
            <button className="btn"><Mail size={16} /> Email all</button>
            <button className="btn primary"><UserPlus size={16} /> Invite</button>
          </>
        }
      />

      <div className="grid grid-12 stagger">
        <div className="span-8 grid grid-2" style={{ gap: 20 }}>
          {stats.map((s) => (
            <Card key={s.label} className="card-pad" hoverable>
              <div className="kpi-label">{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }} className="mono">
                {s.value}
              </div>
            </Card>
          ))}
        </div>
        <Card className="span-4" hoverable>
          <CardHead title="Lifecycle Goals" menu={false} />
          <div className="card-body" style={{ paddingTop: 4 }}>
            <GoalsRadial data={goals} height={210} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-12">
          <CardHead title="All Customers" hint="Search, sort, paginate and export" menu={false} />
          <DataTable
            columns={columns}
            rows={users}
            searchKeys={['name', 'email', 'country', 'plan', 'status']}
            initialSort={{ key: 'spend', dir: 'desc' }}
            exportName="customers"
            pageSize={9}
          />
        </Card>
      </div>
    </>
  )
}
