import { contacts } from "../data/contacts";

export interface BannerData {
  fecha: string; // YYYY-MM-DD, vacio si aun no se elige
  lugar: string;
}

const SIZE = 1080;
const AMARILLO = "#ffe600";
const CREMA = "#f5efe9";

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const scale = Math.max(SIZE / img.width, SIZE / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
}

// Baja el tamano de fuente hasta que el texto quepa en maxWidth.
function fit(ctx: CanvasRenderingContext2D, text: string, family: string, start: number, maxWidth: number) {
  let px = start;
  ctx.font = `${px}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && px > 24) {
    px -= 2;
    ctx.font = `${px}px ${family}`;
  }
  return px;
}

function partes(fecha: string) {
  if (!fecha) return { dia: "00", mes: "MES" };
  const d = new Date(`${fecha}T12:00:00`);
  return {
    dia: String(d.getDate()).padStart(2, "0"),
    mes: d.toLocaleDateString("es-MX", { month: "long" }).toUpperCase(),
  };
}

// Dibuja el banner (1080x1080) sobre /assets/banner/base.jpg (foto SIN texto ni logo).
// Fecha y lugar al centro, y abajo el logo a la izquierda con contrataciones a la derecha.
export async function drawBanner(canvas: HTMLCanvasElement, data: BannerData) {
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  await Promise.all([document.fonts.load("100px Anton"), document.fonts.load("600 30px Manrope")]);

  const [base, logo] = await Promise.all([loadImage("/assets/banner/base.jpg"), loadImage("/assets/banner/logo.png")]);
  // Sin la foto o el logo el banner saldria incompleto: mejor fallar que subir uno mal hecho.
  if (!base || !logo) throw new Error("No cargaron la foto base o el logo del banner");
  drawCover(ctx, base);

  // Franja oscura abajo para que fecha, logo y telefonos siempre se lean.
  const franja = 700;
  const shade = ctx.createLinearGradient(0, franja, 0, franja + 150);
  shade.addColorStop(0, "rgba(10,10,10,0)");
  shade.addColorStop(1, "rgba(10,10,10,0.92)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, franja, SIZE, 150);
  ctx.fillStyle = "rgba(10,10,10,0.92)";
  ctx.fillRect(0, franja + 150, SIZE, SIZE - franja - 150);

  // Bloque: numero del dia + mes (arriba) y lugar (abajo), centrado.
  const { dia, mes } = partes(data.fecha);
  const lugar = (data.lugar || "LUGAR DEL EVENTO").toUpperCase();
  const baseline = 880;
  const gap = 30;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  ctx.font = "230px Anton";
  const wDia = ctx.measureText(dia).width;
  const maxTexto = SIZE - 100 - wDia - gap;

  fit(ctx, lugar, "Anton", 104, maxTexto);
  const wLugar = ctx.measureText(lugar).width;
  const altoLugar = ctx.measureText(lugar).actualBoundingBoxAscent;
  fit(ctx, mes, "Anton", 96, maxTexto);
  const wMes = ctx.measureText(mes).width;

  const x0 = (SIZE - (wDia + gap + Math.max(wLugar, wMes))) / 2;
  const xTexto = x0 + wDia + gap;

  ctx.fillStyle = AMARILLO;
  ctx.font = "230px Anton";
  ctx.fillText(dia, x0, baseline);

  fit(ctx, lugar, "Anton", 104, maxTexto);
  ctx.fillText(lugar, xTexto, baseline);

  ctx.fillStyle = CREMA;
  fit(ctx, mes, "Anton", 96, maxTexto);
  ctx.fillText(mes, xTexto, baseline - altoLugar - 16);

  // Pie: logo a la izquierda, contrataciones a la derecha.
  const pieY = 945;
  const hLogo = 110;
  ctx.drawImage(logo, 50, pieY, (logo.width / logo.height) * hLogo, hLogo);

  ctx.textAlign = "center";
  ctx.fillStyle = CREMA;
  const cx = 700;
  ctx.font = "600 22px Manrope";
  ctx.letterSpacing = "7px";
  ctx.fillText("CONTRATACIONES", cx, pieY + 38);
  ctx.letterSpacing = "1px";
  ctx.font = "700 25px Manrope";
  const tel = contacts.map((c) => c.phone.replace(/^52/, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")).join("  //  ");
  ctx.fillText(tel, cx, pieY + 82);
  ctx.letterSpacing = "0px";
}

export function bannerBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("No se pudo generar el banner"))), "image/jpeg", 0.88),
  );
}
