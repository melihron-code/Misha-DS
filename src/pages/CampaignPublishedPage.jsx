import { publishedBackground, publishedHero } from '../data/heroes'
import { SiteHero } from '../site/SiteHeader'
import { SITE_NAME, paths } from '../site/site'

// /campaigns/new/published — Figma: success (357:59099). A full-screen HeroSection (size full): the Header without a
// SubHeader on its own background, and "All done, captain!" centered with two buttons: View campaign → the new
// campaign's task list (/campaigns/new), Homepage → / (both in the prototype).
export default function CampaignPublishedPage() {
  return (
    <>
      <title>{`Campaign published · ${SITE_NAME}`}</title>
      <SiteHero
        size="full"
        background={publishedBackground}
        hero={publishedHero}
        heroVariant="homepage"
        actions={{ 'View campaign': paths.newCampaign(), Homepage: paths.home }}
      />
    </>
  )
}
