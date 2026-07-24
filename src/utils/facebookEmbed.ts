// Acepta tanto una URL normal de Facebook (foto/reel) como el snippet
// completo de <iframe> que da el botón "Insertar" de Facebook, y siempre
// devuelve la URL limpia del post para construir nuestro propio iframe
// con tamaño consistente.
export function extractFacebookUrl(input: string): string {
  const trimmed = input.trim();
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const candidate = iframeSrcMatch ? iframeSrcMatch[1] : trimmed;

  try {
    const url = new URL(candidate);
    const href = url.searchParams.get("href");
    if (href) return href;
  } catch {
    // No era una URL de plugin con query params; puede ser ya el link directo.
  }

  return candidate;
}
