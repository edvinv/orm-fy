import { QueryResult, Transaction, Client } from "../../../connection";
import * as pg from "pg";

export class PgClient extends Client {
  constructor(private client: pg.PoolClient, private pool: pg.Pool) {
    super();
  }

  async  beginTransaction(): Promise<Transaction> {
    const transaction = new Transaction(this);
    transaction.begin();

    return transaction;
  }

  async  query(text: string): Promise<QueryResult> {
    const queryResult = await this.client.query(text);
    return queryResult;
  }

  async release(): Promise<void> {
    await this.client.release();
  }

}