import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';
import { config } from '../config/index.ts';

async function main() {
  const result = streamText({
    model: deepseek(config.llm.model),
    prompt: '“strawberry”这个单词中有多少个“r”？',
  });

  for await (const part of result.fullStream) {
    if (part.type === 'reasoning') {
      process.stdout.write('\x1b[34m' + part.textDelta + '\x1b[0m');
    } else if (part.type === 'text-delta') {
      process.stdout.write(part.textDelta);
    }
  }
}

main().catch(console.error);
