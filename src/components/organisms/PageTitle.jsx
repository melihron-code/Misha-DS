import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// PageTitle (v0.6.9, code first; Figma: the "title" on hiring-campaign-wizard). A page's h1 without a hero:
// heading/h1, text/primary, centered; it fills the width it's given. Smaller in a mobile page (the h1's mobile size).
export default function PageTitle({ title, className, ...rest }) {
  return (
    <h1 className={cx('w-full text-center text-heading-h1 text-text-primary', className)} {...rest}>
      {nbsp(title)}
    </h1>
  )
}
