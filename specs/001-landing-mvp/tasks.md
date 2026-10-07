# Tareas — Spec 001 Landing + Rastreo MVP

| Campo | Valor |
|---|---|
| Spec | [`spec.md`](spec.md) · Plan: [`plan.md`](plan.md) |
| Ritmo | 2 tareas por turno, en orden. Se marca el checkbox solo cuando se cumple **toda** la verificación. |
| Fecha | 2026-10-06 |

## Verificación común (aplica a TODAS las tareas)

Antes de marcar una tarea:

1. `npm run build` termina sin errores y genera `out/index.html`.
2. `npm run lint` termina con 0 errores y 0 warnings.
3. `npm run dev`: la consola del navegador no muestra errores ni warnings de hidratación.
4. Las secciones de tareas anteriores siguen viéndose y funcionando (constitución, principio 8).
5. Buscar la marca de referencia (sin distinguir mayúsculas) en `src/` y `public/` devuelve 0 resultados.
6. Ningún texto visible está hardcodeado en JSX si pertenece a `site.json` (principio 4).

---

## Bloque 1

### - [x] T1 — Base del proyecto, tema y tipografía
**Cubre:** infraestructura para todos los RF · RNF4 · RNF6
**Hacer:**
- Escribir a mano `package.json` (scripts y versiones exactas de plan §5), `next.config.ts`, `tsconfig.json` (`strict`, alias `@/*`, `resolveJsonModule`), `postcss.config.mjs`, `eslint.config.mjs` y `.gitignore`.
- `npm install`.
- `src/app/globals.css` con `@theme inline` (paleta + fuentes) y la capa base (scroll suave, `scroll-margin-top`, foco visible, backdrop de `<dialog>`).
- `src/app/layout.tsx` con Inter y Montserrat vía `next/font`, `lang="es-SV"` y la metadata de plan §4.3. `src/app/icon.svg`.
- `src/app/page.tsx` mínimo que muestre una muestra de la paleta y de las dos fuentes (se reemplaza en T3).

**Verificación:**
- `npm ls --depth=0` lista exactamente las 15 dependencias de plan §5 con esas versiones.
- `out/index.html` existe y contiene `lang="es-SV"` y el `<title>` "21 Express | Paquetería en El Salvador".
- En `npm run dev`, las clases `bg-brand-dark`, `bg-brand-green`, `text-brand-lime` y `font-heading` se aplican (inspeccionar el estilo computado).

### - [x] T2 — Tipos, datos JSON, lógica pura e imágenes placeholder
**Cubre:** datos de RF1–RF11 · RF3.2–RF3.6 (lógica) · RF8.4 (lógica) · RF9.2 (lógica) · RF11.2 (URL)
**Hacer:**
- `src/types/index.ts` según plan §2.1.
- `src/data/guides.json`, `branches.json` y `site.json` según plan §2.2–2.4.
- `src/lib/data.ts`, `tracking.ts`, `text.ts`, `jobValidation.ts`, `whatsapp.ts` y `format.ts`.
- Placeholders SVG en `public/images/placeholders/` (hero, smart-delivery, coverage, branch), pines `public/images/map/marker.svg` y `marker-active.svg`, y `public/images/CREDITS.md` con la lista de fotos pendientes de Unsplash.

**Verificación:**
- `npx tsc --noEmit` sin errores: los tres JSON cumplen sus tipos.
- Un script temporal (en el scratchpad, fuera del repo) ejecutado con Node confirma:
  - `trackGuide('')` → `empty`
  - `trackGuide('abc')` → `invalid`
  - `trackGuide(' svsale-01-0000000001 ')` → `found` con estado `delivered`
  - `trackGuide('SVSALE-09-0000000009')` → `notFound`
  - `normalizeText('Sán Miguél')` → `'san miguel'`
  - `SV_PHONE` acepta `7641-6944` y `22001234`, y rechaza `1234-5678` y `7641694`
  - `buildWhatsAppUrl('50376416944', '¡Hola!')` → `https://wa.me/50376416944?text=%C2%A1Hola!`
- Hay 3 guías con estados distintos y 6 sucursales con `lat`/`lng` dentro de El Salvador (lat 13.1–14.5, lng −90.2 a −87.6).

---

## Bloque 2

### - [ ] T3 — Primitivas de UI, iconos, logo y botón flotante de WhatsApp
**Cubre:** RF11 completo · base de RF2.2, RF2.6, RF2.7, RF3.10, RF9 y RF10.3
**Hacer:**
- `ui/Button.tsx` (variantes `primary` verde con texto `brand-dark`, `dark` y `outline`).
- `ui/Modal.tsx` sobre `<dialog>`: `showModal`, cierre con `Esc`, botón de cerrar y clic en backdrop, `aria-labelledby` y retorno de foco al disparador.
- `ui/ComingSoon.tsx`: tooltip "Próximamente" en hover, foco y clic, que cancela la navegación.
- Iconos SVG propios: `FacebookIcon`, `InstagramIcon`, `WhatsAppIcon`, `FlagSV`. `Logo.tsx` ("21" en `brand-green` + "Express" en blanco).
- `WhatsAppButton.tsx` (RF11) montado en `page.tsx`.

