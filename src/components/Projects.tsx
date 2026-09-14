import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import SectionCommand from './SectionCommand'
import { backendProjects, frontendProjects } from '../data/portfolio'
import type { Project } from '../types'

function ProjectCard({
  project,
  accentColor,
}: {
  project: Project
  accentColor: 'green' | 'cyan'
}) {
  const border = accentColor === 'green' ? 'border-green text-green' : 'border-cyan text-cyan'
  const hover =
    accentColor === 'green'
      ? 'hover:bg-green hover:text-bg'
      : 'hover:bg-cyan hover:text-bg'

  return (
    <TerminalWindow title={project.title} accentColor={accentColor}>
      <div className="space-y-3">
        {(project.featured || project.contributor) && (
          <div className="flex flex-wrap gap-2">
            {project.featured && (
              <span className={`${border} border px-2 py-0.5 font-mono text-[10px] tracking-wider`}>
                FEATURED
              </span>
            )}
            {project.contributor && (
              <span className={`${border} border px-2 py-0.5 font-mono text-[10px] tracking-wider`}>
                CONTRIBUTOR
              </span>
            )}
          </div>
        )}
        <p className="text-text font-mono text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className={`${border} border px-2 py-1 font-mono text-xs rounded-none`}>
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${border} border px-3 py-2 font-mono text-sm ${hover} transition-colors rounded-none`}
          >
            [ {project.contributor ? 'DOCS' : 'GITHUB'} ]
          </a>
          {project.extraLinks?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${border} border px-3 py-2 font-mono text-sm ${hover} transition-colors rounded-none`}
            >
              [ {link.label} ]
            </a>
          ))}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${border} border px-3 py-2 font-mono text-sm ${hover} transition-colors rounded-none`}
            >
              [ LIVE_DEMO ]
            </a>
          )}
        </div>
      </div>
    </TerminalWindow>
  )
}

export default function Projects(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.08)

  return (
    <section id="projects" ref={ref} className="py-12 md:py-14 px-4 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionCommand
          command="find ./projects -type f -name '*.featured'"
          active={isVisible}
          comment="// featured work first — systems I built or contributed to"
        />

        <div className="mb-10">
          <h3 className="text-sm font-mono font-bold text-green mb-4 tracking-wide">
            [ BACKEND_SYSTEMS ]
          </h3>
          <div className={`grid md:grid-cols-2 gap-4 term-stagger ${isVisible ? 'is-visible' : ''}`}>
            {backendProjects.map((project) => (
              <ProjectCard key={project.id} project={project} accentColor="green" />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono font-bold text-cyan mb-4 tracking-wide">
            [ FRONTEND_WEB ]
          </h3>
          <div className={`grid md:grid-cols-2 gap-4 term-stagger ${isVisible ? 'is-visible' : ''}`}>
            {frontendProjects.map((project) => (
              <ProjectCard key={project.id} project={project} accentColor="cyan" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { Projects }
