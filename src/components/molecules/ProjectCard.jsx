import { Tag } from '../atoms'
import { cx } from '../atoms/shared'
import { nbsp } from '../../lib/nbsp'

// Figma: ProjectCard. description (text). A project in a profile: a divider/default line on
// top, the description (wraps, about 3/5 of the width as in Figma) and its technologies as
// static Tags (yellow by default), wrapping onto more rows if needed. Fills its container.
export default function ProjectCard({
  description = 'Full-stack e-commerce solution with React frontend and Node.js backend',
  tags = ['React', 'Node.js', 'MongoDB', 'WebSocket'],
  tagColor = 'yellow',
  className,
  ...rest
}) {
  return (
    <div className={cx('flex w-full flex-col items-start gap-indents-x border-t border-divider-default py-indents-s-inner', className)} {...rest}>
      <p className="w-3/5 text-heading-h3 text-text-primary">{nbsp(description)}</p>
      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-indents-3xs" aria-label="Technologies">
          {tags.map((t, i) => (
            <li key={`${i}-${t}`} className="flex">
              <Tag variant="static" color={tagColor} label={t} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
