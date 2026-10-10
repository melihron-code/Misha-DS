import { Navigate, Route, Routes } from 'react-router-dom'
import DsDevPage from './pages/ds-dev/DsDevPage'
import { SECTIONS } from './pages/ds-dev/sections'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ds-dev/" replace />} />
      <Route path="/ds-dev" element={<Navigate to={`/ds-dev/${SECTIONS[0].slug}`} replace />} />
      <Route path="/ds-dev/:section" element={<DsDevPage />} />
      <Route path="*" element={<Navigate to="/ds-dev/" replace />} />
    </Routes>
  )
}

export default App
