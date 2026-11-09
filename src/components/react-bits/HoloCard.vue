<!--
  Holo Card: port a Vue 3 + TypeScript del componente de React Bits.
  Original: https://www.reactbits.dev/components/holo-card (HoloCard-TS-TW)
  Autor del original: David Haz y colaboradores de React Bits. Licencia MIT + Commons Clause
  (https://github.com/DavidHaz/react-bits/blob/main/LICENSE.md): se puede usar en proyectos,
  pero no revender el componente como tal.
  Cambios del port:
  - Solo el preset "stars" y foil neutro: la función hue() del shader se cambió por una rampa de
    grises, así no hay degradados multicolor (regla de la paleta Grafito y ámbar).
  - `active`: el shader WebGL2 solo corre en la tarjeta activa; las demás muestran la imagen
    estática (menos contextos WebGL y menos GPU). Sin volteo (backImage) ni modo idle.
  - Slot por defecto para el texto encima de la tarjeta.
  - Con prefers-reduced-motion o sin WebGL2: imagen estática, sin tilt.
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    image: string
    alt?: string
    active?: boolean
    intensity?: number
    scale?: number
    edgeSparkle?: number
    frame?: number
    glare?: number
    radius?: number
    tiltMax?: number
    hoverScale?: number
  }>(),
  {
    alt: '',
    active: true,
    intensity: 0.35,
    scale: 1,
    edgeSparkle: 0.15,
    frame: 4,
    glare: 0.5,
    radius: 16,
    tiltMax: 12,
    hoverScale: 1.03,
  },
)

const PERSPECTIVE = 1100

