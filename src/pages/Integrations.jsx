import { useState } from 'react'
import { Layers, Search, Check, Plug } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import Toggle from '../components/ui/Toggle.jsx'

const INTEGRATIONS = [
  { name: 'Slack', desc: 'Send alerts & digests to channels', cat: 'Comms', color: '#611f69', glyph: 'S', connected: true },
  { name: 'Stripe', desc: 'Sync payments and subscriptions', cat: 'Payments', color: '#635bff', glyph: '$', connected: true },
  { name: 'GitHub', desc: 'Track deploys and incidents', cat: 'Dev', color: '#24292f', glyph: '⌥', connected: true },
  { name: 'Salesforce', desc: 'Two-way CRM contact sync', cat: 'CRM', color: '#00a1e0', glyph: '☁', connected: false },
  { name: 'HubSpot', desc: 'Marketing automation pipeline', cat: 'Marketing', color: '#ff7a59', glyph: 'H', connected: false },
  { name: 'Segment', desc: 'Customer data pipeline events', cat: 'Data', color: '#52bd95', glyph: '∿', connected: true },
  { name: 'Snowflake', desc: 'Warehouse sync for raw events', cat: 'Data', color: '#29b5e8', glyph: '❄', connected: false },
  { name: 'Zapier', desc: 'Connect 5,000+ apps via zaps', cat: 'Automation', color: '#ff4f00', glyph: 'Z', connected: false },
  { name: 'Notion', desc: 'Publish reports to workspace', cat: 'Docs', color: '#0f172a', glyph: 'N', connected: true },
]

export default function Integrations() {
  const [items, setItems] = useState(INTEGRATIONS)
  const [q, setQ] = useState('')

  const filtered = items.filter(
    (i) => i.name.toLowerCase().includes(q.toLowerCase()) || i.cat.toLowerCase().includes(q.toLowerCase()),
  )
  const connectedCount = items.filter((i) => i.connected).length

  function toggle(name) {
    setItems((prev) => prev.map((i) => (i.name === name ? { ...i, connected: !i.connected } : i)))
  }

  return (
    <>
      <PageHeader
        icon={Layers}
        title="Integrations"
        subtitle={`${connectedCount} of ${items.length} integrations connected.`}
        crumbs={['Home', 'Workspace', 'Integrations']}
        actions={
          <div className="search-inline" style={{ maxWidth: 240 }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search integrations…" />
          </div>
        }
      />

      <div className="grid grid-3 stagger">
        {filtered.map((it) => (
          <Card key={it.name} hoverable>
            <div className="card-body">
              <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
                <div
                  className="brand-mark"
                  style={{ background: it.color, width: 46, height: 46, fontSize: 20, fontWeight: 800 }}
                >
                  {it.glyph}
                </div>
                {it.connected ? (
                  <span className="badge success"><Check size={13} /> Connected</span>
                ) : (
                  <span className="badge neutral">Not connected</span>
                )}
              </div>
              <strong style={{ fontSize: 16 }}>{it.name}</strong>
              <p className="muted" style={{ margin: '6px 0 16px', minHeight: 34 }}>{it.desc}</p>
              <div className="flex items-center justify-between">
                <span className="badge neutral">{it.cat}</span>
                <Toggle on={it.connected} onChange={() => toggle(it.name)} />
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <Card className="span-3">
            <div className="card-body" style={{ textAlign: 'center', padding: 50 }}>
              <Plug size={32} style={{ color: 'var(--text-muted)' }} />
              <p className="muted" style={{ marginTop: 10 }}>No integrations match “{q}”.</p>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
