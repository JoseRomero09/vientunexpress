# Plan técnico — Spec 001 Landing + Rastreo MVP

| Campo | Valor |
|---|---|
| Spec | [`spec.md`](spec.md) (incluye aclaraciones §10) |
| Estado | Borrador — pendiente de aprobación |
| Fecha | 2026-10-06 |
| Entorno verificado | Node 22.18.0 · npm 10.9.3 |

---

## 1. Arquitectura

### 1.1 Decisiones clave

| Tema | Decisión | Motivo |
|---|---|---|
| Render | `page.tsx` es un **Server Component** que importa los JSON y compone las secciones. Solo las piezas interactivas llevan `'use client'`. | Menos JS en el cliente. Con `output: 'export'` todo se pre-renderiza a HTML. |
| Modales y drawer | Elemento nativo **`<dialog>`** con `showModal()`, envuelto en el componente `ui/Modal.tsx`. | Trae de serie foco atrapado (el resto de la página queda `inert`), cierre con `Esc`, capa superior por encima del botón de WhatsApp (cumple RF11.3 sin lógica extra) y backdrop. No hace falta ninguna librería de modales. |
| "Próximamente" | Componente `ui/ComingSoon.tsx`: envuelve un enlace o botón con `href="#"`, cancela la navegación y muestra un tooltip en hover, foco o clic (`role="tooltip"` + `aria-describedby`). | Un único patrón para RF2.6, RF2.7, RF4.3, RF5.4 y RF10.3. |
| Comunicación entre secciones | Por **id del DOM**: "Rastrear envío" (RF6) busca `#tracking-input`, hace scroll y le da foco. El modal de Empleo lo controla `Navbar`. | Evita un contexto global para dos interacciones. |
| Imágenes | `next/image` con `images.unoptimized: true`. Rutas en los JSON. En el MVP apuntan a placeholders SVG (aclaración A2). | Exigido por `output: 'export'`. Cambiar una foto es editar un JSON. |
| Normalización de texto | `normalizeText()`: `NFD` + quitar `\p{Diacritic}` + `toLowerCase()` + `trim()`. | RF8.4: buscar sin tildes ni mayúsculas. |
| Fechas | Strings ISO 8601 con zona `-06:00` en el JSON, formateadas con `Intl.DateTimeFormat('es-SV', { timeZone: 'America/El_Salvador' })`. | Formato local y sin desfases. Solo se formatean en el cliente (dentro del modal), así que no hay riesgo de hidratación. |

### 1.2 Árbol de carpetas

```
21-express-web/
├── AGENTS.md
├── docs/constitution.md
├── specs/001-landing-mvp/{spec,plan,tasks}.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── .gitignore
├── public/
│   └── images/
│       ├── CREDITS.md                  # autor + URL Unsplash de cada foto real
│       ├── placeholders/
│       │   ├── hero.svg                # RF4
│       │   ├── smart-delivery.svg      # RF6
│       │   ├── coverage.svg            # RF7
│       │   └── branch.svg              # RF8 (compartido por las 6 sucursales)
│       └── map/
│           ├── marker.svg              # pin brand-green
│           └── marker-active.svg       # pin brand-lime (sucursal seleccionada)
└── src/
    ├── app/
    │   ├── layout.tsx                  # <html lang="es-SV">, fuentes, metadata/OG
    │   ├── page.tsx                    # compone RF1–RF11 en orden
    │   ├── globals.css                 # @import tailwindcss + @theme (paleta/fuentes)
    │   └── icon.svg                    # favicon con el "21"
    ├── components/
    │   ├── layout/
    │   │   ├── Topbar.tsx              # RF1  (server)
    │   │   ├── CountrySwitcher.tsx     # RF1  (client) menú de país
    │   │   ├── Navbar.tsx              # RF2  (client) sticky + estado de modales
    │   │   ├── MobileDrawer.tsx        # RF2  (client) drawer sobre <dialog>
    │   │   ├── Logo.tsx                # RF2/RF10 SVG "21 Express"
    │   │   └── Footer.tsx              # RF10 (server)
    │   ├── sections/
    │   │   ├── TrackingBar.tsx         # RF3  (client)
    │   │   ├── TrackingResultModal.tsx # RF3  (client)
    │   │   ├── Hero.tsx                # RF4  (server)
    │   │   ├── ServicesSplit.tsx       # RF5  (server)
    │   │   ├── SmartDelivery.tsx       # RF6  (server)
    │   │   ├── TrackShipmentButton.tsx # RF6  (client) scroll + foco
    │   │   ├── CoverageBanner.tsx      # RF7  (server)
    │   │   ├── BranchLocator.tsx       # RF8  (client) buscador + lista + estado
    │   │   ├── BranchCard.tsx          # RF8
    │   │   └── BranchMap.tsx           # RF8  (client, cargado sin SSR)
    │   ├── jobs/
    │   │   └── JobApplicationModal.tsx # RF9  (client)
    │   ├── WhatsAppButton.tsx          # RF11 (server, enlace puro)
    │   ├── ui/
    │   │   ├── Modal.tsx               # wrapper accesible de <dialog>
    │   │   ├── ComingSoon.tsx          # tooltip "Próximamente"
    │   │   └── Button.tsx              # variantes: primary | dark | outline
    │   └── icons/
    │       ├── FacebookIcon.tsx
    │       ├── InstagramIcon.tsx
    │       ├── WhatsAppIcon.tsx
    │       └── FlagSV.tsx
    ├── data/
    │   ├── guides.json
    │   ├── branches.json
    │   └── site.json
    ├── lib/
    │   ├── data.ts                     # importa los JSON y los exporta tipados
    │   ├── tracking.ts                 # normalizeGuideId, isValidGuideId, findGuide
    │   ├── text.ts                     # normalizeText
    │   ├── jobValidation.ts            # validateJobApplication
    │   ├── whatsapp.ts                 # buildWhatsAppUrl
    │   └── format.ts                   # formatDate, formatDateTime
    └── types/
        └── index.ts                    # Guide, Branch, SiteConfig, …
```

