import { useLocation, useNavigate } from 'react-router-dom'
import { Header, HeroSection } from '../components/organisms'
import { NO_ACTION, noAction, topMenuFor } from './site'

// The top of every site page, built in one place: the TopMenu (same everywhere, current tab from the URL)
// plus the page's SubHeader and progress. A page uses one of these:
// - SiteHeader: Header (TopMenu + optional SubHeader + optional StageProgress), up to size/page wide, centered.
// - SiteHero: HeroSection (backdrop, Header, the "no-bg" hero) for the all-teams family of pages.

export function SiteHeader({ subHeader, progress }) {
  const { pathname } = useLocation()
  return (
    <Header
      className="mx-auto max-w-size-page"
      topMenu={topMenuFor(pathname)}
      showSubHeader={!!subHeader}
      subHeader={subHeader}
      showProgress={!!progress}
      progress={progress}
    />
  )
}

// subHeader: the SubHeader's props (none: no SubHeader). hero: HeroCard content; heroVariant: no-bg (default) or
// homepage. `views`: { [view value]: path } for the
// hero's toggle (choosing a view opens its page); views without a path get the "no action" tooltip.
// `actions`: { [label]: path } likewise for the hero's buttons. `view` + `onViewChange`: the toggle changes the view
// on the page itself (e.g. a filter) for the views without a path; then they get no tooltip.
export function SiteHero({ subHeader, hero, heroVariant = 'no-bg', views = {}, actions = {}, view, onViewChange }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const content = {
    ...hero,
    actions: (hero.actions ?? []).map(a => (actions[a.label] ? { ...a, href: actions[a.label] } : noAction(a))),
    team: view ?? hero.team,
    teams: (hero.teams ?? []).map(t => (views[t.value] || onViewChange || t.value === hero.team ? t : { ...t, tooltip: NO_ACTION })),
    onTeamChange: value => (views[value] ? navigate(views[value]) : onViewChange?.(value)),
  }
  return (
    <HeroSection
      showSubHeader={!!subHeader}
      showProgress={false}
      heroVariant={heroVariant}
      header={{ topMenu: topMenuFor(pathname), subHeader }}
      hero={content}
    />
  )
}
