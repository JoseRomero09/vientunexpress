# Spec 001 — Landing + Rastreo MVP

| Campo | Valor |
|---|---|
| Estado | Aprobada con aclaraciones (2026-10-06, ver §10) |
| Fecha | 2026-10-06 |
| Marca | 21 Express |
| País | El Salvador |
| Documentos relacionados | `docs/constitution.md`, `AGENTS.md`, `plan.md` (Fase 1), `tasks.md` (Fase 2) |

## 1. Contexto y objetivo

21 Express es una empresa de paquetería en El Salvador que necesita una landing de una sola página que:

1. Presente sus servicios (paquetería nacional e internacional) y su tecnología de seguimiento.
2. Permita **rastrear una guía** sin salir de la página.
3. Ayude a encontrar la **sucursal más cercana** en un mapa.
4. Capte candidatos de empleo y contactos por WhatsApp.

La jerarquía de secciones y el comportamiento siguen como referencia un sitio de paquetería regional (solo estructura y UX). Textos, imágenes y marca son propios (ver constitución, principios 1 y 2).

## 2. Notación

Los requisitos usan **EARS** (Easy Approach to Requirements Syntax):

| Patrón | Plantilla |
|---|---|
| Ubicuo | El sistema deberá `<respuesta>`. |
| Por evento | Cuando `<disparador>`, el sistema deberá `<respuesta>`. |
| Por estado | Mientras `<estado>`, el sistema deberá `<respuesta>`. |
| Comportamiento no deseado | Si `<condición>`, entonces el sistema deberá `<respuesta>`. |
| Opcional | Donde `<característica>`, el sistema deberá `<respuesta>`. |

Cada requisito tiene un identificador `RFn.m` para trazarlo en `tasks.md`.

## 3. Actores

- **Remitente / cliente:** quiere saber dónde está su envío o qué servicios hay.
- **Comercio afiliable:** negocio que evalúa usar 21 Express para sus entregas.
- **Candidato:** persona que busca empleo en la empresa.
- **Visitante móvil:** la mayoría del tráfico; navega en pantallas de 375 px.

## 4. Orden de la página

```
RF1  Topbar
RF2  Navbar (sticky)
RF3  Barra de rastreo
RF4  Hero                          ← ancla #inicio
RF5  Split de servicios            ← anclas #paqueteria-local, #internacional
RF6  Smart Delivery
RF7  Banner de cobertura           ← ancla #cobertura
RF8  Localizador de sucursales     ← ancla #sucursales
RF10 Footer
RF11 Botón flotante de WhatsApp (fijo, sobre toda la página)
RF9  Modal de Empleo (superpuesto, se abre desde RF2)
```

---

## 5. Requisitos funcionales

### RF1 — Topbar

**Historia:** Como visitante, quiero ver accesos secundarios (país, información y redes) en una franja superior, para orientarme sin saturar la navegación principal.

- **RF1.1** El sistema deberá mostrar una franja superior con fondo `brand-dark-2` que contenga: eslogan, control "Cambiar país >", enlaces "¿Por qué 21 Express?", "Tecnología Smart Delivery", "Contacto" e iconos de Facebook e Instagram.
- **RF1.2** Cuando el usuario active "Cambiar país >", el sistema deberá abrir un menú con **El Salvador** marcado como activo y **Guatemala** y **Honduras** deshabilitados con la etiqueta "Próximamente".
- **RF1.3** Cuando el menú de país esté abierto y el usuario pulse `Esc` o haga clic fuera, el sistema deberá cerrarlo y devolver el foco al disparador.
- **RF1.4** Cuando el usuario active "Tecnología Smart Delivery" o "Contacto", el sistema deberá desplazarse a la sección RF6 o al footer (RF10) respectivamente.
- **RF1.5** El sistema deberá tomar el eslogan, los enlaces, los países y las URLs de redes de `site.json`.
- **RF1.6** Mientras el viewport sea menor a 768 px, el sistema deberá ocultar los enlaces de texto de la topbar (pasan al drawer de RF2) y conservar el selector de país y los iconos de redes.
- **RF1.7** Los iconos de redes deberán ser SVG inline con `aria-label` y abrir en pestaña nueva con `rel="noopener noreferrer"`.