### 1.3 Componentes por requisito

| RF | Componente principal | Auxiliares | Tipo |
|---|---|---|---|
| RF1 | `Topbar` | `CountrySwitcher`, iconos | server + client |
| RF2 | `Navbar` | `Logo`, `MobileDrawer`, `ComingSoon`, `Button` | client |
| RF3 | `TrackingBar` | `TrackingResultModal`, `Modal`, `lib/tracking` | client |
| RF4 | `Hero` | `Button`, `ComingSoon` | server |
| RF5 | `ServicesSplit` | `Button`, `ComingSoon` | server |
| RF6 | `SmartDelivery` | `TrackShipmentButton` | server + client |
| RF7 | `CoverageBanner` | — | server |
| RF8 | `BranchLocator` | `BranchCard`, `BranchMap`, `lib/text` | client |
| RF9 | `JobApplicationModal` | `Modal`, `lib/jobValidation` | client |
| RF10 | `Footer` | `Logo`, iconos, `FlagSV`, `ComingSoon` | server |
| RF11 | `WhatsAppButton` | `WhatsAppIcon`, `lib/whatsapp` | server |

> `ComingSoon` es client. Los Server Components pueden renderizarlo sin volverse client.

### 1.4 Contraste (constitución, principio 7)

| Combinación | Ratio aprox. | Uso |
|---|---|---|
| Blanco sobre `brand-dark` | ≈ 10:1 ✅ | Navbar, footer, split izquierdo |
| `brand-dark` sobre `brand-green` | ≈ 5.3:1 ✅ | **Texto de todos los botones verdes** y del split derecho |
| `brand-lime` sobre `brand-dark` | ≈ 7:1 ✅ | "TECNOLOGÍA LOGÍSTICA" |
| Blanco sobre `brand-green` | ≈ 2:1 ❌ | **Prohibido** para texto |

---

## 2. Tipos y datos

### 2.1 `src/types/index.ts`