const VERTEX = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAGMENT = `#version 300 es
precision highp float;
uniform sampler2D uArt;
uniform vec2 uSize;
uniform float uAspect;
uniform vec2 uTilt;
uniform vec2 uLight;
uniform float uDistance;
uniform float uIntensity;
uniform float uScale;
uniform float uEdge;
uniform float uFrame;
uniform float uRadius;
uniform float uGlare;
uniform float uReady;
out vec4 outColor;
const float TAU = 6.28318530718;
struct Foil { float mask; float angle; float jitter; vec2 facet; };
float hash(vec2 p) { p = fract(p * vec2(234.34, 435.345)); p += dot(p, p + 34.23); return fract(p.x * p.y); }
vec2 hash2(vec2 p) { return vec2(hash(p), hash(p + 17.31)); }
// Foil neutro: rampa de grises en lugar del arcoíris original.
vec3 hue(float t) { t = abs(fract(t * 0.5) * 2.0 - 1.0); return vec3(mix(0.55, 1.0, smoothstep(0.0, 1.0, t))); }
Foil stars(vec2 p) {
  Foil best = Foil(0.0, 0.0, 0.0, vec2(0.0));
  vec2 g = p / (0.08 / uScale);
  vec2 base = floor(g);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 id = base + vec2(float(i), float(j));
      float pick = hash(id + 1.3);
      vec2 d = g - (id + 0.5 + (hash2(id) - 0.5) * 0.55);
      float m = smoothstep(0.07, 0.035, length(d));
      if (pick < 0.62) {
        float size = mix(0.16, 0.5, pow(hash(id + 9.0), 1.8));
        float sector = TAU / (pick < 0.3 ? 4.0 : 5.0);
        float k = abs(fract((atan(d.y, d.x) + hash(id + 4.0) * TAU) / sector) - 0.5) * 2.0;
        float edge = size * mix(1.0, 0.36, pow(k, 0.6));
        m = smoothstep(edge, edge * 0.8, length(d));
      }
      if (m > best.mask) best = Foil(m, hash(id + 6.0) * TAU, hash(id + 8.0), (hash2(id + 2.0) - 0.5) * 0.6);
    }
  }
  return best;
}
vec3 sparkles(vec2 p, vec3 halfway, vec2 sweep, float awake) {
  vec2 g = p * 62.0;
  vec2 cell = floor(g);
  vec2 d = fract(g) - 0.5 - (hash2(cell) - 0.5) * 0.36;
  float spin = hash(cell + 3.0) * TAU;
  d = mat2(cos(spin), -sin(spin), sin(spin), cos(spin)) * d;
  vec2 a = abs(d);
  float hexagon = max(a.x * 0.866 + a.y * 0.5, a.y);
  float size = mix(0.22, 0.38, hash(cell + 2.0));
  float piece = smoothstep(size, size - 0.07, hexagon) * step(0.42, hash(cell + 4.0));
  vec3 facet = normalize(vec3((hash2(cell + 6.0) - 0.5) * 0.9, 1.0));
  float flash = pow(max(dot(facet, halfway), 0.0), 6.0);
  vec3 tint = hue(dot(sweep, vec2(cos(spin), sin(spin))) * 1.2 + hash(cell + 8.0) * 0.5);
  return piece * tint * (0.3 + 1.6 * flash) * awake;
}
void main() {
  vec2 uv = vec2(gl_FragCoord.x / uSize.x, 1.0 - gl_FragCoord.y / uSize.y);
  vec2 p = vec2(uv.x, uv.y * uAspect);
  vec2 center = vec2(0.5, 0.5 * uAspect);
  vec2 q = abs(p - center) - center + uRadius;
  float outside = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - uRadius;
  float pixel = 1.0 / uSize.x;
  float alpha = clamp(0.5 - outside / pixel, 0.0, 1.0);
  vec4 sampled = texture(uArt, uv);
  if (uReady > 0.5) alpha *= sampled.a;
  if (alpha <= 0.0) { outColor = vec4(0.0); return; }
  vec3 art = uReady > 0.5 ? pow(sampled.rgb, vec3(2.2)) : vec3(0.012);
  mat3 rx = mat3(1.0, 0.0, 0.0, 0.0, cos(uTilt.x), sin(uTilt.x), 0.0, -sin(uTilt.x), cos(uTilt.x));
  mat3 ry = mat3(cos(uTilt.y), 0.0, -sin(uTilt.y), 0.0, 1.0, 0.0, sin(uTilt.y), 0.0, cos(uTilt.y));
  mat3 turn = rx * ry;
  vec3 world = turn * vec3(p - center, 0.0);
  vec3 view = normalize(transpose(turn) * (vec3(0.0, 0.0, uDistance) - world));
  vec3 lamp = vec3((uLight - 0.5) * vec2(1.1, 1.1 * uAspect), 0.9);
  vec3 light = normalize(transpose(turn) * (lamp - world));
  vec3 halfway = normalize(light + view);
  vec2 sweep = light.xy + view.xy;
  float sheen = pow(max(halfway.z, 0.0), 10.0);
  float shine = pow(max(halfway.z, 0.0), 80.0);
  float frame = 1.0 - smoothstep(uFrame - pixel, uFrame + pixel, -outside);
  Foil f = stars(p);
  vec2 dir = vec2(cos(f.angle), sin(f.angle));
  float phase = dot(sweep, dir) * 0.6 + dot(sweep, vec2(0.8, 0.6)) * 1.4 + f.jitter * 0.3;
  vec3 tint = hue(phase);
  float glint = pow(max(dot(normalize(vec3(f.facet, 1.0)), halfway), 0.0), 24.0) * step(0.001, length(f.facet));
  vec3 foil = tint * (1.15 + 0.3 * sheen) + vec3(glint * 1.2);
  float tilted = smoothstep(0.02, 0.21, length(sin(uTilt)));
  float awake = mix(0.2, 1.0, tilted);
  float strength = uIntensity * f.mask * (1.0 - frame) * awake;
  vec3 color = mix(art, foil, clamp(strength, 0.0, 1.0));
  color += sparkles(p, halfway, sweep, mix(0.55, 1.0, tilted)) * uEdge * frame;
  color += vec3(sheen * 0.07 + shine * 0.3) * uGlare;
  color = pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));
  outColor = vec4(color * alpha, alpha);
}
`

