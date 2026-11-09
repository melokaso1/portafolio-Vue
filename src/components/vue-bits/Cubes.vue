<!--
  Vue Bits (Cubes) - https://vue-bits.dev
  Copiado desde el registro oficial: https://vue-bits.dev/r/Cubes.json
  Ajustes locales:
  - el contenedor ocupa el ancho del padre (w-full) en lugar de w-1/2; se usa con autoAnimate=false.
  - `columns` / `rows` para una retícula rectangular (fondo de toda la página) y `fill` para
    ocupar el alto del padre en vez de ser cuadrada.
  - `listenWindow`: escucha el puntero en window (el fondo queda detrás del contenido), con
    rAF y el rectángulo cacheado (sin getBoundingClientRect en cada movimiento).
  - Solo se animan los cubos cerca del puntero (y los que vuelven a 0), no toda la retícula.
  - Se pausa con la pestaña oculta.
  - Ripple optimizado: en vez de animar backgroundColor de las 6 caras de TODOS los cubos (miles
    de tweens, recálculos de estilo y repintados por clic), se anima solo la opacity de una capa
    de color en la cara frontal, y solo en los cubos dentro de `rippleRadius`; los
    clics repetidos reemplazan los tweens anteriores (sin acumular), hay un throttle mínimo
    entre clics y con prefers-reduced-motion no hay ripple.
  - `backFace=false` omite la cara trasera, que nunca se ve con inclinaciones < 90° (1/6 menos capas 3D).
-->
<template>
  <div class="relative w-full" :class="fill ? 'h-full' : 'aspect-square'" :style="wrapperStyle">
    <div ref="sceneRef" class="grid w-full h-full" :style="sceneStyle">
      <template v-for="(_, r) in rowCells" :key="`row-${r}`">
        <div
          v-for="(__, c) in colCells"
          :key="`${r}-${c}`"
          class="relative w-full h-full transform-3d cube"
          :class="fill ? '' : 'aspect-square'"
          :data-row="r"
          :data-col="c"
        >
          <span class="absolute -inset-9 pointer-events-none" />

          <div
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'translateY(-50%) rotateX(90deg)'
            }"
          />

          <div
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'translateY(50%) rotateX(-90deg)'
            }"
          />

          <div
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'translateX(-50%) rotateY(-90deg)'
            }"
          />

          <div
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'translateX(50%) rotateY(90deg)'
            }"
          />

          <div
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'rotateY(-90deg) translateX(50%) rotateY(90deg)'
            }"
          >
            <span v-if="rippleOnClick" class="cube-glow absolute inset-0 pointer-events-none" :style="{ background: rippleColor, opacity: 0 }" />
          </div>

          <div
            v-if="backFace"
            class="absolute inset-0 flex justify-center items-center cube-face"
            :style="{
              background: 'var(--cube-face-bg)',
              border: 'var(--cube-face-border)',
              boxShadow: 'var(--cube-face-shadow)',
              transform: 'rotateY(90deg) translateX(-50%) rotateY(-90deg)'
            }"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useTemplateRef, watch } from 'vue';
import gsap from 'gsap';

interface Gap {
  row: number;
  col: number;
}

interface Duration {
  enter: number;
  leave: number;
}

interface Props {
  gridSize?: number;
  cubeSize?: number;
  maxAngle?: number;
  radius?: number;
  easing?: gsap.EaseString;
  duration?: Duration;
  cellGap?: number | Gap;
  borderStyle?: string;
  faceColor?: string;
  shadow?: boolean | string;
  autoAnimate?: boolean;
  rippleOnClick?: boolean;
  rippleColor?: string;
  rippleSpeed?: number;
  rippleRadius?: number;
  rippleThrottle?: number;
  backFace?: boolean;
  columns?: number;
  rows?: number;
  fill?: boolean;
  listenWindow?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  gridSize: 10,
  maxAngle: 45,
  radius: 3,
  easing: 'power3.out',
  duration: () => ({ enter: 0.3, leave: 0.6 }),
  borderStyle: '1px solid #fff',
  faceColor: '#0b0b0b',
  shadow: false,
  autoAnimate: true,
  rippleOnClick: true,
  rippleColor: '#fff',
  rippleSpeed: 2,
  rippleRadius: Infinity,
  rippleThrottle: 0,
  backFace: true,
  columns: undefined,
  rows: undefined,
  fill: false,
  listenWindow: false
});

