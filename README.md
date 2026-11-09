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

- **Vue Bits** (https://vue-bits.dev): los componentes se copian al proyecto en `src/components/vue-bits/` desde su registro (`https://vue-bits.dev/r/<Componente>.json`). Cada archivo indica su origen y los ajustes locales.
- **motion-v** (Motion para Vue): `MotionConfig reduced-motion="user"` en `App.vue`.
- **GSAP** (+ ScrollTrigger): se registra en `src/lib/gsap.ts`. `src/components/motion/MotionReveal.vue` envuelve AnimatedContent y no anima con `prefers-reduced-motion`.
- **PrimeVue** (tema Aura con primario verde): `src/plugins/primevue.ts`. Los componentes se importan uno a uno donde se usan.

## Editar contenido

Cada sección tiene su archivo de datos en `src/data/`:

- Perfil (nombre, enlaces): `profile.ts`
- Navegación: `nav.ts`
- Proyectos: `projects.ts` (casos de estudio: problema, qué hizo, stack y resultado opcional). Es público y va en el bundle: no poner notas internas ni proyectos ocultos.
- Servicios: `services.ts`
- Stack y aprendizaje: `stack.ts`
- Sobre mí: `about.ts`

Reglas del contenido:

- Solo datos confirmados en los repos; nada inventado.
- Solo enlaces a repos públicos revisados; nunca credenciales ni valores de `.env`.
- No publicar correo ni teléfono en texto plano.

## Accesibilidad y animaciones

- Animaciones sutiles al hacer scroll (`v-reveal`, GSAP y motion-v) que se desactivan con `prefers-reduced-motion`.
- Enlace "Skip to content", foco visible, navegación por teclado y contraste AA.
