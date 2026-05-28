// Number / value formatting helpers shared across the dashboard.

export function compact(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  const abs = Math.abs(n)
  if (abs >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (abs >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(Math.round(n))
}

export function comma(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return Math.round(n).toLocaleString('en-US')
}

export function currency(n, { compact: c = false } = {}) {
  if (c) return '$' + compact(n)
  return '$' + comma(n)
}

export function pct(n, digits = 1) {
  return `${n > 0 ? '+' : ''}${n.toFixed(digits)}%`
}

export function formatKpi(k) {
  const { value, prefix = '', suffix = '' } = k
  if (suffix === '%') return `${prefix}${value.toFixed(2)}${suffix}`
  return `${prefix}${compact(value)}${suffix}`
}
