import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'

export default function PerformanceRadar({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <PolarGrid stroke="var(--grid-line)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          axisLine={false}
        />
        <Tooltip content={<ChartTooltip format={(v) => v} />} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12.5 }}
          formatter={(v) => <span style={{ color: 'var(--text-secondary)' }}>{v}</span>}
        />
        <Radar
          name="Current"
          dataKey="current"
          stroke="var(--accent)"
          fill="var(--accent)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Radar
          name="Target"
          dataKey="target"
          stroke="var(--accent-3)"
          fill="var(--accent-3)"
          fillOpacity={0.08}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
