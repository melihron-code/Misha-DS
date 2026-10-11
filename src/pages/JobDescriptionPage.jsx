import { useSearchParams } from 'react-router-dom'
import CampaignForm from '../site/parts/CampaignForm'
import PageTitle from '../site/parts/PageTitle'
import { campaignForm, generateQualifications } from '../data/campaignForm'
import { SiteHeader } from '../site/SiteHeader'
import { NO_ACTION, SITE_NAME, paths } from '../site/site'

// /campaigns/new/job-description — Figma: hiring-campaign-wizard (357:59234), with the "Head line" popover
// (hiring-campaign-wizard-viewport) under the Preferred qualifications field. Header with the builder SubHeader (Back →
// the task list, Save and Deploy no action yet), then the page title and the form, indents/XXL (out) apart, the content
// within indents/M of the Header and the page's bottom (Figma), the form within size/base-with. Publish → published.
export default function JobDescriptionPage() {
  const team = useSearchParams()[0].get('team') ?? undefined
  return (
    <>
      <title>{`Job description · ${SITE_NAME}`}</title>
      <SiteHeader subHeader={{ variant: 'builder', backHref: paths.newCampaign(team), saveTooltip: NO_ACTION, deployTooltip: NO_ACTION }} />
      <main className="flex w-full flex-col items-center gap-indents-xxl-out p-indents-m">
        <PageTitle title={campaignForm.title} />
        <CampaignForm
          label="Job description"
          sections={campaignForm.sections}
          submit={{ label: campaignForm.publishLabel, href: paths.published }}
          onAssist={(name, headLine) => generateQualifications(headLine)}
          className="max-w-size-base-with"
        />
      </main>
    </>
  )
}
