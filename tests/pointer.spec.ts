import { afterEach, describe, expect, it, vi } from 'vitest'
import { subscribePointer } from '@/composables/usePointer'

describe('usePointer: seguimiento del mouse compartido', () => {
  afterEach(() => vi.restoreAllMocks())

  it('un solo listener de pointermove en window para todos los suscriptores', () => {
    const add = vi.spyOn(window, 'addEventListener')
    const offs = [subscribePointer(() => {}), subscribePointer(() => {}), subscribePointer(() => {})]
    expect(add.mock.calls.filter(([type]) => type === 'pointermove')).toHaveLength(1)
    offs.forEach((off) => off())
  })

  it('entrega la posición una vez por frame a todos, con un solo rAF', () => {
    const frames: FrameRequestCallback[] = []
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => (frames.push(cb), frames.length))
    const a = vi.fn()
    const b = vi.fn()
    const offA = subscribePointer(a)
    const offB = subscribePointer(b)
    for (let i = 0; i < 5; i++) {
      const e = new MouseEvent('pointermove', { clientX: 10 + i, clientY: 20 }) as PointerEvent
      Object.defineProperty(e, 'pointerType', { value: 'mouse' })
      window.dispatchEvent(e)
    }
    expect(frames).toHaveLength(1)
    frames[0]!(0)
    expect(a).toHaveBeenCalledTimes(1)
    expect(b).toHaveBeenCalledTimes(1)
    expect(a.mock.calls[0]![0]).toMatchObject({ x: 14, y: 20, inside: true })
    offA()
    offB()
  })
})
