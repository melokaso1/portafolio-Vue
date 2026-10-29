# Portafolio - melokaso1

Portafolio personal de **Jhon Alejandro Escobar Lozada**, hecho con **Vue 3 + Vite + TypeScript + Tailwind CSS**.

## Requisitos

- Node.js 20 o superior
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

## Editar contenido

- Proyectos: `src/data/projects.ts` (orden, textos, enlaces y `publicar` para ocultar).
- Perfil, skills y aprendizaje: `src/data/profile.ts`.

Reglas del contenido:

- Solo datos confirmados en los repos; nada inventado.
- Solo enlaces a repos públicos revisados; nunca credenciales ni valores de `.env`.
- No publicar correo ni teléfono en texto plano.

## Accesibilidad y animaciones

- Animaciones sutiles al hacer scroll (`v-reveal`) que se desactivan con `prefers-reduced-motion`.
- Enlace "Skip to content", foco visible, navegación por teclado y contraste AA.
