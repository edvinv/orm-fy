import { Connection } from "./connection";
import { ConnectionOptions } from "./connection-options";
import { PgConnection } from "../drivers";

class ConnectionManager {
  constructor() {
  }

  private readonly connections = new Map<string, Connection>();
  get count() {
    return this.connections.size;
  }

  createConnection(option: ConnectionOptions) {
    option.name = option.name ?? "default";

    let connection!: Connection;
    switch (option.driver) {
      case "postgres":
        connection = new PgConnection(option);
        break;
      default:
        throw Error(`Invalid driver name: '${option.driver}'`);
    }

    this.connections.set(connection.name, connection);
    return connection;
  }

  getConnection(name: string): Connection | undefined {
    const connection = this.connections.get(name);
    return connection;
  }

  /**
   * This will close all connections (waiting them to finish). After that all connections are removed from internal cache.  
   * 
   */
  async close(): Promise<void> {
    try {
      const connectionClosePromises: ReturnType<Connection["close"]>[] = [];
      for (const connection of this.connections.values()) {
        connectionClosePromises.push(connection.close());
      }
      await Promise.all(connectionClosePromises);
    } finally {
      this.connections.clear();
    }
  }
}

const connectionManager = new ConnectionManager();
export const getConnectionManager = () => connectionManager;