const sceneRef = useTemplateRef<HTMLDivElement>('sceneRef');
const rafRef = ref<number | null>(null);
const idleTimerRef = ref<ReturnType<typeof setTimeout> | null>(null);
const userActiveRef = ref(false);
const simPosRef = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const simTargetRef = ref<{ x: number; y: number }>({ x: 0, y: 0 });
const simRAFRef = ref<number | null>(null);
let lastRipple = -Infinity;
const ripples = new WeakMap<HTMLElement, gsap.core.Timeline>();
const glows = new WeakMap<HTMLElement, HTMLElement | null>();
const glowOf = (cube: HTMLElement) => {
  if (!glows.has(cube)) glows.set(cube, cube.querySelector<HTMLElement>('.cube-glow'));
  return glows.get(cube) ?? null;
};

const colGap = computed(() => {
  return typeof props.cellGap === 'number'
    ? `${props.cellGap}px`
    : (props.cellGap as Gap)?.col !== undefined
      ? `${(props.cellGap as Gap).col}px`
      : '5%';
});

const rowGap = computed(() => {
  return typeof props.cellGap === 'number'
    ? `${props.cellGap}px`
    : (props.cellGap as Gap)?.row !== undefined
      ? `${(props.cellGap as Gap).row}px`
      : '5%';
});

const enterDur = computed(() => props.duration.enter);
const leaveDur = computed(() => props.duration.leave);

const colCount = computed(() => props.columns ?? props.gridSize);
const rowCount = computed(() => props.rows ?? props.gridSize);
const colCells = computed(() => Array.from({ length: colCount.value }));
const rowCells = computed(() => Array.from({ length: rowCount.value }));

const sceneStyle = computed(() => ({
  gridTemplateColumns: props.cubeSize
    ? `repeat(${colCount.value}, ${props.cubeSize}px)`
    : `repeat(${colCount.value}, 1fr)`,
  gridTemplateRows: props.cubeSize
    ? `repeat(${rowCount.value}, ${props.cubeSize}px)`
    : `repeat(${rowCount.value}, 1fr)`,
  columnGap: colGap.value,
  rowGap: rowGap.value,
  perspective: '99999999px',
  gridAutoRows: '1fr'
}));

const wrapperStyle = computed(() => ({
  '--cube-face-border': props.borderStyle,
  '--cube-face-bg': props.faceColor,
  '--cube-face-shadow': props.shadow === true ? '0 0 6px rgba(0,0,0,.5)' : props.shadow || 'none',
  ...(props.cubeSize
    ? {
        width: `${props.gridSize * props.cubeSize}px`,
        height: `${props.gridSize * props.cubeSize}px`
      }
    : {})
}));

let cubeEls: HTMLDivElement[] = [];
const tilted = new Set<HTMLDivElement>();
const cubesList = () => {
  if (!cubeEls.length && sceneRef.value) cubeEls = Array.from(sceneRef.value.querySelectorAll<HTMLDivElement>('.cube'));
  return cubeEls;
};

/** Inclina solo los cubos dentro del radio; los que salieron del radio vuelven a 0. */
const tiltAt = (rowCenter: number, colCenter: number) => {
  if (!sceneRef.value) return;
  const cols = colCount.value;
  const list = cubesList();
  const next = new Set<HTMLDivElement>();
  const r0 = Math.max(0, Math.floor(rowCenter - props.radius));
  const r1 = Math.min(rowCount.value - 1, Math.ceil(rowCenter + props.radius));
  const c0 = Math.max(0, Math.floor(colCenter - props.radius));
  const c1 = Math.min(cols - 1, Math.ceil(colCenter + props.radius));
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const cube = list[r * cols + c];
      if (!cube) continue;
      const dist = Math.hypot(r - rowCenter, c - colCenter);
      if (dist > props.radius) continue;
      const angle = (1 - dist / props.radius) * props.maxAngle;
      next.add(cube);
      gsap.to(cube, { duration: enterDur.value, ease: props.easing, overwrite: 'auto', rotateX: -angle, rotateY: angle });
    }
  }
  tilted.forEach(cube => {
    if (next.has(cube)) return;
    gsap.to(cube, { duration: leaveDur.value, ease: 'power3.out', overwrite: 'auto', rotateX: 0, rotateY: 0 });
  });
  tilted.clear();
  next.forEach(cube => tilted.add(cube));
};

watch([colCount, rowCount], () => {
  cubeEls = [];
  tilted.clear();
  rect = null;
});

let rect: DOMRect | null = null;
const measure = () => {
  rect = sceneRef.value?.getBoundingClientRect() ?? null;
};

