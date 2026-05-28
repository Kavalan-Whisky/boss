import { TrendingUp, TrendingDown } from 'lucide-react'

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#6366f1,#ec4899)',
  'linear-gradient(135deg,#0ea5e9,#6366f1)',
  'linear-gradient(135deg,#10b981,#14b8a6)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#14b8a6,#0ea5e9)',
]

export function Avatar({ initials, seed = 0, size = 34 }) {
  const g = AVATAR_GRADIENTS[Math.abs(seed) % AVATAR_GRADIENTS.length]
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: g, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  )
}

const STATUS_MAP = {
  active: { cls: 'success', dot: 'var(--success)', label: 'Active' },
  paid: { cls: 'success', dot: 'var(--success)', label: 'Paid' },
  shipped: { cls: 'info', dot: 'var(--info)', label: 'Shipped' },
  trial: { cls: 'info', dot: 'var(--info)', label: 'Trial' },
  pending: { cls: 'warning', dot: 'var(--warning)', label: 'Pending' },
  invited: { cls: 'warning', dot: 'var(--warning)', label: 'Invited' },
  churned: { cls: 'danger', dot: 'var(--danger)', label: 'Churned' },
  refunded: { cls: 'danger', dot: 'var(--danger)', label: 'Refunded' },
}

export function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { cls: 'neutral', dot: 'var(--text-muted)', label: status }
  return (
    <span className={`badge ${s.cls}`}>
      <span className="dot" style={{ background: s.dot }} />
      {s.label}
    </span>
  )
}

export function TrendPill({ value, suffix = '%' }) {
  const up = value >= 0
  return (
    <span className={`trend ${value === 0 ? 'flat' : up ? 'up' : 'down'}`}>
      {value !== 0 && (up ? <TrendingUp size={13} /> : <TrendingDown size={13} />)}
      {value > 0 ? '+' : ''}
      {value}
      {suffix}
    </span>
  )
}

export function PlanBadge({ plan }) {
  const map = {
    Free: 'neutral',
    Pro: 'info',
    Team: 'success',
    Enterprise: 'warning',
  }
  return <span className={`badge ${map[plan] || 'neutral'}`}>{plan}</span>
}
