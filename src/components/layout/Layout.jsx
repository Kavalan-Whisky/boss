import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <div
      className={`app-shell${collapsed ? ' collapsed' : ''}${mobileOpen ? ' mobile-open' : ''}`}
    >
      <Sidebar onNavigate={() => setMobileOpen(false)} />
      <div className="scrim" onClick={() => setMobileOpen(false)} />
      <div className="main-region">
        <Topbar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onMobileMenu={() => setMobileOpen((o) => !o)}
        />
        <main className="content-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
