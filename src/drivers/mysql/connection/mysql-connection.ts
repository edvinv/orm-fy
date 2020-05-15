import * as mysql from "mysql";
import { Connection } from "../../../connection/connection";
import { ConnectionOptions } from "../../../connection/connection-options";
import { Client } from "../../../connection/client";
import { QueryResult } from "../../../connection/query-result";
import { MysqlApi as MySqlApi } from "../mysql-api";
import { MySqlClient } from "./mysql-client";

export class MySqlConnection extends Connection {
  constructor(option: ConnectionOptions) {
    super(option);

    let poolConfig: mysql.PoolConfig | string;
    if (option.connectionString) {
      poolConfig = option.connectionString;
    } else {
      poolConfig = Object.assign<mysql.PoolConfig, ConnectionOptions>({}, option);
    }
    this.pool = MySqlApi.createPool(poolConfig);
  }

  pool: mysql.Pool;

  async  connect(): Promise<Client> {
    const mysqlClient = await MySqlApi.createConnectionFromPool(this.pool);
    const client = new MySqlClient(mysqlClient, this.pool);
    return client;
  }

  async  query(sqlText: string): Promise<QueryResult> {
    const mysqlQueryResult = MySqlApi.queryFromPool(this.pool,sqlText);
    return new QueryResult((await mysqlQueryResult).results, mysqlQueryResult);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }


}