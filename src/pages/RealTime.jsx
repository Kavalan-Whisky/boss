import { useEffect, useRef, useState } from 'react'
import { Activity, Cpu, Server, Wifi, Globe2, Zap } from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
  Tooltip,
} from 'recharts'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Card, CardHead } from '../components/ui/Card.jsx'
import ActivityFeed from '../components/widgets/ActivityFeed.jsx'
import ChartTooltip from '../components/charts/ChartTooltip.jsx'
import { useData } from '../context/DataContext.jsx'
import { comma } from '../lib/format.js'

const PAGES = [
  { path: '/pricing', label: 'Pricing' },
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/blog/launch', label: 'Blog · Launch' },
  { path: '/checkout', label: 'Checkout' },
  { path: '/docs/api', label: 'Docs · API' },
]

function useMetric(initial, vol, min, max) {
  const [v, setV] = useState(initial)
  const { live } = useData()
  const liveRef = useRef(live)
  liveRef.current = live
  useEffect(() => {
    const id = setInterval(() => {
      if (!liveRef.current) return
      setV((p) => Math.min(max, Math.max(min, p + (Math.random() - 0.5) * vol)))
    }, 1500)
    return () => clearInterval(id)
  }, [vol, min, max])
  return Math.round(v)
}

function Gauge({ icon: Icon, label, value, suffix, tone, max = 100 }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <Card className="card-pad" hoverable>
      <div className="flex items-center gap-12" style={{ marginBottom: 14 }}>
        <div className="kpi-icon" style={{ width: 38, height: 38, background: `var(--${tone}-soft)`, color: `var(--${tone})` }}>
          <Icon size={19} />
        </div>
        <div>
          <div className="kpi-label">{label}</div>
          <div style={{ fontSize: 22, fontWeight: 800 }} className="mono">
            {value}
            <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{suffix}</span>
          </div>
        </div>
      </div>
      <div className="progress">
        <span style={{ width: `${pct}%`, background: `linear-gradient(90deg, var(--${tone}), color-mix(in srgb, var(--${tone}) 55%, transparent))` }} />
      </div>
    </Card>
  )
}

export default function RealTime() {
  const { liveVisitors, live } = useData()
  const [buffer, setBuffer] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({ t: i, v: 900 + Math.round(Math.random() * 500) })),
  )
  const liveRef = useRef(live)
  liveRef.current = live

  useEffect(() => {
    const id = setInterval(() => {
      if (!liveRef.current) return
      setBuffer((prev) => {
        const last = prev[prev.length - 1]
        const next = Math.max(400, last.v + (Math.random() - 0.47) * 160)
        return [...prev.slice(1), { t: last.t + 1, v: Math.round(next) }]
      })
    }, 1200)
    return () => clearInterval(id)
  }, [])

  const cpu = useMetric(42, 14, 8, 96)
  const mem = useMetric(63, 8, 30, 94)
  const rps = useMetric(1840, 320, 400, 4200)
  const latency = useMetric(118, 40, 40, 480)

  return (
    <>
      <PageHeader
        icon={Activity}
        title="Real-time Monitor"
        subtitle="Live operational telemetry, refreshed every second."
        crumbs={['Home', 'Analytics', 'Real-time']}
        actions={
          <span className="live-pill" style={{ fontSize: 13, padding: '7px 14px' }}>
            <span className="live-pulse" style={{ animationPlayState: live ? 'running' : 'paused' }} />
            {live ? 'Streaming' : 'Paused'}
          </span>
        }
      />

      <div className="grid grid-12 stagger">
        <Card className="span-4" hoverable>
          <div className="card-body" style={{ textAlign: 'center', padding: '30px 22px' }}>
            <div className="kpi-label">Active visitors right now</div>
            <div style={{ fontSize: 54, fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1 }} className="mono">
              {comma(liveVisitors)}
            </div>
            <span className="badge success" style={{ marginTop: 8 }}>
              <span className="dot" style={{ background: 'var(--success)' }} /> +{Math.round(liveVisitors * 0.04)} in last min
            </span>
            <div style={{ height: 90, marginTop: 16 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={buffer} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gLive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    name="Visitors"
                    stroke="var(--accent)"
                    strokeWidth={2}
                    fill="url(#gLive)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card className="span-8" hoverable>
          <CardHead title="Top Active Pages" hint="Visitors currently viewing" menu={false} />
          <div className="card-body" style={{ paddingTop: 8 }}>
            {PAGES.map((p, i) => {
              const active = Math.round((liveVisitors / (i + 2)) * (0.4 + Math.random() * 0.3))
              const max = liveVisitors / 2
              return (
                <div key={p.path} className="stat-row">
                  <div className="label" style={{ flex: 1 }}>
                    <Globe2 size={16} style={{ color: 'var(--text-muted)' }} />
                    <div style={{ flex: 1 }}>
                      <div className="flex items-center justify-between" style={{ marginBottom: 5 }}>
                        <span>
                          <strong style={{ fontSize: 13.5 }}>{p.label}</strong>{' '}
                          <span className="mono muted">{p.path}</span>
                        </span>
                        <b className="mono">{comma(active)}</b>
                      </div>
                      <div className="progress" style={{ height: 6 }}>
                        <span style={{ width: `${Math.min(100, (active / max) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-kpi mt-20 stagger">
        <Gauge icon={Cpu} label="CPU Usage" value={cpu} suffix="%" tone="accent" />
        <Gauge icon={Server} label="Memory" value={mem} suffix="%" tone="info" />
        <Gauge icon={Zap} label="Requests / sec" value={rps} suffix="" tone="success" max={4200} />
        <Gauge icon={Wifi} label="P95 Latency" value={latency} suffix="ms" tone="warning" max={480} />
      </div>

      <div className="grid grid-12 mt-20">
        <Card className="span-12">
          <CardHead title="Live Event Stream" menu={false} action={<span className="muted">auto-scrolling</span>} />
          <div className="card-body" style={{ paddingTop: 4, paddingBottom: 4 }}>
            <ActivityFeed limit={8} />
          </div>
        </Card>
      </div>
    </>
  )
}
