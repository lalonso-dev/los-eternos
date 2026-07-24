// Acepta el link normal de Spotify (artista, álbum, playlist o canción)
// y devuelve {type, id} para armar el iframe de embed oficial.
export function parseSpotifyUrl(input: string): { type: string; id: string } | null {
  try {
    const url = new URL(input.trim());
    const parts = url.pathname.split("/").filter(Boolean);
    // La URL puede venir con un locale primero, ej. /intl-es/artist/ID
    const knownTypes = ["artist", "album", "playlist", "track", "episode", "show"];
    const typeIndex = parts.findIndex((p) => knownTypes.includes(p));
    if (typeIndex === -1 || !parts[typeIndex + 1]) return null;
    return { type: parts[typeIndex], id: parts[typeIndex + 1] };
  } catch {
    return null;
  }
}
