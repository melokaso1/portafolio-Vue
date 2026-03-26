import { useIntersection } from '../hooks/useIntersection'
import TerminalWindow from './TerminalWindow'
import { learningItems } from '../data/portfolio'

export default function Learning(): JSX.Element {
  const [ref, isVisible] = useIntersection<HTMLDivElement>()

  return (
    <section
      id="learning"
      ref={ref}
      className={`py-20 px-4 bg-bg ${isVisible ? 'fade-in' : 'opacity-0'}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-mono font-bold text-cyan mb-12">
          // CURRENTLY_LOADING
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningItems.map((item) => (
            <TerminalWindow key={item.id} title={item.title} accentColor="green">
              <div className="space-y-4">
                <div className="text-muted font-mono text-sm">{item.subtitle}</div>

                {/* Progress Bar */}
                <div className="w-full bg-border h-2 border border-green rounded-none overflow-hidden">
                  <div
                    className="h-full bg-green animate-pulse"
                    style={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, slideIn 2s ease-in-out infinite',
                    }}
                  ></div>
                </div>

                {/* Status Badge */}
                <div className="inline-block border border-green text-green px-3 py-1 font-mono text-xs animate-pulse">
                  [ IN_PROGRESS ]
                </div>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          0%, 100% {
            width: 0%;
          }
          50% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}

export { Learning }
