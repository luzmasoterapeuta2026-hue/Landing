export interface Curso {
  nombre: string;
  tipo: "formacion" | "servicio";
  categoria: string;
  modalidad: string;
  frecuencia: string;
  fecha: string;
  duracion: string;
  precio: string;
  subtitulo: string;
  descripcion: string;
  bullets_titulo: string;
  bullets: string[];
  dirigido: string;
  cita: string;
  imagen?: string;
  cta_tipo: "whatsapp" | "formulario";
  cta_link?: string;
  cta_texto: string;
  activo: boolean;
  orden: number;
}

export interface Video {
  url: string;
  plataforma: "instagram" | "tiktok";
  titulo?: string;
  activo: boolean;
  orden: number;
}