```ts
// ---------- Rastreo ----------
export type GuideStatus = 'delivered' | 'out_for_delivery' | 'in_warehouse';

export interface GuideEvent {
  date: string;        // ISO 8601 con zona, p. ej. "2026-10-02T14:35:00-06:00"
  location: string;
  description: string;
}

export interface Guide {
  id: string;          // ^[A-Z]{6}-\d{2}-\d{10}$
  status: GuideStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string; // ISO date "2026-10-02"
  events: GuideEvent[];      // en el JSON, del más reciente al más antiguo
}

// ---------- Sucursales ----------
export interface Branch {
  id: string;
  name: string;
  address: string;
  department: string;
  municipality: string;
  schedule: string;
  phone: string;        // formato visible "7641-6944"
  lat: number;
  lng: number;
  image: { src: string; alt: string };
}

// ---------- Sitio ----------
export type LinkAction = 'anchor' | 'soon' | 'jobs' | 'external';

export interface SiteLink {
  label: string;
  href: string;         // "#cobertura", "#", "https://…"
  action: LinkAction;
}

export interface SocialLink {
  id: 'facebook' | 'instagram';
  label: string;
  url: string;
  comingSoon: boolean;  // true mientras no haya URL real
}

export interface Country {
  code: 'SV' | 'GT' | 'HN';
  name: string;
  status: 'active' | 'soon';
}

export interface ImageRef { src: string; alt: string }

export interface SiteConfig {
  brand: { name: string; slogan: string };
  contact: {
    phone: string;            // "+503 7641-6944"
    phoneHref: string;        // "tel:+50376416944"
    whatsapp: { number: string; message: string };
    address: string;
    schedule: string;
  };
  social: SocialLink[];
  countries: Country[];
  coverageCountries: Country['code'][];
  topbarLinks: SiteLink[];
  navLinks: SiteLink[];
  navActions: SiteLink[];
  comingSoonLabel: string;
  tracking: {
    label: string;
    placeholder: string;
    buttonLabel: string;
    errors: { empty: string; invalid: string; notFound: string };
    statusLabels: Record<GuideStatus, string>;
    modal: { title: string; origin: string; destination: string; eta: string; history: string; close: string };
  };
  hero: { title: string; subtitle: string; cta: string; image: ImageRef };
  services: {
    national: { id: string; title: string; text: string; cta: string };
    international: { id: string; title: string; text: string; cta: string };
  };
  smartDelivery: {
    badge: string; tagline: string; title: string; intro: string;
    benefits: { icon: 'radar' | 'bell' | 'route'; title: string; text: string }[];
    stepsTitle: string; steps: string[]; cta: string; image: ImageRef;
  };
  coverage: { title: string; subtitle: string; image: ImageRef };
  branchesSection: { title: string; searchLabel: string; searchPlaceholder: string; empty: string; clear: string; mapLoading: string };
  jobs: {
    title: string; intro: string;
    positions: string[]; zones: string[];
    labels: Record<'fullName' | 'phone1' | 'phone2' | 'position' | 'zone' | 'cv' | 'submit' | 'optional', string>;
    errors: Record<'fullName' | 'phone' | 'required' | 'cvType' | 'cvSize', string>;
    success: { title: string; text: string; close: string };
  };
  footer: {
    companyTitle: string; companyLinks: SiteLink[];
    contactTitle: string; coverageTitle: string;
    legalLinks: SiteLink[]; copyright: string;
  };
}
```

`src/lib/data.ts` importa los JSON con `resolveJsonModule` y los exporta tipados (`export const guides = guidesJson as Guide[]`). Así los componentes nunca importan JSON directamente.

### 2.2 `src/data/guides.json`

```json
[
  {
    "id": "SVSALE-01-0000000001",
    "status": "delivered",
    "origin": "San Salvador",
    "destination": "Santa Ana",
    "estimatedDelivery": "2026-10-02",
    "events": [
      { "date": "2026-10-02T14:35:00-06:00", "location": "Santa Ana", "description": "Paquete entregado al destinatario." },
      { "date": "2026-10-02T08:10:00-06:00", "location": "Santa Ana", "description": "El repartidor salió con tu paquete." },
      { "date": "2026-10-01T18:20:00-06:00", "location": "Centro de distribución Santa Ana", "description": "El paquete llegó al centro de distribución." },
      { "date": "2026-10-01T10:05:00-06:00", "location": "Bodega central, San Salvador", "description": "Recibimos tu paquete en bodega." }
    ]
  },
  {
    "id": "SVSALE-02-0000000002",
    "status": "out_for_delivery",
    "origin": "Antiguo Cuscatlán",
    "destination": "San Miguel",
    "estimatedDelivery": "2026-10-06",
    "events": [
      { "date": "2026-10-06T07:45:00-06:00", "location": "San Miguel", "description": "Tu paquete va en ruta de entrega." },
      { "date": "2026-10-05T19:30:00-06:00", "location": "Centro de distribución San Miguel", "description": "El paquete llegó al centro de distribución." },
      { "date": "2026-10-05T09:15:00-06:00", "location": "Antiguo Cuscatlán", "description": "Recolectamos el paquete en el comercio." }
    ]
  },
  {
    "id": "SVSALE-03-0000000003",
    "status": "in_warehouse",
    "origin": "Sonsonate",
    "destination": "San Salvador",
    "estimatedDelivery": "2026-10-08",
    "events": [
      { "date": "2026-10-06T11:00:00-06:00", "location": "Bodega Sonsonate", "description": "El paquete está en bodega, listo para despacho." },
      { "date": "2026-10-06T09:20:00-06:00", "location": "Sonsonate", "description": "Recolectamos el paquete en el comercio." }
    ]
  }
]
```

