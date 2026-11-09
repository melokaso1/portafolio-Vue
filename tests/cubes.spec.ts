import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import gsap from 'gsap'
import Cubes from '@/components/vue-bits/Cubes.vue'

const mountCubes = () => {
  const host = document.createElement('div')
  document.body.appendChild(host)
  const wrapper = mount(Cubes, {
    attachTo: host,
    props: { gridSize: 10, autoAnimate: false, rippleOnClick: true, rippleRadius: 2, rippleThrottle: 180, backFace: false },
  })
  const scene = wrapper.find('.grid').element as HTMLElement
  scene.getBoundingClientRect = () => ({ left: 0, top: 0, width: 500, height: 500, right: 500, bottom: 500, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect
  return wrapper
}

const animatedGlows = (root: Element) =>
  [...root.querySelectorAll('.cube-glow')].filter((g) => gsap.getTweensOf(g).length > 0).length

describe('Cubes: ripple optimizado', () => {
  it('solo anima la capa de los cubos dentro del radio, sin tocar las caras', async () => {
    const wrapper = mountCubes()
    const scene = wrapper.find('.grid')
    await scene.trigger('click', { clientX: 225, clientY: 225 })
    const n = animatedGlows(wrapper.element)
    // Radio 2 alrededor de la celda (4, 4): 21 cubos de 100, no la retícula entera.
    expect(n).toBeGreaterThan(0)
    expect(n).toBeLessThanOrEqual(25)
    const faces = [...wrapper.element.querySelectorAll('.cube-face')]
    expect(faces.some((f) => gsap.getTweensOf(f).length > 0)).toBe(false)
    wrapper.unmount()
  })

  it('sin cara trasera con backFace=false (5 caras por cubo)', () => {
    const wrapper = mountCubes()
    const cube = wrapper.find('.cube')
    expect(cube.findAll('.cube-face')).toHaveLength(5)
    wrapper.unmount()
  })

  it('ignora clics repetidos dentro del throttle', async () => {
    const wrapper = mountCubes()
    const scene = wrapper.find('.grid')
    await scene.trigger('click', { clientX: 25, clientY: 25 })
    const first = animatedGlows(wrapper.element)
    await scene.trigger('click', { clientX: 475, clientY: 475 })
    expect(animatedGlows(wrapper.element)).toBe(first)
    wrapper.unmount()
  })
})
