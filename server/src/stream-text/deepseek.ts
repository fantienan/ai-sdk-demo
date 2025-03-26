import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';
import { config } from '../config/index.ts';

// const client = deepseek(config.llm.model, {});
async function main() {
  console.log('config:', config);
  const result = streamText({
    model: deepseek(config.llm.model),
    prompt: '你好',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log('--------------------');
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
