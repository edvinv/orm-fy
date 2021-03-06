import { ConnectionOptions } from "./connection-options";
import { DriverNames } from "../drivers/drivers";
import { Client } from "./client";
import { QueryResult } from "./query-result";
import { Transaction } from "./transaction";
import { getConnectionManager } from "./connection-manager";

export abstract class Connection {
  constructor(protected option: ConnectionOptions) {
    this.name = option.name as string;
    this.driver = option.driver as DriverNames;
  }

  readonly name: string;
  readonly driver: DriverNames;

  async abstract connect(): Promise<Client>;
  async ping(): Promise<true> {
    const result = await this.query("SELECT (21+21) as answer");
    const checked = result?.rows?.[0]?.answer === 42;
    if (!checked) {
      // this should never happened
      throw Error("Check test failed.");
    }
    return true;
  }
  async abstract query(text: string): Promise<QueryResult>;
  async abstract close(): Promise<void>;


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

export function createConnection(options: ConnectionOptions): Connection {
  const connectionManager = getConnectionManager();
  return connectionManager.createConnection(options)
}