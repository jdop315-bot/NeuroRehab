# Cambios de estabilización — NeuroRehab

Fecha: 2026-09-18  
Alcance: corrección de errores críticos y de navegación; no se crearon escalas ni enfermedades nuevas.

| Archivo | Problema | Solución | Prueba realizada | Resultado |
|---|---|---|---|---|
| `berg.html` | Dos tareas compartían el identificador 9 y faltaban identificadores oficiales en el evaluador. | Se corrigieron los identificadores y rótulos numéricos para los 14 ítems existentes. | Conteo estático por `data-item`. | 14 identificadores únicos; cinco opciones por ítem. |
| `script.js` | BBS no comunicaba todos los estados accesibles y el archivo contenía mensajes de depuración. | Se ordenan los ítems BBS por identificador, se actualizan `aria-valuenow` y `aria-pressed`, y se eliminaron los `console.log` de prueba. | Comprobación de sintaxis con Node.js y revisión de los selectores. | Sintaxis válida; contrato `bbs*` consistente. |
| `10mwt.html` | Dos `div` del formulario quedaban abiertos. | Se cerraron los contenedores de ayuda técnica e intento 2. | Balance estático de etiquetas `div`. | Estructura balanceada. |
| `actividad-funcion.html` | Cargaba el script global dos veces, referenciaba un JS inexistente y usaba una variante de navbar incompatible. | Se dejó una sola carga de `script.js` y se aplicó la estructura de navbar global. | Escaneo de recursos y comparación del dropdown. | Sin recurso inexistente; menú coherente. |
| `6mwt.html` | Listener móvil de respaldo duplicaba la responsabilidad del menú global. | Se eliminó el fallback inline. | Revisión de scripts cargados y de la lógica global. | Un solo controlador móvil. |
| `acv.html` | La tabla de escalas no enlazaba los instrumentos ni incluía todos los existentes. | Se añadieron enlaces a las herramientas existentes y filas para las escalas omitidas. | Verificación de destinos locales. | Nueve enlaces de escala válidos. |
| `index.html`, `acv.html`, `ashworth.html`, `berg.html`, `fugl-meyer.html`, `tug.html`, `10mwt.html`, `6mwt.html`, `functional-reach.html`, `motricity-index.html`, `barthel.html` | El dropdown de Evaluación no tenía el mismo inventario en todas las páginas. | Se integraron Barthel y Actividad y función donde faltaban. | Comparación automática de cada dropdown. | Diez rutas presentes en todos los dropdowns. |
| `index.html`, `tug.html`, `estilos.css` | Había enlaces publicados sin destino real. | Se sustituyeron por estados no interactivos y se añadieron estilos mínimos para conservar la apariencia. | Búsqueda global de `href="#"`. | No quedan placeholders navegables. |

## Pruebas pendientes de ejecución manual

1. Abrir las páginas en un navegador local y confirmar consola sin errores.
2. Completar los 14 ítems de Berg, comprobar total 0–56, progreso y reinicio.
3. Probar menú de escritorio/móvil y dropdown por teclado en 700 px y 650 px.
4. Ejecutar los casos de borde de cada calculadora antes de una publicación o uso docente/clínico.
5. Revisar referencias, protocolos y puntos de interpretación con las fuentes indicadas en la auditoría.
