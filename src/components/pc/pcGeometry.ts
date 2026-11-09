/**
 * Geometría del PC isométrico (ilustración propia, sin assets de terceros).
 * Cada pieza es un grupo de polígonos en coordenadas de pantalla; la historia del scroll
 * revela una "etapa" por sección (ver PcIllustration.vue y el storyboard del Figma v2).
 */

export type PcStage = 0 | 1 | 2 | 3 | 4 | 5

export interface PcShape {
  type: 'polygon' | 'line' | 'ellipse' | 'path'
  /** polygon: "x,y x,y ..."; path: atributo d. */
  points?: string
  d?: string
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  cx?: number
  cy?: number
  rx?: number
  ry?: number
  fill: string
  stroke: string
  strokeWidth?: number
  dash?: string
  opacity?: number
}

export interface PcPart {
  id: string
  /** Etapa (sección) en la que aparece la pieza. */
  stage: PcStage
  label: string
  shapes: PcShape[]
}

const C = Math.cos(Math.PI / 6)
const LINE = '#2A2D32'
const STROKE = '#9C9A94'
const WIRE = '#6A6E76'
const DARK = '#3A3E45'
const FACES = ['#30343A', '#25282D', '#1D2024'] as const

type Pt = [number, number]
const P = (x: number, y: number, z: number): Pt => [(x - y) * C, (x + y) * 0.5 - z]
const pts = (list: Pt[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(' ')

const poly = (list: Pt[], fill: string, stroke: string, extra: Partial<PcShape> = {}): PcShape => ({
  type: 'polygon',
  points: pts(list),
  fill,
  stroke,
  strokeWidth: 1,
  ...extra,
})

/** Caja isométrica: cara y+ (izquierda), x+ (derecha) y superior. */
const box = (x: number, y: number, z: number, w: number, d: number, h: number): PcShape[] => {
  const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]
  const xf = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)]
  const yf = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)]
  return [poly(yf, FACES[2], STROKE), poly(xf, FACES[1], STROKE), poly(top, FACES[0], STROKE)]
}

const W = 170
const D = 360
const H = 400

const rect = (a: Pt, b: Pt, c: Pt, d: Pt) => [a, b, c, d]

const caseWalls = (fill: boolean, stroke: string, dash?: string): PcShape[] => {
  const o = { dash, strokeWidth: 1 }
  return [
    poly(rect(P(0, 0, 0), P(0, D, 0), P(0, D, H), P(0, 0, H)), fill ? '#111316' : 'none', stroke, o),
    poly(rect(P(0, 0, 0), P(W, 0, 0), P(W, D, 0), P(0, D, 0)), fill ? '#0F1013' : 'none', stroke, o),
    poly(rect(P(0, 0, 0), P(W, 0, 0), P(W, 0, H), P(0, 0, H)), fill ? '#121417' : 'none', stroke, o),
  ]
}

const casePanels = (fill: boolean, stroke: string, dash?: string): PcShape[] => {
  const o = { dash, strokeWidth: 1 }
  return [
    poly(rect(P(0, D, 0), P(W, D, 0), P(W, D, H), P(0, D, H)), fill ? '#15171A' : 'none', stroke, o),
    poly(rect(P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)), fill ? '#1B1D21' : 'none', stroke, o),
  ]
}

const sidePlane = rect(P(W, 0, 0), P(W, D, 0), P(W, D, H), P(W, 0, H))
const power = P(W * 0.5, D, H - 30)

const traces: PcShape[] = [0, 1, 2, 3].map((i) => {
  const [x1, y1] = P(8, 60 + i * 30, 140)
  const [x2, y2] = P(8, 60 + i * 30, 260)
  return { type: 'line', x1, y1, x2, y2, fill: 'none', stroke: DARK, strokeWidth: 0.8 }
})

