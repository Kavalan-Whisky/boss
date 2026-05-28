import { useData } from '../../context/DataContext.jsx'

export default function RangePicker() {
  const { range, setRange, ranges } = useData()
  return (
    <div className="segmented" role="tablist" aria-label="Date range">
      {ranges.map((r) => (
        <button
          key={r.key}
          role="tab"
          aria-selected={range === r.key}
          className={range === r.key ? 'active' : ''}
          onClick={() => setRange(r.key)}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}
