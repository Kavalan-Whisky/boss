import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Overview from './pages/Overview.jsx'
import Analytics from './pages/Analytics.jsx'
import RealTime from './pages/RealTime.jsx'
import Sales from './pages/Sales.jsx'
import Customers from './pages/Customers.jsx'
import Geography from './pages/Geography.jsx'
import Reports from './pages/Reports.jsx'
import Integrations from './pages/Integrations.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="realtime" element={<RealTime />} />
        <Route path="sales" element={<Sales />} />
        <Route path="customers" element={<Customers />} />
        <Route path="geography" element={<Geography />} />
        <Route path="reports" element={<Reports />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
