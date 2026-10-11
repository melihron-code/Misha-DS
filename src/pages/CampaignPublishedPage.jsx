import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { paths } from '../site/site'

// /campaigns/new/published — Figma: success. Header without SubHeader.
export default function CampaignPublishedPage() {
  return (
    <>
      <SiteHeader />
      <PagePlaceholder
        name="Campaign published"
        screens={['success']}
        heading
        contains={['Header (no SubHeader)', '⚠ Full-screen backdrop (HeroSection has no full-height option yet)', '“All done, captain!”', 'Button primary-sm “Homepage”']}
        links={[{ element: 'Button primary-sm', label: 'Homepage', href: paths.home }]}
      />
    </>
  )
}
