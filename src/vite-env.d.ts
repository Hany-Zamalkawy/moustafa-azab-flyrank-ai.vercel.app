/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FLYRANK_VERIFICATION_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
