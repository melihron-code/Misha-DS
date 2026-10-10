import Avatar from './Avatar'
import { cx } from './shared'

// Figma: AvatarGroup. Avatars overlapping by indents/-XS (−8px).
export default function AvatarGroup({ images = ['katya', 'petya', 'dog'], label = 'Team members', className, ...rest }) {
  return (
    <div role="group" aria-label={label} className={cx('inline-flex items-center -space-x-indents-xs', className)} {...rest}>
      {images.map((img, i) => (typeof img === 'string' ? <Avatar key={i} image={img} /> : <Avatar key={i} {...img} />))}
    </div>
  )
}
