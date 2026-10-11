import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// Figma: ExperienceItem. A job in a CV: a divider/default line on top, the period, then the
// role, company and description. Texts wrap. Fills its container.
export default function ExperienceItem({
  period = 'Jan 2022 — Present (3 years)',
  title = 'Senior Frontend Developer',
  company = 'TechCorp Solutions',
  description = 'Led development of React applications, mentored junior developers, improved performance by 40%',
  className,
  ...rest
}) {
  return (
    <div className={cx('flex w-full flex-col gap-indents-x border-t border-divider-default py-indents-s-inner text-text-primary', className)} {...rest}>
      <p className="text-text-pixel">{nbsp(period)}</p>
      <div className="flex flex-col gap-indents-s-inner">
        <p className="text-heading-h3">{nbsp(title)}</p>
        <div className="flex flex-col gap-indents-xs text-text-grotesk">
          <p>{nbsp(company)}</p>
          {description && <p>{nbsp(description)}</p>}
        </div>
      </div>
    </div>
  )
}
