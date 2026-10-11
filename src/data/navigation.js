// Navigation content (Figma: TopMenu, SubHeader). Organisms get it through props.

// TopMenu tabs; `id` is what TopMenu's activeTab refers to.
export const topMenuTabs = [
  { id: 'all-teams', label: 'All teams', href: '/teams' },
  { id: 'templates', label: 'All templates', href: '/templates' },
]

// TopMenu's links on the right.
export const userLinks = [
  { label: 'Profile', href: '/profile' },
  { label: 'Log out', href: '/logout' },
]

// SubHeader breadcrumbs, the last one is the current page.
export const breadcrumbs = {
  candidate: [
    { label: 'Home', href: '/' },
    { label: 'All teams', href: '/teams' },
    { label: 'Sarah Mitchell', href: '/candidates/sarah-mitchell' },
  ],
  campaign: [
    { label: 'Home', href: '/' },
    { label: 'Campaigns', href: '/campaigns' },
    { label: 'Senior Frontend Developer', href: '/campaigns/senior-frontend' },
  ],
  teams: [
    { label: 'Home', href: '/' },
    { label: 'All teams', href: '/teams' },
  ],
}
