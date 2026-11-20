// Carrusel estilo "Material You" (multi-browse de Material Design 3):
// todas las tarjetas tienen la misma altura; la activa es grande, la siguiente
// mediana, la tercera chica y el resto queda plegado. El grupo visible siempre
// queda centrado. Implementación propia, sin librerías.
// Los estilos viven en global.css (.mu-on).

interface MuOptions {
  /** alto / ancho de la tarjeta grande (1 = cuadrada, 1.25 = vertical 4:5) */
  ratio?: number;
  /** igual que ratio, pero solo en móvil (si no se da, usa ratio) */
  ratioMobile?: number;
  dots?: HTMLElement | null;
  prev?: HTMLButtonElement | null;
  next?: HTMLButtonElement | null;
  /** si se da, el carrusel solo funciona mientras se cumpla (ej. solo en móvil) */
  mq?: string;
  /** se llama con el índice de la tarjeta activa cada vez que cambia (y al iniciar) */
  onChange?: (index: number) => void;
}

const GAP = 12;
const SWIPE_PX = 40;

export function initMuCarousel(track: HTMLElement, opts: MuOptions = {}) {
  const items = Array.from(track.children) as HTMLElement[];
  if (!items.length) return;

  const ratio = opts.ratio ?? 1;
  const mql = opts.mq ? matchMedia(opts.mq) : null;

  let enabled = false;
  let active = 0;
  let reported = -1;

  const dotEls: HTMLButtonElement[] = [];
  if (opts.dots && items.length > 1) {
    opts.dots.replaceChildren();
    items.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "reel-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `${i + 1} de ${items.length}`);
      dot.addEventListener("click", () => go(i));
      opts.dots!.append(dot);
      dotEls.push(dot);
    });
  }

  // Tamaños grande / mediana / chica según el ancho disponible.
  function sizes(W: number) {
    if (W < 640) {
      // El grupo se centra, así que reducir el ancho útil deja ~16px de margen a ambos lados.
      // Móvil: tarjeta grande + un asomo de la siguiente (sin tercera tarjeta) para que la grande sea más ancha.
      const usable = W - 32;
      const M = 30;
      return [usable - GAP - M, M, 0];
    }
    const L = Math.min(Math.round(W * 0.48), 500);
    return [L, Math.round(L * 0.6), Math.round(L * 0.3)];
  }

  function layout() {
    if (!enabled) return;
    const W = track.clientWidth;
    const [L, M, S] = sizes(W);
    const slots = [L, M, S];
    const r = W < 640 ? (opts.ratioMobile ?? ratio) : ratio;
    track.style.setProperty("--mu-h", `${Math.round(L * r)}px`);

    const widths = items.map((_, i) => {
      const d = i - active;
      return d >= 0 && d < 3 ? slots[d] : 0;
    });
    const lastVisible = widths.reduce((acc, w, i) => (w > 0 ? i : acc), 0);

    items.forEach((item, i) => {
      item.style.width = `${widths[i]}px`;
      item.style.marginRight = widths[i] > 0 && i < lastVisible ? `${GAP}px` : "0px";
      item.style.opacity = widths[i] === 0 ? "0" : i === active ? "1" : i === active + 1 ? "0.85" : "0.65";
      item.style.setProperty("--mu-l", `${L}px`);
      item.inert = widths[i] === 0;
      item.dataset.muActive = String(i === active);
      // Las tarjetas plegadas miden 0 px y el navegador no baja sus imágenes "lazy":
      // se precargan las que están por entrar para que no aparezcan en blanco.
      if (i >= active - 1 && i <= active + 4) {
        item.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => (img.loading = "eager"));
      }
    });

    dotEls.forEach((d, i) => d.setAttribute("aria-selected", String(i === active)));
    if (opts.prev) opts.prev.disabled = active === 0;
    if (opts.next) opts.next.disabled = active === items.length - 1;
    if (active !== reported) {
      reported = active;
      opts.onChange?.(active);
    }
  }

  function go(i: number) {
    active = Math.max(0, Math.min(items.length - 1, i));
    layout();
  }

  function apply() {
    enabled = !mql || mql.matches;
    track.classList.toggle("mu-on", enabled);
    if (enabled) {
      layout();
    } else {
      track.style.removeProperty("--mu-h");
      items.forEach((item) => {
        item.removeAttribute("style");
        item.inert = false;
        delete item.dataset.muActive;
      });
    }
  }

  opts.prev?.addEventListener("click", () => go(active - 1));
  opts.next?.addEventListener("click", () => go(active + 1));

  // Swipe con el dedo o el mouse.
  let startX = 0;
  let startY = 0;
  let tracking = false;
  let swallowClick = false;

  track.addEventListener("pointerdown", (e) => {
    if (!enabled) return;
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  const end = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      go(active + (dx < 0 ? 1 : -1));
      swallowClick = true;
      setTimeout(() => (swallowClick = false), 50);
    }
  };
  track.addEventListener("pointerup", end);
  track.addEventListener("pointercancel", () => (tracking = false));

  // Clic en una tarjeta que no es la activa: la trae al frente (y no abre nada).
  track.addEventListener(
    "click",
    (e) => {
      if (!enabled) return;
      if (swallowClick) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const item = items.find((el) => el.contains(e.target as Node));
      if (item && item.dataset.muActive !== "true") {
        e.preventDefault();
        e.stopPropagation();
        go(items.indexOf(item));
      }
    },
    true,
  );

  // Trackpad: deslizar con dos dedos en horizontal.
  let wheelLock = false;
  track.addEventListener(
    "wheel",
    (e) => {
      if (!enabled || Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      go(active + (e.deltaX > 0 ? 1 : -1));
      setTimeout(() => (wheelLock = false), 450);
    },
    { passive: false },
  );

  // Teclado: flechas cuando el foco está dentro del carrusel.
  track.addEventListener("keydown", (e) => {
    if (!enabled) return;
    if (e.key === "ArrowRight") go(active + 1);
    else if (e.key === "ArrowLeft") go(active - 1);
  });

  new ResizeObserver(layout).observe(track);
  mql?.addEventListener("change", apply);
  apply();
}
