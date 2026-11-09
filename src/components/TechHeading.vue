<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useFinePointer } from '@/composables/useFinePointer'

/**
 * Título con Tech Text (Vue Bits). El texto real va en el elemento de encabezado (accesible y
 * indexable); el canvas es decorativo y solo se monta con puntero fino y sin reduced-motion.
 */
const props = withDefaults(
  defineProps<{
    text: string
    tag?: 'h1' | 'h2' | 'p'
    fontSize?: number
    height?: number
    id?: string
  }>(),
  { tag: 'h2', fontSize: 56, height: 64, id: undefined },
)

const TechText = defineAsyncComponent(() => import('./vue-bits/TechText.vue'))
const fine = useFinePointer()
</script>

<template>
  <component :is="props.tag" :id="id" class="relative" :class="fine ? '' : 'font-display font-semibold leading-[1.05] tracking-[-0.025em] text-ink'" :style="fine ? undefined : { fontSize: `clamp(${Math.round(fontSize * 0.6)}px, 8vw, ${fontSize}px)` }">
    <span :class="fine ? 'sr-only' : ''">{{ text }}</span>
    <span v-if="fine" aria-hidden="true" class="block max-w-full" :style="{ height: `${height}px`, width: `${Math.ceil(text.length * fontSize * 0.56)}px` }">
      <TechText
        :text="text"
        font-family="Inter Tight, Inter, sans-serif"
        :font-weight="600"
        :font-size="fontSize"
        :letter-spacing="-0.025"
        color="#ECEAE6"
        accent-color="#E8A33D"
        :reach="140"
        :specks="0"
        :selection="false"
        :labels="false"
        :draggable="false"
        :sweep="false"
        reveal="area"
        align="left"
      />
    </span>
  </component>
</template>
