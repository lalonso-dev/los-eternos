// Integrantes del grupo. Para completar la info de cada uno:
//  - foto: guárdala en src/assets/team-photos/<slug>.webp (también jpg, png, avif).
//    Se detecta sola por el nombre; sin foto se muestra un monograma con iniciales.
//  - descripcion: 1 o 2 frases. Si queda vacía, no se muestra.
//  - redes: solo pon las que tenga (URL completa). Las vacías no se muestran.
//
// En el sitio los nombres se muestran abreviados (ver nombreCorto):
//   "Mario" + "Carranza"  ->  "Mario C."
//   "Marco Antonio" (sin apellido)  ->  "Marco A."

export interface IntegranteRedes {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface Integrante {
  slug: string;
  nombre: string;
  apellido: string;
  rol: string;
  descripcion: string;
  redes: IntegranteRedes;
}

export const integrantes: Integrante[] = [
  {
    slug: "marco-antonio",
    nombre: "Marco Antonio",
    apellido: "", // TODO: falta el apellido
    rol: "Cantante",
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/marcoantoniovillamondragon/",
      facebook: "https://www.facebook.com/marcoantonio.villamondragon",
    },
  },
  {
    slug: "mario-carranza",
    nombre: "Mario",
    apellido: "Carranza",
    rol: "Bajo quinto",
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/mario.carranza_diaz/",
      facebook: "https://www.facebook.com/carranzadiaz",
    },
  },
  {
    slug: "luiz-albarez",
    nombre: "Luis", // OJO: el archivo de la foto se llama "luiz"; confirmar cómo se escribe
    apellido: "Albarez",
    rol: "Acordeón",
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/luis_drumms_/",
      facebook: "https://www.facebook.com/luis.angel.5223722",
    },
  },
  {
    slug: "lucas-alberto",
    nombre: "Lucas",
    apellido: "Alberto",
    rol: "Bajo eléctrico",
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/alberthoalonso/",
      facebook: "https://www.facebook.com/bralberto",
    },
  },
  {
    slug: "edgar-guzman",
    nombre: "Edgar",
    apellido: "Guzman",
    rol: "Batería",
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/edg.ar2707/",
      facebook: "https://www.facebook.com/patho.guzman.71",
    },
  },
  {
    // Foto: src/assets/team-photos/jorge-roque.webp (mientras no exista, se muestra el monograma "JR")
    slug: "jorge-roque",
    nombre: "Jorge",
    apellido: "Roque",
    rol: "Audio e iluminación", // alternativas: "Producción y sonido", "Director técnico"
    descripcion: "",
    redes: {
      instagram: "https://www.instagram.com/jorg3.roque/",
      facebook: "https://www.facebook.com/jorge.roque.9803",
    },
  },
];

/** Nombre público abreviado: apellido (o segundo nombre) reducido a su inicial. */
export function nombreCorto(m: Pick<Integrante, "nombre" | "apellido">): string {
  const [primero, ...resto] = m.nombre.trim().split(/\s+/);
  if (m.apellido.trim()) return `${m.nombre.trim()} ${m.apellido.trim()[0].toUpperCase()}.`;
  if (resto.length) return `${primero} ${resto[0][0].toUpperCase()}.`;
  return primero;
}
