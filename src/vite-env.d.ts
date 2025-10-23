interface ImportMetaEnv {
  readonly VITE_API_NINJAS_TOKEN?: string;
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}