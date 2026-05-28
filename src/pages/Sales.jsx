import { ShoppingBag, Plus } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import RangePicker from '../components/ui/RangePicker.jsx'
import KpiCard from '../components/ui/KpiCard.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import RevenueArea from '../components/charts/RevenueArea.jsx'
import CategoryBar from '../components/charts/CategoryBar.jsx'
import DataTable from '../components/widgets/DataTable.jsx'
import { StatusBadge } from '../components/ui/bits.jsx'
import { useData } from '../context/DataContext.jsx'
import { currency } from '../lib/format.js'

export default function Sales() {
  const { kpis, revenue, categories, orders } = useData()

  const columns = [
    { key: 'id', label: 'Order', render: (r) => <span className="mono">{r.id}</span> },
    { key: 'product', label: 'Product', render: (r) => <strong style={{ fontSize: 13.5 }}>{r.product}</strong> },
    { key: 'customer', label: 'Customer' },
    { key: 'qty', label: 'Qty', align: 'right', render: (r) => <span className="mono">{r.qty}</span> },
    {
      key: 'amount',
      label: 'Amount',
      align: 'right',
      render: (r) => <span className="mono" style={{ fontWeight: 700 }}>{currency(r.amount)}</span>,
    },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'date', label: 'Date', render: (r) => <span className="muted mono">{r.date}</span> },
  ]

  return (
    <>
      <PageHeader
        icon={ShoppingBag}
        title="Sales"
        subtitle="Track orders, revenue and channel performance."
        crumbs={['Home', 'Operations', 'Sales']}
        actions={
          <>
            <RangePicker />
            <button className="btn primary"><Plus size={16} /> New order</button>
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
          <CardHead title="Revenue Breakdown" hint="Revenue, expenses and profit" />
          <div className="card-body">
            <RevenueArea data={revenue} />
          </div>
        </Card>
        <Card className="span-4" hoverable>
          <CardHead title="Channel Mix" hint="Online vs retail" menu={false} />
          <div className="card-body">
            <CategoryBar data={categories} height={300} />
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-12">
          <CardHead title="Recent Orders" hint="Filter, sort and export transactions" menu={false} />
          <DataTable
            columns={columns}
            rows={orders}
            searchKeys={['id', 'product', 'customer', 'status']}
            initialSort={{ key: 'amount', dir: 'desc' }}
            exportName="orders"
            pageSize={8}
          />
        </Card>
      </div>
    </>
  )
}
