import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

const QUERY = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(QUERY).matches
    : false
}

/** Estado reactivo de prefers-reduced-motion. */
export function useReducedMotion(): Ref<boolean> {
  const reduced = ref(prefersReducedMotion())
  let mql: MediaQueryList | null = null
  const update = (e: MediaQueryListEvent) => {
    reduced.value = e.matches
  }

  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return
    mql = window.matchMedia(QUERY)
    reduced.value = mql.matches
    mql.addEventListener('change', update)
  })
  onBeforeUnmount(() => mql?.removeEventListener('change', update))

  return reduced
}
