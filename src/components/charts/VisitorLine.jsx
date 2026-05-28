import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { compact } from '../../lib/format.js'

export default function VisitorLine({ data, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-line)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          minTickGap={28}
        />
        <YAxis
          tickFormatter={compact}
          tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--border-strong)' }} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12.5, paddingTop: 8 }}
          formatter={(v) => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>}
        />
        <Line
          type="monotone"
          dataKey="visitors"
          name="Visitors"
          stroke="var(--accent)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="sessions"
          name="Sessions"
          stroke="var(--accent-2)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5 }}
          strokeDasharray="5 4"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
