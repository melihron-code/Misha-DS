import { useParams } from 'react-router-dom'
import { PeopleList, TeamSummary } from '../components/organisms'
import { teamHero } from '../data/heroes'
import { membersOf } from '../data/people'
import { teamById } from '../data/teams'
import { SiteHero } from '../site/SiteHeader'
import { ALL_TEAMS_CRUMB, HOME_CRUMB, SITE_NAME, paths } from '../site/site'
import NotFoundPage from './NotFoundPage'

// /teams/:teamId — Figma: all-teams-one (6114:31079), the Team view of a team. HeroSection (the team's name, no
// actions; the toggle's Campaigns opens the team's campaigns), then the 830px content column (size/base-with): the
// week's summary, then the team's people, indents/2XS apart; indents/XS under the hero, indents/XXL at the bottom,
// indents/M at the sides (as the other all-teams pages). Each person opens their page (?team=, so Back leads here).
export default function TeamPage() {
  const team = teamById(useParams().teamId)
  if (!team) return <NotFoundPage />
  const people = membersOf(team.id).map(p => ({
    id: p.id,
    name: p.name,
    role: p.role,
    image: p.image,
    status: p.status,
    progress: p.progress,
    href: paths.person(p.id, { team: team.id }),
  }))

  return (
    <>
      <title>{`${team.name} · ${SITE_NAME}`}</title>
      <SiteHero
        subHeader={{ backHref: paths.allTeams, breadcrumbs: [HOME_CRUMB, ALL_TEAMS_CRUMB, { label: team.name, href: paths.team(team.id) }] }}
        hero={teamHero(team.name)}
        views={{ team: paths.team(team.id), campaigns: paths.teamCampaigns(team.id) }}
      />
      <main className="flex w-full justify-center px-indents-m pt-indents-xs pb-indents-xxl">
        <div className="flex w-full max-w-size-base-with flex-col gap-indents-2xs">
          <TeamSummary message={team.summary} />
          <PeopleList title="Team" people={people} emptyText="No members yet." />
        </div>
      </main>
    </>
  )
}
