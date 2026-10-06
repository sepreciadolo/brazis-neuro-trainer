# MVP: App de práctica de neurología basada en Brazis

Oct 6, 2026 · @Sebastian

## Visión y objetivo

Una app personal para aprender localización neurológica con preguntas clínicas tipo caso, basadas en *Localization in Clinical Neurology* (Brazis), con explicaciones y figuras del propio libro.

- **Usuario:** un residente de neurología, uso personal.
- **Problema:** leer Brazis no basta para retener el razonamiento signo → lesión; falta práctica activa y repaso espaciado.
- **Objetivo del MVP:** dominar un capítulo piloto de punta a punta y validar que el formato de pregunta realmente enseña.
- **Meta a largo plazo:** cubrir todo el libro y sumar otros libros de neurología.

## Decisiones confirmadas

| Tema | Decisión |
| --- | --- |
| Herramienta | Google Antigravity, con reglas en `AGENTS.md` en la raíz del proyecto |
| Idioma del contenido y la interfaz | Inglés, con la terminología de Brazis |
| Idioma de los mensajes del agente | Español |
| Tipo de pregunta | Viñeta clínica de opción múltiple, estilo board |
| Stack | React + Vite + TypeScript + Tailwind, PWA con vite-plugin-pwa |
| Repaso espaciado | Librería ts-fsrs (algoritmo FSRS) |
| Extracción del PDF | Python con PyMuPDF |
| Diseño | Mobile-first, una mano, modo oscuro por defecto, zoom en figuras |

## Alcance del MVP

El MVP es un solo capítulo de Brazis, completo y funcionando, con 15 a 20 preguntas revisadas por ti.

| Entra en el MVP | Queda fuera (por ahora) |
| --- | --- |
| 1 capítulo piloto de Brazis | Resto de los capítulos y otros libros |
| Viñetas clínicas de opción múltiple | Chat con el libro y casos abiertos |
| Explicación con figura del libro | Cuentas de usuario y sincronización |
| Progreso por capítulo y aciertos | Estadísticas avanzadas |
| Repaso espaciado simple de las falladas | Publicación en tiendas de apps |
| PWA instalable, funciona sin internet | Compartir con otras personas |

## Formato de las preguntas y calidad

Cada pregunta es una viñeta clínica breve con 4 o 5 opciones y una sola respuesta correcta, pensada para entrenar el razonamiento de signos a localización.

**Campos de cada pregunta:**

- Viñeta clínica (2 a 4 líneas) y la pregunta.
- Opciones, con distractores que son localizaciones vecinas y confundibles.
- Respuesta correcta.
- Explicación en tres partes: por qué es correcta, por qué falla cada distractor, y la idea clave.
- Figura asociada del libro, cuando exista.
- Fuente: capítulo, sección y página de Brazis.

**Criterios de calidad (checklist de revisión):**

- [ ] La respuesta está respaldada literalmente por el texto del libro.
- [ ] Hay una sola respuesta defendible.
- [ ] Los distractores son plausibles, no obviamente falsos.
- [ ] La viñeta no revela la respuesta en la pregunta.
- [ ] La explicación enseña el porqué, no solo el dato.
- [ ] La figura corresponde a lo que se explica.

Tú eres el control de calidad: cada pregunta pasa por estados de *borrador*, *aprobada* o *descartada*, y solo las aprobadas aparecen en la app.

## Flujo de la app y funciones

La sesión de estudio sigue seis pasos y toda la lógica corre en el dispositivo.

1. **Inicio:** lista de capítulos con el porcentaje dominado de cada uno.
2. **Elegir modo:** preguntas nuevas del capítulo, o repaso de las falladas.
3. **Pregunta:** viñeta clínica y opciones; sin límite de tiempo.
4. **Respuesta:** se marca correcta o incorrecta de inmediato.
5. **Explicación:** razonamiento, análisis de distractores, figura del libro y referencia de página.
6. **Registro:** la app guarda el resultado y programa cuándo volver a mostrar esa pregunta.

