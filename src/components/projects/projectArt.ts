/**
 * Arte de las Holo Cards: SVG generado (sin imágenes externas). Fondo grafito, ventana interior
 * con estrellas de foil neutro y una banda de brillo blanca. El monograma y los textos van en HTML
 * encima, con las fuentes reales del sitio.
 */
const SURFACE = '#16181B'
const LINE = '#2A2D32'
const INK = '#ECEAE6'

const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

export function holoArt(seed: number, w = 240, h = 320): string {
  const rand = rng(seed * 97 + 13)
  const top = h * 0.62
  const parts: string[] = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
    `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="16" fill="${SURFACE}" stroke="${LINE}"/>`,
    `<rect x="12.5" y="12.5" width="${w - 25}" height="${top.toFixed(0)}" rx="10" fill="#1C1F23" stroke="#33373D"/>`,
  ]
  const count = Math.round((w * h) / 1400)
  for (let i = 0; i < count; i++) {
    const x = 16 + rand() * (w - 32)
    const y = 16 + rand() * (top - 8)
    const r = [1.2, 1.6, 2.4, 3.4][Math.floor(rand() * 4)]!
    const op = (0.15 + rand() * 0.6).toFixed(2)
    if (r > 2) {
      const d = `M${x},${y - r * 2} L${x + r * 0.45},${y - r * 0.45} L${x + r * 2},${y} L${x + r * 0.45},${y + r * 0.45} L${x},${y + r * 2} L${x - r * 0.45},${y + r * 0.45} L${x - r * 2},${y} L${x - r * 0.45},${y - r * 0.45} Z`
      parts.push(`<path d="${d}" fill="${INK}" opacity="${op}"/>`)
    } else {
      parts.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r / 2}" fill="${INK}" opacity="${op}"/>`)
    }
  }
  parts.push(`<path d="M${w * 0.15},12 L${w * 0.42},12 L${w * 0.12},${top + 12} L12,${top + 12} L12,${h * 0.5} Z" fill="#FFFFFF" opacity="0.05"/>`)
  parts.push('</svg>')
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(parts.join(''))}`
}

/** Monograma corto por proyecto (como en el Figma v2). */
export const monograms: Record<string, string> = {
  nodux: 'N',
  'inteligent-inventory': 'IN',
  agendabot: 'AB',
  'todo-hexagonal': 'TD',
  'liga-betplay': 'LB',
  'abc-lms': 'LMS',
  'dataset-editor': 'TG',
}

/** Título corto para la tarjeta: sin el paréntesis. */
export const shortTitle = (title: string) => title.replace(/\s*\(.*\)\s*$/, '')

/** Línea de la leyenda: el problema si está confirmado; si no, la primera frase del resumen. */
export const captionLine = (problem: string | undefined, summary: string) => {
  if (problem) return problem
  const first = summary.split(/(?<=\.)\s|:\s/)[0] ?? summary
  return first.endsWith('.') ? first : `${first}.`
}
