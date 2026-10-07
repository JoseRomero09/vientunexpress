# Constitución del proyecto — 21 Express Web

Estos principios están por encima de cualquier spec, plan o tarea. Si una instrucción los contradice, gana la constitución y se debe escalar la duda antes de continuar.

---

## 1. Marca
El proyecto es **21 Express**. En el código final (`src/`, `public/`, configuración y metadatos) no puede haber menciones, logotipos, imágenes, URLs ni textos de la marca usada como referencia de estructura. El país por defecto es **El Salvador**.

**Verificación:** una búsqueda sin distinguir mayúsculas del nombre de la marca de referencia en `src/` y `public/` devuelve cero resultados.

## 2. Copy original
Todos los textos se redactan desde cero. Cada sección conserva el **propósito** de su equivalente en el sitio de referencia, pero con palabras, estructura de frases y tono propios de 21 Express.

**Verificación:** ningún titular, subtítulo o párrafo coincide literalmente con el sitio de referencia.

## 3. La spec manda
Nada se implementa si no está descrito en `specs/`. Si un requisito cambia, primero se actualiza `spec.md` (y `plan.md`/`tasks.md` si aplica) y después el código.

## 4. Datos separados de la UI
Navegación, sucursales, guías, teléfono, WhatsApp, redes sociales y textos repetidos salen de archivos JSON en `src/data/` o de configuración tipada. Nunca se hardcodean en JSX.

## 5. Responsive mobile-first
Los estilos base son para móvil y se amplían con breakpoints. La jerarquía de secciones debe respetarse en **375 px, 768 px y 1280 px**, sin scroll horizontal.

## 6. MVP sin backend
El rastreo y el mapa funcionan únicamente en el frontend con datos mock. No hay llamadas a APIs propias, formularios que envíen datos ni autenticación real. La consola del navegador queda sin errores.

## 7. Accesibilidad básica
- `alt` significativo en todas las imágenes (o `alt=""` si son decorativas).
- `<label>` asociado a cada input.
- Foco visible en todos los elementos interactivos.
- Contraste mínimo **WCAG AA**.
- Modales y drawers operables por teclado: foco atrapado, cierre con `Esc` y retorno del foco al disparador.
- Animaciones desactivadas cuando el usuario activa `prefers-reduced-motion`.

## 8. Verificación continua
Ninguna tarea se da por cerrada si rompe una sección previa, `npm run build` o `npm run lint`.

## 9. Identidad visual propia
21 Express tiene identidad visual propia: **la referencia solo define la estructura de secciones, no el estilo**. Colores, composición de cada sección, ilustraciones y animaciones son de 21 Express y deben diferenciarse claramente de la referencia.

- **Paleta:** rojo `#D7182A` (principal), rojo oscuro `#9E0F1C`, amarillo `#FFC20E`, amarillo suave `#FFE58A`, blanco `#FFFFFF`, blanco cálido `#FFF9EC`, tinta `#1A1A1A` y tinta suave `#5B5B5B`. La tabla completa de tokens está en `AGENTS.md` §3.
- **Texto blanco sobre rojo. Texto tinta sobre amarillo. Nunca blanco sobre amarillo.**
- **No hay verdes de marca.** La única excepción es el botón flotante de WhatsApp, que usa el verde oficial de esa marca (`#25D366`) para que el usuario lo reconozca.

**Verificación:** `grep -riE "green|#0D4732|#00D632|lime" src/` devuelve vacío.