Colores del badge de estado: `delivered` → `bg-brand-green text-brand-dark`; `out_for_delivery` → `bg-brand-lime text-brand-dark`; `in_warehouse` → `bg-surface-muted text-brand-dark ring-1 ring-brand-dark/20`.

### 2.3 `src/data/branches.json`

Las direcciones son **ficticias** y genéricas. Todas usan el teléfono central (A1) hasta tener números por sucursal. Las coordenadas corresponden al centro de cada localidad.

```json
[
  {
    "id": "san-salvador-centro",
    "name": "21 Express San Salvador Centro",
    "address": "Avenida España, Centro Histórico",
    "department": "San Salvador",
    "municipality": "San Salvador",
    "schedule": "Lun a vie 8:00–17:00 · Sáb 8:00–12:00",
    "phone": "7641-6944",
    "lat": 13.6989, "lng": -89.1914,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express San Salvador Centro" }
  },
  {
    "id": "antiguo-cuscatlan",
    "name": "21 Express Antiguo Cuscatlán",
    "address": "Bulevar Santa Elena, zona comercial",
    "department": "La Libertad",
    "municipality": "Antiguo Cuscatlán",
    "schedule": "Lun a vie 8:00–18:00 · Sáb 8:00–13:00",
    "phone": "7641-6944",
    "lat": 13.6729, "lng": -89.2400,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express Antiguo Cuscatlán" }
  },
  {
    "id": "santa-ana",
    "name": "21 Express Santa Ana",
    "address": "Avenida Independencia Sur, centro",
    "department": "Santa Ana",
    "municipality": "Santa Ana",
    "schedule": "Lun a vie 8:00–17:00 · Sáb 8:00–12:00",
    "phone": "7641-6944",
    "lat": 13.9942, "lng": -89.5597,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express Santa Ana" }
  },
  {
    "id": "san-miguel",
    "name": "21 Express San Miguel",
    "address": "Avenida Roosevelt Sur, barrio San Felipe",
    "department": "San Miguel",
    "municipality": "San Miguel",
    "schedule": "Lun a vie 8:00–17:00 · Sáb 8:00–12:00",
    "phone": "7641-6944",
    "lat": 13.4833, "lng": -88.1833,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express San Miguel" }
  },
  {
    "id": "sonsonate",
    "name": "21 Express Sonsonate",
    "address": "Calle Obispo Marroquín, centro",
    "department": "Sonsonate",
    "municipality": "Sonsonate",
    "schedule": "Lun a vie 8:00–17:00 · Sáb 8:00–12:00",
    "phone": "7641-6944",
    "lat": 13.7189, "lng": -89.7242,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express Sonsonate" }
  },
  {
    "id": "la-libertad-puerto",
    "name": "21 Express Puerto de La Libertad",
    "address": "Carretera del Litoral, entrada al puerto",
    "department": "La Libertad",
    "municipality": "La Libertad",
    "schedule": "Lun a vie 8:00–17:00 · Sáb 8:00–12:00",
    "phone": "7641-6944",
    "lat": 13.4883, "lng": -89.3222,
    "image": { "src": "/images/placeholders/branch.svg", "alt": "Fachada de la sucursal 21 Express Puerto de La Libertad" }
  }
]
```

> Nota: desde la reforma municipal de 2024, varias de estas localidades son **distritos** de un municipio mayor. Para el MVP, `municipality` guarda el nombre que la gente conoce y usa para buscar.

### 2.4 `src/data/site.json`

Copy original de 21 Express (constitución, principio 2).

