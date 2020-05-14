import * as sqlite from "sqlite3";
import { SqliteClient } from "./sqlite-client";
import { Connection } from "../../../connection/connection";
import { ConnectionOptions } from "../../../connection/connection-options";
import { Client } from "../../../connection/client";
import { QueryResult } from "../../../connection/query-result";
import { SqliteApi } from "./sqlite-api";

export class SqliteConnection extends Connection {
  constructor(option: ConnectionOptions) {
    super(option);
  }

  database: sqlite.Database | undefined;

  private async createDatabase(): Promise<sqlite.Database> {
    this.database = await SqliteApi.createDatabase(this.option.connectionString as string, sqlite.OPEN_READWRITE);
    return this.database;
  }

  async  connect(): Promise<Client> {
    const database = this.database ?? await this.createDatabase();
    const client = new SqliteClient(database);
    return client;
  }

  async  query(text: string): Promise<QueryResult> {
    const database = this.database ?? await this.createDatabase();
    const rows = await SqliteApi.all(database, text);

    return new QueryResult(rows, rows);
  }

  async close(): Promise<void> {
    if (this.database) {
      await SqliteApi.closeDatabase(this.database);
    }
  }


}