# Auditoría integral de NeuroRehab

Fecha: 2026-09-18  
Alcance: inventario estático, dependencias, navegación, enlaces, formularios, calculadoras, CSS y JavaScript. Esta auditoría no modifica código funcional.

## Resumen ejecutivo

NeuroRehab es un sitio estático en HTML, CSS y JavaScript vanilla. Cuenta con 13 páginas HTML, dos hojas CSS y un script global. La evolución reciente añadió calculadoras clínicas, pero el proyecto tiene deuda técnica considerable: `script.js` concentra varias herramientas no relacionadas, hay código antiguo de Ashworth y Berg que no corresponde con el HTML actual, y existe una página que referencia un script inexistente.

### Hallazgos críticos

1. **Crítico — recurso inexistente y carga duplicada:** `actividad-funcion.html` referencia `actividad-funcion.js`, que no existe, y carga `script.js` dos veces.
2. **Crítico — calculadora Berg desconectada:** el HTML usa la familia `bbs*` (`#bbsTotal`, `#bbsItems`, `#bbsReset`), mientras que el bloque global de JavaScript busca `#bergEvaluator`, `#bergTotal`, `#bergReset` y otros IDs que no existen. La calculadora BBS no puede inicializarse con ese bloque.
3. **Alto — estructura HTML desbalanceada:** `10mwt.html` contiene 51 aperturas de `<div>` y 49 cierres. El bloque del formulario deja abiertos contenedores de ayuda técnica/intento 2, lo que puede alterar el DOM y los estilos posteriores.
4. **Alto — enlaces provisionales publicados:** hay cinco enlaces `href="#"` en `index.html` y tres referencias `href="#"` en `tug.html`.

## 1. Inventario de archivos

| Archivo | Tipo | Función | Dependencias | Estado | Observaciones |
|---|---|---|---|---|---|
| `index.html` | HTML | Portada y secciones institucionales | `estilos.css`, `script.js` | Medio | Cinco tarjetas enlazan a `#`; no usa `<main>`. |
| `acv.html` | HTML | Página de ACV y acceso temático a escalas | `estilos.css`, `script.js` | Medio | Navegación y escalas presentes; requiere revisión clínica posterior. |
| `evaluacion.html` | HTML | Catálogo y buscador de instrumentos | `estilos.css`, `script.js` | Funcional | Tiene tarjetas para Barthel y Actividad y función. |
| `fugl-meyer.html` | HTML | Ficha y calculadoras FMA UE/LE | `estilos.css`, `script.js` | Alto | Calculadoras dinámicas concentradas en el script global. |
| `berg.html` | HTML | Ficha y evaluador BBS | `estilos.css`, `script.js` | Crítico | IDs `bbs*` no corresponden con el bloque `berg*` de `script.js`. |
| `tug.html` | HTML | Ficha y calculadora TUG | `estilos.css`, `script.js` | Medio | Calculadora global; tres referencias con `href="#"`. |
| `10mwt.html` | HTML | Ficha y calculadora 10MWT | `estilos.css`, `script.js` | Alto | Calculadora existe; estructura de `div` desbalanceada. |
| `6mwt.html` | HTML | Ficha y herramienta 6MWT con temporizador | `estilos.css`, `script.js`, script inline | Medio | Lógica específica inline; menú móvil de respaldo duplica responsabilidad. |
| `ashworth.html` | HTML | Ficha y registro MAS | `estilos.css`, `script.js` | Medio | Bloque moderno `mas*` coexiste con código antiguo `ashworth*` no usado. |
| `functional-reach.html` | HTML | Ficha y calculadora FRT | `estilos.css`, `script.js` | Medio | Calculadora global con resultados dinámicos. |
| `motricity-index.html` | HTML | Ficha y calculadora Motricity Index | `estilos.css`, `script.js` | Medio | Calculadora global; requiere validación clínica independiente. |
| `barthel.html` | HTML | Ficha y calculadora Barthel | `estilos.css`, `script.js` | Medio | Genera ítems y resultado mediante JavaScript global. |
| `actividad-funcion.html` | HTML | Contenido sobre actividad y función | `estilos.css`, `actividad-funcion.css`, `script.js`, `actividad-funcion.js` | Crítico | `actividad-funcion.js` no existe y `script.js` se carga dos veces. |
| `estilos.css` | CSS | Sistema global de estilos y estilos de calculadoras | Todas las páginas | Medio | Archivo muy grande y acumulativo; reglas/reponsividad repetidas. |
| `actividad-funcion.css` | CSS | Estilos específicos de Actividad y función | `actividad-funcion.html` | Medio | Debe mantenerse aislado hasta revisar solapamientos con CSS global. |
| `script.js` | JavaScript | Buscador, menú y todas las calculadoras | Todas las páginas | Alto | ~153 KB; múltiples dominios, código legado y responsabilidades mezcladas. |

