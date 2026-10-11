import { useLocation, useNavigate } from 'react-router-dom'
import { Header, HeroSection } from '../components/organisms'
import { NO_ACTION, noAction, topMenuFor } from './site'

// The top of every site page, built in one place: the TopMenu (same everywhere, current tab from the URL)
// plus the page's SubHeader and progress. A page uses one of these:
// - SiteHeader: Header (TopMenu + optional SubHeader + optional StageProgress).
// - SiteHero: HeroSection (backdrop, Header, the "no-bg" hero) for the all-teams family of pages.

export function SiteHeader({ subHeader, progress }) {
  const { pathname } = useLocation()
  return (
    <Header
      topMenu={topMenuFor(pathname)}
      showSubHeader={!!subHeader}
      subHeader={subHeader}
      showProgress={!!progress}
      progress={progress}
    />
  )
}

// hero: HeroCard content. `views`: { [view value]: path } for the hero's toggle (choosing a view opens its
// page); views without a path get the "no action" tooltip. `actions`: { [label]: path } likewise for the
// hero's buttons.
export function SiteHero({ subHeader, hero, views = {}, actions = {} }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const content = {
    ...hero,
    actions: (hero.actions ?? []).map(a => (actions[a.label] ? { ...a, href: actions[a.label] } : noAction(a))),
    teams: (hero.teams ?? []).map(t => (views[t.value] || t.value === hero.team ? t : { ...t, tooltip: NO_ACTION })),
    onTeamChange: value => views[value] && navigate(views[value]),
  }
  return <HeroSection showProgress={false} header={{ topMenu: topMenuFor(pathname), subHeader }} hero={content} />
}
