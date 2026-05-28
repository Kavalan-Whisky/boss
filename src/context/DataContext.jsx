import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import {
  buildRevenueSeries,
  buildVisitorSeries,
  buildTrafficSources,
  buildCategorySales,
  buildRadar,
  buildFunnel,
  buildGoals,
  buildHeatmap,
  buildUsers,
  buildOrders,
  buildTopProducts,
  buildGeo,
  buildActivity,
  buildKpis,
  makeActivityEvent,
} from '../data/mockData.js'

const DataContext = createContext(null)

const RANGES = [
  { key: '24h', label: '24h', mult: 0.32 },
  { key: '7d', label: '7d', mult: 0.7 },
  { key: '30d', label: '30d', mult: 1 },
  { key: '90d', label: '90d', mult: 2.4 },
  { key: '12m', label: '12m', mult: 7.8 },
]

export function DataProvider({ children }) {
  const [live, setLive] = useState(true)
  const [range, setRange] = useState('30d')
  const [tick, setTick] = useState(0)

  // Static-ish base datasets (seeded), generated once.
  const base = useMemo(
    () => ({
      revenue: buildRevenueSeries(),
      traffic: buildTrafficSources(),
      categories: buildCategorySales(),
      radar: buildRadar(),
      funnel: buildFunnel(),
      goals: buildGoals(),
      heatmap: buildHeatmap(),
      users: buildUsers(64),
      orders: buildOrders(42),
      products: buildTopProducts(),
      geo: buildGeo(),
    }),
    [],
  )

  const [kpis, setKpis] = useState(() => buildKpis())
  const [visitors, setVisitors] = useState(() => buildVisitorSeries(30))
  const [activity, setActivity] = useState(() => buildActivity(8))
  const [liveVisitors, setLiveVisitors] = useState(1284)

  const liveRef = useRef(live)
  liveRef.current = live

  // Live update loop — only mutates when `live` is on.
  useEffect(() => {
    const id = setInterval(() => {
      if (!liveRef.current) return
      setTick((t) => t + 1)

      setLiveVisitors((v) => Math.max(400, Math.round(v + (Math.random() - 0.48) * 90)))

      setKpis((prev) =>
        prev.map((k) => {
          const jitter = (Math.random() - 0.48) * (k.value * 0.004)
          const nextVal = Math.max(0, k.value + jitter)
          const spark = [...k.spark.slice(1), { v: Math.max(1, k.spark[k.spark.length - 1].v + (Math.random() - 0.45) * 8) }]
          const deltaDrift = k.delta + (Math.random() - 0.5) * 0.3
          return { ...k, value: nextVal, spark, delta: +deltaDrift.toFixed(1) }
        }),
      )

      setVisitors((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        next[next.length - 1] = {
          ...last,
          visitors: Math.max(2000, Math.round(last.visitors + (Math.random() - 0.45) * 220)),
          sessions: Math.max(2600, Math.round(last.sessions + (Math.random() - 0.45) * 260)),
        }
        return next
      })

      // Occasionally push a new activity event.
      if (Math.random() < 0.55) {
        setActivity((prev) => [makeActivityEvent(), ...prev].slice(0, 12))
      }
    }, 2400)
    return () => clearInterval(id)
  }, [])

  const rangeMult = useMemo(() => RANGES.find((r) => r.key === range)?.mult ?? 1, [range])

  // Range-scaled views of the base datasets.
  const scaled = useMemo(() => {
    const scale = (n) => Math.round(n * rangeMult)
    return {
      revenue: base.revenue.map((d) => ({
        ...d,
        revenue: scale(d.revenue),
        expenses: scale(d.expenses),
        profit: scale(d.profit),
      })),
      categories: base.categories.map((d) => ({
        ...d,
        online: scale(d.online),
        retail: scale(d.retail),
      })),
    }
  }, [base, rangeMult])

  const toggleLive = useCallback(() => setLive((v) => !v), [])

  const value = {
    live,
    setLive,
    toggleLive,
    range,
    setRange,
    ranges: RANGES,
    tick,
    kpis,
    visitors,
    activity,
    liveVisitors,
    ...base,
    revenue: scaled.revenue,
    categories: scaled.categories,
    rangeMult,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