### RF2 — Navbar

**Historia:** Como visitante, quiero una navegación principal siempre visible, para saltar a cualquier sección o acción sin volver arriba.

- **RF2.1** El sistema deberá mostrar una barra con fondo `brand-dark`, fija al hacer scroll (`sticky top-0`), con el logotipo de 21 Express a la izquierda.
- **RF2.2** El logotipo deberá ser un SVG propio: "21" en `brand-green` y "Express" en blanco, con texto accesible "21 Express — Inicio" y enlace a `#inicio`.
- **RF2.3** El sistema deberá mostrar los enlaces Inicio, Paquetería local, Cobertura e Internacional como anclas a las secciones de la misma página (ver §4).
- **RF2.4** El sistema deberá mostrar los botones verdes "Proveedores de Transporte", "Afiliarme", "Empleo" y "Mi perfil".
- **RF2.5** Cuando el usuario active "Empleo", el sistema deberá abrir el modal de RF9.
- **RF2.6** Cuando el usuario active "Mi perfil", el sistema deberá mostrar un aviso "Próximamente" (toast o popover) sin navegar.
- **RF2.7** Cuando el usuario active "Proveedores de Transporte" o "Afiliarme", el sistema deberá mantener el enlace en `#` y mostrar el tooltip "Próximamente".
- **RF2.8** Mientras el viewport sea menor a 1024 px, el sistema deberá reemplazar enlaces y botones por un icono de menú hamburguesa.
- **RF2.9** Cuando el usuario active el menú hamburguesa, el sistema deberá abrir un drawer lateral con enlaces, botones y los enlaces de la topbar, con foco atrapado y cierre con `Esc`, botón de cierre o clic en el fondo.
- **RF2.10** Cuando el usuario elija un enlace del drawer, el sistema deberá cerrar el drawer y desplazarse al ancla.
- **RF2.11** El sistema deberá compensar la altura de la navbar sticky al saltar a anclas (`scroll-margin-top`), para que los títulos no queden tapados.

### RF3 — Barra de rastreo

**Historia:** Como cliente, quiero escribir mi número de guía y ver de inmediato el estado de mi envío, para no tener que llamar ni salir de la página.

- **RF3.1** El sistema deberá mostrar la etiqueta "Ingresa tu número de guía:", un input asociado con placeholder `ABCDEF-00-0000000000` y un botón con icono de lupa y `aria-label="Rastrear guía"`.
- **RF3.2** Cuando el usuario escriba en el input, el sistema deberá normalizar el valor a mayúsculas y eliminar espacios al inicio y al final.
- **RF3.3** Cuando el usuario pulse el botón o `Enter`, el sistema deberá validar el valor contra `^[A-Z]{6}-\d{2}-\d{10}$` sin recargar la página.
- **RF3.4** Si el valor está vacío, entonces el sistema deberá mostrar debajo del input el error "Escribe tu número de guía para rastrearla." y marcar el input con `aria-invalid="true"`.
- **RF3.5** Si el formato es inválido, entonces el sistema deberá mostrar el error "El formato no es válido. Ejemplo: ABCDEF-00-0000000000." con `aria-invalid="true"`.
- **RF3.6** Si el formato es válido pero la guía no existe en `guides.json`, entonces el sistema deberá mostrar el mensaje inline "No encontramos esa guía. Revisa el número e intenta de nuevo."
- **RF3.7** Cuando la guía exista en `guides.json`, el sistema deberá abrir un modal con: número de guía, estado actual (badge con color según estado), origen, destino, fecha estimada de entrega y una línea de tiempo de eventos ordenada del más reciente al más antiguo (fecha, lugar, descripción).
- **RF3.8** Cuando el usuario modifique el input después de un error, el sistema deberá limpiar el mensaje de error.
- **RF3.9** Los mensajes de error deberán anunciarse a lectores de pantalla (`aria-live="polite"` y `aria-describedby`).
- **RF3.10** El modal de rastreo deberá cumplir los requisitos de accesibilidad de modales (constitución, principio 7).
- **RF3.11** El sistema deberá exponer el input con un id estable (`tracking-input`) para que RF6 pueda enfocarlo.

