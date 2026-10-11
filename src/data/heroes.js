import campaignPhoto768 from '../assets/hero/campaign-photo-768.webp'
import campaignPhoto1536 from '../assets/hero/campaign-photo-1536.webp'
import { nbsp } from '../lib/nbsp'

// Hero content (Figma: HeroCard on the candidate, campaign and all-teams screens).
const teams = ['frontend-team', 'backend-team', 'design-team']
const labs = ['Innovation Lab', 'Platform Lab', 'Research Lab']
const roles = ['Lead Developer', 'Senior Developer', 'Developer']
const memberships = ['Member', 'Admin', 'Guest']
const levels = ['Level 1 (Code Green)', 'Level 2 (Code Blue)', 'Level 3 (Code Orange)', 'Level 4 (Code Red)']

// HeroCard "with bg": a candidate (candidate, candidate-interviewed, negotiate).
export const candidateHero = {
  title: 'Sarah Mitchell',
  subtitle: 'Senior Software Engineer',
  labels: { start: 'Teams', end: 'Access' },
  // Promote is the CTA (primary-sm); the others on-color.
  actions: [{ label: 'Promote', variant: 'primary-sm' }, { label: 'Negotiate' }, { label: 'Suspend' }, { label: 'Fire' }],
  tags: [
    { label: 'Team', value: 'frontend-team', options: teams },
    { label: 'Lab', value: 'Innovation Lab', options: labs },
    { label: 'Role', value: 'Lead Developer', options: roles },
    { label: 'Membership', value: 'Member', options: memberships },
  ],
  endTags: [{ label: 'Access level', value: 'Level 4 (Code Red)', options: levels }],
}

// HeroCard "with bg": a campaign (hiring-campaign).
// The page sets the title (the campaign's name) and the subtitle (its status). Finish is the CTA. Its own photo
// (Figma: a different one from the candidate's), WebP at 768 and 1536 (npm run images).
export const campaignHero = {
  title: nbsp('Senior Frontend Developer Campaign'),
  subtitle: 'Active campaign',
  labels: { start: 'Docs', end: '' },
  actions: [{ label: 'Finish', variant: 'primary-sm' }, { label: 'Cancel' }],
  image: { src: campaignPhoto1536, srcSet: `${campaignPhoto768} 768w, ${campaignPhoto1536} 1536w`, width: 1536, height: 864 },
  tags: [{ label: 'Docs', value: 'Docs for designers', options: ['Docs for designers', 'Docs for developers'] }],
  endTags: [],
}

// The Homepage hero (Figma: HeroCard variant "Homepage": three primary-lg buttons, no team switcher).
export const homeHero = {
  title: 'Hired & Wired',
  subtitle: nbsp('Get most of the hiring and wiring today'),
  actions: [{ label: 'All teams' }, { label: 'All templates' }, { label: 'New campaign' }],
}

// HeroCard "no bg" inside HeroSection (all-teams screens).
export const teamsHero = {
  title: 'All teams',
  subtitle: nbsp('Overview of all teams and their performance metrics'),
  actions: [{ label: 'Add team' }],
  teams: [
    { value: 'overview', label: 'Overview' },
    { value: 'employees', label: 'Employees' },
    { value: 'report', label: 'Report' },
  ],
  team: 'overview',
}

// The all-teams screens share one hero; each page selects its own view.
export const employeesHero = { ...teamsHero, actions: [{ label: 'Add employee' }], team: 'employees' }

// HeroCard "no bg" for one team (all-teams-one, all-teams-campaigns): the title is the team's name.
const teamViews = [
  { value: 'team', label: 'Team' },
  { value: 'campaigns', label: 'Campaigns' },
  { value: 'access', label: 'Access' },
]
export const teamHero = name => ({
  title: name,
  subtitle: nbsp('Detailed team overview and performance metrics'),
  actions: [],
  teams: teamViews,
  team: 'team',
})
export const teamCampaignsHero = name => ({ ...teamHero(name), actions: [{ label: 'Add campaign' }], team: 'campaigns' })

// HeroCard "no bg" on all-teams-templates.
export const templatesHero = {
  title: 'All templates',
  subtitle: nbsp('Here you’ll find all templates'),
  actions: [{ label: 'Add new template' }],
  teams: [
    { value: 'all', label: 'All' },
    { value: 'automations', label: 'Automations' },
    { value: 'documents', label: 'Documents' },
    { value: 'access', label: 'Access' },
  ],
  team: 'all',
}
