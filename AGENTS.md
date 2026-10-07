# AGENTS.md — 21 Express El Salvador

Guía operativa para cualquier agente (humano o IA) que trabaje en este repositorio.

## 0. Antes de actuar

1. Lee [`docs/constitution.md`](docs/constitution.md). Sus principios son innegociables.
2. Lee la spec activa: [`specs/001-landing-mvp/spec.md`](specs/001-landing-mvp/spec.md).
3. Si existen, lee `plan.md` y `tasks.md` de la misma carpeta. Trabaja **una tarea a la vez**, en orden.
4. Si lo que vas a hacer no está en la spec, **detente**: primero se actualiza `spec.md` y después se implementa.

## 1. Stack fijo

| Área | Decisión |
|---|---|
| Framework | Next.js 16 con **App Router** (versiones exactas en `plan.md` §5) |
| Lenguaje | TypeScript 6 (`strict: true`) |
| Estilos | Tailwind CSS 4. La paleta y las fuentes se definen en el bloque `@theme` de `src/app/globals.css` (Tailwind 4 reemplaza `tailwind.config.js` por configuración en CSS). |
| Build | `output: 'export'` en `next.config` → sitio estático desplegado en Vercel. Como no hay servidor de imágenes, `images.unoptimized: true`. |
| Iconos | `lucide-react`. Facebook, Instagram y WhatsApp como **SVG inline propios** (componentes en `src/components/icons/`). |
| Mapa | `leaflet` + `react-leaflet`, tiles de **OpenStreetMap**, cargado con `next/dynamic(..., { ssr: false })`. **Prohibido Google Maps** y cualquier proveedor que exija API key. |
| Datos | JSON en `src/data/`: `guides.json`, `branches.json`, `site.json` (navegación, redes, teléfono, WhatsApp y textos repetidos). |
| Tipografía | Montserrat (títulos) + Inter (texto) vía `next/font/google`. |

## 2. Comandos

```bash
npm install      # instala dependencias
npm run dev      # servidor local en http://localhost:3000
npm run build    # build estático (genera /out)
npm run lint     # análisis estático (eslint . — Next 16 ya no incluye `next lint`)
```

## 3. Paleta (definida en `@theme`, `src/app/globals.css`)

| Token | Hex | Uso principal |
|---|---|---|
| `brand-dark` | `#0D4732` | Navbar, footer, bloques oscuros |
| `brand-dark-2` | `#13503B` | Topbar |
| `brand-green` | `#00D632` | Botones primarios, acentos, "21" del logo |
| `brand-green-hover` | `#00C82B` | Hover de botones verdes |
| `brand-lime` | `#A3E635` | Detalles destacados (pin, "TECNOLOGÍA LOGÍSTICA") |
| `surface` | `#FFFFFF` | Fondo base |
| `surface-muted` | `#F4F6F8` | Fondos secundarios, tarjetas |

No uses colores hex sueltos en componentes: usa siempre los tokens.

## 4. Idioma y convenciones

- **UI:** español de El Salvador (tuteo, "envío", "guía", "sucursal", "departamento/municipio").
- **Código:** componentes, variables, funciones, tipos y nombres de archivo en **inglés** (`TrackingBar.tsx`, `branches.json`, `normalizeGuide()`).
- Componentes en `PascalCase`, hooks `useCamelCase`, utilidades `camelCase`.
- Los textos que se repiten o son configurables (navegación, teléfono, redes, eslogan, copyright) viven en `src/data/site.json`, nunca hardcodeados en JSX.

## 5. Reglas de trabajo

- **No instales dependencias** que no estén listadas en `plan.md`. Si necesitas una nueva, propón el cambio en `plan.md` y espera aprobación.
- **Al terminar cada tarea:**
  1. `npm run build` sin errores.
  2. `npm run lint` sin errores.
  3. Verifica que las secciones previas siguen funcionando (constitución, principio 8).
  4. Marca el checkbox correspondiente en `tasks.md`.
- **Marca:** el proyecto es **21 Express**. Antes de cerrar una tarea, la búsqueda de la marca de referencia en `src/` y `public/` debe devolver cero resultados.
- **Imágenes:** solo de licencia libre (Unsplash), guardadas en `/public/images/`, con `alt` descriptivo en español. Registra autor y URL de origen en `public/images/CREDITS.md`. Mientras no estén las fotos reales se usan los placeholders SVG de `/public/images/placeholders/`. Las rutas viven en los JSON, así que cambiar una imagen nunca exige tocar un componente.
- **Accesibilidad:** cada input con `<label>`, foco visible (`focus-visible:ring`), modales con `role="dialog"`, `aria-modal`, cierre con `Esc` y foco atrapado.
- **Consola limpia:** ni errores ni warnings de hidratación en `npm run dev`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