### RF4 — Hero

**Historia:** Como comercio, quiero entender en segundos qué ofrece 21 Express y tener un acceso directo para afiliarme.

- **RF4.1** El sistema deberá mostrar una sección `#inicio` con imagen de fondo de un repartidor (licencia libre, guardada en `/public/images/`) y un overlay verde oscuro basado en `brand-dark` que garantice contraste AA del texto.
- **RF4.2** El sistema deberá mostrar, en este orden: título, línea decorativa `brand-green`, subtítulo y botón "Afiliarme".
- **RF4.3** El botón "Afiliarme" deberá comportarse como en RF2.7.
- **RF4.4** La imagen del hero deberá cargarse con prioridad (`priority`) y tener `alt` descriptivo.

### RF5 — Split de servicios

**Historia:** Como visitante, quiero distinguir de un vistazo los envíos nacionales de los internacionales.

- **RF5.1** El sistema deberá mostrar dos bloques lado a lado en ≥768 px y apilados en móvil.
- **RF5.2** El bloque izquierdo (`#paqueteria-local`) deberá tener fondo `brand-dark`, texto blanco, el titular "Paquetería nacional →", una línea descriptiva y el botón "Ver servicios".
- **RF5.3** El bloque derecho (`#internacional`) deberá tener fondo `brand-green`, texto `brand-dark`, el titular "Internacional →", una línea descriptiva y el botón "Explorar" con fondo `brand-dark`.
- **RF5.4** Cuando el usuario active "Ver servicios" o "Explorar", el sistema deberá mantener el enlace en `#` y mostrar el tooltip "Próximamente".

### RF6 — Smart Delivery

**Historia:** Como cliente, quiero conocer cómo la tecnología de 21 Express me mantiene informado, y poder rastrear mi envío desde ahí.

- **RF6.1** El sistema deberá mostrar una sección `#smart-delivery` de dos columnas (apiladas en móvil).
- **RF6.2** La columna izquierda deberá tener fondo `brand-dark`, un sello "SMART DELIVERY", el texto "TECNOLOGÍA LOGÍSTICA" en `brand-lime` y una imagen de una mano sosteniendo un smartphone.
- **RF6.3** La columna derecha deberá tener fondo blanco con: título, párrafo introductorio que mencione a 21 Express, y tres beneficios con icono: tracking en tiempo real; notificaciones de envío y salida; control de envíos y ruta diaria.
- **RF6.4** El sistema deberá mostrar un bloque "Cómo rastrear en 2 pasos" con dos pasos numerados.
- **RF6.5** Cuando el usuario active "Rastrear envío", el sistema deberá desplazarse suavemente hasta la barra de RF3 y enfocar `#tracking-input`.
- **RF6.6** Mientras el usuario tenga activada la preferencia `prefers-reduced-motion`, el sistema deberá desplazarse sin animación.

### RF7 — Banner de cobertura

**Historia:** Como comercio, quiero saber que 21 Express llega hasta mis clientes en todo el país.

- **RF7.1** El sistema deberá mostrar una sección `#cobertura` con una imagen de repartidor con cajas y furgoneta, un pin grande en `brand-lime`, un titular sobre llegar hasta tu cliente y un subtítulo sobre delegar la logística en 21 Express.
- **RF7.2** El pin deberá ser decorativo (`aria-hidden="true"`) y la imagen tener `alt` descriptivo.

### RF8 — Localizador de sucursales

**Historia:** Como cliente, quiero encontrar la sucursal más cercana, ver su horario y ubicarla en un mapa.

