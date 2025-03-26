import { tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({
  description: '获取某个地点的天气',
  parameters: z.object({
    location: z.string().describe('获取天气信息的地点'),
  }),
  // 下面的位置被推断为一个字符串
  execute: async ({ location }) => ({
    location,
    temperature: 72 + Math.floor(Math.random() * 21) - 10,
  }),
});
