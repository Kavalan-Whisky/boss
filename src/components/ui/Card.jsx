import { MoreHorizontal } from 'lucide-react'

export function Card({ children, className = '', hoverable = false, style }) {
  return (
    <div className={`card${hoverable ? ' hoverable' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}

export function CardHead({ title, hint, icon: Icon, action, menu = true }) {
  return (
    <div className="card-head">
      <div>
        <h3>
          {Icon && <Icon size={18} style={{ color: 'var(--accent)' }} />}
          {title}
        </h3>
        {hint && <div className="hint">{hint}</div>}
      </div>
      <div className="flex items-center gap-8">
        {action}
        {menu && (
          <button className="icon-btn" aria-label="More" style={{ width: 34, height: 34 }}>
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
