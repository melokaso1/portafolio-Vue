import { useState } from 'react'

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'LEARNING', href: '#learning' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-bg border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span className="text-green font-mono text-sm">&gt; melokaso1_</span>
          <span className="text-green cursor">|</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted hover:text-green font-mono text-sm border border-muted hover:border-green px-3 py-1 transition-colors rounded-none"
            >
              [{link.label}]
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-green">
            <rect x="2" y="4" width="16" height="2"></rect>
            <rect x="2" y="9" width="16" height="2"></rect>
            <rect x="2" y="14" width="16" height="2"></rect>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-border">
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