const onPointerMove = (e: PointerEvent) => {
  userActiveRef.value = true;
  if (idleTimerRef.value) clearTimeout(idleTimerRef.value);

  if (document.hidden) return;
  if (!rect || !props.listenWindow) measure();
  if (!rect) return;
  const cellW = rect.width / colCount.value;
  const cellH = rect.height / rowCount.value;
  const colCenter = (e.clientX - rect.left) / cellW;
  const rowCenter = (e.clientY - rect.top) / cellH;

  if (rafRef.value) cancelAnimationFrame(rafRef.value);
  rafRef.value = requestAnimationFrame(() => tiltAt(rowCenter, colCenter));

  idleTimerRef.value = setTimeout(() => {
    userActiveRef.value = false;
  }, 3000);
};

const resetAll = () => {
  if (!sceneRef.value) return;
  tilted.clear();
  cubesList().forEach(cube =>
    gsap.to(cube, {
      duration: leaveDur.value,
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out'
    })
  );
};

const onClick = (e: MouseEvent) => {
  if (!props.rippleOnClick || !sceneRef.value || document.hidden) return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const now = performance.now();
  if (now - lastRipple < props.rippleThrottle) return;
  lastRipple = now;
  if (props.listenWindow && (e.target as Element | null)?.closest?.('a, button, input, textarea, select, [role="button"], [data-cursor]')) return;

  measure();
  if (!rect) return;
  const cellW = rect.width / colCount.value;
  const cellH = rect.height / rowCount.value;
  const colHit = Math.floor((e.clientX - rect.left) / cellW);
  const rowHit = Math.floor((e.clientY - rect.top) / cellH);

  const baseRingDelay = 0.15;
  const baseAnimDur = 0.3;
  const baseHold = 0.6;

  const spreadDelay = baseRingDelay / props.rippleSpeed;
  const animDuration = baseAnimDur / props.rippleSpeed;
  const holdTime = baseHold / props.rippleSpeed;

  const maxRing = props.rippleRadius;
  cubesList().forEach(cube => {
    const r = +cube.dataset.row!;
    const c = +cube.dataset.col!;
    const ring = Math.round(Math.hypot(r - rowHit, c - colHit));
    if (ring > maxRing) return;
    const delay = ring * spreadDelay;
    // Una sola capa por cubo (la cara frontal) y solo opacity. Un clic nuevo corta la onda
    // anterior de ese cubo (no se acumulan tweens).
    const glow = glowOf(cube);
    if (!glow) return;
    ripples.get(glow)?.kill();
    const tl = gsap.timeline({ onComplete: () => ripples.delete(glow) });
    tl.to(glow, { opacity: 1, duration: animDuration, delay, ease: 'power3.out' });
    tl.to(glow, { opacity: 0, duration: animDuration, delay: holdTime, ease: 'power3.out' });
    ripples.set(glow, tl);
  });
};

const startAutoAnimation = () => {
  if (!props.autoAnimate || !sceneRef.value) return;

  simPosRef.value = {
    x: Math.random() * props.gridSize,
    y: Math.random() * props.gridSize
  };
  simTargetRef.value = {
    x: Math.random() * props.gridSize,
    y: Math.random() * props.gridSize
  };

  const speed = 0.02;
  const loop = () => {
    if (!userActiveRef.value) {
      const pos = simPosRef.value;
      const tgt = simTargetRef.value;
      pos.x += (tgt.x - pos.x) * speed;
      pos.y += (tgt.y - pos.y) * speed;
      tiltAt(pos.y, pos.x);

      if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
        simTargetRef.value = {
          x: Math.random() * props.gridSize,
          y: Math.random() * props.gridSize
        };
      }
    }
    simRAFRef.value = requestAnimationFrame(loop);
  };
  simRAFRef.value = requestAnimationFrame(loop);
};

onMounted(() => {
  const el = sceneRef.value;
  if (!el) return;

  if (props.listenWindow) {
    measure();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    document.documentElement.addEventListener('pointerleave', resetAll);
    window.addEventListener('click', onClick);
  } else {
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', resetAll);
    el.addEventListener('click', onClick);
  }

  startAutoAnimation();
});

onUnmounted(() => {
  const el = sceneRef.value;
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('resize', measure);
  document.documentElement.removeEventListener('pointerleave', resetAll);
  window.removeEventListener('click', onClick);
  if (el) {
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerleave', resetAll);
    el.removeEventListener('click', onClick);
  }

  if (rafRef.value !== null) cancelAnimationFrame(rafRef.value);
  if (idleTimerRef.value !== null) clearTimeout(idleTimerRef.value);
  if (simRAFRef.value !== null) cancelAnimationFrame(simRAFRef.value);
});
</script>
