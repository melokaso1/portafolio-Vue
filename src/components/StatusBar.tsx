import { useEffect, useState } from 'react'

const LABELS: Record<string, string> = {
  hero: '~/boot',
  about: '~/about',
  skills: '~/tech_stack',
  projects: '~/projects',
  learning: '~/learning',
  contact: '~/connect',
}

export default function StatusBar(): JSX.Element {
  const [pwd, setPwd] = useState('~/boot')
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const ids = Object.keys(LABELS)
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setPwd(LABELS[id])
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border status-bar">
      <div className="max-w-6xl mx-auto px-3 py-1.5 flex items-center justify-between gap-3 font-mono text-[10px] md:text-xs text-muted">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-green shrink-0">● ONLINE</span>
          <span className="truncate">
            USER:<span className="text-cyan">melokaso1</span>
          </span>
          <span className="hidden sm:inline truncate">
            PWD:<span className="text-text">{pwd}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden md:inline">SHELL:zsh</span>
          <span className="text-green tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  )
}

export { StatusBar }