**Funciones del MVP:**

- Zoom en las figuras (indispensable en el móvil).
- Repaso espaciado simple: una pregunta fallada vuelve en 1 día, luego 3, luego 7; acertada se espacia más.
- Botón *reportar pregunta mala* para marcar errores y corregirlos después.
- Progreso guardado en el dispositivo, con opción de exportar e importar el respaldo.

## Arquitectura técnica

Una web app estática que lee un archivo de preguntas y guarda tu progreso en el propio dispositivo, sin servidor ni base de datos externa.

| Componente | Decisión | Motivo |
| --- | --- | --- |
| Framework | React + Vite | Estándar; facilita migrar luego a app con Capacitor |
| Lenguaje | TypeScript | Detecta errores en los datos de las preguntas |
| Formato PWA | Service worker + manifest | Instalable y con modo sin conexión |
| Preguntas | Archivo JSON por capítulo | Revisable a mano y versionable |
| Figuras | Imágenes extraídas del PDF, en una carpeta del proyecto | Se muestran junto a la explicación |
| Progreso | IndexedDB / localStorage | Todo queda en tu dispositivo |
| Alojamiento | Local al inicio; después Netlify o Vercel privado | El contenido de Brazis tiene derechos de autor |

**Ejemplo de la estructura de una pregunta (JSON):**

```json
{
  "id": "cap05-012",
  "capitulo": "Tronco encefálico",
  "pagina": 123,
  "vineta": "Paciente con ...",
  "opciones": ["A ...", "B ...", "C ...", "D ..."],
  "correcta": 2,
  "explicacion": {
    "porque_correcta": "...",
    "distractores": ["...", "...", "..."],
    "idea_clave": "..."
  },
  "figura": "img/cap05-fig03.png",
  "estado": "aprobada"
}
```

## Pipeline de contenido: del PDF a las preguntas

El PDF se convierte en datos estructurados una sola vez, y las preguntas se generan por capítulo y se aprueban a mano antes de llegar a la app.

1. **Extraer el texto** del capítulo piloto, conservando capítulo, sección y número de página.
2. **Extraer las figuras** con su pie de figura y la página donde aparecen.
3. **Estructurar el capítulo:** lista de síndromes, signos, estructuras y su localización.
4. **Generar preguntas** con IA, 3 a 5 por sección, siguiendo el esquema JSON y citando la página fuente.
5. **Revisar a mano:** aprobar, editar o descartar cada pregunta con el checklist de calidad.
6. **Cargar en la app** solo las aprobadas y probar el capítulo completo.

**Regla clave:** la IA solo puede escribir preguntas respaldadas por el texto del capítulo; si algo no está en el libro, no se pregunta. Las preguntas generadas se guardan aparte de las aprobadas.

## Plan de trabajo por fases

Se avanza en cuatro fases, y cada una termina con algo que puedes probar antes de pasar a la siguiente.

| Fase | Entregable | Termina cuando |
| --- | --- | --- |
| 0. Preparación | Elegir capítulo piloto y verificar el PDF | Tienes capítulo y PDF listos en una carpeta |
| 1. Contenido | Texto y figuras extraídos; 15 a 20 preguntas generadas | Revisaste y aprobaste las preguntas |
| 2. App | PWA funcionando en tu compu con el capítulo piloto | Puedes responder, ver explicación con figura y repasar falladas |
| 3. Prueba real | Usarla en tu móvil durante una semana | Decides si el formato sirve y qué ajustar |

**Capítulo piloto:** pendiente de elegir. Conviene uno corto y visual, como nervios oculomotores o tronco encefálico, porque las figuras aportan mucho.

Si la fase 3 resulta bien, se repite el proceso 1 y 2 con los demás capítulos.

## Criterios de éxito, riesgos y futuro

