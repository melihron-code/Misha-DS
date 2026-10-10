import CopyButton from './CopyButton'

// The code name shown under a token: its CSS variable, or the class for text
// styles (which have no single variable). Click to copy.
export default function CodeNames({ tw, cssVar }) {
  const value = cssVar ? `var(${cssVar})` : tw
  return <CopyButton value={value} className="self-start text-text-grotesk text-text-secondary">{cssVar ?? tw}</CopyButton>
}
