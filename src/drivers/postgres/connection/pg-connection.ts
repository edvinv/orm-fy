import { Connection } from "../../../connection/connection";
import { Client } from "../../../connection/client";
import { QueryResult } from "../../../connection/query-result";
import { ConnectionOptions } from "../../../connection/connection-options";
import * as pg from "pg";
import { PgClient } from "./pg-client";
import { DriverNames } from "../..";

export class PgConnection extends Connection {
  constructor(option: ConnectionOptions) {
    super(option);

    let poolConfig = Object.assign<pg.PoolConfig, ConnectionOptions>({}, option);
    this.pool = new pg.Pool(poolConfig);
  }

  pool: pg.Pool;

  async  connect(): Promise<Client> {
    const pgClient = await this.pool.connect();
    const client = new PgClient(pgClient, this.pool);
    return client;
  }

  async  query(text: string): Promise<QueryResult> {
    const queryResult = await this.pool.query(text);
    return queryResult;
  }

  async close(): Promise<void>{
    await this.pool.end();
  }


}