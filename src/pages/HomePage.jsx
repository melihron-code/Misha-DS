import { homeHero } from '../data/heroes'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'

// / — Figma: Homepage (357:59066). The site's start page: HeroSection only (no Back, no tab selected), with
// three buttons: All teams, All templates, New campaign (the job description form, as in the prototype).
// Placeholder until it's built: its hero buttons already work (the "no-bg" hero stands in for Figma's new
// "Homepage" HeroCard variant).
export default function HomePage() {
  return (
    <>
      <SiteHero
        subHeader={{ showBack: false, breadcrumbs: [HOME_CRUMB] }}
        hero={homeHero}
        actions={{ 'All teams': paths.allTeams, 'All templates': paths.templates, 'New campaign': paths.jobDescription() }}
      />
      <PagePlaceholder
        name="Homepage"
        screens={['Homepage']}
        contains={['HeroSection: Header (no Back, no tab selected) + ⚠ HeroCard variant “Homepage” (three primary-lg buttons; not in code yet)']}
        links={[
          { element: 'Hero button', label: 'All teams', href: paths.allTeams },
          { element: 'Hero button', label: 'All templates', href: paths.templates },
          { element: 'Hero button', label: 'New campaign', href: paths.jobDescription() },
        ]}
      />
    </>
  )
}