```json
{
  "brand": { "name": "21 Express", "slogan": "Tu envío en buenas manos, de punta a punta del país." },
  "contact": {
    "phone": "+503 7641-6944",
    "phoneHref": "tel:+50376416944",
    "whatsapp": { "number": "50376416944", "message": "¡Hola, 21 Express! Quiero información sobre sus envíos." },
    "address": "Villas de Suiza, El Salvador",
    "schedule": "Lunes a viernes de 8:00 a 17:00 · Sábado de 8:00 a 12:00"
  },
  "social": [
    { "id": "facebook",  "label": "21 Express en Facebook",  "url": "#", "comingSoon": true },
    { "id": "instagram", "label": "21 Express en Instagram", "url": "#", "comingSoon": true }
  ],
  "countries": [
    { "code": "SV", "name": "El Salvador", "status": "active" },
    { "code": "GT", "name": "Guatemala",   "status": "soon" },
    { "code": "HN", "name": "Honduras",    "status": "soon" }
  ],
  "coverageCountries": ["SV"],
  "comingSoonLabel": "Próximamente",
  "topbarLinks": [
    { "label": "¿Por qué 21 Express?",       "href": "#",               "action": "soon" },
    { "label": "Tecnología Smart Delivery",  "href": "#smart-delivery", "action": "anchor" },
    { "label": "Contacto",                   "href": "#contacto",       "action": "anchor" }
  ],
  "navLinks": [
    { "label": "Inicio",           "href": "#inicio",           "action": "anchor" },
    { "label": "Paquetería local", "href": "#paqueteria-local", "action": "anchor" },
    { "label": "Cobertura",        "href": "#cobertura",        "action": "anchor" },
    { "label": "Internacional",    "href": "#internacional",    "action": "anchor" }
  ],
  "navActions": [
    { "label": "Proveedores de Transporte", "href": "#", "action": "soon" },
    { "label": "Afiliarme",                 "href": "#", "action": "soon" },
    { "label": "Empleo",                    "href": "#", "action": "jobs" },
    { "label": "Mi perfil",                 "href": "#", "action": "soon" }
  ],
  "tracking": {
    "label": "Ingresa tu número de guía:",
    "placeholder": "ABCDEF-00-0000000000",
    "buttonLabel": "Rastrear guía",
    "errors": {
      "empty": "Escribe tu número de guía para rastrearla.",
      "invalid": "El formato no es válido. Ejemplo: ABCDEF-00-0000000000.",
      "notFound": "No encontramos esa guía. Revisa el número e intenta de nuevo."
    },
    "statusLabels": {
      "delivered": "Entregado",
      "out_for_delivery": "En ruta de entrega",
      "in_warehouse": "En bodega"
    },
    "modal": {
      "title": "Estado de tu envío",
      "origin": "Origen",
      "destination": "Destino",
      "eta": "Entrega estimada",
      "history": "Historial del envío",
      "close": "Cerrar"
    }
  },
  "hero": {
    "title": "Entregamos lo que tu negocio promete",
    "subtitle": "Recolectamos, transportamos y entregamos tus paquetes en todo El Salvador, con seguimiento en cada paso.",
    "cta": "Afiliarme",
    "image": { "src": "/images/placeholders/hero.svg", "alt": "Repartidor de 21 Express entregando un paquete" }
  },
  "services": {
    "national": {
      "id": "paqueteria-local",
      "title": "Paquetería nacional",
      "text": "Entregas en los 14 departamentos, con recolección directa en tu negocio.",
      "cta": "Ver servicios"
    },
    "international": {
      "id": "internacional",
      "title": "Internacional",
      "text": "Envía y recibe paquetes del extranjero con acompañamiento de principio a fin.",
      "cta": "Explorar"
    }
  },
  "smartDelivery": {
    "badge": "SMART DELIVERY",
    "tagline": "TECNOLOGÍA LOGÍSTICA",
    "title": "Sigue cada envío desde tu teléfono",
    "intro": "Con Smart Delivery, 21 Express te muestra en todo momento dónde va tu paquete y en qué etapa está, sin llamadas ni esperas.",
    "benefits": [
      { "icon": "radar", "title": "Tracking en tiempo real", "text": "Consulta la ubicación y el estado de tu envío cuando quieras." },
      { "icon": "bell",  "title": "Avisos de envío y salida", "text": "Te notificamos cuando recogemos tu paquete y cuando sale a entrega." },
      { "icon": "route", "title": "Control de envíos y ruta diaria", "text": "Revisa todos tus envíos y la ruta del día desde un solo lugar." }
    ],
    "stepsTitle": "Cómo rastrear en 2 pasos",
    "steps": [
      "Copia el número de guía que te enviamos por mensaje o correo.",
      "Pégalo en la barra de rastreo y presiona la lupa."
    ],
    "cta": "Rastrear envío",
    "image": { "src": "/images/placeholders/smart-delivery.svg", "alt": "Mano sosteniendo un smartphone con el rastreo de un envío" }
  },
  "coverage": {
    "title": "Llegamos hasta la puerta de tu cliente",
    "subtitle": "Tú enfócate en vender; de la logística nos encargamos nosotros.",
    "image": { "src": "/images/placeholders/coverage.svg", "alt": "Repartidor cargando cajas junto a una furgoneta de reparto" }
  },
  "branchesSection": {
    "title": "Visita tu sucursal más cercana",
    "searchLabel": "Buscar sucursal",
    "searchPlaceholder": "Nombre, municipio o departamento",
    "empty": "No hay sucursales que coincidan con tu búsqueda.",
    "clear": "Limpiar búsqueda",
    "mapLoading": "Cargando mapa…"
  },
  "jobs": {
    "title": "Trabaja con nosotros",
    "intro": "Déjanos tus datos y tu CV. Si hay una plaza para ti en tu zona, te contactamos.",
    "positions": ["Piloto", "Ayudante de ruta", "Auxiliar de bodega", "Otros"],
    "zones": ["Occidente", "Paracentral", "San Salvador", "Oriente"],
    "labels": {
      "fullName": "Nombre completo",
      "phone1": "Teléfono 1",
      "phone2": "Teléfono 2",
      "position": "Plaza",
      "zone": "Zona",
      "cv": "Adjunta tu CV (PDF, DOC o DOCX, máx. 5 MB)",
      "submit": "Enviar postulación",
      "optional": "(opcional)"
    },
    "errors": {
      "fullName": "Escribe tu nombre y al menos un apellido.",
      "phone": "Escribe un teléfono de 8 dígitos, por ejemplo 7641-6944.",
      "required": "Este campo es obligatorio.",
      "cvType": "El CV debe ser PDF, DOC o DOCX.",
      "cvSize": "El CV no puede pesar más de 5 MB."
    },
    "success": {
      "title": "¡Gracias por postularte!",
      "text": "Recibimos tus datos. Si tu perfil encaja con una plaza disponible, te llamaremos.",
      "close": "Entendido"
    }
  },
  "footer": {
    "companyTitle": "Compañía",
    "companyLinks": [
      { "label": "¿Por qué 21 Express?", "href": "#",               "action": "soon" },
      { "label": "Smart Delivery",       "href": "#smart-delivery", "action": "anchor" },
      { "label": "Sucursales",           "href": "#sucursales",     "action": "anchor" },
      { "label": "Trabaja con nosotros", "href": "#",               "action": "soon" }
    ],
    "contactTitle": "Contáctanos",
    "coverageTitle": "Cobertura",
    "legalLinks": [
      { "label": "Política de privacidad", "href": "#", "action": "soon" },
      { "label": "Términos y condiciones",  "href": "#", "action": "soon" }
    ],
    "copyright": "© 2026 21 Express. Todos los derechos reservados."
  }
}
```

