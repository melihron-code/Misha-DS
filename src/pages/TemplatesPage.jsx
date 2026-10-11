import { templatesHero } from '../data/heroes'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHero } from '../site/SiteHeader'
import { HOME_CRUMB, paths } from '../site/site'

// /templates — Figma: all-teams-templates (built there from Header + HeroCard + background; here a HeroSection).
export default function TemplatesPage() {
  return (
    <>
      <SiteHero
        subHeader={{ backHref: paths.home, breadcrumbs: [HOME_CRUMB, { label: 'All templates', href: paths.templates }] }}
        hero={templatesHero}
        views={{ all: paths.templates }}
      />
      <PagePlaceholder
        name="All templates"
        screens={['all-teams-templates']}
        contains={['HeroSection: Header + hero with Add new template and All / Automations / Documents / Access', 'DocumentRow ×16']}
        idle={['Document row', 'Edit']}
      />
    </>
  )
}
