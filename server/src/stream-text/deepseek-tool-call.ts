import { deepseek } from '@ai-sdk/deepseek';
import { streamText, CoreMessage, ToolCallPart, ToolResultPart } from 'ai';
import { weatherTool } from '../tools/weather-tool.ts';
import { config } from '../config/index.ts';

const messages: CoreMessage[] = [];

async function main() {
  let toolResponseAvailable = false;

  const result = streamText({
    model: deepseek(config.llm.model),
    maxTokens: 512,
    tools: {
      weather: weatherTool,
    },
    toolChoice: 'required',
    prompt: '北京的天气怎么样？我应该参观哪些景点？',
  });

  let fullResponse = '';
  const toolCalls: ToolCallPart[] = [];
  const toolResponses: ToolResultPart[] = [];

  for await (const delta of result.fullStream) {
    switch (delta.type) {
      case 'text-delta': {
        fullResponse += delta.textDelta;
        process.stdout.write(delta.textDelta);
        break;
      }

      case 'tool-call': {
        toolCalls.push(delta);

        process.stdout.write(`\nTool call: '${delta.toolName}' ${JSON.stringify(delta.args)}`);
        break;
      }

      case 'tool-result': {
        toolResponses.push(delta);

        process.stdout.write(`\nTool response: '${delta.toolName}' ${JSON.stringify(delta.result)}`);
        break;
      }
    }
  }
  process.stdout.write('\n\n');

  messages.push({
    role: 'assistant',
    content: [{ type: 'text', text: fullResponse }, ...toolCalls],
  });

  if (toolResponses.length > 0) {
    messages.push({ role: 'tool', content: toolResponses });
  }

  toolResponseAvailable = toolCalls.length > 0;
  console.log('Messages:', JSON.stringify(messages, null, 2));
}

main().catch(console.error);
