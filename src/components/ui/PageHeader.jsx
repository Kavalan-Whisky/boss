import { ChevronRight } from 'lucide-react'

export default function PageHeader({ title, subtitle, crumbs = [], icon: Icon, actions }) {
  return (
    <div className="page-head animate-in">
      <div>
        {crumbs.length > 0 && (
          <div className="breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                {i > 0 && <ChevronRight size={13} />}
                {c}
              </span>
            ))}
          </div>
        )}
        <h1>
          {Icon && <Icon size={26} style={{ color: 'var(--accent)' }} />}
          {title}
        </h1>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="flex items-center gap-12 wrap">{actions}</div>}
    </div>
  )
}
