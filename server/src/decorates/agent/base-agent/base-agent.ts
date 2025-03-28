import { LLMProvider } from '../llm-provider/llm-provider.ts';
import * as tools from '../tools/index.ts';
import type { ToolSet } from 'ai';

export class BaseAgent {
  llmProvider: InstanceType<typeof LLMProvider>;
  tools: ToolSet;
  constructor() {
    this.llmProvider = new LLMProvider();
    this.tools = tools;
  }
}
