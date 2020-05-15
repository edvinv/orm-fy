import * as mysql from "mysql";

export class MysqlApi {
  static createPool(config: mysql.PoolConfig | string): mysql.Pool {
    return mysql.createPool(config);
  }

  static createConnectionFromPool(pool: mysql.Pool): Promise<mysql.Connection> {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        err ? reject(err) : resolve(connection)
      });
    });
  }

  static queryFromPool(pool: mysql.Pool, sqlText: string): Promise<{ results?: any, fields?: mysql.FieldInfo[] }> {
    return new Promise((resolve, reject) => {
      pool.query(sqlText, (err, results, fields) => {
        err ? reject(err) : resolve({ results, fields })
      });
    });
  }

  static queryFromConnection(connection: mysql.Connection, sqlText: string): Promise<{ results?: any, fields?: mysql.FieldInfo[] }> {
    return new Promise((resolve, reject) => {
      connection.query(sqlText, (err, results, fields) => {
        err ? reject(err) : resolve({ results, fields })
      });
    });
  }

  static endConnection(connection: mysql.Connection): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.end((err) => {
        err ? reject(err) : resolve()
      });
    });
  }

}
