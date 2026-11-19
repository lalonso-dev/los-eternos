# Paleta "Grafito & Oro" - Los Eternos

Sacada de la portada oficial del grupo: chaquetas de cuero grafito, humo gris
de ambiente industrial y letras doradas. Sin rojos ni vino: el único color de
acento es el oro del logo.

Los tokens viven en `src/styles/global.css` (bloque `@theme`).

## Fondos y superficies

| Token | HEX | Uso |
|---|---|---|
| `negro` | `#0b0b0c` | Fondo base de la página |
| `carbon` | `#151517` | Secciones alternas (`.band`), gradiente de tarjetas |
| `grafito` | `#1a1a1d` | Tarjetas, paneles del admin |
| `acero` | `#2a2a2f` | Bordes neutros, estados hover |

## Texto

| Token | HEX | Uso |
|---|---|---|
| `cream` | `#f1ede4` | Títulos y texto principal |
| `body-text` | `#c4c2bc` | Párrafos |
| `humo` / `muted` | `#9a9ca1` | Subtítulos, texto secundario |

## Oro (acento único)

| Token | HEX | Uso |
|---|---|---|
| `dorado` | `#c9a24d` | Eyebrows, bordes, íconos, enlaces |
| `dorado-claro` | `#f0d78f` | Brillo del degradado, hover de texto |
| `dorado-oscuro` | `#8c6a24` | Sombra del degradado |

Degradado metálico (botones principales, `.text-oro`):
`linear-gradient(180deg, dorado-claro, dorado 55%, dorado-oscuro)`

## Clases reutilizables (`global.css`)

- `.band`: banda alterna carbón con resplandor dorado tenue y filos finos.
- `.eyebrow` + `.section-title` + `.orn`: encabezado de sección (ver `SectionHeader.astro`).
- `.card`: tarjeta de grafito con filo dorado superior; en `<a>` se eleva al hover.
- `.icon-ring`: aro dorado sobre negro; en hover toma `--brand` (color de la red/plataforma).
- `.btn-gold` / `.btn-ghost`: botón principal y secundario.

## Tipografía

- Títulos: **Cinzel** (romana clásica, hermana de las letras del logo).
- Cuerpo: **Manrope**.

## Reglas

- Usar oro solo para destacar; no mezclarlo con otros acentos.
- Los colores de marca (Spotify verde, Instagram, etc.) aparecen únicamente al hacer hover sobre su ícono.
- Evitar rojos, vinos y tonos saturados fuera de la paleta.
- Mantener texto claro sobre fondos oscuros.