**Verificación:**
- El botón flotante aparece abajo a la derecha en 375 y 1280 px y sigue visible al hacer scroll. Su `href` es `https://wa.me/50376416944?text=…` con el mensaje de `site.json`, `target="_blank"` y `aria-label="Escríbenos por WhatsApp"`.
- Prueba temporal en `page.tsx` (se retira al terminar): un `ComingSoon` muestra el tooltip con Tab y con clic sin cambiar la URL, y un `Modal` se abre, atrapa el Tab, se cierra con `Esc` y devuelve el foco al botón que lo abrió.
- Con un modal abierto, el botón de WhatsApp queda debajo del backdrop y no se puede pulsar (RF11.3).

### - [ ] T4 — Topbar y Navbar con drawer móvil
**Cubre:** RF1 completo · RF2 completo excepto RF2.5 (el modal de Empleo se conecta en T5)
**Hacer:**
- `Topbar.tsx` + `CountrySwitcher.tsx`: menú con El Salvador activo y Guatemala/Honduras deshabilitados con "Próximamente". Cierre con `Esc` y con clic fuera.
- `Navbar.tsx` sticky con logo, anclas, botones de acción (`soon` → `ComingSoon`).
- `MobileDrawer.tsx` (<1024 px) con anclas, acciones y enlaces de la topbar.
- Secciones vacías temporales con los ids `#inicio`, `#paqueteria-local`, `#internacional`, `#smart-delivery`, `#cobertura`, `#sucursales` y `#contacto`, para probar las anclas. Se reemplazan en tareas siguientes.

**Verificación:**
- 1280 px: topbar y navbar completas en una línea cada una. Con scroll, la navbar se mantiene arriba.
- 768 px: los enlaces de texto de la topbar se ocultan y se ve la hamburguesa. 375 px: sin scroll horizontal.
- Cada ancla del navbar y del drawer lleva a su sección sin que la navbar tape el título. El drawer se cierra al elegir un enlace.
- Solo con teclado: abrir y cerrar el selector de país y el drawer (`Esc` devuelve el foco al disparador).
- "Mi perfil", "Afiliarme" y "Proveedores de Transporte" muestran "Próximamente" y la URL no cambia.

---

## Bloque 3

### - [ ] T5 — Modal de Empleo
**Cubre:** RF9 completo · RF2.5
**Hacer:**
- `jobs/JobApplicationModal.tsx` con los 6 campos, labels asociados, validación con `validateJobApplication`, errores por campo con `aria-invalid` y `aria-describedby`, foco al primer error y pantalla de confirmación simulada.
- Conectarlo al botón "Empleo" de navbar y drawer.

**Verificación:**
- Enviar vacío: 5 errores (todos menos Teléfono 2) y el foco queda en "Nombre completo".
- Nombre "Ana" → error de nombre. Teléfono `1234-5678` → error. Teléfono 2 vacío → sin error. Teléfono 2 `999` → error.
- CV `.png` → error de tipo. CV de más de 5 MB → error de tamaño.
- Con datos válidos aparece la confirmación. En la pestaña Network de DevTools no hay ninguna petición nueva.
- Cerrar y reabrir: el formulario está vacío y, al cerrar, el foco vuelve a "Empleo".

### - [ ] T6 — Barra de rastreo y modal de resultado
**Cubre:** RF3 completo
**Hacer:**
- `TrackingBar.tsx` entre navbar y hero: label, input `#tracking-input`, botón con lupa, normalización a mayúsculas, envío con `Enter` o botón, errores inline con `aria-live`.
- `TrackingResultModal.tsx`: guía, badge de estado, origen, destino, entrega estimada y línea de tiempo ordenada.

**Verificación:**
- Vacío + Enter → "Escribe tu número de guía para rastrearla."
- `abc` → error de formato.
- `SVSALE-09-0000000009` → "No encontramos esa guía…". La página no se recarga en ningún caso.
- Escribir `svsale-02-0000000002` → el input muestra mayúsculas y se abre el modal con "En ruta de entrega", origen Antiguo Cuscatlán, destino San Miguel y 3 eventos, el más reciente primero.
- Las guías 01 (Entregado) y 03 (En bodega) muestran badges de colores distintos.
- Editar el input después de un error lo limpia. El modal se cierra con `Esc` y el foco vuelve al botón de lupa.

---

## Bloque 4

