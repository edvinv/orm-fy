import { Client } from "./client";

export class Transaction {
  constructor(private client: Client) {
  }
  async begin(): Promise<void> {
  }
  async commit(): Promise<void> {
  }
  async rollback(): Promise<void> {
  }
}
