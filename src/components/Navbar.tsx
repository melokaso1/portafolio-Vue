import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'learning', 'contact'] as const

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('hero')

  const navLinks = [
    { label: 'HOME', href: '#hero', id: 'hero' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'LEARNING', href: '#learning', id: 'learning' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg/95 border-b border-border z-50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-green font-mono text-sm">&gt; melokaso1_</span>
            <span className="text-green cursor">|</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-muted border border-border px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green led-pulse" />
            SESSION_ONLINE
          </span>
        </div>

        <div className="hidden md:flex gap-2 flex-wrap justify-end">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-mono text-xs border px-2.5 py-1 transition-colors rounded-none ${
                  isActive
                    ? 'text-green border-green bg-green/10'
                    : 'text-muted border-muted hover:text-green hover:border-green'
                }`}
              >
                [{link.label}]
              </a>
            )
          })}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-green">
            <rect x="2" y="4" width="16" height="2" />
            <rect x="2" y="9" width="16" height="2" />
            <rect x="2" y="14" width="16" height="2" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-surface border-t border-border animate-fadeIn">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-green font-mono text-sm border border-muted hover:border-green px-3 py-2 block rounded-none"
              >
                [{link.label}]
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export { Navbar }
