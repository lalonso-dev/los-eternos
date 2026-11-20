// Genera public/og-image.jpg (1200x630) para Open Graph / Twitter / WhatsApp.
// Usa la misma foto base y el mismo logo que el generador de banners de eventos.
// Uso: npm run og
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const PANEL = 600; // ancho del panel de texto (izquierda)

const NEGRO = "#0b0b0c";
const ORO = "#c9a24d";
const CREMA = "#f1ede4";

// Foto cuadrada a la derecha, a toda la altura.
const foto = await sharp(join(root, "public/assets/banner/base.jpg"))
  .resize(H, H, { fit: "cover" })
  .toBuffer();

const logoW = 380;
const logo = await sharp(join(root, "public/assets/banner/logo.png")).resize({ width: logoW }).toBuffer();
const logoH = (await sharp(logo).metadata()).height;

const cx = 60 + logoW / 2; // texto centrado bajo el logo
const overlay = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="${PANEL - 40}" x2="${PANEL + 230}" y1="0" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NEGRO}" stop-opacity="1"/>
      <stop offset="1" stop-color="${NEGRO}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" x2="0" y1="${H - 140}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${NEGRO}" stop-opacity="0"/>
      <stop offset="1" stop-color="${NEGRO}" stop-opacity="0.75"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${PANEL + 230}" height="${H}" fill="url(#fade)"/>
  <rect x="0" y="0" width="${PANEL - 40}" height="${H}" fill="${NEGRO}"/>
  <rect x="${PANEL}" y="0" width="${W - PANEL}" height="${H}" fill="url(#bottom)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="none" stroke="${ORO}" stroke-opacity="0.35" stroke-width="2"/>
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle">
    <text x="${cx}" y="${70 + logoH + 62}" font-size="36" font-weight="bold" letter-spacing="6" fill="${CREMA}">GRUPO NORTEÑO</text>
    <text x="${cx}" y="${70 + logoH + 104}" font-size="25" letter-spacing="3" fill="${ORO}">Morelia, Michoacán</text>
  </g>
  <g font-family="'Helvetica Neue', Arial, sans-serif" text-anchor="middle">
    <text x="${cx}" y="${H - 44}" font-size="17" font-weight="bold" letter-spacing="4" fill="${CREMA}" fill-opacity="0.75">BODAS · FIESTAS · EVENTOS</text>
  </g>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: NEGRO } })
  .composite([
    { input: foto, left: W - H, top: 0 },
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 60, top: 70 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(join(root, "public/og-image.jpg"));

console.log("OK public/og-image.jpg");
