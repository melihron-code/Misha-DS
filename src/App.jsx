import { Navigate, Route, Routes } from 'react-router-dom'
import DsDevPage from './pages/ds-dev/DsDevPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ds-dev/" replace />} />
      {/* /ds-dev/<foundation> and /ds-dev/atoms/<atom>; DsDevPage resolves the path. */}
      <Route path="/ds-dev/*" element={<DsDevPage />} />
      <Route path="*" element={<Navigate to="/ds-dev/" replace />} />
    </Routes>
  )
}

export default App
