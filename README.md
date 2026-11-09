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

- **Vue Bits** (https://vue-bits.dev): los componentes se copian al proyecto en `src/components/vue-bits/` desde su registro (`https://vue-bits.dev/r/<Componente>.json`): Tech Text, Branched Menu, Cubes y Magnet. Cada archivo indica su origen y los ajustes locales.
- **React Bits** (https://reactbits.dev, licencia MIT + Commons Clause): Circular Carousel y Holo Card no existen en Vue Bits, así que están portados a Vue 3 + TypeScript en `src/components/react-bits/`. Cada archivo lleva la nota de atribución y la lista de cambios.
- **motion-v** (Motion para Vue): `MotionConfig reduced-motion="user"` en `App.vue` y el cursor propio (`src/components/cursor/CustomCursor.vue`, hecho con `useMotionValue` + `useSpring`; no usa Motion+).
- **GSAP** (+ ScrollTrigger): se registra en `src/lib/gsap.ts`. La historia del PC que se arma con el scroll es un SVG por capas propio (`src/components/pc/`), sin 3D.
- **PrimeVue 4** (licencia MIT; la v5 exige licencia comercial de PrimeUI y muestra un aviso "Invalid PrimeUI License"), tema Aura con primario ámbar: `src/plugins/primevue.ts`. El Accordion de servicios va en modo `unstyled` con Tailwind.

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

- Con `prefers-reduced-motion` no hay scrub, cursor propio, Tech Text ni foil: se muestra el estado final estático.
- En táctil (sin `(hover: hover) and (pointer: fine)`) el cursor es el nativo, el carrusel es una fila con scroll-snap y el PC es una miniatura por sección.
- Enlace "Saltar al contenido", foco visible, menú navegable con teclado y contraste AA.