const UNIFORMS = ['uArt', 'uSize', 'uAspect', 'uTilt', 'uLight', 'uDistance', 'uIntensity', 'uScale', 'uEdge', 'uFrame', 'uRadius', 'uGlare', 'uReady'] as const

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

const rootRef = ref<HTMLDivElement | null>(null)
const rotorRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const glReady = ref(false)

const pointer = { x: 0.5, y: 0.5, inside: false }
let wake = () => {}
let stopGl = () => {}
let startGl = () => {}
let reduce = false
let cleanup = () => {}

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

onMounted(() => {
  const root = rootRef.value
  const rotor = rotorRef.value
  const canvas = canvasRef.value
  if (!root || !rotor || !canvas) return
  reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  const state = { tiltX: 0, tiltY: 0, tiltVX: 0, tiltVY: 0, lightX: 0.36, lightY: 0.26, lightVX: 0, lightVY: 0, lift: 1, liftV: 0 }
  let raf = 0
  let last = 0
  let visible = true
  let alive = true
  let calm = 0
  let gl: WebGL2RenderingContext | null = null
  let program: WebGLProgram | null = null
  let texture: WebGLTexture | null = null
  let buffer: WebGLBuffer | null = null
  let textureReady = false
  const u: Partial<Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>> = {}

  const draw = () => {
    if (!gl || !program) return
    const w = canvas.width
    const h = canvas.height
    if (!w || !h) return
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.uniform1i(u.uArt!, 0)
    gl.uniform2f(u.uSize!, w, h)
    gl.uniform1f(u.uAspect!, h / w)
    gl.uniform2f(u.uTilt!, (state.tiltX * Math.PI) / 180, (state.tiltY * Math.PI) / 180)
    gl.uniform2f(u.uLight!, state.lightX, state.lightY)
    gl.uniform1f(u.uDistance!, PERSPECTIVE / Math.max(1, canvas.clientWidth))
    gl.uniform1f(u.uIntensity!, clamp(props.intensity, 0, 1))
    gl.uniform1f(u.uScale!, clamp(props.scale, 0.25, 4))
    gl.uniform1f(u.uEdge!, clamp(props.edgeSparkle, 0, 1))
    gl.uniform1f(u.uFrame!, clamp(props.frame, 0, 20) / 100)
    gl.uniform1f(u.uRadius!, props.radius / Math.max(1, canvas.clientWidth))
    gl.uniform1f(u.uGlare!, clamp(props.glare, 0, 1))
    gl.uniform1f(u.uReady!, textureReady ? 1 : 0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    draw()
  }

  startGl = () => {
    if (gl || reduce || !alive) return
    gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return
    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vertex || !fragment) return
    program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.bindAttribLocation(program, 0, 'position')
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      program = null
      return
    }
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]))
    for (const name of UNIFORMS) u[name] = gl.getUniformLocation(program, name)
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (!gl || !program) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Rasteriza el SVG al tamaño real de la tarjeta para que el texto quede nítido.
      const raster = document.createElement('canvas')
      raster.width = Math.max(1, Math.round(canvas.clientWidth * dpr))
      raster.height = Math.max(1, Math.round(canvas.clientHeight * dpr))
      raster.getContext('2d')?.drawImage(img, 0, 0, raster.width, raster.height)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, raster)
      gl.generateMipmap(gl.TEXTURE_2D)
      textureReady = true
      glReady.value = true
      resize()
    }
    img.src = props.image
    resize()
  }

  stopGl = () => {
    glReady.value = false
    textureReady = false
    if (gl) {
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    gl = null
    program = null
  }

  const spring = (value: number, velocity: number, target: number, k: number, d: number, dt: number): [number, number] => {
    const next = velocity + ((target - value) * k - velocity * d) * dt
    return [value + next * dt, next]
  }

  const tick = (now: number) => {
    raf = 0
    if (!alive) return
    const dt = Math.min(1 / 30, Math.max(1 / 240, (now - last) / 1000))
    last = now
    let tx = 0
    let ty = 0
    let lx = 0.36
    let ly = 0.26
    let lift = 1
    if (pointer.inside && !reduce) {
      tx = (0.5 - pointer.y) * 2 * props.tiltMax
      ty = (pointer.x - 0.5) * 2 * props.tiltMax
      lx = pointer.x
      ly = pointer.y
      lift = props.hoverScale
    }
    const steps = Math.ceil(dt / (1 / 240))
    const h = dt / steps
    for (let i = 0; i < steps; i++) {
      ;[state.tiltX, state.tiltVX] = spring(state.tiltX, state.tiltVX, tx, 150, 16, h)
      ;[state.tiltY, state.tiltVY] = spring(state.tiltY, state.tiltVY, ty, 150, 16, h)
      ;[state.lightX, state.lightVX] = spring(state.lightX, state.lightVX, lx, 220, 30, h)
      ;[state.lightY, state.lightVY] = spring(state.lightY, state.lightVY, ly, 220, 30, h)
      ;[state.lift, state.liftV] = spring(state.lift, state.liftV, lift, 320, 30, h)
    }
    rotor.style.transform = `perspective(${PERSPECTIVE}px) scale(${state.lift}) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg)`
    draw()
    const motion =
      Math.abs(state.tiltVX) + Math.abs(state.tiltVY) + Math.abs(state.liftV) * 40 + (Math.abs(state.lightVX) + Math.abs(state.lightVY)) * 60 + Math.abs(state.tiltX - tx) + Math.abs(state.tiltY - ty)
    calm = motion > 0.02 ? 0 : calm + dt
    if (!visible || (!pointer.inside && calm > 0.3)) return
    raf = requestAnimationFrame(tick)
  }

  wake = () => {
    if (raf || !alive || reduce) return
    calm = 0
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }

  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
  ro?.observe(canvas)
  const io =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          visible = entries.some((e) => e.isIntersecting)
          if (visible) wake()
        })
      : null
  io?.observe(root)

  if (props.active) startGl()

  cleanup = () => {
    alive = false
    cancelAnimationFrame(raf)
    ro?.disconnect()
    io?.disconnect()
    stopGl()
  }
})

