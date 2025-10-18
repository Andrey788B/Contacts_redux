interface ImportMetaEnv {
  readonly VITE_API_NINJAS_TOKEN?: string;
  // добавляй сюда другие VITE_* по мере надобности
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}