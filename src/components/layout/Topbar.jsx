import { useEffect, useRef, useState } from 'react'
import {
  Search,
  Bell,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Maximize2,
  HelpCircle,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useData } from '../../context/DataContext.jsx'

export default function Topbar({ onToggleCollapse, collapsed, onMobileMenu }) {
  const { theme, toggleTheme } = useTheme()
  const { live, toggleLive, liveVisitors } = useData()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="topbar">
      <button className="icon-btn menu-toggle" onClick={onMobileMenu} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <button
        className="icon-btn"
        onClick={onToggleCollapse}
        aria-label="Toggle sidebar"
        style={{ display: 'grid' }}
      >
        {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
      </button>

      <div className="topbar-search">
        <Search size={17} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search metrics, users, orders…"
        />
        <kbd>⌘K</kbd>
      </div>

      <div className="topbar-spacer" />

      <button
        className="live-pill"
        onClick={toggleLive}
        title={live ? 'Live updates on' : 'Live updates paused'}
        style={{ opacity: live ? 1 : 0.5, border: 'none' }}
      >
        <span className="live-pulse" style={{ animationPlayState: live ? 'running' : 'paused' }} />
        {live ? `${liveVisitors.toLocaleString()} online` : 'Paused'}
      </button>

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Help">
          <HelpCircle size={19} />
        </button>
        <button
          className="icon-btn"
          onClick={() => document.documentElement.requestFullscreen?.().catch(() => {})}
          aria-label="Fullscreen"
        >
          <Maximize2 size={18} />
        </button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <span className="notif-dot" />
        </button>

        <button className="profile-chip">
          <div className="avatar">KW</div>
          <div className="profile-meta">
            <strong>Kavalan W.</strong>
            <span>Administrator</span>
          </div>
        </button>
      </div>
    </header>
  )
}
