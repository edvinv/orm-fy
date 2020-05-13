import { ConnectionOptions } from "./connection-options";
import { DriverNames, PgConnection } from "../drivers";
import { Client } from "./client";
import { QueryResult } from "./query-result";
import { Transaction } from "./transaction";

export abstract class Connection {
  constructor(protected option: ConnectionOptions) {
    this.name = option.name as string;
    this.driver = option.driver as DriverNames;
  }

  readonly name: string;
  readonly driver: DriverNames;

  async abstract connect(): Promise<Client>;
  async abstract query(text: string): Promise<QueryResult>;

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

export function createConnection(option: ConnectionOptions): Connection {
  let connection!: Connection;
  switch (option.driver) {
    case "postgres":
      connection = new PgConnection(option);
      break;
    default:
      throw Error(`Invalid driver name: '${option.driver}'`);
  }
  return connection;
}