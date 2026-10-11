import { ProgressBar } from '../atoms'
import { cx } from '../atoms/shared'
import SubHeader from './SubHeader'
import TopMenu from './TopMenu'

// Figma: Header. showSubHeader, showProgress (variant has only "default"). The page header: TopMenu, then
// SubHeader, then a ProgressBar lg with its stage labels, padded indents/M on the sides.
// Content comes through `topMenu`, `subHeader` and `progress` ({ stages, value }), passed to those parts.
// No fill of its own, so it can sit on HeroSection's backdrop.
export default function Header({ showSubHeader = true, showProgress = true, topMenu = {}, subHeader = {}, progress = {}, className, ...rest }) {
  return (
    <header className={cx('flex w-full flex-col', className)} {...rest}>
      <TopMenu {...topMenu} />
      {showSubHeader && <SubHeader {...subHeader} />}
      {showProgress && <ProgressBar size="lg" {...progress} className="px-indents-m" />}
    </header>
  )
}
