import dog from '../../assets/avatars/dog.png'
import katya from '../../assets/avatars/katya.png'
import petya from '../../assets/avatars/petya.png'
import { cx } from './shared'

// Figma: Avatar. image katya | dog | petya (30px circle = indents/X). Pass `src` for any other photo.
const IMAGES = { katya, dog, petya }
const NAMES = { katya: 'Katya', dog: 'Dog', petya: 'Petya' }

export default function Avatar({ image = 'katya', src, alt, className, ...rest }) {
  return (
    <img
      src={src ?? IMAGES[image]}
      alt={alt ?? NAMES[image] ?? ''}
      className={cx('size-indents-x shrink-0 rounded-radius-over object-cover', className)}
      {...rest}
    />
  )
}
