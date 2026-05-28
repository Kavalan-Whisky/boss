import { useMemo, useState } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Download } from 'lucide-react'

export default function DataTable({
  columns,
  rows,
  pageSize = 8,
  searchKeys = [],
  initialSort,
  toolbar = true,
  exportName = 'export',
}) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(initialSort || { key: null, dir: 'asc' })
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return rows
    const q = query.toLowerCase()
    return rows.filter((r) =>
      (searchKeys.length ? searchKeys : Object.keys(r)).some((k) =>
        String(r[k] ?? '').toLowerCase().includes(q),
      ),
    )
  }, [rows, query, searchKeys])

  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, totalPages)
  const pageRows = sorted.slice((current - 1) * pageSize, current * pageSize)

  function toggleSort(key) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'asc' },
    )
    setPage(1)
  }

  function exportCsv() {
    const header = columns.map((c) => c.label).join(',')
    const lines = sorted.map((r) =>
      columns.map((c) => `"${String(r[c.key] ?? '').replace(/"/g, '""')}"`).join(','),
    )
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${exportName}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const pageButtons = useMemo(() => {
    const out = []
    const add = (n) => out.push(n)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i)
    } else {
      add(1)
      if (current > 3) add('…')
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) add(i)
      if (current < totalPages - 2) add('…')
      add(totalPages)
    }
    return out
  }, [totalPages, current])

  return (
    <div>
      {toolbar && (
        <div className="table-toolbar">
          <div className="search-inline">
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(1)
              }}
              placeholder="Filter rows…"
            />
          </div>
          <div className="topbar-spacer" />
          <span className="muted">{sorted.length} records</span>
          <button className="btn sm" onClick={exportCsv}>
            <Download size={15} /> Export CSV
          </button>
        </div>
      )}

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={c.sortable === false ? '' : 'sortable'}
                  style={{ textAlign: c.align || 'left' }}
                  onClick={() => c.sortable !== false && toggleSort(c.key)}
                >
                  <span
                    className="flex items-center gap-8"
                    style={{ justifyContent: c.align === 'right' ? 'flex-end' : 'flex-start' }}
                  >
                    {c.label}
                    {c.sortable !== false &&
                      (sort.key === c.key ? (
                        sort.dir === 'asc' ? (
                          <ChevronUp size={13} />
                        ) : (
                          <ChevronDown size={13} />
                        )
                      ) : (
                        <ChevronsUpDown size={13} style={{ opacity: 0.4 }} />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, i) => (
              <tr key={r.id ?? i}>
                {columns.map((c) => (
                  <td key={c.key} style={{ textAlign: c.align || 'left' }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: 40 }}>
                  <span className="muted">No records match “{query}”.</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="muted">
          Page {current} of {totalPages}
        </span>
        <div className="page-btns">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={current === 1}>
            <ChevronLeft size={16} />
          </button>
          {pageButtons.map((n, i) =>
            n === '…' ? (
              <button key={`e${i}`} disabled style={{ border: 'none' }}>
                …
              </button>
            ) : (
              <button
                key={n}
                className={n === current ? 'active' : ''}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ),
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