### 2.5 Lógica pura (`src/lib/`)

```ts
// tracking.ts
export const GUIDE_PATTERN = /^[A-Z]{6}-\d{2}-\d{10}$/;
export const normalizeGuideId = (raw: string) => raw.trim().toUpperCase();
export const isValidGuideId = (id: string) => GUIDE_PATTERN.test(id);
export const findGuide = (id: string, guides: Guide[]) => guides.find((g) => g.id === id);

export type TrackingResult =
  | { kind: 'empty' } | { kind: 'invalid' } | { kind: 'notFound' }
  | { kind: 'found'; guide: Guide };
export function trackGuide(raw: string, guides: Guide[]): TrackingResult { /* empty → invalid → notFound → found */ }
// Las funciones de lib/ reciben los datos por parámetro (no importan JSON): así se pueden
// probar con Node sin Next. Los componentes les pasan `guides` desde lib/data.ts.
// validateJobApplication devuelve claves de error (JobErrorKey); el texto sale de site.json.

// text.ts
export const normalizeText = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();

// jobValidation.ts
export const SV_PHONE = /^[267]\d{3}-?\d{4}$/;
export const CV_TYPES = ['application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const CV_MAX_BYTES = 5 * 1024 * 1024;
// validateJobApplication(values) → Partial<Record<Field, string>> (vacío = válido)
// La extensión se valida además del MIME porque algunos navegadores entregan type="" para .doc.

// whatsapp.ts
export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
```

---

## 3. Solución del mapa (RF8)

### 3.1 Carga sin SSR

Leaflet usa `window` al importarse, así que **no puede** ejecutarse en el pre-render. `BranchLocator` (client) lo carga así:

```tsx
'use client';
import dynamic from 'next/dynamic';

const BranchMap = dynamic(() => import('./BranchMap'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center bg-surface-muted" role="status">
      {site.branchesSection.mapLoading}
    </div>
  ),
});
```

> En Next 16, `ssr: false` solo se permite dentro de un Client Component. Por eso `BranchLocator` lleva `'use client'` y `page.tsx` sigue siendo server.