- **RF8.1** El sistema deberá mostrar una sección `#sucursales` con el título "Visita tu sucursal más cercana".
- **RF8.2** El sistema deberá mostrar un panel izquierdo con un buscador (con label) y una lista de tarjetas de sucursal con foto, nombre, dirección, horario y teléfono (enlace `tel:`), y un panel derecho con un mapa Leaflet con tiles de OpenStreetMap y un marcador por sucursal.
- **RF8.3** El sistema deberá cargar las sucursales desde `branches.json` (mínimo 6, todas en El Salvador).
- **RF8.4** Cuando el usuario escriba en el buscador, el sistema deberá filtrar la lista y los marcadores por nombre, municipio o departamento, sin distinguir mayúsculas ni tildes (p. ej. "san miguel", "SAN MIGUEL" y "sán miguél" son equivalentes).
- **RF8.5** Cuando el usuario haga clic o pulse `Enter` sobre una tarjeta, el sistema deberá volar (`flyTo`) a esa sucursal, abrir su popup y marcar la tarjeta como activa.
- **RF8.6** Si el filtro no tiene coincidencias, entonces el sistema deberá mostrar un estado vacío ("No hay sucursales que coincidan con tu búsqueda.") con opción de limpiar el filtro.
- **RF8.7** El mapa deberá cargarse solo en el cliente (`dynamic(..., { ssr: false })`), mostrar un placeholder mientras carga y no producir errores en consola (incluidos los iconos de marcador por defecto de Leaflet).
- **RF8.8** Mientras el viewport sea menor a 768 px, el sistema deberá apilar lista y mapa (mapa arriba con altura fija, lista debajo con scroll propio limitado).
- **RF8.9** El mapa deberá mostrar la atribución de OpenStreetMap requerida por su licencia.

### RF9 — Modal de Empleo

**Historia:** Como candidato, quiero dejar mis datos y mi CV para postularme a una plaza en mi zona.

- **RF9.1** Cuando el usuario active "Empleo", el sistema deberá abrir un modal con el formulario: nombre completo, teléfono 1, teléfono 2 (opcional), plaza (Piloto / Ayudante de ruta / Auxiliar de bodega / Otros), zona (Occidente / Paracentral / San Salvador / Oriente) y adjuntar CV.
- **RF9.2** Cuando el usuario envíe el formulario, el sistema deberá validar en frontend:
  - nombre completo: obligatorio, mínimo 2 palabras;
  - teléfonos: 8 dígitos salvadoreños que empiecen por 2, 6 o 7 (se aceptan formatos `7123-4567` y `71234567`); teléfono 1 obligatorio, teléfono 2 opcional pero validado si se llena;
  - plaza y zona: obligatorias;
  - CV: obligatorio, PDF/DOC/DOCX, máximo 5 MB.
- **RF9.3** Si algún campo es inválido, entonces el sistema deberá mostrar el error junto al campo, marcarlo con `aria-invalid` y enfocar el primer campo con error.
- **RF9.4** Cuando todos los campos sean válidos, el sistema deberá mostrar una confirmación simulada ("¡Gracias! Recibimos tu postulación…") **sin enviar datos a ningún servidor**.
- **RF9.5** Cuando el usuario cierre el modal, el sistema deberá reiniciar el formulario y devolver el foco al botón "Empleo".

### RF10 — Footer

**Historia:** Como visitante, quiero encontrar al final de la página los datos de contacto y la información legal.

- **RF10.1** El sistema deberá mostrar un footer `#contacto` con fondo `brand-dark` que incluya: logotipo, enlace de WhatsApp, dirección de casa matriz ("Villas de Suiza, El Salvador"), iconos de redes, columna "Compañía", columna "Contáctanos", bloque de cobertura con bandera, copyright "© 2026 21 Express" y enlaces a Política de privacidad y Términos.
- **RF10.2** Todos los datos del footer deberán provenir de `site.json`.
- **RF10.3** Los enlaces que no sean anclas (Política de privacidad, Términos, páginas de la columna "Compañía") deberán apuntar a `#` y mostrar el tooltip "Próximamente".
- **RF10.4** El bloque de cobertura deberá mostrar únicamente la bandera de El Salvador (SVG propio, con texto accesible "El Salvador"). La lista de países sale de `site.json` para poder agregar más en el futuro sin tocar JSX.