No se encontraron carpetas ni recursos locales de imágenes, fuentes, datos, dependencias, framework o build. Tampoco existe actualmente `actividad-funcion.js`.

## 2. Matriz de enlaces y navegación

Los enlaces internos a archivos `.html` existentes resuelven a páginas presentes. Los enlaces con fragmentos de `index.html` son válidos a nivel de archivo y deben verificarse visualmente después de cada cambio de estructura.

| Página de origen | Enlace | Página de destino | Estado | Acción requerida |
|---|---|---|---|---|
| Todas las fichas | Enlaces del menú a `index.html`, `acv.html`, `evaluacion.html` y escalas | Archivos existentes | Correcto | Mantener y centralizar la plantilla de navegación en una fase posterior. |
| `evaluacion.html` | Tarjetas de FMA, Berg, TUG, 10MWT, 6MWT, Ashworth, FRT, Motricity, Barthel y Actividad/función | Archivos existentes | Correcto | Probar en navegador tras corregir los fallos críticos. |
| `acv.html` | Enlaces a escalas | Archivos existentes | Correcto | Revisar orden y pertinencia clínica en fase 4. |
| `actividad-funcion.html` | `actividad-funcion.js` | Archivo inexistente | **Crítico** | Eliminar la referencia o crear un archivo justificado en la fase de JavaScript. |
| `index.html` | Cinco enlaces `#` | Sin destino real | Alto | Sustituir por páginas existentes, marcar como próximamente o retirar el enlace. |
| `tug.html` | Tres enlaces `#` con `target="_blank"` | Sin destino real | Alto | Sustituir por referencias verificadas o eliminar la apariencia de enlace. |
| Todas las páginas | `index.html#evidencia`, `#recursos`, `#blog` | Secciones de la portada | Correcto | Conservar mientras sean destinos intencionales. |

### Navegación

- El logo, `#menuToggle` y `#navMenu` aparecen en las páginas auditadas.
- `script.js` ofrece el comportamiento móvil y el desplegable de Evaluación cuando existen esos elementos.
- La navegación está repetida en los HTML; actualmente no hay componente compartido, por lo que una corrección exige propagación controlada.
- `actividad-funcion.html` usa una variante de estructura (`header.navbar`, `nav.nav-menu`, `nav-dropdown`) distinta de la plantilla predominante; debe alinearse después de resolver su carga de scripts.

## 3. Matriz de calculadoras y formularios

