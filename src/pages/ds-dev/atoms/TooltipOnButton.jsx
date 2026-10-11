import { Button, Tooltip } from '../../../components/atoms'

// The docs show Tooltip around a Button (it wraps one focusable element). An open one (grid) gets room below,
// so it doesn't cover the row line.
export default function TooltipOnButton({ children, ...props }) {
  return (
    <Tooltip {...props} className={props.open ? 'mb-indents-x' : undefined}>
      <Button>{children}</Button>
    </Tooltip>
  )
}