### RF11 — Botón flotante de WhatsApp

**Historia:** Como cliente, quiero escribir a 21 Express por WhatsApp desde cualquier punto de la página.

- **RF11.1** El sistema deberá mostrar un botón circular fijo abajo a la derecha, visible en toda la página, con el icono de WhatsApp (SVG propio) y `aria-label="Escríbenos por WhatsApp"`.
- **RF11.2** Cuando el usuario active el botón, el sistema deberá abrir en pestaña nueva `https://wa.me/<número>?text=<mensaje codificado>`, con número y mensaje tomados de `site.json`.
- **RF11.3** El botón no deberá tapar el contenido interactivo ni el botón de cierre de los modales (se oculta o queda detrás mientras haya un modal abierto).

---

## 6. Requisitos no funcionales

- **RNF1 Rendimiento:** imágenes en formatos optimizados (WebP/JPG comprimido, ≤300 KB cada una salvo el hero ≤500 KB).
- **RNF2 Responsive:** verificado en 375, 768 y 1280 px, sin scroll horizontal.
- **RNF3 Accesibilidad:** constitución, principio 7.
- **RNF4 Build estático:** `output: 'export'`, desplegable en Vercel sin funciones de servidor.
- **RNF5 Consola limpia:** sin errores ni warnings de hidratación.
- **RNF6 SEO básico:** `<title>`, `meta description` y Open Graph con la marca 21 Express; `lang="es-SV"`.

## 7. Datos de prueba

- **Guías:** 3 guías en `guides.json`, cada una con estado distinto (Entregado, En ruta de entrega, En bodega) y eventos `{ date, location, description }`. Los ejemplos concretos se definen en `plan.md`.
- **Sucursales:** mínimo 6 en `branches.json` (San Salvador, Antiguo Cuscatlán, Santa Ana, San Miguel, Sonsonate, La Libertad).

## 8. Fuera de alcance

- Login real ("Mi perfil" solo muestra "Próximamente").
- Pagos, cotizador y backend de cualquier tipo.
- Envío real de formularios.
- Páginas internas: todo enlace que no sea ancla apunta a `#` con tooltip "Próximamente".
- Selección de otros países (solo se muestran como "Próximamente").

## 9. Definition of Done

- [ ] Todas las secciones RF1–RF11 implementadas con marca 21 Express y copy original.
- [ ] 3 guías de prueba con estados distintos funcionan; los errores de formato y "no encontrada" se muestran bien.
- [ ] Mínimo 6 sucursales de El Salvador filtrables, con el mapa sin errores.
- [ ] Responsive verificado en 375 / 768 / 1280 px.
- [ ] `npm run build` y `npm run lint` limpios; consola sin errores.
- [ ] Búsqueda de la marca de referencia en `src/` y `public/` sin resultados.

## 10. Aclaraciones aprobadas (2026-10-06)

| # | Tema | Decisión |
|---|---|---|
| A1 | Contacto | WhatsApp y teléfono: **+503 7641-6944** (`wa.me/50376416944`). Casa matriz: **Villas de Suiza, El Salvador**. Ambos viven en `site.json`. |
| A2 | Imágenes | Fuente: **Unsplash** (licencia libre). En el MVP cada imagen es un **placeholder SVG local** en `/public/images/placeholders/`, referenciado por ruta desde los JSON. Las fotos reales se cargan después cambiando solo la ruta en el JSON, sin tocar componentes. Las 6 sucursales pueden compartir placeholder. |
| A3 | Versión | Se usa la versión estable más reciente del stack (Next.js 16, React 19, Tailwind CSS 4). Detalle y excepciones en `plan.md` §5. |
| A4 | Banderas | El footer muestra **solo El Salvador** (RF10.4). El selector de país de la topbar (RF1.2) se mantiene con Guatemala y Honduras como "Próximamente". |
| A5 | Anclas | `#inicio`, `#paqueteria-local`, `#internacional`, `#smart-delivery`, `#cobertura`, `#sucursales`, `#contacto`, según §4. |
