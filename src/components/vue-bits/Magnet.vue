<!--
  Vue Bits (Magnet) - https://vue-bits.dev
  Copiado desde el registro oficial: https://vue-bits.dev/r/Magnet.json
  Ajustes locales (rendimiento y cursor):
  - El transform se escribe directo en el elemento desde un rAF con interpolación (sin estado
    reactivo ni re-render de Vue por movimiento, sin transición CSS que desfase al cursor).
  - Listener pasivo de pointermove; el rect del contenedor (sin transform) se cachea y solo se
    vuelve a medir tras scroll o resize.
  - Prop maxOffset: tope del desplazamiento para no invadir elementos vecinos.
  - Publica el desplazamiento actual en magnetRegistry (lo usa el cursor propio).
-->
<template>
  <div ref="magnetRef" :class="wrapperClassName" :style="{ position: 'relative', display: 'inline-block' }" v-bind="$attrs">
    <div ref="innerRef" data-magnet :class="innerClassName" style="will-change: transform">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { magnetOffsets } from './magnetRegistry';

interface Props {
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  maxOffset?: number;
  wrapperClassName?: string;
  innerClassName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: 100,
  disabled: false,
  magnetStrength: 2,
  maxOffset: Infinity,
  wrapperClassName: '',
  innerClassName: ''
});

defineOptions({
  inheritAttrs: false
});

const magnetRef = useTemplateRef<HTMLDivElement>('magnetRef');
const innerRef = useTemplateRef<HTMLDivElement>('innerRef');

let rect: DOMRect | null = null;
const target = { x: 0, y: 0 };
const current = { x: 0, y: 0 };
let raf = 0;

const clamp = (v: number) => Math.max(-props.maxOffset, Math.min(props.maxOffset, v));

const tick = () => {
  raf = 0;
  current.x += (target.x - current.x) * 0.22;
  current.y += (target.y - current.y) * 0.22;
  if (Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05) {
    current.x = target.x;
    current.y = target.y;
  } else {
    raf = requestAnimationFrame(tick);
  }
  const el = innerRef.value;
  if (el) {
    el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
    magnetOffsets.set(el, { x: current.x, y: current.y });
  }
};
const schedule = () => {
  if (!raf) raf = requestAnimationFrame(tick);
};

const handleMove = (e: PointerEvent) => {
  if (!magnetRef.value || props.disabled || e.pointerType !== 'mouse') return;
  rect ??= magnetRef.value.getBoundingClientRect();
  const { left, top, width, height } = rect;
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const inside = Math.abs(centerX - e.clientX) < width / 2 + props.padding && Math.abs(centerY - e.clientY) < height / 2 + props.padding;
  const nx = inside ? clamp((e.clientX - centerX) / props.magnetStrength) : 0;
  const ny = inside ? clamp((e.clientY - centerY) / props.magnetStrength) : 0;
  if (nx !== target.x || ny !== target.y) {
    target.x = nx;
    target.y = ny;
    schedule();
  }
};
const invalidate = () => {
  rect = null;
};

onMounted(() => {
  window.addEventListener('pointermove', handleMove, { passive: true });
  window.addEventListener('scroll', invalidate, { passive: true });
  window.addEventListener('resize', invalidate, { passive: true });
});

onUnmounted(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener('pointermove', handleMove);
  window.removeEventListener('scroll', invalidate);
  window.removeEventListener('resize', invalidate);
});

watch(
  () => props.disabled,
  newDisabled => {
    if (newDisabled) {
      target.x = 0;
      target.y = 0;
      schedule();
    }
  }
);
</script>
