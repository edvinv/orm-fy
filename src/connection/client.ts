import { Transaction } from "./transaction";
import { QueryResult } from "./query-result";

export abstract class Client {
  async abstract beginTransaction(): Promise<Transaction>;
  async abstract query(): Promise<QueryResult>;
  abstract release(): Promise<void>;
}