| Página | Calculadora o formulario | Funcionalidad esperada | Estado actual | Error encontrado | Prioridad | Acción recomendada |
|---|---|---|---|---|---|---|
| `evaluacion.html` | Buscador | Filtrar herramientas por texto/dominio | Funcional por revisión estática | Ninguno crítico; `instrumentResults` se declara y no se usa | Bajo | Mejorar anuncio accesible de resultados. |
| `10mwt.html` | 10MWT | Dos tiempos, velocidad, promedio, ayuda técnica y cambio | Parcialmente funcional | Estructura HTML de `div` desbalanceada | Alto | Corregir primero el marcado y luego ejecutar pruebas de cálculo. |
| `6mwt.html` | 6MWT | Temporizador, vueltas, distancia, pausa, impresión | Implementación inline extensa | Lógica fuera del módulo global y menú móvil duplicado | Medio | Extraer a módulo específico después de validar comportamiento clínico. |
| `barthel.html` | Barthel | Generar 10 ítems, total 0–100 e interpretación | Implementado en script global | Puntos de interpretación deben validarse con fuente/versionado | Medio | Revisar evidencia y separar lógica en módulo. |
| `berg.html` | BBS | Selección de 14 ítems, total 0–56, progreso y reinicio | No inicializable con el bloque `berg*` actual | HTML `bbs*` / JS `berg*` incompatibles | **Crítico** | Unificar un único contrato de IDs y retirar código alternativo. |
| `fugl-meyer.html` | FMA UE/LE | Ítems, subtotales, porcentaje, tiempo y reinicio | Implementado | Complejidad alta y dependiente de versión/protocolo | Alto | Auditoría clínica y pruebas por caso antes de tocar UI. |
| `tug.html` | TUG | Tiempos, promedio, ayuda, cambio e interpretación | Implementado | Interpretación automática requiere límites explícitamente contextualizados | Medio | Revisar texto, fuente y población de cada rango. |
| `ashworth.html` | MAS | Segmento, lado, puntuación y registro | Dos aproximaciones en el mismo script | Código antiguo `ashworth*` queda desconectado del HTML `mas*` | Medio | Retirar o aislar la implementación obsoleta tras pruebas. |
| `functional-reach.html` | FRT | Tres intentos, promedio, cambio e interpretación | Implementado | Puntos de corte deben contextualizarse | Medio | Validar protocolo, unidades y fuentes. |
| `motricity-index.html` | Motricity Index | Ítems de miembro superior/inferior, subtotal y resultado | Implementado | Necesita confirmar versión y reglas de suma | Alto | Revisar contra manual/fuente primaria antes de ajustar textos o cálculos. |
| `actividad-funcion.html` | Ninguno | Contenido y posibles interacciones específicas | Incompleto | Script específico inexistente | Alto | Definir si requiere JavaScript; no dejar referencia rota. |

## 4. Estado clínico y bibliográfico preliminar

Esta tabla describe el estado observado en el código. No certifica validez clínica; cualquier valor, interpretación o punto de corte debe contrastarse con fuente primaria, manual oficial o fuente institucional verificable antes de publicarlo como recomendación clínica.

| Escala | Constructo | Población / contexto observado | Puntaje observado | Estado de calculadora | Información clínica | Referencias | Necesidad de corrección |
|---|---|---|---|---|---|---|---|
| Fugl-Meyer | Función sensoriomotora | Principalmente ACV | Subtotales UE/LE | Implementada | Amplia; requiere confirmar versión | Hay enlaces externos | Alto: verificar reglas y máximos. |
| Berg Balance Scale | Equilibrio funcional | Personas con alteración del equilibrio | 0–56 esperado | Rota por IDs incompatibles | Amplia | Hay enlaces externos | **Crítico**: reparar contrato HTML/JS; después validar puntos de corte. |
| TUG | Movilidad funcional | Contexto neurológico/funcional | Tiempo en s | Implementada | Prudente, pero automatiza categorías | Referencias incompletas (`#`) | Alto: revisar interpretación y referencias. |
| 10MWT | Velocidad de marcha | Rehabilitación neurológica | Velocidad m/s | Implementada | Existe contenido de protocolo | Enlaces institucionales/PubMed observados | Alto: reparar HTML antes de validar cálculos. |
| 6MWT | Capacidad funcional de marcha | Neurorehabilitación | Distancia m | Implementada inline | Protocolo y registro extensos | Enlaces PubMed observados | Medio: verificar protocolo, temporizador y modularidad. |
| Modified Ashworth Scale | Resistencia al movimiento pasivo / tono | Evaluación clínica | 0, 1, 1+, 2, 3, 4 | Implementada como registro | Debe diferenciarse de una medida directa de espasticidad | Enlaces externos observados | Alto: depurar código duplicado y revisar mensajes clínicos. |
| Functional Reach Test | Alcance funcional / control postural | Personas con alteraciones del equilibrio | Distancia | Implementada | Requiere protocolo y unidades consistentes | Sin verificación bibliográfica en esta fase | Medio. |
| Motricity Index | Fuerza/función motora | Principalmente ACV | Subtotales/total | Implementada | Debe fijar versión y reglas exactas | Sin verificación bibliográfica en esta fase | Alto. |
| Barthel Index | Actividad básica de la vida diaria | Rehabilitación y dependencia funcional | 0–100 esperado | Implementada | Requiere confirmar versión/traducción | Enlaces externos observados | Medio. |

## 5. JavaScript

### Arquitectura actual

