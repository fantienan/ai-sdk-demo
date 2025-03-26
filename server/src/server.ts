import { serializerCompiler, validatorCompiler } from 'fastify-zod-openapi';
import { deepseek } from '@ai-sdk/deepseek';
import { createDataStream, streamText } from 'ai';
import Fastify from 'fastify';
import { config } from './config/index.ts';

const model = deepseek(config.llm.model);
const fastify = Fastify({ logger: true });
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.decorate('bizConfig', config).register(import('@fastify/cors'), config.cors);

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model,
    prompt: '你好',
  });

  // Mark the response as a v1 data stream:
  reply.header('X-Vercel-AI-Data-Stream', 'v1');
  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(result.toDataStream());
});

fastify.post('/stream-data', async function (request, reply) {
  // immediately start streaming the response
  const dataStream = createDataStream({
    execute: async (dataStreamWriter) => {
      dataStreamWriter.writeData('initialized call');

      const result = streamText({
        model,
        prompt: '你好',
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error) => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });

  // Mark the response as a v1 data stream:
  reply.header('X-Vercel-AI-Data-Stream', 'v1');
  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(dataStream);
});

fastify.listen({ port: 8080 });
