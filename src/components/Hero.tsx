import { useState, useEffect } from 'react'
import { personalInfo } from '../data/portfolio'

const BOOT_LINES = [
  { text: '> ./boot.sh --profile melokaso1', delay: 0 },
  { text: '> loading kernel modules .......... OK', delay: 400 },
  { text: '> mounting /home/dev ............... OK', delay: 800 },
  { text: '> starting session ................. READY', delay: 1200 },
]

export default function Hero(): JSX.Element {
  const [bootIndex, setBootIndex] = useState(0)
  const [showName, setShowName] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (bootIndex >= BOOT_LINES.length) {
      const t1 = setTimeout(() => setShowName(true), 200)
      const t2 = setTimeout(() => setShowRoles(true), 700)
      const t3 = setTimeout(() => setShowCta(true), 1200)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }

    const timer = setTimeout(() => setBootIndex((i) => i + 1), 380)
    return () => clearTimeout(timer)
  }, [bootIndex])

  useEffect(() => {
    if (!showRoles) return

    const word = personalInfo.roles[roleIndex]
    const speed = deleting ? 40 : 90

    if (!deleting && roleText === word) {
      const pause = setTimeout(() => setDeleting(true), 1400)
      return () => clearTimeout(pause)
    }

    if (deleting && roleText === '') {
      setDeleting(false)
      setRoleIndex((i) => (i + 1) % personalInfo.roles.length)
      return
    }

    const timer = setTimeout(() => {
      const next = deleting
        ? word.slice(0, roleText.length - 1)
        : word.slice(0, roleText.length + 1)
      setRoleText(next)
    }, speed)

    return () => clearTimeout(timer)
  }, [showRoles, roleText, deleting, roleIndex])

  return (
    <section
      id="hero"
      className="min-h-screen bg-bg pt-24 pb-16 px-4 flex items-center justify-center relative overflow-hidden crt-flicker"
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle, #06B6D4 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="absolute top-24 left-4 md:left-8 text-cyan font-mono text-[10px] md:text-xs opacity-70 space-y-0.5">
        <div>┌─ tty0 ────────────────┐</div>
        <div>│ SYSTEM_INITIALIZED    │</div>
        <div>│ USER: melokaso1       │</div>
        <div>└───────────────────────┘</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="border border-border bg-surface/60 p-4 md:p-8 mb-6">
          <div className="space-y-1.5 mb-6 min-h-[5.5rem]">
            {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
              <div
                key={line.text}
                className="boot-line font-mono text-xs md:text-sm text-muted"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {line.text.includes('OK') || line.text.includes('READY') ? (
                  <>
                    {line.text.replace(/ (OK|READY)$/, '')}{' '}
                    <span className="text-green">{line.text.match(/OK|READY/)?.[0]}</span>
                  </>
                ) : (
                  <span className="text-cyan">{line.text}</span>
                )}
              </div>
            ))}
            {bootIndex < BOOT_LINES.length && (
              <div className="font-mono text-xs md:text-sm text-green">
                <span className="cursor">█</span>
              </div>
            )}
          </div>

          {showName && (
            <div className="animate-fadeIn">
              <p className="font-mono text-xs text-muted mb-2">&gt; whoami</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold text-text mb-4">
                {personalInfo.name}
              </h1>
            </div>
          )}

          {showRoles && (
            <div className="animate-fadeIn font-mono text-base md:text-xl text-cyan mb-2">
              <span className="text-muted">&gt; role --current </span>
              <span className="text-green">{roleText}</span>
              <span className="cursor text-green">█</span>
            </div>
          )}

          {showCta && (
            <div className="animate-fadeIn flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href="#projects"
                className="border border-green text-green px-5 py-3 font-mono text-sm hover:bg-green hover:text-bg transition-colors rounded-none text-center"
              >
                [ ./view_projects ]
              </a>
              <a
                href="#contact"
                className="border border-cyan text-cyan px-5 py-3 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none text-center"
              >
                [ ./contact ]
              </a>
            </div>
          )}
        </div>

        <p className="font-mono text-[10px] md:text-xs text-muted text-center opacity-70">
          scroll to continue · press section links in the top bar
        </p>
      </div>
    </section>
  )
}

export { Hero }
