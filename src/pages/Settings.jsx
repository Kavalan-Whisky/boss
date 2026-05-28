import { useState } from 'react'
import { Settings as SettingsIcon, Sun, Moon, Monitor, Save } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import Toggle from '../components/ui/Toggle.jsx'
import { Avatar } from '../components/ui/bits.jsx'
import { useTheme, ACCENTS } from '../context/ThemeContext.jsx'

export default function Settings() {
  const { theme, setTheme, accent, setAccent } = useTheme()
  const [prefs, setPrefs] = useState({
    liveUpdates: true,
    emailDigest: true,
    desktopNotif: false,
    compactTables: false,
    betaFeatures: true,
    twoFactor: true,
  })

  const set = (k) => () => setPrefs((p) => ({ ...p, [k]: !p[k] }))

  const themeModes = [
    { key: 'dark', label: 'Dark', icon: Moon },
    { key: 'light', label: 'Light', icon: Sun },
    { key: 'dark', label: 'System', icon: Monitor },
  ]

  return (
    <>
      <PageHeader
        icon={SettingsIcon}
        title="Settings"
        subtitle="Manage your workspace, appearance and preferences."
        crumbs={['Home', 'Workspace', 'Settings']}
        actions={<button className="btn primary"><Save size={16} /> Save changes</button>}
      />

      <div className="grid grid-12 stagger">
        <Card className="span-8" hoverable>
          <CardHead title="Appearance" hint="Customise the look and feel" menu={false} />
          <div className="card-body">
            <div className="setting-row">
              <div className="meta">
                <strong>Theme</strong>
                <p>Choose how BOSS looks to you.</p>
              </div>
              <div className="segmented">
                {themeModes.map((m, i) => {
                  const Icon = m.icon
                  const active = i < 2 && theme === m.key
                  return (
                    <button
                      key={m.label}
                      className={active ? 'active' : ''}
                      onClick={() => setTheme(m.key)}
                    >
                      <span className="flex items-center gap-8">
                        <Icon size={14} /> {m.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="setting-row">
              <div className="meta">
                <strong>Accent color</strong>
                <p>Used across charts, buttons and highlights.</p>
              </div>
              <div className="swatch-row">
                {Object.entries(ACCENTS).map(([key, c]) => (
                  <button
                    key={key}
                    className={`swatch${accent === key ? ' active' : ''}`}
                    style={{ background: `linear-gradient(135deg, ${c.accent}, ${c.accent3})` }}
                    onClick={() => setAccent(key)}
                    aria-label={key}
                  />
                ))}
              </div>
            </div>

            <div className="setting-row">
              <div className="meta">
                <strong>Compact tables</strong>
                <p>Reduce row height to fit more data on screen.</p>
              </div>
              <Toggle on={prefs.compactTables} onChange={set('compactTables')} />
            </div>
          </div>
        </Card>

        <Card className="span-4" hoverable>
          <CardHead title="Profile" menu={false} />
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block' }}>
              <Avatar initials="KW" seed={4} size={76} />
            </div>
            <h3 style={{ marginTop: 14, fontSize: 18 }}>Kavalan Whisky</h3>
            <p className="muted">11354031@ntub.edu.tw</p>
            <span className="badge warning" style={{ marginTop: 10 }}>Enterprise · Admin</span>
            <button className="btn" style={{ width: '100%', marginTop: 18 }}>Edit profile</button>
          </div>
        </Card>
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-6" hoverable>
          <CardHead title="Notifications" menu={false} />
          <div className="card-body">
            {[
              ['liveUpdates', 'Live data updates', 'Stream real-time metrics into the dashboard.'],
              ['emailDigest', 'Weekly email digest', 'A summary of key metrics every Monday.'],
              ['desktopNotif', 'Desktop notifications', 'Get alerted about anomalies and spikes.'],
            ].map(([key, title, desc]) => (
              <div className="setting-row" key={key}>
                <div className="meta">
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
                <Toggle on={prefs[key]} onChange={set(key)} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="span-6" hoverable>
          <CardHead title="Security & Labs" menu={false} />
          <div className="card-body">
            {[
              ['twoFactor', 'Two-factor authentication', 'Require a code at sign-in.'],
              ['betaFeatures', 'Beta features', 'Try experimental dashboards early.'],
            ].map(([key, title, desc]) => (
              <div className="setting-row" key={key}>
                <div className="meta">
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
                <Toggle on={prefs[key]} onChange={set(key)} />
              </div>
            ))}
            <div className="setting-row">
              <div className="meta">
                <strong>Danger zone</strong>
                <p>Permanently delete this workspace and all data.</p>
              </div>
              <button className="btn" style={{ color: 'var(--danger)', borderColor: 'var(--danger-soft)' }}>
                Delete workspace
              </button>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
