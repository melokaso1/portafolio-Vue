<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useFinePointer } from '@/composables/useFinePointer'

/**
 * Fondo de toda la página: UNA sola instancia de Cubes (Vue Bits), fija detrás del contenido.
 * Preset del diseño: gap 0.3 y aristas punteadas #2A2D32, ripple ámbar sutil al hacer clic en
 * una zona sin enlaces. Escucha el puntero en window, así no bloquea clics ni selección.
 * Con táctil o prefers-reduced-motion es una retícula estática en CSS (sin nodos 3D ni JS).
 */
const Cubes = defineAsyncComponent(() => import('../vue-bits/Cubes.vue'))
const fine = useFinePointer()

const CELL = 64
const cols = ref(0)
const rows = ref(0)
let timer: ReturnType<typeof setTimeout> | undefined

const size = () => {
  cols.value = Math.ceil(window.innerWidth / CELL)
  rows.value = Math.ceil(window.innerHeight / CELL)
}
const onResize = () => {
  clearTimeout(timer)
  timer = setTimeout(size, 150)
}

onMounted(() => {
  size()
  window.addEventListener('resize', onResize, { passive: true })
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div id="bg-cubes" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg" aria-hidden="true">
    <div v-if="fine && cols && rows" class="absolute -inset-[2px]" :style="{ width: `${cols * CELL}px`, height: `${rows * CELL}px` }">
      <Cubes
        fill
        listen-window
        :columns="cols"
        :rows="rows"
        :max-angle="40"
        :radius="3"
        :cell-gap="Math.round(CELL * 0.3 * 0.77)"
        border-style="1px dashed #2A2D32"
        face-color="#0E0F11"
        :auto-animate="false"
        ripple-on-click
        ripple-color="rgba(232, 163, 61, 0.22)"
        :ripple-speed="2"
        :ripple-radius="5"
        :ripple-throttle="180"
        :back-face="false"
      />
    </div>
    <div v-else class="static-grid absolute inset-0" />
    <!-- Velo: el texto (columna izquierda) queda sobre fondo casi liso; los cubos se ven a la derecha. -->
    <div class="veil absolute inset-0" />
  </div>
</template>

<style scoped>
.static-grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect x='7.5' y='7.5' width='49' height='49' fill='none' stroke='%232A2D32' stroke-dasharray='4 3'/%3E%3C/svg%3E");
  background-size: 64px 64px;
}
.veil {
  background: linear-gradient(
    to right,
    rgb(14 15 17 / 0.88) 0%,
    rgb(14 15 17 / 0.8) 50%,
    rgb(14 15 17 / 0.35) 72%,
    rgb(14 15 17 / 0.1) 100%
  );
}
@media (max-width: 1023px) {
  .veil {
    background: rgb(14 15 17 / 0.72);
  }
}
</style>
