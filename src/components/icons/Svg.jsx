// Shared SVG wrapper for icons. `size` sets a square box (px, default 16 as in
// Figma); color follows the surrounding text (currentColor). Decorative by default;
// pass `title` to make the icon meaningful to screen readers.
export default function Svg({ size = 16, title, viewBox, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  )
}