`script.js` contiene: buscador, menú móvil, 10MWT, Barthel, dos bloques de Ashworth, Berg, FMA de miembro superior e inferior, TUG, Motricity Index y Functional Reach. La página 6MWT mantiene un bloque inline propio de temporizador y cálculo.

### Hallazgos

- **Crítico:** `berg.html` no presenta los IDs requeridos por el bloque `berg*` de `script.js`; en cambio usa IDs `bbs*`.
- **Medio:** el código `ashworth*` busca IDs que no existen en el HTML actual. Está protegido por un retorno temprano, por lo que parece código muerto, pero aumenta complejidad y riesgo de regresión.
- **Alto:** `actividad-funcion.html` carga `script.js` con `defer` y de nuevo al final del `body`; esto puede duplicar listeners globales.
- **Medio:** 6MWT implementa funcionalidad en script inline, fuera de la estrategia global. Incluye además un menú móvil de respaldo que puede superponerse al menú global.
- **Medio:** el uso extendido de `innerHTML` exige preservar el escape de cualquier texto que pueda provenir de usuario. Ashworth incluye una función de escape, pero la práctica debe revisarse para todos los generadores dinámicos.

## 6. CSS y diseño responsive

- `estilos.css` concentra estilos globales y estilos específicos de muchas calculadoras. El archivo supera los 100 KB y presenta numerosos bloques responsive repetidos en 950, 900, 820, 800, 700, 650, 600, 560, 500, 420, 400 y 380 px.
- Hay reglas repetidas y acumuladas para `.article-blue`, `.search-tools`, tarjetas, formularios y breakpoints. Esto incrementa la posibilidad de que una corrección cambie una escala no relacionada.
- `actividad-funcion.css` es el único CSS específico y debe conservarse separado hasta identificar qué reglas realmente complementan al global.
- Los estilos particulares de BBS, Barthel, FMA, 6MWT, TUG, MAS, Motricity y FRT deben aislarse por prefijos de componente antes de cualquier refactorización global.

## 7. HTML, accesibilidad y consistencia

- Todas las páginas tienen un único `h1`; `index.html` es la excepción al no usar `<main>`.
- No se hallaron IDs duplicados por página.
- `10mwt.html` tiene estructura de `div` desbalanceada, que debe corregirse antes de pruebas visuales o de accesibilidad.
- Las calculadoras modernas usan en varios casos `aria-live`, regiones de resultados y labels; debe comprobarse cada formulario con teclado y lector de pantalla tras estabilizar el DOM.
- El menú de escritorio depende de hover; debe verificarse un patrón de foco/teclado para el desplegable de Evaluación.

## 8. Plan de corrección por fases

### Fase 1 — Errores críticos

1. Resolver `actividad-funcion.js` inexistente y la carga doble de `script.js`.
2. Reparar la incompatibilidad BBS (`bbs*` versus `berg*`) y probar los 14 ítems, total, progreso y reinicio.
3. Corregir el balance de etiquetas de `10mwt.html` y volver a validar el DOM.

### Fase 2 — Errores de navegación

1. Sustituir o desactivar enlaces `href="#"` de portada y TUG.
2. Homogeneizar la variante de navbar de Actividad y función.
3. Verificar breadcrumbs, orden de escalas y accesibilidad por teclado.

### Fase 3 — Errores de JavaScript

1. Separar responsabilidades por herramienta, empezando por el código obsoleto de Ashworth y la lógica BBS.
2. Definir un contrato único de IDs, inicialización condicional y eventos por calculadora.
3. Tras pruebas, decidir si 6MWT conserva script inline o migra a módulo específico.

### Fase 4 — Correcciones clínicas

1. Contrastar reglas, máximos, interpretación y versiones con artículos originales, manuales y fuentes institucionales verificables.
2. Documentar población, contexto, fuente y limitaciones de cada punto de corte.
3. No publicar categorías automáticas como diagnóstico o norma universal.

### Fase 5 — Mejoras visuales

1. Centralizar tokens de color, espaciado y tipografía.
2. Consolidar breakpoints sin mezclar reglas de escalas.
3. Probar 1440 px, 1024 px, 768 px, 700 px, 650 px y 375 px para evitar solapamientos y desplazamiento horizontal.

### Fase 6 — Nuevas escalas

