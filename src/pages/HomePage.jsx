import { homeHero } from '../data/heroes'
import { SiteHero } from '../site/SiteHeader'
import { SITE_NAME, paths } from '../site/site'

// / — Figma: Homepage (357:59066). The site's start page: a HeroSection only (no SubHeader, no tab selected) with the
// "homepage" hero: the title and subtitle centered, and three large buttons: All teams, All templates and
// New campaign (the job description form, as in the prototype).
export default function HomePage() {
  return (
    <>
      <title>{`Homepage · ${SITE_NAME}`}</title>
      <SiteHero
        hero={homeHero}
        heroVariant="homepage"
        actions={{ 'All teams': paths.allTeams, 'All templates': paths.templates, 'New campaign': paths.jobDescription() }}
      />
    </>
  )
}
