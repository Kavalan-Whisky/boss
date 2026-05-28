import {
  ShoppingCart,
  UserPlus,
  AlertTriangle,
  Rocket,
  Star,
  RotateCcw,
} from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'

const ICONS = {
  cart: { Icon: ShoppingCart, bg: 'var(--accent-soft)', fg: 'var(--accent)' },
  user: { Icon: UserPlus, bg: 'var(--info-soft)', fg: 'var(--info)' },
  alert: { Icon: AlertTriangle, bg: 'var(--warning-soft)', fg: 'var(--warning)' },
  rocket: { Icon: Rocket, bg: 'var(--success-soft)', fg: 'var(--success)' },
  star: { Icon: Star, bg: 'var(--warning-soft)', fg: 'var(--warning)' },
  refund: { Icon: RotateCcw, bg: 'var(--danger-soft)', fg: 'var(--danger)' },
}

export default function ActivityFeed({ limit = 7 }) {
  const { activity } = useData()
  return (
    <div className="feed">
      {activity.slice(0, limit).map((a) => {
        const cfg = ICONS[a.icon] || ICONS.user
        const { Icon } = cfg
        return (
          <div className="feed-item" key={a.id}>
            <div className="feed-icon" style={{ background: cfg.bg, color: cfg.fg }}>
              <Icon size={18} />
            </div>
            <div className="feed-body">
              <p dangerouslySetInnerHTML={{ __html: a.html }} />
              <div className="feed-time">{a.time}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
