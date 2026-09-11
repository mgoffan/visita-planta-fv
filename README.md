# Visita industrial · Planta FV

Sitio estático e interactivo para recorrer la planta de Villa Rosa sobre un mapa de OpenStreetMap.

## Contenido actual

- 28 fotografías optimizadas para web.
- 9 paradas temáticas.
- Contornos de 46 edificios obtenidos de OpenStreetMap bajo licencia ODbL.
- Recorrido guiado y navegación libre por el mapa.

## Importante sobre las ubicaciones

Las imágenes compartidas por WhatsApp no contienen coordenadas GPS. Las ubicaciones actuales se asignaron de manera orientativa según lo visible en cada foto y los nombres de las naves en OpenStreetMap. Deben validarse antes de considerarlas definitivas.

Las paradas y coordenadas se editan en `app/tour-data.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

## Publicación

Cada push a `main` genera el sitio y lo publica mediante GitHub Pages.
