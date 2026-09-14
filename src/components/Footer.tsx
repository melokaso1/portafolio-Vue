export default function Footer(): JSX.Element {
  return (
    <footer className="py-6 px-4 bg-bg border-t border-border pb-14">
      <div className="max-w-6xl mx-auto font-mono text-sm space-y-3">
        <p className="text-muted">
          <span className="text-green">melokaso1@portfolio</span>
          <span className="text-muted">:</span>
          <span className="text-cyan">~</span>
          <span className="text-muted">$ </span>
          <span className="text-text">exit</span>
        </p>
        <p className="text-muted text-xs">
          session closed · © 2026 Jhon Alejandro Escobar Lozada · BACKEND_DEVELOPER
        </p>
      </div>
    </footer>
  )
}

export { Footer }