El MVP funciona si, después de una semana de uso, quieres seguir con el siguiente capítulo.

**Criterios de éxito:**

- Apruebas al menos 15 preguntas del capítulo piloto sin reescribirlas por completo.
- La app se instala en tu móvil y funciona sin internet.
- Las explicaciones con figura te ayudan de verdad a entender la localización.
- Sientes que repasar las falladas te sirve más que releer el libro.

| Riesgo | Mitigación |
| --- | --- |
| La IA inventa datos o se equivoca clínicamente | Cada pregunta cita su página y tú la revisas |
| Las figuras se extraen mal del PDF | Probar con el capítulo piloto y recortar a mano si hace falta |
| Preguntas con distractores débiles | Checklist de calidad y botón de reportar |
| Derechos de autor si se comparte | Uso personal; alojamiento privado |
| Perder tu progreso | Exportar e importar respaldo |

**Hoja de ruta posterior:** más capítulos de Brazis, casos clínicos abiertos, chat que responde sobre el libro con cita de página, otros libros de neurología y empaquetado como app con Capacitor.

## Arranque en Antigravity y prompts por fase

Las reglas permanentes viven en `AGENTS.md`; los prompts de cada fase son cortos porque el agente ya sabe stack, idioma, esquema y estilo.

**Preparación (una sola vez):**

1. Instala Antigravity, Git, Node.js (versión LTS) y Python 3.
2. Crea una carpeta llamada `brazis-trainer` y ábrela en Antigravity.
3. Copia `AGENTS.md` en la raíz de esa carpeta.
4. Crea la carpeta `source` y pon ahí el PDF de Brazis.
5. Pega los prompts en orden, uno por fase, y no avances sin revisar el resultado.

**Prompt 0: preparación del proyecto**

```markdown
Lee AGENTS.md y síguelo. Ejecuta solo la Fase 0: inicializa git, crea la estructura de carpetas, el .gitignore y un README breve. Verifica que el PDF en /source tiene texto seleccionable y muéstrame la tabla de contenidos del libro con el rango de páginas de cada capítulo. Detente y resume en español.
```

**Prompt 1: contenido del capítulo piloto**

```markdown
Ejecuta la Fase 1 de AGENTS.md con el capítulo [CAPÍTULO].
Paso A: con un script en /scripts, extrae el texto del capítulo a /content/extracted con número de página por fragmento, y las figuras a /figures con su pie y página en figures.json. Muéstrame cuántas secciones y figuras encontraste, y cualquier problema. Detente.
Paso B (tras mi confirmación): genera de 3 a 5 preguntas por sección en /content/drafts, siguiendo exactamente el esquema y las reglas de calidad de AGENTS.md. Valida el esquema con el script. Lista primero las de baja confianza. Detente.
```

**Prompt 2: construir la app**

```markdown
Ejecuta la Fase 2 de AGENTS.md. Construye la PWA en /app que lea solo /content/approved y las figuras.
Pantallas: 1) inicio con capítulos y porcentaje de dominio; 2) selector de modo (preguntas nuevas o repaso pendiente); 3) pregunta; 4) explicación con figura ampliable y página; 5) ajustes con modo oscuro/claro, exportar e importar progreso, y exportar reportes de preguntas.
Usa ts-fsrs para programar repasos e IndexedDB para guardar el progreso. Sigue las guías de diseño de AGENTS.md.
Trabaja pantalla por pantalla, con commit en cada una. Al terminar, dime cómo correrla en mi compu y cómo probarla en vista móvil. Detente.
```

**Prompt 3: usarla en el móvil**

```markdown
Ejecuta la Fase 3 de AGENTS.md. Guíame paso a paso para desplegar la app de forma privada en Netlify o Vercel con protección por contraseña, sin publicar el repositorio. Luego explícame cómo instalarla en mi teléfono como PWA y verificar que funciona sin internet.
```
