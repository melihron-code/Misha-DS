import dog30 from '../../assets/avatars/dog-30.webp'
import dog60 from '../../assets/avatars/dog-60.webp'
import katya30 from '../../assets/avatars/katya-30.webp'
import katya60 from '../../assets/avatars/katya-60.webp'
import petya30 from '../../assets/avatars/petya-30.webp'
import petya60 from '../../assets/avatars/petya-60.webp'
import { cx } from './shared'

// Figma: Avatar. image katya | dog | petya (30px circle = indents/X). Pass `src` for any other photo.
// The photos are WebP at 1× and 2× (npm run images), with their size set (30 × 30) and loaded lazily
// (pass loading="eager" for one near the top of a page).
const IMAGES = {
  katya: { src: katya30, srcSet: `${katya30} 1x, ${katya60} 2x` },
  dog: { src: dog30, srcSet: `${dog30} 1x, ${dog60} 2x` },
  petya: { src: petya30, srcSet: `${petya30} 1x, ${petya60} 2x` },
}
const NAMES = { katya: 'Katya', dog: 'Dog', petya: 'Petya' }
const SIZE_PX = 30

export default function Avatar({ image = 'katya', src, alt, loading = 'lazy', className, ...rest }) {
  const photo = src ? { src } : IMAGES[image]
  return (
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      width={SIZE_PX}
      height={SIZE_PX}
      loading={loading}
      decoding="async"
      alt={alt ?? NAMES[image] ?? ''}
      className={cx('size-indents-x shrink-0 rounded-radius-over object-cover', className)}
      {...rest}
    />
  )
}
