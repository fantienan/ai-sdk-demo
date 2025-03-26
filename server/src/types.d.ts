declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    BIZ_SERVER_PORT: number;
    BIZ_SERVER_URL: string;
    BIZ_TIAN_DI_TU_API_KEY: string;
    DEEPSEEK_API_KEY: string;
  }
}
