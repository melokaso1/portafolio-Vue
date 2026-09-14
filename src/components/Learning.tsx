import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import SectionCommand from './SectionCommand'
import { learningItems } from '../data/portfolio'

export default function Learning(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>(0.12)

  return (
    <section id="learning" ref={ref} className="py-12 md:py-14 px-4 bg-bg">
      <div className="max-w-6xl mx-auto">
        <SectionCommand
          command="ps aux | grep learning"
          active={isVisible}
          comment="// processes completed and still running"
        />

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 term-stagger ${isVisible ? 'is-visible' : ''}`}
        >
          {learningItems.map((item) => {
            const done = item.status === 'completed'
            return (
              <TerminalWindow
                key={item.id}
                title={item.title}
                accentColor={done ? 'green' : 'cyan'}
              >
                <div className="space-y-4">
                  <div className="text-muted font-mono text-sm">{item.subtitle}</div>

                  <div
                    className={`w-full bg-border h-2 border rounded-none overflow-hidden ${
                      done ? 'border-green' : 'border-cyan'
                    }`}
                  >
                    <div
                      className={`h-full ${done ? 'bg-green w-full' : 'bg-cyan'}`}
                      style={
                        done
                          ? undefined
                          : {
                              animation:
                                'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, slideIn 2.4s ease-in-out infinite',
                            }
                      }
                    />
                  </div>

                  <div
                    className={`inline-block border px-3 py-1 font-mono text-xs ${
                      done
                        ? 'border-green text-green'
                        : 'border-cyan text-cyan'
                    }`}
                  >
                    {done ? '[ COMPLETED ]' : '[ IN_PROGRESS ]'}
                  </div>
                </div>
              </TerminalWindow>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { Learning }
