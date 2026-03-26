import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import { backendProjects, frontendProjects } from '../data/portfolio'

export default function Projects(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>()

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-20 px-4 bg-bg ${isVisible ? 'fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-cyan mb-12">
          // PROJECTS
        </h2>

        {/* Backend Projects */}
        <div className="mb-16">
          <h3 className="text-xl font-mono font-bold text-green mb-6">[ BACKEND_SYSTEMS ]</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {backendProjects.map((project) => (
              <TerminalWindow key={project.id} title={project.title} accentColor="green">
                <div className="space-y-4">
                  <p className="text-text font-mono text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-green text-green px-2 py-1 font-mono text-xs rounded-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-green text-green px-3 py-2 font-mono text-sm hover:bg-green hover:text-bg transition-colors rounded-none"
                    >
                      [ GITHUB ]
                    </a>
                  </div>
                </div>
              </TerminalWindow>
            ))}
          </div>
        </div>

        {/* Frontend Projects */}
        <div>
          <h3 className="text-xl font-mono font-bold text-cyan mb-6">[ FRONTEND_WEB ]</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {frontendProjects.map((project) => (
              <TerminalWindow key={project.id} title={project.title} accentColor="cyan">
                <div className="space-y-4">
                  <p className="text-text font-mono text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="border border-cyan text-cyan px-2 py-1 font-mono text-xs rounded-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-cyan text-cyan px-3 py-2 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none"
                    >
                      [ GITHUB ]
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-cyan text-cyan px-3 py-2 font-mono text-sm hover:bg-cyan hover:text-bg transition-colors rounded-none"
                      >
                        [ LIVE_DEMO ]
                      </a>
                    )}
                  </div>
                </div>
              </TerminalWindow>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Projects }
