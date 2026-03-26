import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import { personalInfo } from '../data/portfolio'

export default function About(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>()

  return (
    <section
      id="about"
      ref={ref}
      className={`py-20 px-4 bg-bg ${isVisible ? 'fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-cyan mb-12">
          // ABOUT_ME
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Bio */}
          <div className="space-y-4 text-text font-mono text-sm md:text-base leading-relaxed">
            <p>{personalInfo.bio}</p>
            <p>
              Specialized in backend development with expertise in Python, C#, and database design. I build
              scalable APIs, complex database systems, and enterprise applications.
            </p>
            <p>
              Always learning new technologies and best practices. Current focus: Node.js/Express, advanced MySQL,
              and C# .NET ecosystem.
            </p>
          </div>

          {/* Right Column - Profile JSON */}
          <div>
            <TerminalWindow title="PROFILE.JSON" accentColor="green">
              <div className="font-mono text-xs md:text-sm space-y-2 text-text">
                <div>{'{'}</div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;name&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;Alejandro&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;location&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;Floridablanca, CO&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;origin&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;Bogotá, CO&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;focus&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;Backend Development&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;english&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;B2 Upper-Intermediate&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;spanish&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;Native&quot;</span>
                  <span className="text-text">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-cyan">&quot;status&quot;</span>
                  <span className="text-text">: </span>
                  <span className="text-green">&quot;AVAILABLE&quot;</span>
                </div>
                <div>{'}'}</div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  )
}

export { About }
