import multer from 'fastify-multer';
import { Result, bizErrors, sqlite, BaseAgent } from './decorates/index.ts';
import type { BizConfig } from './config/index.ts';

declare module 'fastify' {
  interface FastifyInstance {
    bizAppConfig: BizConfig;
    BizResult: typeof Result;
    bizErrors: typeof bizErrors;
    bizSqlite: typeof sqlite;
    bizBaseAgent: InstanceType<typeof BaseAgent>;
  }
}

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
  }
}
