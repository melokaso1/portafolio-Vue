/**
 * Desplazamiento actual de cada Magnet (en px), por elemento interior. El cursor propio lo lee
 * para que el contorno siga al botón sin medir el DOM en cada movimiento.
 */
export const magnetOffsets = new WeakMap<Element, { x: number; y: number }>()
