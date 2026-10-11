import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Tooltip } from '../components/atoms'
import PagePlaceholder from '../site/PagePlaceholder'
import { SiteHeader } from '../site/SiteHeader'
import { NO_ACTION, paths } from '../site/site'

// /campaigns/new/job-description — Figma: hiring-campaign-wizard, with the "Head line / Generate" popover
// (hiring-campaign-wizard-viewport) opening from the Preferred qualifications field. Builder SubHeader.
export default function JobDescriptionPage() {
  const team = useSearchParams()[0].get('team') ?? undefined
  const [popover, setPopover] = useState(false)
  const popoverId = useId()
  return (
    <>
      <SiteHeader subHeader={{ variant: 'builder', backHref: paths.newCampaign(team), saveTooltip: NO_ACTION, deployTooltip: NO_ACTION }} />
      <PagePlaceholder
        name="Job description"
        screens={['hiring-campaign-wizard', 'hiring-campaign-wizard-viewport']}
        heading
        contains={[
          'Header (SubHeader builder: Back, Save, Deploy)',
          '⚠ Page title “New Campaign” without a hero',
          'Details: TextInput, Dropdown, TextArea, ErrorMessage',
          'Requirements: ⚠ skill input with a tag list, Dropdown, TextArea',
          'Button primary-lg “Publish”',
          '⚠ Popover “Head line”: TextArea + Generate (overlay, not a component yet)',
        ]}
        links={[{ element: 'Button primary-lg', label: 'Publish', href: paths.published }]}
        idle={['Add (skill)']}
      >
        <div className="flex flex-col gap-indents-xs">
          <h2 className="text-text-caps text-text-secondary">Overlay</h2>
          <div>
            <Button variant="secondary" aria-expanded={popover} aria-controls={popoverId} onClick={() => setPopover(o => !o)}>
              Preferred qualifications
            </Button>
          </div>
          <div id={popoverId} hidden={!popover} className="rounded-radius-m bg-surface-card p-indents-m shadow-card">
            <div className="flex flex-col items-start gap-indents-s-inner">
              <p className="text-text-grotesk text-text-primary">Popover placeholder: “Head line” TextArea</p>
              <Tooltip text={NO_ACTION}>
                <Button variant="primary-sm">Generate</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </PagePlaceholder>
    </>
  )
}
