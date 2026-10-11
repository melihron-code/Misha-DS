// Navigation content (Figma: TopMenu, SubHeader). Organisms get it through props.

// TopMenu tabs. A page marks its own tab with `selected: true` (see tabsFor).
export const topMenuTabs = [
  { id: 'all-teams', label: 'All teams', href: '/teams' },
  { id: 'templates', label: 'All templates', href: '/templates' },
]

// The tabs with one of them selected (the current page); an unknown id selects none.
export const tabsFor = id => topMenuTabs.map(t => ({ ...t, selected: t.id === id }))

// TopMenu's links on the right. No pages for them yet, so no `href` (they're buttons; the site adds a tooltip).
export const userLinks = [{ label: 'Profile' }, { label: 'Log out' }]

// Sample breadcrumbs for the docs (the site builds its own per page), the last one is the current page.
export const breadcrumbs = {
  candidate: [
    { label: 'Home', href: '/' },
    { label: 'Forward Architect', href: '/campaigns/forward-architect' },
    { label: 'Sarah Mitchell', href: '/people/sarah-johnson' },
  ],
  campaign: [
    { label: 'Home', href: '/' },
    { label: 'Engineering Team', href: '/teams/engineering' },
    { label: 'Forward Architect', href: '/campaigns/forward-architect' },
  ],
  teams: [{ label: 'Home', href: '/' }],
}