No iniciar nuevas escalas hasta completar Fases 1–4 y las pruebas finales de las herramientas existentes.

### Fase 7 — Nuevas enfermedades neurológicas

No iniciar nuevas condiciones hasta completar Fases 1–4. Priorizar después contenidos vinculados a rutas ya visibles en la portada.

### Fase 8 — Pruebas finales

1. Pruebas funcionales de cada cálculo con vacío, cero, negativo, texto, decimal con punto/coma, reinicio y cambio longitudinal.
2. Pruebas de teclado, foco, lectura de mensajes y menú móvil.
3. Revisión visual responsive y verificación de enlaces internos/externos.
4. Revisión clínica y bibliográfica independiente antes de uso docente o clínico.

## Prioridad global

| Clasificación | Hallazgo | Archivos implicados |
|---|---|---|
| Crítico | Script inexistente y carga doble | `actividad-funcion.html`, posible futuro `actividad-funcion.js` |
| Crítico | BBS desconectada del JavaScript | `berg.html`, `script.js` |
| Alto | DOM desbalanceado 10MWT | `10mwt.html` |
| Alto | Enlaces placeholder | `index.html`, `tug.html` |
| Alto | Valores/reglas clínicas sin revisión documental final | Fichas de escalas y `script.js` |
| Medio | Script global monolítico y código legado | `script.js` |
| Medio | CSS acumulativo y breakpoints repetidos | `estilos.css`, `actividad-funcion.css` |
| Mejora futura | Plantilla o generación compartida de navegación | Todos los HTML |

## Actualización de estabilización — 2026-09-18

| Hallazgo auditado | Estado | Corrección o decisión |
|---|---|---|
| Recurso inexistente y carga doble en Actividad y función | **Corregido** | Se eliminó la referencia a `actividad-funcion.js` y la segunda carga de `script.js`. La página conserva una sola carga diferida del script global. |
| Contrato funcional de Berg Balance Scale | **Corregido** | Se verificó el bloque activo `bbs*` y se corrigieron sus identificadores para dejar 14 ítems únicos, con cinco opciones cada uno. Se añadió orden visual, actualización de `aria-valuenow` y de `aria-pressed`. El bloque legado `berg*` permanece inactivo y se considera deuda técnica no funcional. |
| Estructura de `10mwt.html` | **Corregido** | Se cerraron los dos contenedores faltantes del formulario; el balance de `div` es correcto. La variante que cronometra 6 m centrales se conserva como protocolo declarado, no como cambio clínico. |
| Enlaces provisionales en portada y TUG | **Corregido** | Los enlaces sin destino fueron sustituidos por estados no interactivos claramente marcados como pendientes. |
| Menú de Actividad y función | **Corregido** | Se alineó con la estructura global (`.nav-container`, `ul.nav-menu`, `.dropdown`) para que el menú móvil y el dropdown compartan la misma lógica. |
| Menú de Evaluación y enlaces de ACV | **Corregido** | Todas las páginas incluyen FMA, Berg, TUG, 10MWT, 6MWT, Ashworth, FRT, Motricity, Barthel y Actividad y función. La tabla de ACV enlaza las nueve escalas existentes. |
| Menú móvil duplicado de 6MWT | **Corregido** | Se retiró el listener de respaldo duplicado; permanece el comportamiento global de `script.js`. |
| Validación clínica, puntos de corte y referencias | **Pendiente** | Requiere revisión documental independiente antes de presentar interpretaciones como normas clínicas. |
| Refactorización del JavaScript legado y CSS acumulativo | **Mejora futura** | No se modifica en esta fase para evitar riesgo de regresión. |

### Verificaciones posteriores a la corrección

- Los trece HTML no contienen referencias a recursos locales inexistentes.
- No quedan enlaces `href="#"`.
- Cada dropdown de evaluación contiene las diez rutas disponibles.
- Berg Balance Scale tiene catorce identificadores de ítem únicos y cinco botones por identificador.
- `10mwt.html` tiene el mismo número de aperturas y cierres de `div`.
- No se detectaron IDs HTML duplicados en las páginas auditadas.
- `script.js` supera la comprobación de sintaxis con Node.js.
- La inspección visual y de consola en navegador local queda pendiente porque la política del navegador integrado bloquea URLs `file://`; debe realizarse manualmente antes de una publicación clínica.
