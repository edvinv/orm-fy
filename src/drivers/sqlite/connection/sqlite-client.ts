import * as sqlite from "sqlite3";

import { Client } from "../../../connection/client";
import { Transaction } from "../../../connection/transaction";
import { QueryResult } from "../../../connection/query-result";
import { SqliteApi } from "./sqlite-api";

export class SqliteClient extends Client {
  constructor(private database: sqlite.Database) {
    super();
  }

  async  beginTransaction(): Promise<Transaction> {
    const transaction = new Transaction(this);
    transaction.begin();

    return transaction;
  }

  async  query(text: string): Promise<QueryResult> {
    const rows = await SqliteApi.all(this.database, text);

    return new QueryResult(rows, rows);
  }

  async release(): Promise<void> {
  }

}