import * as mysql from "mysql";
import { Client } from "../../../connection/client";
import { Transaction } from "../../../connection/transaction";
import { QueryResult } from "../../../connection/query-result";
import { MysqlApi } from "../mysql-api";

export class MySqlClient extends Client {
  constructor(private client: mysql.Connection, private pool: mysql.Pool) {
    super();
  }

  async  beginTransaction(): Promise<Transaction> {
    const transaction = new Transaction(this);
    transaction.begin();
    return transaction;
  }

  async  query(text: string): Promise<QueryResult> {
    const pgQueryResult = await MysqlApi.queryFromConnection(this.client, text);
    return new QueryResult(pgQueryResult.results, pgQueryResult);
  }

  async release(): Promise<void> {
    await MysqlApi.endConnection(this.client);
  }

}