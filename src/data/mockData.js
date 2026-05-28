// ============================================================
// Mock data engine — deterministic-ish generators that produce
// realistic looking analytics data for the dashboard.
// ============================================================

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

// Mulberry32 seeded PRNG for repeatable base data.
export function makeRng(seed = 1337) {
  let a = seed >>> 0
  return function rng() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = makeRng(20260528)

export function rand(min, max) {
  return min + Math.random() * (max - min)
}
export function randInt(min, max) {
  return Math.floor(rand(min, max + 1))
}
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ---------- Revenue / time series ----------
export function buildRevenueSeries() {
  let rev = 42000
  let exp = 28000
  return MONTHS.map((m) => {
    rev += (rng() - 0.35) * 9000
    exp += (rng() - 0.42) * 6000
    rev = Math.max(20000, rev)
    exp = Math.max(12000, Math.min(exp, rev * 0.92))
    return {
      label: m,
      revenue: Math.round(rev),
      expenses: Math.round(exp),
      profit: Math.round(rev - exp),
    }
  })
}

export function buildVisitorSeries(points = 30) {
  const out = []
  let base = 8200
  for (let i = points - 1; i >= 0; i--) {
    base += (rng() - 0.48) * 1400
    base = Math.max(3000, base)
    const d = new Date()
    d.setDate(d.getDate() - i)
    out.push({
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      visitors: Math.round(base),
      sessions: Math.round(base * (1.3 + rng() * 0.4)),
      bounce: Math.round(34 + rng() * 22),
    })
  }
  return out
}

// ---------- Traffic sources (donut) ----------
export function buildTrafficSources() {
  return [
    { name: 'Organic Search', value: 4280, color: '#6366f1' },
    { name: 'Direct', value: 3120, color: '#8b5cf6' },
    { name: 'Social', value: 2240, color: '#ec4899' },
    { name: 'Referral', value: 1480, color: '#f59e0b' },
    { name: 'Email', value: 980, color: '#10b981' },
  ]
}

// ---------- Sales by category (bar) ----------
export function buildCategorySales() {
  const cats = ['Electronics', 'Apparel', 'Home', 'Beauty', 'Sports', 'Toys', 'Grocery']
  return cats.map((c) => ({
    name: c,
    online: randInt(1200, 6800),
    retail: randInt(900, 4200),
  }))
}

// ---------- Performance radar ----------
export function buildRadar() {
  const axes = ['Speed', 'Reliability', 'UX', 'Security', 'Scale', 'Support']
  return axes.map((a) => ({
    metric: a,
    current: randInt(62, 98),
    target: 90,
  }))
}

// ---------- Funnel ----------
export function buildFunnel() {
  return [
    { stage: 'Visitors', value: 24800, color: '#6366f1' },
    { stage: 'Sign-ups', value: 12400, color: '#7c5cf0' },
    { stage: 'Activated', value: 6900, color: '#a855f7' },
    { stage: 'Paying', value: 3120, color: '#ec4899' },
    { stage: 'Retained', value: 2240, color: '#f43f5e' },
  ]
}

// ---------- Radial / goals ----------
export function buildGoals() {
  return [
    { name: 'Revenue', value: 78, fill: '#6366f1' },
    { name: 'New Users', value: 64, fill: '#8b5cf6' },
    { name: 'Retention', value: 91, fill: '#ec4899' },
    { name: 'NPS', value: 55, fill: '#f59e0b' },
  ]
}

// ---------- Activity heatmap (weeks x days) ----------
export function buildHeatmap(weeks = 24) {
  const grid = []
  for (let d = 0; d < 7; d++) {
    const row = []
    for (let w = 0; w < weeks; w++) {
      row.push(Math.round(rng() * rng() * 100))
    }
    grid.push(row)
  }
  return { grid, days: DAYS, weeks }
}

// ---------- Users / customers table ----------
const FIRST = ['Ava', 'Liam', 'Mia', 'Noah', 'Zoe', 'Ethan', 'Aria', 'Kai', 'Luna', 'Leo', 'Nora', 'Eli', 'Maya', 'Owen', 'Ivy', 'Finn', 'Ada', 'Jude', 'Cleo', 'Ray']
const LAST = ['Chen', 'Patel', 'Garcia', 'Kim', 'Müller', 'Silva', 'Okafor', 'Rossi', 'Nguyen', 'Haddad', 'Ivanov', 'Tanaka', 'Brown', 'Costa', 'Singh', 'Lopez', 'Adeyemi', 'Park', 'Dubois', 'Yilmaz']
const COUNTRIES = [
  ['United States', '🇺🇸'], ['Germany', '🇩🇪'], ['Japan', '🇯🇵'], ['Brazil', '🇧🇷'],
  ['India', '🇮🇳'], ['United Kingdom', '🇬🇧'], ['France', '🇫🇷'], ['Canada', '🇨🇦'],
  ['Australia', '🇦🇺'], ['Nigeria', '🇳🇬'], ['South Korea', '🇰🇷'], ['Spain', '🇪🇸'],
]
const PLANS = ['Free', 'Pro', 'Team', 'Enterprise']
const STATUSES = ['active', 'trial', 'churned', 'invited']

export function buildUsers(n = 64) {
  const out = []
  for (let i = 0; i < n; i++) {
    const fn = FIRST[Math.floor(rng() * FIRST.length)]
    const ln = LAST[Math.floor(rng() * LAST.length)]
    const country = COUNTRIES[Math.floor(rng() * COUNTRIES.length)]
    const plan = PLANS[Math.floor(rng() * PLANS.length)]
    const status = STATUSES[Math.floor(rng() * rng() * STATUSES.length)]
    const mrr = plan === 'Free' ? 0 : { Pro: 29, Team: 99, Enterprise: 499 }[plan]
    out.push({
      id: 1000 + i,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
      country: country[0],
      flag: country[1],
      plan,
      status,
      mrr,
      spend: Math.round(rng() * 9800),
      sessions: Math.round(rng() * 480),
      lastSeen: `${randInt(1, 59)}m ago`,
      initials: fn[0] + ln[0],
    })
  }
  return out
}

// ---------- Orders / transactions ----------
const PRODUCTS = ['Quantum Headset', 'Nebula Keyboard', 'Aurora Monitor', 'Flux Charger', 'Pulse Watch', 'Helix Router', 'Vortex Mouse', 'Echo Speaker', 'Prism Webcam', 'Comet SSD']
const ORDER_STATUS = ['paid', 'pending', 'refunded', 'shipped']

export function buildOrders(n = 40) {
  const out = []
  for (let i = 0; i < n; i++) {
    const status = ORDER_STATUS[Math.floor(rng() * rng() * ORDER_STATUS.length)]
    out.push({
      id: `#ORD-${(48210 - i).toString()}`,
      product: PRODUCTS[Math.floor(rng() * PRODUCTS.length)],
      customer: `${FIRST[Math.floor(rng() * FIRST.length)]} ${LAST[Math.floor(rng() * LAST.length)][0]}.`,
      qty: randInt(1, 6),
      amount: Math.round(rng() * 1900 + 40),
      status,
      date: `2026-05-${(28 - (i % 27)).toString().padStart(2, '0')}`,
    })
  }
  return out
}

// ---------- Top products ----------
export function buildTopProducts() {
  return PRODUCTS.slice(0, 6)
    .map((p) => ({
      name: p,
      units: randInt(420, 3800),
      revenue: randInt(18000, 142000),
      change: Math.round(rand(-18, 32)),
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

// ---------- Geographic distribution ----------
export function buildGeo() {
  return COUNTRIES.slice(0, 8)
    .map(([name, flag]) => ({
      name,
      flag,
      users: randInt(1800, 28000),
      share: 0,
    }))
    .sort((a, b) => b.users - a.users)
    .map((r, _, arr) => {
      const total = arr.reduce((s, x) => s + x.users, 0)
      return { ...r, share: Math.round((r.users / total) * 100) }
    })
}

// ---------- Activity feed ----------
const ACTIVITY_TEMPLATES = [
  { type: 'sale', text: (n) => `<b>${n}</b> purchased the <b>Team</b> plan`, icon: 'cart' },
  { type: 'signup', text: (n) => `<b>${n}</b> created a new account`, icon: 'user' },
  { type: 'alert', text: () => `API latency spiked to <b>320ms</b> in <b>eu-west-1</b>`, icon: 'alert' },
  { type: 'deploy', text: () => `Deployment <b>v2.14.0</b> shipped to production`, icon: 'rocket' },
  { type: 'review', text: (n) => `<b>${n}</b> left a <b>5★</b> review`, icon: 'star' },
  { type: 'refund', text: (n) => `Refund issued to <b>${n}</b> — <b>$129</b>`, icon: 'refund' },
]

export function buildActivity(n = 8) {
  const out = []
  for (let i = 0; i < n; i++) {
    const tpl = ACTIVITY_TEMPLATES[Math.floor(rng() * ACTIVITY_TEMPLATES.length)]
    const name = `${FIRST[Math.floor(rng() * FIRST.length)]} ${LAST[Math.floor(rng() * LAST.length)][0]}.`
    out.push({
      id: `act-${Date.now()}-${i}`,
      type: tpl.type,
      icon: tpl.icon,
      html: tpl.text(name),
      time: `${randInt(1, 58)} min ago`,
    })
  }
  return out
}

export function makeActivityEvent() {
  const tpl = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)]
  const name = `${pick(FIRST)} ${pick(LAST)[0]}.`
  return {
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: tpl.type,
    icon: tpl.icon,
    html: tpl.text(name),
    time: 'just now',
  }
}

// ---------- KPI definitions ----------
export function buildKpis() {
  const mkSpark = (base, vol) => {
    const a = []
    let v = base
    for (let i = 0; i < 16; i++) {
      v += (rng() - 0.45) * vol
      a.push({ v: Math.max(1, Math.round(v)) })
    }
    return a
  }
  return [
    {
      key: 'revenue',
      label: 'Total Revenue',
      value: 284920,
      prefix: '$',
      delta: 12.4,
      icon: 'dollar',
      tone: 'accent',
      spark: mkSpark(40, 12),
    },
    {
      key: 'users',
      label: 'Active Users',
      value: 38214,
      delta: 8.1,
      icon: 'users',
      tone: 'info',
      spark: mkSpark(30, 9),
    },
    {
      key: 'orders',
      label: 'Orders',
      value: 9648,
      delta: -3.2,
      icon: 'cart',
      tone: 'warning',
      spark: mkSpark(50, 14),
    },
    {
      key: 'conversion',
      label: 'Conversion Rate',
      value: 4.82,
      suffix: '%',
      delta: 1.9,
      icon: 'target',
      tone: 'success',
      spark: mkSpark(20, 6),
    },
  ]
}

export const META = { MONTHS, DAYS, PRODUCTS, COUNTRIES }
