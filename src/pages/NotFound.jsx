import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '70vh', textAlign: 'center' }}>
      <div className="animate-in">
        <div
          className="brand-mark"
          style={{ width: 76, height: 76, margin: '0 auto 20px', borderRadius: 22 }}
        >
          <Compass size={36} />
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-3px', lineHeight: 1 }}>404</h1>
        <p className="muted" style={{ fontSize: 16, margin: '12px 0 24px' }}>
          The page you're looking for drifted off the chart.
        </p>
        <Link to="/" className="btn primary">
          <ArrowLeft size={16} /> Back to Overview
        </Link>
      </div>
    </div>
  )
}
