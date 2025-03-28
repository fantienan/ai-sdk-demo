import { tool } from 'ai';
import { z } from 'zod';
import { sqlite } from '../../database/index.ts';
import { createBizError } from '../../errors.ts';
import { Result } from '../../result.ts';

export const sqliteSchemaTool = tool({
  description: '获取SQLite数据库所有表的结构以及字段信息，注意做分析时需要先执行此工具在调用分析工具',
  parameters: z.object({
    sql: z.string().describe('要执行的 SQL 查询'),
  }),
  execute: async ({ sql }) => {
    try {
      debugger;
      const db = sqlite.getDatabase();
      const result = db.prepare(sql).all();
      db.close();
      console.log('SQLite sql result:', result);
      return result;
    } catch (error) {
      if (error instanceof Error) return createBizError(Result.AI_ERROR, error);
      throw error;
    }
  },
});

export const sqliteAnalyzeTool = tool({
  description: 'SQLite数据库分析工具',
  parameters: z.object({
    sql: z.string().describe('要执行的 SQL 查询'),
  }),
  execute: async ({ sql }) => {
    try {
      debugger;
      const db = sqlite.getDatabase();
      const result = db.prepare(sql).all();
      db.close();
      console.log('SQLite sql result:', result);
      return result;
    } catch (error) {
      if (error instanceof Error) return createBizError(Result.AI_ERROR, error);
      throw error;
    }
  },
});
