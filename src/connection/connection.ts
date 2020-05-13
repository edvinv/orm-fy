import { ConnectionOptions } from "./connection-options";
import { Client } from "./client";
import { QueryResult } from "./query-result";
import { Transaction } from "./transaction";

export abstract class Connection {
  constructor(protected option: string | ConnectionOptions) {
  }

  async abstract connect(): Promise<Client>;
  async abstract query(): Promise<QueryResult>;

  async transaction(transactionScope: (transaction: Transaction) => any): Promise<Transaction> {

    let client!: Client;
    let transaction!: Transaction;
    try {
      client = await this.connect();
      const transaction = await client.beginTransaction();

      transactionScope(transaction);

      await transaction.commit()
    } catch (err) {
      await transaction?.rollback()
      throw err;
    }
    finally {
      client?.release();
    }
    return transaction;
  }

}