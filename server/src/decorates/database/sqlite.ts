import BetterSqlite3 from 'better-sqlite3';

export class SQLiteDB {
  db?: BetterSqlite3.Database;
  getDatabase() {
    if (this.db) this.db.close();
    this.db = BetterSqlite3('database.db', { verbose: console.log });
    return this.db;
  }
  getAllSchema() {}
}

export const getDatabase = () => {
  return BetterSqlite3('database.db', { verbose: console.log });
};
