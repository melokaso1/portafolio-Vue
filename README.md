# Portafolio - melokaso1

Portafolio personal de **Jhon Alejandro Escobar Lozada**, hecho con **Vue 3 + Vite + TypeScript + Tailwind CSS**.

## Requisitos

- Node.js 22 o superior (ver `.nvmrc` y `engines` en `package.json`)
- npm

## Uso

```bash
npm install
npm run dev         # servidor de desarrollo
npm run type-check  # vue-tsc
npm run lint        # ESLint
npm run test        # Vitest
npm run build       # build de producción en dist/
npm run preview     # sirve el build
```

## Librerías de diseño y animación

Diseño: Figma "Rediseño v2" (paleta Grafito y ámbar: fondo `#0E0F11`, superficie `#16181B`, líneas `#2A2D32`, texto `#ECEAE6` / `#9C9A94` y un solo acento `#E8A33D`).

- **Vue Bits** (https://vue-bits.dev): los componentes se copian al proyecto en `src/components/vue-bits/` desde su registro (`https://vue-bits.dev/r/<Componente>.json`): Tech Text, Branched Menu y Magnet. Cada archivo indica su origen y los ajustes locales.
- **Fondo de cubos** (`src/components/background/BackgroundCubes.vue`): el look de Cubes de Vue Bits (gap 0.3, aristas punteadas, onda ámbar al hacer clic) dibujado en un solo `<canvas>` sobre una retícula CSS estática, en lugar de cientos de cubos 3D en el DOM. rAF solo mientras anima, DPR ≤ 1.5; en táctil o con reduced-motion queda solo la retícula estática.
- **React Bits** (https://reactbits.dev, licencia MIT + Commons Clause): Circular Carousel no existe en Vue Bits, así que está portado a Vue 3 + TypeScript en `src/components/react-bits/`. El archivo lleva la nota de atribución y la lista de cambios.
- **Cursor propio** (`src/components/cursor/CustomCursor.vue`): `translate3d` y transiciones CSS, sin librerías; chunk aparte, solo con puntero fino y sin reduced-motion.
- **Seguimiento del mouse compartido** (`src/composables/usePointer.ts`): un solo `pointermove` pasivo en window y un solo rAF por frame para el cursor, el fondo, Magnet y Tech Text.
- **PrimeVue 4** (licencia MIT; la v5 exige licencia comercial de PrimeUI y muestra un aviso "Invalid PrimeUI License"), en modo `unstyled` (sin tema Aura): `src/plugins/primevue.ts`. El Accordion de servicios va con Tailwind.

## Editar contenido

Cada sección tiene su archivo de datos en `src/data/`:

- Perfil (nombre, enlaces): `profile.ts`
- Navegación: `nav.ts`
- Proyectos: `projects.ts` (casos de estudio: problema, qué hizo, stack y resultado opcional). Es público y va en el bundle: no poner notas internas ni proyectos ocultos.
- Servicios: `services.ts`
- Stack (principal, aprendiendo y otras herramientas): `stack.ts`
- Sobre mí: `about.ts`

Reglas del contenido:

- Solo datos confirmados en los repos; nada inventado.
- Solo enlaces a repos públicos revisados; nunca credenciales ni valores de `.env`.
- No publicar correo ni teléfono en texto plano.

## Accesibilidad y animaciones

- Con `prefers-reduced-motion` no hay scrub, cursor propio, ni Tech Text: se muestra el estado final estático. El carrusel se mantiene sin tilt y cambia de carta al instante.
- En táctil (sin `(hover: hover) and (pointer: fine)`) el cursor es el nativo, el carrusel se recorre con swipe (o botones anterior/siguiente y puntos) y el fondo de cubos es una retícula estática en CSS.
- Enlace "Saltar al contenido", foco visible, menú navegable con teclado y contraste AA.
