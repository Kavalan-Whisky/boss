import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
} from 'recharts'

export default function GoalsRadial({ data, height = 280 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadialBarChart
        data={data}
        innerRadius="28%"
        outerRadius="100%"
        startAngle={90}
        endAngle={-270}
        barSize={14}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background={{ fill: 'var(--bg-surface-2)' }} dataKey="value" cornerRadius={8} />
        <Legend
          iconType="circle"
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: 12.5 }}
          formatter={(v, entry) => (
            <span style={{ color: 'var(--text-secondary)' }}>
              {v} · <b style={{ color: 'var(--text-primary)' }}>{entry?.payload?.value}%</b>
            </span>
          )}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
