import { useState, useEffect } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { personalInfo } from '../data/portfolio'

export default function Hero(): JSX.Element {
  const [showName, setShowName] = useState(false)
  const [showRoles, setShowRoles] = useState(false)
  const { text: roleText } = useTypewriter(personalInfo.roles, 100)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowName(true), 600)
    const timer2 = setTimeout(() => setShowRoles(true), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen bg-bg pt-20 px-4 flex items-center justify-center relative overflow-hidden"
    >
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #06B6D4 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      {/* ASCII Corner Decoration */}
      <div className="absolute top-20 left-4 text-cyan font-mono text-xs opacity-60">
        <div>┌─────────────────────┐</div>
        <div>│ SYSTEM_INITIALIZED │</div>
        <div>└─────────────────────┘</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Initialization Text */}
        <div className="mb-8 text-muted font-mono text-sm animate-fadeIn">
          {'> INITIALIZING_PROFILE...'}
        </div>

        {/* Name */}
        {showName && (
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-text mb-6 animate-fadeIn">
            {personalInfo.name}
          </h1>
        )}

        {/* Roles */}
        {showRoles && (
          <div className="text-cyan font-mono text-lg md:text-2xl mb-12 animate-fadeIn">
            <span>&gt; {roleText}</span>
            <span className="cursor">|</span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <a
            href="#projects"
            className="border border-green text-green px-6 py-3 font-mono hover:bg-green hover:text-bg transition-colors rounded-none inline-block"
          >
            [ VIEW_PROJECTS ]
          </a>
          <a
            href="#contact"
            className="border border-cyan text-cyan px-6 py-3 font-mono hover:bg-cyan hover:text-bg transition-colors rounded-none inline-block"
          >
            [ CONTACT_ME ]
          </a>
        </div>
      </div>
    </section>
  )
}

export { Hero }
