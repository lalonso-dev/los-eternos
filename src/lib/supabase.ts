import { createClient } from "@supabase/supabase-js";

// La anon key es publica por diseno: la seguridad la dan las politicas RLS de supabase/schema.sql.
// Nunca poner aqui la service_role key.
const SUPABASE_URL = "https://ttnfrnjikhzgljpxnjvx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bmZybmppa2h6Z2xqcHhuanZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NzU0NjQsImV4cCI6MjEwODI1MTQ2NH0.FcNPH3TInLKPCZR8ksue7YIWqwPcA-hBaeyqqpLHfsM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lo que ve el publico (columnas permitidas a anon).
export interface EventoPublico {
  id: string;
  fecha: string;
  lugar: string;
  banner_url: string | null;
  publicado: boolean;
}

// Lo que ven musicos y admin.
export interface Evento extends EventoPublico {
  hora_inicio: string | null;
  hora_fin: string | null;
  maps_url: string | null;
  notas: string | null;
}

export type Rol = "admin" | "musico";

export const COLUMNAS_PUBLICAS = "id,fecha,lugar,banner_url,publicado";

export function formatFecha(fecha: string): { dia: string; mes: string; semana: string; larga: string } {
  const d = new Date(`${fecha}T12:00:00`);
  return {
    dia: String(d.getDate()),
    mes: d.toLocaleDateString("es-MX", { month: "short" }).replace(".", "").toUpperCase(),
    semana: d.toLocaleDateString("es-MX", { weekday: "long" }),
    larga: d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }),
  };
}

export function formatHora(hora: string | null): string {
  if (!hora) return "";
  const [h, m] = hora.split(":").map(Number);
  const suffix = h >= 12 ? "p.m." : "a.m.";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// Duracion entre inicio y fin ("3 h 30 min"). Si el fin es menor al inicio se asume que cruza la medianoche.
export function duracion(inicio: string | null, fin: string | null): string {
  if (!inicio || !fin) return "";
  const [h1, m1] = inicio.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  let min = h2 * 60 + m2 - (h1 * 60 + m1);
  if (min <= 0) min += 24 * 60;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}
