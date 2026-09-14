import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import SectionCommand from './SectionCommand'
import { skillGroups } from '../data/portfolio'

export default function Skills(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.1)

  return (
    <section id="skills" ref={ref} className="py-12 md:py-14 px-4 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionCommand
          command="ls ./tech_stack --tree"
          active={isVisible}
          comment="// tools and concepts I use in real projects"
        />

        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 term-stagger ${isVisible ? 'is-visible' : ''}`}
        >
          {skillGroups.map((group) => (
            <TerminalWindow key={group.category} title={group.category} accentColor={group.color}>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`border border-solid px-2.5 py-1.5 font-mono text-xs rounded-none transition-colors ${
                      group.color === 'green'
                        ? 'border-green text-green hover:bg-green hover:text-bg'
                        : 'border-cyan text-cyan hover:bg-cyan hover:text-bg'
                    }`}
                  >
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skills }
