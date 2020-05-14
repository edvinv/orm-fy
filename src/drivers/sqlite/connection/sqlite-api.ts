import * as sqlite from "sqlite3";

export class SqliteApi {
  static createDatabase(filename: string, mode: number): Promise<sqlite.Database> {
    return new Promise((resolve, reject) => {
      let db = new sqlite.Database(filename, mode, err => {
        err ? reject(err) : resolve(db);
      });
    });
  }

  static closeDatabase(db: sqlite.Database): Promise<void> {
    return new Promise((resolve, reject) => {
      db.close(err => {
        err ? reject(err) : resolve()
      });
    });
  }

  static run(db: sqlite.Database, sql: string, params?: any): Promise<sqlite.RunResult> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        err ? reject(err) : resolve(this)
      });
    });
  }

  static all(db: sqlite.Database, sql: string, params?: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all(sql, params, function (err, rows) {
        err ? reject(err) : resolve(rows)
      });
    });
  }


}
