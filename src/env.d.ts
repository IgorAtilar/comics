/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly MARVEL_API_KEY: string;
  readonly MARVEL_API_HASH: string;
  readonly PUBLIC_MARVEL_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