### 3.2 `BranchMap.tsx` (esquema)

```tsx
'use client';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// Iconos propios en /public: evita el bug clásico de los iconos por defecto
// (las rutas de marker-icon.png que Leaflet resuelve desde el CSS no existen
// tras el bundling). No se usa L.Icon.Default en ningún marcador.
const icon = L.icon({ iconUrl: '/images/map/marker.svg', iconSize: [32, 42], iconAnchor: [16, 42], popupAnchor: [0, -38] });
const activeIcon = L.icon({ iconUrl: '/images/map/marker-active.svg', iconSize: [38, 50], iconAnchor: [19, 50], popupAnchor: [0, -44] });

interface Props {
  branches: Branch[];            // ya filtradas
  selectedId: string | null;
  onSelect: (id: string) => void;
}
```

| Pieza | Detalle |
|---|---|
| Tiles | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, `attribution='&copy; OpenStreetMap contributors'` (RF8.9). **Sin API key.** |
| Vista inicial | centro `[13.7, -88.9]`, zoom 8 (cubre todo el país), `scrollWheelZoom={false}` para no secuestrar el scroll de la página. |
| Referencias | `useRef<Record<string, L.Marker>>({})`. Cada `<Marker ref>` se registra por `id`. |
| Volar a la sucursal | Un hijo `<MapController selectedId>` usa `useMap()`. Cuando cambia `selectedId`: `map.flyTo([lat, lng], 15, { duration: 1.2 })` y, con `map.once('moveend')`, `markers[id].openPopup()`. |
| Movimiento reducido | Si `matchMedia('(prefers-reduced-motion: reduce)')` se cumple, usa `map.setView(…, { animate: false })`. |
| Filtro | Al cambiar la lista filtrada (y si no hay selección), `map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 13 })`. Con 0 resultados el mapa se queda como está. |
| Clic en marcador | Llama `onSelect(id)` para que la tarjeta correspondiente quede activa y visible (`scrollIntoView({ block: 'nearest' })`). |
| Altura | El contenedor tiene altura explícita (`h-80 md:h-[560px]`). Sin esto Leaflet no pinta nada. |
| StrictMode | react-leaflet 5 gestiona el doble montaje de React 19 sin el error "Map container is already initialized". |

### 3.3 Estado en `BranchLocator`

```ts
const [query, setQuery] = useState('');
const [selectedId, setSelectedId] = useState<string | null>(null);
const filtered = useMemo(() => {
  const q = normalizeText(query);
  if (!q) return branches;
  return branches.filter((b) =>
    [b.name, b.municipality, b.department].some((f) => normalizeText(f).includes(q)));
}, [query]);
// Si la sucursal seleccionada sale del filtro → selectedId = null.
```

Tarjetas: `<button>` dentro de `<li>` (se activan con Enter o Espacio de forma nativa) con `aria-pressed` para la activa. El conteo de resultados se anuncia con `aria-live="polite"`.

---

## 4. Tailwind y tipografía

Tailwind 4 se configura en CSS. **No hay `tailwind.config.js`** (cambio respecto al prompt original, anotado en `AGENTS.md`).

### 4.1 `postcss.config.mjs`

```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

### 4.2 `src/app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --color-brand-dark: #0D4732;
  --color-brand-dark-2: #13503B;
  --color-brand-green: #00D632;
  --color-brand-green-hover: #00C82B;
  --color-brand-lime: #A3E635;
  --color-surface: #FFFFFF;
  --color-surface-muted: #F4F6F8;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  html { scroll-behavior: smooth; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  [id] { scroll-margin-top: 6rem; }               /* RF2.11: altura de la navbar */
  h1, h2, h3 { font-family: var(--font-heading); }
  :focus-visible { outline: 3px solid var(--color-brand-lime); outline-offset: 2px; }
  dialog::backdrop { background: rgb(13 71 50 / 0.6); }
}
```

Genera las utilidades `bg-brand-dark`, `text-brand-green`, `hover:bg-brand-green-hover`, `font-heading`, etc. `@theme inline` hace falta porque las fuentes referencian variables que define `next/font` en `<html>`.

### 4.3 `src/app/layout.tsx`

```tsx
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-montserrat', display: 'swap' });

export const metadata: Metadata = {
  title: '21 Express | Paquetería en El Salvador',
  description: 'Envíos nacionales e internacionales con rastreo en tiempo real y sucursales en todo El Salvador.',
  openGraph: { title: '21 Express', locale: 'es_SV', type: 'website' },
};

