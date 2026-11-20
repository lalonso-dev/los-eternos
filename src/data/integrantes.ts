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
    redes: {},
  },
  {
    slug: "mario-carranza",
    nombre: "Mario",
    apellido: "Carranza",
    rol: "Bajo quinto",
    descripcion: "",
    redes: {},
  },
  {
    slug: "luiz-albarez",
    nombre: "Luis", // OJO: el archivo de la foto se llama "luiz"; confirmar cómo se escribe
    apellido: "Albarez",
    rol: "Acordeón",
    descripcion: "",
    redes: {},
  },
  {
    slug: "lucas-alberto",
    nombre: "Lucas",
    apellido: "Alberto",
    rol: "Bajo eléctrico",
    descripcion: "",
    redes: {},
  },
  {
    slug: "edgar-guzman",
    nombre: "Edgar",
    apellido: "Guzman",
    rol: "Batería",
    descripcion: "",
    redes: {},
  },
];

/** Nombre público abreviado: apellido (o segundo nombre) reducido a su inicial. */
export function nombreCorto(m: Pick<Integrante, "nombre" | "apellido">): string {
  const [primero, ...resto] = m.nombre.trim().split(/\s+/);
  if (m.apellido.trim()) return `${m.nombre.trim()} ${m.apellido.trim()[0].toUpperCase()}.`;
  if (resto.length) return `${primero} ${resto[0][0].toUpperCase()}.`;
  return primero;
}
