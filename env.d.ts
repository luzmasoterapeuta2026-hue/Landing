declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare namespace NodeJS {
  interface ProcessEnv {
    MAINTENANCE_MODE?: string;
    SHEETS_CURSOS_URL?: string;
    SHEETS_VIDEOS_URL?: string;
  }
}
