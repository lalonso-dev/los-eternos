# 🎨 Paleta de Colores Oficial - Los Eternos

Esta paleta fue extraída directamente de la imagen oficial del grupo y aplicada a toda la landing page.

## Colores Principales

### 🔴 Rojo Profundo (Fondo Principal)
- **HEX:** `#570d1c`
- **RGB:** `rgb(87, 13, 28)`
- **Uso:** Fondo principal, degradados, overlay del video

### 🍷 Borgoña/Vino (Chaquetas)
- **HEX:** `#79343d`
- **RGB:** `rgb(121, 52, 61)`
- **Uso:** Degradados secundarios, botones hover, acentos

### 🟡 Dorado Clásico
- **HEX:** `#d4af37`
- **RGB:** `rgb(212, 175, 55)`
- **Uso:** Títulos, bordes, íconos destacados, pagination, logo border

### ⚫ Negro Profundo
- **HEX:** `#0a0a0a`
- **RGB:** `rgb(10, 10, 10)`
- **Uso:** Fondo base, sombras profundas, texto oscuro

### ⚪ Blanco Puro
- **HEX:** `#ffffff`
- **RGB:** `rgb(255, 255, 255)`
- **Uso:** Texto principal, íconos claros

## Degradados Aplicados

### Overlay de Video
```css
background: linear-gradient(135deg, rgba(87, 13, 28, 0.75), rgba(10, 10, 10, 0.9));
```

### Logo
```css
background: linear-gradient(135deg, #570d1c, #79343d);
border: 4px solid #d4af37;
```

### Botones Sociales
```css
/* Estado Normal */
background: rgba(87, 13, 28, 0.3);
border: 2px solid rgba(212, 175, 55, 0.4);

/* Hover */
background: rgba(121, 52, 61, 0.5);
border-color: #d4af37;
box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
```

## Colores por Sección

### Slide 1 - Bienvenida
- Logo: Imagen real con borde dorado (#d4af37)
- Título "LOS ETERNOS": Dorado (#d4af37)
- Subtítulo: Blanco (#ffffff)

### Slides 2-4 - Contenido
- Títulos H2: Blanco (#ffffff)
- Texto descriptivo: Gris claro (#DDD)
- Botones: Fondo borgoña translúcido con borde dorado

### Elementos Interactivos
- Pagination dots: Dorado (#d4af37)
- Scroll indicator: Dorado (#d4af37)
- Loading screen: Dorado (#d4af37)

## Transparencias y Efectos

### Glassmorphism (Botones)
```css
background: rgba(87, 13, 28, 0.3);
backdrop-filter: blur(10px);
```

### Sombras
```css
/* Logo */
box-shadow: 0 10px 40px rgba(87, 13, 28, 0.6);

/* Botones hover */
box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);

/* Texto */
text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
```

## Iconos de Redes Sociales (Colores Propios)

Estos mantienen sus colores de marca originales:

- 🔴 YouTube: `#FF0000`
- 🎵 YouTube Music: `#FF0000`
- 🟢 Spotify: `#1DB954`
- 🟣 Instagram: `#E4405F`
- 🔵 Facebook: `#1877F2`
- 🔷 TikTok: `#00F2EA`
- 🟢 WhatsApp: `#25D366`

## Guía de Uso

### ✅ Hacer:
- Usar el dorado (#d4af37) para elementos que necesiten destacar
- Combinar el rojo profundo con negro para fondos
- Mantener el texto blanco o gris claro sobre fondos oscuros
- Usar borgoña para estados hover y secundarios

### ❌ Evitar:
- Usar amarillo brillante (#FFD700) en lugar del dorado (#d4af37)
- Colores neón o muy saturados que no están en la paleta
- Texto oscuro sobre fondos oscuros
- Eliminar las transparencias en los botones

## Paleta Completa en CSS

```css
:root {
    --color-rojo-profundo: #570d1c;
    --color-borgona: #79343d;
    --color-dorado: #d4af37;
    --color-negro: #0a0a0a;
    --color-blanco: #ffffff;
    --color-gris-claro: #dddddd;
}
```

---

Esta paleta garantiza consistencia visual con la marca oficial de **Los Eternos** 🎵
