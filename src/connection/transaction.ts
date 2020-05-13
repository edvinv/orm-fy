import { Client } from "./client";

export class Transaction {
  constructor(private client: Client) {
  }
  async commit(): Promise<void> {
  }
  async rollback(): Promise<void> {
  }
}
