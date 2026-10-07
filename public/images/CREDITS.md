# Créditos de imágenes

Las fotos deben venir de Unsplash (licencia libre). Al reemplazar un placeholder:

1. Guarda la foto en `public/images/` (JPG o WebP; ≤300 KB, el hero ≤500 KB).
2. Cambia la ruta `src` en el JSON indicado.
3. Completa la fila de abajo con el autor y la URL de origen.

| Uso | Imagen actual | Dónde se cambia | Foto final | Autor | URL Unsplash |
|---|---|---|---|---|---|
| Hero (RF4): repartidor | `hero-courier.svg` (ilustración propia) | `site.json` → `hero.image.src` | opcional: foto con recorte redondeado y borde amarillo desplazado | — | — |
| Cobertura (RF7): repartidor con cajas y furgoneta | `placeholders/coverage.svg` | `site.json` → `coverage.image.src` | pendiente | — | — |
| Sucursales (RF8): fachada | `placeholders/branch.svg` | `branches.json` → `image.src` (×6) | pendiente | — | — |

Ilustraciones propias de 21 Express que no requieren crédito: `hero-courier.svg`, los pines de `map/` y el mockup de teléfono de Smart Delivery, que es un componente SVG (`src/components/illustrations/PhoneMockup.tsx`).
