import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import { skillGroups } from '../data/portfolio'

export default function Skills(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>()

  const backendSkills = skillGroups.filter((group) => ['BACKEND', 'DATABASES', 'CONCEPTS'].includes(group.category))
  const frontendSkills = skillGroups.filter((group) => !['BACKEND', 'DATABASES', 'CONCEPTS'].includes(group.category))

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-20 px-4 bg-bg ${isVisible ? 'fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-cyan mb-12">
          // TECH_STACK
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Backend Skills - Larger on left */}
          <div className="lg:col-span-2 space-y-6">
            {backendSkills.map((group) => (
              <TerminalWindow key={group.category} title={group.category} accentColor={group.color as 'green'}>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <button
                      key={skill}
                      className={`border border-solid px-3 py-2 font-mono text-xs hover:text-bg transition-all rounded-none ${
                        group.color === 'green'
                          ? 'border-green text-green hover:bg-green'
                          : 'border-cyan text-cyan hover:bg-cyan'
                      }`}
                    >
                      {skill.toUpperCase()}
                    </button>
                  ))}
                </div>
              </TerminalWindow>
            ))}
          </div>

          {/* Frontend Skills - Smaller on right */}
          <div className="space-y-6">
            {frontendSkills.map((group) => (
              <TerminalWindow key={group.category} title={group.category} accentColor={group.color as 'cyan'}>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <button
                      key={skill}
                      className={`border border-solid px-2 py-1 font-mono text-xs hover:text-bg transition-all rounded-none ${
                        group.color === 'green'
                          ? 'border-green text-green hover:bg-green'
                          : 'border-cyan text-cyan hover:bg-cyan'
                      }`}
                    >
                      {skill.toUpperCase()}
                    </button>
                  ))}
                </div>
              </TerminalWindow>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Skills }
