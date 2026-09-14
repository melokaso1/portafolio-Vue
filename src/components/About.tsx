import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import SectionCommand from './SectionCommand'
import { personalInfo } from '../data/portfolio'

export default function About(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.12)

  return (
    <section id="about" ref={ref} className="py-12 md:py-14 px-4 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionCommand
          command="cat ./about/profile.md"
          active={isVisible}
          comment="// short bio + machine-readable profile"
        />

        <div className={`grid md:grid-cols-2 gap-6 term-stagger ${isVisible ? 'is-visible' : ''}`}>
          <div className="space-y-4 text-text font-mono text-sm md:text-base leading-relaxed">
            <p className="text-muted">&gt; readme</p>
            <p>{personalInfo.bio}</p>
            <p>
              I work across APIs, databases and full-stack delivery — Clean Architecture in .NET,
              React frontends, and integrations like SignalR or AI chatbots when the product needs them.
            </p>
            <p>
              Comfortable in team repos (contributor and owner): documenting, shipping, and keeping
              systems easy to run locally with Docker.
            </p>
          </div>

          <TerminalWindow title="PROFILE.JSON" accentColor="green">
            <div className="font-mono text-xs md:text-sm space-y-2 text-text">
              <div>{'{'}</div>
              <div className="pl-4">
                <span className="text-cyan">&quot;name&quot;</span>
                <span>: </span>
                <span className="text-green">&quot;Alejandro&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-cyan">&quot;location&quot;</span>
                <span>: </span>
                <span className="text-green">&quot;Floridablanca, CO&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-cyan">&quot;focus&quot;</span>
                <span>: </span>
                <span className="text-green">&quot;Backend / .NET / React&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-cyan">&quot;stack&quot;</span>
                <span>: </span>
                <span className="text-green">&quot;C#, PostgreSQL, Oracle, TS&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-cyan">&quot;english&quot;</span>
                <span>: </span>
                <span className="text-green">&quot;B2&quot;</span>,
              </div>
              <div className="pl-4">
                <span className="text-cyan">&quot;status&quot;</span>
                <span>: </span>
                <span className="text-green glow-green">&quot;AVAILABLE&quot;</span>
              </div>
              <div>{'}'}</div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  )
}

export { About }
