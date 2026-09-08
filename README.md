# I.E.S. Al-Ándalus · Comunidades de Aprendizaje

Web de la Comunidad de Aprendizaje del **IES Al-Ándalus** (Almería).
Página única con dos partes: la bienvenida para quien llega nuevo y el Plan de Actuación del curso 2026-2027.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo llamado **`cda-alandalus`** y sube estos archivos a la rama `main`.
2. En el repositorio: **Settings → Pages**.
3. En *Source*, elige **Deploy from a branch**; rama `main`, carpeta `/ (root)`. Guarda.
4. En un par de minutos la web estará en `https://<usuario>.github.io/cda-alandalus/`.

> Si le pones otro nombre al repositorio, cambia la dirección en tres sitios:
> las etiquetas `canonical` y `og:` de `index.html`, `robots.txt` y `sitemap.xml`.

## Actualizar el contenido

Todo el contenido vive en el bloque `const CDA = { … }` dentro de `index.html`.
Está comentado en español y las partes que hay que rellenar a mano llevan la marca ✏️.

| Qué cambiar | Dónde |
|---|---|
| Sueños, estados y comisiones | `CDA.comisiones` |
| Bloques y responsables | `CDA.bloques` |
| Calendario del curso | `CDA.trimestres` |
| Datos de coordinación | `CDA.coordinacion` ✏️ |
| Baremos y rúbricas | `CDA.baremos` |

Las imágenes van en `assets/`. Si sustituyes alguna, mantén el mismo nombre de archivo.

## Archivos

```
index.html    la web entera: estructura, estilos, datos y JavaScript
assets/       baremos, rúbricas, imagen del equipo, favicon y portada social
robots.txt    indexación abierta
sitemap.xml   una sola URL
.nojekyll     evita que GitHub procese la web con Jekyll
```
