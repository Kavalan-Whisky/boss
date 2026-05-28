import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { compact } from '../../lib/format.js'

export default function CategoryBar({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: 'var(--text-muted)', fontSize: 11.5 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={compact}
          tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--bg-hover)' }} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12.5, paddingTop: 8 }}
          formatter={(v) => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>}
        />
        <Bar dataKey="online" name="Online" fill="var(--accent)" radius={[6, 6, 0, 0]} maxBarSize={26} />
        <Bar dataKey="retail" name="Retail" fill="var(--accent-3)" radius={[6, 6, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  )
}
