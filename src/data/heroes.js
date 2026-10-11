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
  actions: [{ label: 'Promote' }, { label: 'Negotiate' }, { label: 'Suspend' }, { label: 'Fire' }],
  tags: [
    { label: 'Team', value: 'frontend-team', options: teams },
    { label: 'Lab', value: 'Innovation Lab', options: labs },
    { label: 'Role', value: 'Lead Developer', options: roles },
    { label: 'Membership', value: 'Member', options: memberships },
  ],
  endTags: [{ label: 'Access level', value: 'Level 4 (Code Red)', options: levels }],
}

// HeroCard "with bg": a campaign (hiring-campaign).
export const campaignHero = {
  title: nbsp('Senior Frontend Developer Campaign'),
  subtitle: 'Active campaign',
  labels: { start: 'Campaign', end: 'Access' },
  actions: [{ label: 'Finish' }, { label: 'Cancel' }],
  tags: [{ label: 'Docs', value: 'Docs for designers', options: ['Docs for designers', 'Docs for developers'] }],
  endTags: [],
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
