import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

const FINE = '(hover: hover) and (pointer: fine)'
const REDUCE = '(prefers-reduced-motion: reduce)'

/**
 * true solo con mouse/trackpad y sin prefers-reduced-motion.
 * Se usa para montar los efectos que dependen del puntero (Tech Text, Cubes, cursor propio).
 */
export function useFinePointer(): Ref<boolean> {
  const fine = ref(false)
  let lists: MediaQueryList[] = []
  const update = () => {
    fine.value = lists.length === 2 && lists[0]!.matches && !lists[1]!.matches
  }
  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return
    lists = [window.matchMedia(FINE), window.matchMedia(REDUCE)]
    lists.forEach((l) => l.addEventListener?.('change', update))
    update()
  })
  onBeforeUnmount(() => lists.forEach((l) => l.removeEventListener?.('change', update)))
  return fine
}

/** true cuando el viewport mide al menos `px` de ancho. */
export function useMinWidth(px: number): Ref<boolean> {
  const desktop = ref(false)
  let list: MediaQueryList | null = null
  const update = () => (desktop.value = Boolean(list?.matches))
  onMounted(() => {
    if (typeof window.matchMedia !== 'function') return
    list = window.matchMedia(`(min-width: ${px}px)`)
    list.addEventListener?.('change', update)
    update()
  })
  onBeforeUnmount(() => list?.removeEventListener?.('change', update))
  return desktop
}
