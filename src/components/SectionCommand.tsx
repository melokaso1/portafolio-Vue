import { useEffect, useState } from 'react'

interface SectionCommandProps {
  command: string
  active: boolean
  comment?: string
}

export default function SectionCommand({
  command,
  active,
  comment,
}: SectionCommandProps): JSX.Element {
  const [shown, setShown] = useState('')

  useEffect(() => {
    if (!active) {
      setShown('')
      return
    }

    let i = 0
    setShown('')
    const id = window.setInterval(() => {
      i += 1
      setShown(command.slice(0, i))
      if (i >= command.length) {
        window.clearInterval(id)
      }
    }, 28)

    return () => window.clearInterval(id)
  }, [active, command])

  return (
    <div className="mb-6">
      <div className="font-mono text-sm md:text-base text-muted flex flex-wrap items-center gap-2">
        <span className="text-green">melokaso1@portfolio</span>
        <span className="text-muted">:</span>
        <span className="text-cyan">~</span>
        <span className="text-muted">$</span>
        <span className="text-text">
          {shown}
          {shown.length < command.length && (
            <span className="cursor text-green">█</span>
          )}
        </span>
      </div>
      {comment && active && shown.length === command.length && (
        <p className="mt-3 font-mono text-xs md:text-sm text-muted fade-in">{comment}</p>
      )}
    </div>
  )
}

export { SectionCommand }
