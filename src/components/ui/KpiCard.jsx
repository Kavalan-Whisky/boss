import { DollarSign, Users, ShoppingCart, Target, TrendingUp, TrendingDown } from 'lucide-react'
import Sparkline from './Sparkline.jsx'
import { formatKpi, pct } from '../../lib/format.js'

const ICONS = { dollar: DollarSign, users: Users, cart: ShoppingCart, target: Target }
const TONE = {
  accent: { bg: 'var(--accent-soft)', fg: 'var(--accent)' },
  info: { bg: 'var(--info-soft)', fg: 'var(--info)' },
  warning: { bg: 'var(--warning-soft)', fg: 'var(--warning)' },
  success: { bg: 'var(--success-soft)', fg: 'var(--success)' },
}

export default function KpiCard({ kpi }) {
  const Icon = ICONS[kpi.icon] || DollarSign
  const tone = TONE[kpi.tone] || TONE.accent
  const up = kpi.delta >= 0

  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-icon" style={{ background: tone.bg, color: tone.fg }}>
          <Icon size={22} />
        </div>
        <span className={`trend ${up ? 'up' : 'down'}`}>
          {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {pct(Math.abs(kpi.delta))}
        </span>
      </div>
      <div className="kpi-label">{kpi.label}</div>
      <div className="kpi-value">{formatKpi(kpi)}</div>
      <div className="kpi-foot">
        <span className="muted">vs. previous period</span>
      </div>
      <div className="kpi-spark">
        <Sparkline data={kpi.spark} stroke={tone.fg} />
      </div>
    </div>
  )
}
