import { ConnectionOptions } from "./connection-options";
import { DriverNames } from "./driver-names";
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
  async check(): Promise<true> {
    await this.query("SELECT 21+21");
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