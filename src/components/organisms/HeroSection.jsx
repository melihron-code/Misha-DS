import backdrop from '../../assets/hero/backdrop.jpg'
import { cx } from '../atoms/shared'
import Header from './Header'
import HeroCard from './HeroCard'

// Figma: HeroSection. showBackground ("Show bg"), plus the exposed Header (showSubHeader, showProgress) and
// HeroCard (showActions, heroVariant) properties. The top of a page: the Header, and the hero centered in the
// 830px column at the bottom of a size/hero (660px) area (Figma: Auto gap). showBackground puts the full-width
// backdrop (HeroCard/background in Figma: the image fading into bg/default) behind both; use it with the
// "no-bg" hero, and turn it off with the "with-bg" hero. Content: `header` (Header's topMenu, subHeader,
// progress) and `hero` (HeroCard's content props). In a mobile page (container "page") the minimum height
// goes and the hero follows the Header after indents/X.
export default function HeroSection({
  showBackground = true,
  background = backdrop,
  showSubHeader = true,
  showProgress = true,
  showActions = true,
  heroVariant = 'no-bg',
  header = {},
  hero = {},
  className,
  style,
  ...rest
}) {
  return (
    <div
      className={cx('relative isolate flex min-h-(--size-hero) w-full flex-col justify-between @max-tablet/page:min-h-0 @max-tablet/page:gap-indents-x', className)}
      style={style}
      {...rest}
    >
      {showBackground && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <img src={background} alt="" className="size-full object-cover object-top" />
          <div className="absolute inset-0 bg-linear-to-b from-bg-default/0 to-bg-default" />
        </div>
      )}
      <Header showSubHeader={showSubHeader} showProgress={showProgress} {...header} />
      <div className="flex w-full justify-center px-indents-m">
        <div className="w-full max-w-size-base-with">
          <HeroCard variant={heroVariant} showActions={showActions} {...hero} />
        </div>
      </div>
    </div>
  )
}
