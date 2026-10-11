import { tabsFor, topMenuTabs, userLinks } from '../data/navigation'
import { campaignById, teamById } from '../data/teams'

// Shared site settings: the name in the tab title, the routes, and the "no action yet" tooltip.
export const SITE_NAME = 'Hired & Wired'

// Shown on hover / keyboard focus on every button and link that doesn't lead anywhere yet.
export const NO_ACTION = 'No action for now'
export const noAction = item => ({ ...item, href: undefined, tooltip: NO_ACTION })

// A path with query parameters (empty ones left out).
const withQuery = (path, params = {}) => {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v))
  return q.size ? `${path}?${q}` : path
}

// Every route of the site (docs/sitemap.md). `from` keeps where a person was opened from
// ({ campaign }, { team } or { from: 'employees' }), so Back and the breadcrumbs lead there.
export const paths = {
  home: '/',
  allTeams: '/teams',
  employees: '/employees',
  templates: '/templates',
  team: id => `/teams/${id}`,
  teamCampaigns: id => `/teams/${id}/campaigns`,
  campaign: id => `/campaigns/${id}`,
  newCampaign: teamId => withQuery('/campaigns/new', { team: teamId }),
  jobDescription: teamId => withQuery('/campaigns/new/job-description', { team: teamId }),
  published: '/campaigns/new/published',
  person: (id, from) => withQuery(`/people/${id}`, from),
  negotiate: (id, from) => withQuery(`/people/${id}/negotiate`, from),
}

// TopMenu for a path: the current tab selected (the tab whose page the path is under; otherwise the first,
// All teams: every other page belongs to it, except the Homepage, where no tab is selected); the report button
// and user links have no action yet.
const currentTab = pathname => {
  if (pathname === paths.home) return null
  return (topMenuTabs.find(t => t.href !== paths.allTeams && pathname.startsWith(t.href)) ?? topMenuTabs[0]).id
}
export const topMenuFor = pathname => ({
  logoHref: paths.home,
  tabs: tabsFor(currentTab(pathname)),
  links: userLinks.map(noAction),
  reportTooltip: NO_ACTION,
})

export const HOME_CRUMB = { label: 'Home', href: paths.home }
export const ALL_TEAMS_CRUMB = { label: 'All teams', href: paths.allTeams }

// Where a person's page was opened from (?campaign=, ?from=employees or ?team=; an employee defaults to their team):
// `from` for links that keep it, and `parent` ({ label, href }) for Back and the breadcrumbs.
export const personContext = (person, params) => {
  const campaign = campaignById(params.get('campaign'))
  const team = campaign ? undefined : (teamById(params.get('team')) ?? (person.kind === 'employee' ? teamById(person.teamId) : undefined))
  if (campaign) return { from: { campaign: campaign.id }, parent: { label: campaign.title, href: paths.campaign(campaign.id) } }
  if (params.get('from') === 'employees') return { from: { from: 'employees' }, parent: { label: 'Employees', href: paths.employees } }
  if (team) return { from: { team: team.id }, parent: { label: team.name, href: paths.team(team.id) } }
  return { from: undefined, parent: undefined }
}
