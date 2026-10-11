import { Route, Routes } from 'react-router-dom'
import CampaignPage from './pages/CampaignPage'
import CampaignPublishedPage from './pages/CampaignPublishedPage'
import DsDevPage from './pages/ds-dev/DsDevPage'
import EmployeesPage from './pages/EmployeesPage'
import HomePage from './pages/HomePage'
import JobDescriptionPage from './pages/JobDescriptionPage'
import NegotiatePage from './pages/NegotiatePage'
import NewCampaignPage from './pages/NewCampaignPage'
import NotFoundPage from './pages/NotFoundPage'
import PersonPage from './pages/PersonPage'
import TeamCampaignsPage from './pages/TeamCampaignsPage'
import TeamPage from './pages/TeamPage'
import TemplatesPage from './pages/TemplatesPage'
import SiteLayout from './site/SiteLayout'

// The site map: docs/sitemap.md. Static segments win over dynamic ones (campaigns/new before :campaignId).
function App() {
  return (
    <Routes>
      {/* The design system docs: /ds-dev/<foundation>, /ds-dev/atoms/<atom>…; DsDevPage resolves the path. */}
      <Route path="/ds-dev/*" element={<DsDevPage />} />
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="teams/:teamId" element={<TeamPage />} />
        <Route path="teams/:teamId/campaigns" element={<TeamCampaignsPage />} />
        <Route path="campaigns/new" element={<NewCampaignPage />} />
        <Route path="campaigns/new/job-description" element={<JobDescriptionPage />} />
        <Route path="campaigns/new/published" element={<CampaignPublishedPage />} />
        <Route path="campaigns/:campaignId" element={<CampaignPage />} />
        <Route path="people/:personId" element={<PersonPage />} />
        <Route path="people/:personId/negotiate" element={<NegotiatePage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