### - [ ] T7 — Hero, split de servicios y Smart Delivery
**Cubre:** RF4, RF5 y RF6 completos
**Hacer:**
- `Hero.tsx` (`#inicio`): imagen con `priority`, overlay `brand-dark`, título, línea `brand-green`, subtítulo y "Afiliarme" (`ComingSoon`).
- `ServicesSplit.tsx` con `#paqueteria-local` (oscuro, "Ver servicios") y `#internacional` (verde, texto oscuro, "Explorar" con fondo `brand-dark`).
- `SmartDelivery.tsx` + `TrackShipmentButton.tsx`: sello, tagline lime, imagen, 3 beneficios con iconos de lucide, 2 pasos y "Rastrear envío".

**Verificación:**
- 375 px: el split y Smart Delivery se apilan (izquierda arriba). 768 y 1280 px: dos columnas.
- El texto del hero se lee sobre la imagen. Con la herramienta de contraste de DevTools, todos los textos de estas secciones cumplen AA.
- "Rastrear envío" lleva a la barra de rastreo y el cursor queda en `#tracking-input` (`document.activeElement.id === 'tracking-input'`). Con *reduced motion* emulado, el salto es instantáneo.
- "Afiliarme", "Ver servicios" y "Explorar" muestran "Próximamente".

### - [ ] T8 — Banner de cobertura y footer
**Cubre:** RF7 y RF10 completos
**Hacer:**
- `CoverageBanner.tsx` (`#cobertura`): imagen, pin `brand-lime` decorativo, titular y subtítulo.
- `Footer.tsx` (`#contacto`): logo, WhatsApp, dirección "Villas de Suiza, El Salvador", redes, columnas "Compañía" y "Contáctanos", bandera de El Salvador, copyright y enlaces legales.

**Verificación:**
- Todos los datos del footer coinciden con `site.json`. Prueba: cambiar temporalmente el teléfono en el JSON actualiza footer y WhatsApp sin tocar JSX; luego se revierte.
- Los enlaces legales y "¿Por qué 21 Express?" muestran "Próximamente". "Smart Delivery" y "Sucursales" llevan a su ancla.
- 375 px: las columnas del footer se apilan sin scroll horizontal. 1280 px: se ven en fila.
- El pin tiene `aria-hidden="true"` y la imagen tiene `alt`.

---

## Bloque 5

### - [ ] T9 — Localizador de sucursales con mapa Leaflet
**Cubre:** RF8 completo
**Hacer:**
- `BranchLocator.tsx` (`#sucursales`): buscador con label, contador `aria-live`, lista de `BranchCard`, estado vacío con "Limpiar búsqueda".
- `BranchMap.tsx` cargado con `dynamic(…, { ssr: false })` y placeholder de carga: tiles OSM, atribución, pines propios, `MapController` con `flyTo` + `openPopup`, `fitBounds` al filtrar y soporte de *reduced motion*.

**Verificación:**
- Se ven 6 tarjetas y 6 pines. La consola no muestra 404 de `marker-icon.png` ni otros errores.
- Buscar `sán miguél` → 1 resultado (San Miguel). `la libertad` → 2 (Antiguo Cuscatlán y Puerto de La Libertad, por departamento). `SANTA` → Santa Ana. `xyz` → estado vacío, y "Limpiar búsqueda" restaura las 6.
- Clic, o Tab + Enter, en la tarjeta de Sonsonate → el mapa vuela a Sonsonate, abre su popup y la tarjeta queda activa. Clic en un pin → su tarjeta queda activa.
- Con la rueda del ratón sobre el mapa, la página hace scroll en vez de hacer zoom.
- 375 px: mapa arriba y lista debajo. 1280 px: lista a la izquierda y mapa a la derecha.
- `npm run build` no falla por `window is not defined`.

### - [ ] T10 — QA final y Definition of Done
**Cubre:** RNF1–RNF6 · Definition of Done de la spec · constitución completa
**Hacer:**
- Quitar las secciones y pruebas temporales que queden. Confirmar el orden de la página según spec §4.
- Revisar en 375, 768 y 1280 px (DevTools y capturas headless).
- Repaso de accesibilidad: recorrido completo solo con teclado, `alt` de todas las imágenes, labels, contraste y modales.
- Revisar el copy completo frente a la constitución (principios 1 y 2).
- Marcar la Definition of Done de `spec.md`.

**Verificación:**
- Las capturas en 375, 768 y 1280 px muestran todas las secciones RF1–RF11 en el orden de la spec, sin scroll horizontal (`document.documentElement.scrollWidth === innerWidth`).
- Recorrido solo con teclado de principio a fin: se alcanzan todos los controles con foco visible y los 3 tipos de modal o drawer se abren y cierran.
- Lighthouse (DevTools) en móvil: Accesibilidad ≥ 90, sin errores en "Best practices" relacionados con la consola.
- Las 3 guías, los 3 casos de error y los filtros de sucursales de T6 y T9 siguen funcionando.
- La verificación común pasa por completo y todos los checkboxes de DoD en `spec.md` están marcados.
