import backdrop768 from '../../assets/hero/backdrop-768.webp'
import backdrop1440 from '../../assets/hero/backdrop-1440.webp'
import backdrop2880 from '../../assets/hero/backdrop-2880.webp'
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
// The backdrop is the top of the page, so it loads first (fetchpriority high, not lazy): WebP at 768, 1440 and
// 2880 wide (npm run images), the browser picks by the window width. `background`: { src, srcSet, width, height }.
// Width: the backdrop fills the whole width it's given (the window on the site, e.g. 1920); the Header and the
// hero stay within size/page (1440), centered, as everything else on the page.
const BACKDROP = {
  src: backdrop1440,
  srcSet: `${backdrop768} 768w, ${backdrop1440} 1440w, ${backdrop2880} 2880w`,
  width: 2880,
  height: 1620,
}
export default function HeroSection({
  showBackground = true,
  background = BACKDROP,
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
    <div className={cx('relative isolate w-full', className)} style={style} {...rest}>
      {showBackground && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={background.src}
            srcSet={background.srcSet}
            sizes="100vw"
            width={background.width}
            height={background.height}
            fetchPriority="high"
            decoding="async"
            alt=""
            className="size-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-linear-to-b from-bg-default/0 to-bg-default" />
        </div>
      )}
      <div className="mx-auto flex min-h-(--size-hero) w-full max-w-size-page flex-col justify-between @max-tablet/page:min-h-0 @max-tablet/page:gap-indents-x">
        <Header showSubHeader={showSubHeader} showProgress={showProgress} {...header} />
        <div className="flex w-full justify-center px-indents-m">
          <div className="w-full max-w-size-base-with">
            <HeroCard variant={heroVariant} showActions={showActions} {...hero} />
          </div>
        </div>
      </div>
    </div>
  )
}
