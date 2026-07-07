import type { Curso, Video } from "./types";

const CURSOS_SHEET_ID = "1DYj89JGNmhPVAaZ8Pl5QatM_5NoxBH8EYCqXEAoxoa0";
const VIDEOS_SHEET_ID = "1wDw6VHBNxLsUuDwhbcixjYjhRz43OlqSC61BKkXavag";

// gviz/tq works with "Anyone with link" sharing (no need to Publish to Web)
function sheetUrl(id: string, sheetName: string) {
  return `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

const CURSOS_URL =
  process.env.SHEETS_CURSOS_URL || sheetUrl(CURSOS_SHEET_ID, "Cursos");

const VIDEOS_URL =
  process.env.SHEETS_VIDEOS_URL || sheetUrl(VIDEOS_SHEET_ID, "Videos");

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? "").trim()]));
  });
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function toBool(val: string): boolean {
  return val.trim().toUpperCase() === "TRUE";
}

async function fetchCsv(url: string): Promise<Record<string, string>[]> {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const res = await fetch(url, { next: { revalidate: isDev ? 0 : 3600 } });
    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[sheets] fetch failed ${res.status} ${res.statusText} — ${url}`);
      }
      return [];
    }
    const text = await res.text();
    if (text.trim().startsWith("<!")) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`[sheets] got HTML instead of CSV — sheet may not be public. URL: ${url}`);
      }
      return [];
    }
    return parseCsv(text);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[sheets] fetch error:`, err);
    }
    return [];
  }
}

function parseBullets(val: string): string[] {
  return (val || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getCursos(): Promise<Curso[]> {
  const rows = await fetchCsv(CURSOS_URL);
  return rows
    .filter((r) => r.nombre && r.modalidad && toBool(r.activo))
    .map((r) => ({
      nombre: r.nombre,
      tipo: (r.tipo === "servicio" ? "servicio" : "formacion") as "formacion" | "servicio",
      categoria: r.categoria || "",
      modalidad: r.modalidad,
      frecuencia: r.frecuencia || "",
      fecha: r.fecha || "",
      duracion: r.duracion || "",
      precio: r.precio || "",
      subtitulo: r.subtitulo || "",
      descripcion: r.descripcion || "",
      bullets_titulo: r.bullets_titulo || "",
      bullets: parseBullets(r.bullets),
      dirigido: r.dirigido || "",
      cita: r.cita || "",
      imagen: r.imagen || undefined,
      cta_tipo: (r.cta_tipo === "formulario" ? "formulario" : "whatsapp") as "whatsapp" | "formulario",
      cta_link: r.cta_link || undefined,
      cta_texto: r.cta_texto || (r.tipo === "servicio" ? "Reservar consulta" : "Inscribirme"),
      activo: true,
      orden: parseInt(r.orden) || 99,
    }))
    .sort((a, b) => a.orden - b.orden);
}

export async function getVideos(): Promise<Video[]> {
  const rows = await fetchCsv(VIDEOS_URL);
  return rows
    .filter((r) => r.url && toBool(r.activo))
    .map((r) => ({
      url: r.url,
      plataforma: (r.plataforma === "tiktok" ? "tiktok" : "instagram") as "instagram" | "tiktok",
      titulo: r.titulo || undefined,
      activo: true,
      orden: parseInt(r.orden) || 99,
    }))
    .sort((a, b) => a.orden - b.orden);
}
