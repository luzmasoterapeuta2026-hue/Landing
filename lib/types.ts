export interface Curso {
  nombre: string;
  categoria: string;
  modalidad: string;
  fecha: string;
  duracion: string;
  precio: string;
  descripcion: string;
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