const monitor = (): PcShape[] => {
  const mx = -40
  const my = D + 20
  const mz = 110
  const screens = [
    [40, 120],
    [130, 150],
    [240, 120],
  ].map(([yy, hh]) =>
    poly(
      rect(
        P(mx + 12, my + yy!, mz + 40),
        P(mx + 12, my + yy! + 70, mz + 40),
        P(mx + 12, my + yy! + 70, mz + 40 + hh! * 0.9),
        P(mx + 12, my + yy!, mz + 40 + hh! * 0.9),
      ),
      '#22252A',
      STROKE,
    ),
  )
  return [...box(mx - 10, my + 140, 0, 40, 50, 110), ...box(mx, my, mz, 12, 330, 200), ...screens]
}

const cable: PcShape = (() => {
  const a = P(80, 260, 86)
  const b = P(40, 240, 160)
  const c = P(10, 230, 200)
  return {
    type: 'path',
    d: `M${a[0].toFixed(1)} ${a[1].toFixed(1)} Q ${b[0].toFixed(1)} ${b[1].toFixed(1)} ${c[0].toFixed(1)} ${c[1].toFixed(1)}`,
    fill: 'none',
    stroke: STROKE,
    strokeWidth: 1.2,
  }
})()

/** Piezas en orden de pintado (de atrás hacia adelante). */
export const pcParts: PcPart[] = [
  { id: 'case-wire', stage: 0, label: 'Carcasa', shapes: [...caseWalls(false, WIRE, '4 3'), ...casePanels(false, WIRE, '4 3')] },
  { id: 'case-walls', stage: 1, label: 'Carcasa', shapes: caseWalls(true, DARK) },
  { id: 'board', stage: 1, label: 'Placa base', shapes: [...box(0, 30, 100, 8, 300, 280), ...traces] },
  { id: 'cpu', stage: 1, label: 'CPU', shapes: box(8, 190, 290, 46, 58, 58) },
  { id: 'gpu', stage: 2, label: 'GPU', shapes: box(8, 60, 210, 78, 250, 30) },
  {
    id: 'ram',
    stage: 3,
    label: 'RAM',
    shapes: [0, 1, 2, 3].flatMap((i) => box(8, 262 + i * 10, 280, 30, 4, 96)),
  },
  { id: 'ssd', stage: 3, label: 'Almacenamiento', shapes: box(8, 70, 150, 22, 70, 6) },
  { id: 'psu', stage: 4, label: 'Fuente de poder', shapes: box(6, 200, 6, 150, 150, 80) },
  { id: 'cable', stage: 4, label: 'Cables', shapes: [cable] },
  { id: 'case-panels', stage: 1, label: 'Carcasa', shapes: casePanels(true, DARK) },
  {
    id: 'side-open',
    stage: 0,
    label: 'Panel lateral',
    shapes: [poly(sidePlane, 'none', LINE, { dash: '4 3' })],
  },
  {
    id: 'glass',
    stage: 5,
    label: 'Panel lateral',
    shapes: [poly(sidePlane, '#FFFFFF', 'none', { opacity: 0.06 }), poly(sidePlane, 'none', STROKE)],
  },
  { id: 'monitor', stage: 2, label: 'Monitor', shapes: monitor() },
  { id: 'keyboard', stage: 5, label: 'Teclado', shapes: box(90, D + 40, 0, 100, 260, 10) },
]

export const powerButton = { cx: power[0], cy: power[1] }

/** Desplazamiento (en pantalla) con el que entra una pieza: "desde afuera de la carcasa". */
export const entryOffset: Record<string, { x: number; y: number }> = {
  board: { x: 52, y: 30 },
  cpu: { x: 52, y: 30 },
  gpu: { x: 52, y: 30 },
  ram: { x: 0, y: -60 },
  ssd: { x: 52, y: 30 },
  psu: { x: 0, y: 70 },
  monitor: { x: -40, y: 0 },
  keyboard: { x: 0, y: 40 },
}

/** Marco común para que todas las etapas encajen en el mismo lienzo. */
export const PC_VIEWBOX = '-670 -420 840 870'
