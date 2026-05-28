import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  LineChart,
  ShoppingBag,
  Users,
  FileBarChart,
  Activity,
  Settings,
  Sparkles,
  Layers,
  Globe2,
} from 'lucide-react'

const NAV = [
  {
    section: 'Analytics',
    items: [
      { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
      { to: '/analytics', label: 'Analytics', icon: LineChart, badge: 'Live' },
      { to: '/realtime', label: 'Real-time', icon: Activity },
    ],
  },
  {
    section: 'Operations',
    items: [
      { to: '/sales', label: 'Sales', icon: ShoppingBag },
      { to: '/customers', label: 'Customers', icon: Users, badge: '64' },
      { to: '/geography', label: 'Geography', icon: Globe2 },
    ],
  },
  {
    section: 'Workspace',
    items: [
      { to: '/reports', label: 'Reports', icon: FileBarChart },
      { to: '/integrations', label: 'Integrations', icon: Layers },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <Sparkles size={20} />
        </div>
        <div className="brand-text">
          <strong>BOSS</strong>
          <span>Command Center</span>
        </div>
      </div>

      <nav className="nav-list">
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="nav-section-label">{group.section}</div>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                  <Icon size={19} />
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <h4>Upgrade to Enterprise</h4>
          <p>Unlock unlimited seats, SSO and dedicated support.</p>
          <button className="btn primary sm" style={{ width: '100%' }}>
            <Sparkles size={15} /> Upgrade plan
          </button>
        </div>
      </div>
    </aside>
  )
}
