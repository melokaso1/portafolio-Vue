import type { TerminalWindowProps } from '../types'

export default function TerminalWindow({
  title,
  children,
  accentColor = 'green',
}: TerminalWindowProps): JSX.Element {
  const borderColor = accentColor === 'green' ? 'border-green' : 'border-cyan'
  const accentTextColor = accentColor === 'green' ? 'text-green' : 'text-cyan'
  const bgColor = accentColor === 'green' ? 'bg-green/10' : 'bg-cyan/10'
  const ledColor = accentColor === 'green' ? 'bg-green' : 'bg-cyan'
  const windowClass =
    accentColor === 'green' ? 'term-window term-window-green' : 'term-window term-window-cyan'

  return (
    <div className={`border ${borderColor} rounded-none overflow-hidden ${windowClass}`}>
      <div className={`${bgColor} px-4 py-2 flex items-center gap-3 border-b ${borderColor}`}>
        <div className={`w-2 h-2 rounded-full ${ledColor} led-pulse`}></div>
        <span
          className={`font-mono text-sm font-semibold ${accentTextColor} uppercase tracking-wide`}
        >
          {title}
        </span>
        <span className="ml-auto font-mono text-[10px] text-muted hidden sm:inline">
          tty/{accentColor === 'green' ? '01' : '02'}
        </span>
      </div>
      <div className="p-4 bg-surface">{children}</div>
    </div>
  )
}

export { TerminalWindow }
