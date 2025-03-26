import type { FastifyCorsOptions, FastifyCorsOptionsDelegate } from '@fastify/cors';

export type BizConfig = {
  service: {
    file: string;
    port: number;
    host: string;
    address: string;
  };
  cors: NonNullable<FastifyCorsOptions> | FastifyCorsOptionsDelegate;

  llm: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
  tianditu: {
    apiKey: string;
  };
};
