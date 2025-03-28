import { tool } from 'ai';
import { z } from 'zod';
import { sqlite } from '../../db/index.ts';

export const sqliteTool = tool({
  description: 'SQLite 数据库工具',
  parameters: z.object({
    query: z.string().describe('要执行的 SQL 查询'),
  }),
  execute: async ({ query }) => {
    try {
      const db = sqlite.getDB();
      const result = db.prepare(query).all();
      db.close();
      console.log('SQLite query result:', result);
      return result;
    } catch (error) {
      if (error instanceof Error) return error.message;
      throw error;
    }
  },
});