// <html lang="es-SV" className={`${inter.variable} ${montserrat.variable}`}>
//   <body className="bg-surface font-sans text-brand-dark antialiased">
```

> `next/font/google` descarga las fuentes **en tiempo de build** y las sirve desde el propio sitio: no hay peticiones a Google en runtime. Necesita conexión durante `npm run build`, algo que Vercel ya tiene.

### 4.4 `next.config.ts`

```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
```

### 4.5 `eslint.config.mjs` (flat config, Next 16)

```js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts']),
]);
```

`core-web-vitals` incluye `jsx-a11y`, que ayuda a cumplir el principio 7.

---

## 5. Dependencias exactas

Versiones consultadas en npm el 2026-10-06. Se fijan **sin `^`** para builds reproducibles.

### 5.1 Producción

| Paquete | Versión | Justificación |
|---|---|---|
| `next` | 16.4.0 | Framework fijado por AGENTS.md (App Router + export estático). Última estable. |
| `react` | 19.3.0 | Requerido por Next 16 y react-leaflet 5. |
| `react-dom` | 19.3.0 | Igual que `react`. |
| `leaflet` | 1.9.4 | Motor del mapa (RF8). OSM sin API key. |
| `react-leaflet` | 5.0.0 | Bindings de React para Leaflet. Su peer dependency es React 19. |
| `lucide-react` | 1.52.0 | Iconos de UI (lupa, menú, cierre, pin, reloj, teléfono, beneficios). Fijado por AGENTS.md. |

### 5.2 Desarrollo

| Paquete | Versión | Justificación |
|---|---|---|
| `typescript` | **6.0.3** | Lenguaje del proyecto. **Excepción a "la más actual":** TS 7.0 (port nativo) ya es `latest`, pero `typescript-eslint`, que usa `eslint-config-next`, solo soporta `<6.1.0`. Con TS 7, `npm run lint` fallaría. |
| `@types/react` | 19.3.0 | Tipos de React 19. |
| `@types/react-dom` | 19.3.0 | Tipos de React DOM 19. |
| `@types/node` | 22.20.5 | Tipos alineados con el runtime Node 22 (no con la última, 26.x). |
| `@types/leaflet` | 1.9.22 | Tipos de `L.icon`, `L.Marker` y `latLngBounds`. |
| `tailwindcss` | 4.3.3 | Estilos (fijado por AGENTS.md). |
| `@tailwindcss/postcss` | 4.3.3 | Integración de Tailwind 4 con el pipeline de PostCSS de Next. |
| `eslint` | **9.39.5** | `npm run lint`. **Excepción:** ESLint 10 ya salió, pero algunos plugins que trae `eslint-config-next` (react, import, jsx-a11y) aún no lo declaran compatible. Se usa la última 9.x. |
| `eslint-config-next` | 16.4.0 | Reglas oficiales de Next 16 (incluye jsx-a11y y react-hooks). |

**Total: 6 de producción + 9 de desarrollo.** No se instala nada más (sin librería de modales, formularios, toasts ni utilidades de clases). Si una tarea necesita algo extra, primero se modifica esta sección.

### 5.3 Scripts de `package.json`

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint ."
  },
  "engines": { "node": ">=20.9.0" }
}
```

### 5.4 Arranque del proyecto

El proyecto **no** se crea con `create-next-app`: este se niega a usar una carpeta que ya tiene `AGENTS.md` y `specs/`, y además añade archivos propios que no queremos. Los archivos de configuración de §4 se escriben a mano y luego se ejecuta `npm install` con las versiones exactas de §5.

---

## 6. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Leaflet rompe el build por `window` | Solo se importa en `BranchMap`, que carga con `dynamic(…, { ssr: false })`. |
| Iconos de marcador rotos (404 en consola) | Iconos SVG propios en `/public/images/map/`, sin `L.Icon.Default`. |
| Los tiles de OSM requieren conexión | Es aceptable en el MVP. El placeholder de carga ocupa el espacio y no hay errores de JS sin red. |
| Desajuste de hidratación por fechas | Solo se formatean dentro del modal, que se renderiza en el cliente tras la interacción del usuario. |
| La navbar sticky tapa los títulos al saltar a anclas | `scroll-margin-top` global en `[id]`. |
| Placeholders olvidados en producción | `CREDITS.md` lista qué imagen falta. Las rutas están centralizadas en los JSON. |
| Restos de la marca de referencia | Verificación por búsqueda en `src/` y `public/` al cerrar cada tarea (constitución, principio 1). |
