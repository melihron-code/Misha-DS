import { MetricGrid, TeamGrid } from '../components/organisms'
import { teamsHero } from '../data/heroes'
import { teamMetrics } from '../data/metrics'
import { teams } from '../data/teams'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, SITE_NAME, paths } from '../site/site'

// /teams — Figma: all-teams (6114:23930). HeroSection (no Back, as in Figma), then the 830px content column
// (size/base-with) with the metrics and the teams, indents/2XS apart; indents/XS under the hero and
// indents/XXL at the bottom (Figma: the screen's gap and bottom padding), indents/M at the sides.
// Each team card opens its team page.
// Only the TeamCard's fields (the team data also holds the team pages' summaries).
const linkedTeams = teams.map(t => ({ id: t.id, name: t.name, people: t.people, productivity: t.productivity, highlight: t.highlight, members: t.members, href: paths.team(t.id) }))

export default function AllTeamsPage() {
  return (
    <>
      <title>{`All teams · ${SITE_NAME}`}</title>
      <SiteHero
        subHeader={{ showBack: false, breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB] }}
        hero={teamsHero}
        views={{ overview: paths.allTeams, employees: paths.employees }}
      />
      <main className="flex w-full justify-center px-indents-m pt-indents-xs pb-indents-xxl">
        <div className="flex w-full max-w-size-base-with flex-col gap-indents-2xs">
          <MetricGrid metrics={teamMetrics} label="Team metrics" />
          <TeamGrid teams={linkedTeams} />
        </div>
      </main>
    </>
  )
}
