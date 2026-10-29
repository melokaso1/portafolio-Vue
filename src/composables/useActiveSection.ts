import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** Devuelve el id de la sección visible para resaltar el enlace activo. */
export function useActiveSection(ids: string[], initial = ids[0] ?? ''): Ref<string> {
  const active = ref(initial)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof IntersectionObserver === 'undefined') return
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer?.observe(el)
    })
  })
  onBeforeUnmount(() => observer?.disconnect())

  return active
}
