import path from 'node:path';
import { configDotenv } from 'dotenv';
import type { BizConfig } from './types.ts';

const { NODE_ENV = 'local' } = process.env;
const envPath = path.resolve(process.cwd(), '..');

configDotenv({
  path: [path.join(envPath, '.env.local'), path.join(envPath, `.env.${NODE_ENV}`), path.join(envPath, '.env')],
});

const genFile = (name: string) => path.resolve(process.cwd(), '.logs', NODE_ENV!, `${name}.log`);

const config: BizConfig = {
  tianditu: {
    apiKey: process.env.BIZ_TIAN_DI_TU_API_KEY!,
  },
  service: {
    host: '0.0.0.0',
    file: genFile('fastify'),
    port: +process.env.BIZ_SERVER_PORT!,
    address: '',
  },
  cors: {
    origin: '*',
  },
  llm: {
    deepseek: {
      apiKey: process.env.BIZ_LLM_API_KEY!,
      baseUrl: process.env.BIZ_LLM_BASE_URL!,
      model: process.env.BIZ_LLM_MODEL!,
    },
  },
  routes: {
    root: '/api/v1',
    llm: {
      prefix: '/llm',
      chat: '/chat',
    },
  },
};

export default config;