onBeforeUnmount(() => cleanup())

watch(
  () => props.active,
  (on) => {
    if (on) startGl()
    else {
      pointer.inside = false
      stopGl()
      wake()
    }
  },
)

const track = (e: PointerEvent) => {
  if (!props.active || e.pointerType === 'touch') return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  pointer.x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
  pointer.y = clamp((e.clientY - rect.top) / rect.height, 0, 1)
  pointer.inside = true
  wake()
}

const leave = () => {
  pointer.inside = false
  wake()
}
</script>

<template>
  <div
    ref="rootRef"
    class="relative h-full w-full select-none"
    :style="{ '--hc-radius': `${radius}px` }"
    data-cursor="card"
    @pointerenter="track"
    @pointermove="track"
    @pointerleave="leave"
    @pointercancel="leave"
  >
    <div ref="rotorRef" class="absolute inset-0 will-change-transform [transform-style:preserve-3d]">
      <div class="absolute inset-0 overflow-hidden rounded-[var(--hc-radius)]">
        <img :src="image" :alt="alt" draggable="false" class="pointer-events-none absolute inset-0 block h-full w-full object-cover" />
        <canvas
          ref="canvasRef"
          class="pointer-events-none absolute inset-0 block h-full w-full transition-opacity duration-300"
          :class="glReady && active ? 'opacity-100' : 'opacity-0'"
          aria-hidden="true"
        />
        <slot />
      </div>
    </div>
  </div>
</template>
