import { Connection } from "./connection";
import { ConnectionOptions } from "./connection-options";
import { createDriverConnection } from "../drivers/connection-factory";

class ConnectionManager {
  constructor() {
  }

  private readonly connections = new Map<string, Connection>();
  get count() {
    return this.connections.size;
  }

  createConnection(options: ConnectionOptions): Connection {
    options.name = options.name ?? "default";
    const existingConnection = this.getConnection(options.name);

    if (existingConnection) {
      throw new Error(`Connection with name ${options.name} already exists.`);
    }
    let connection = createDriverConnection(options);

    this.connections.set(connection.name, connection);
    return connection;
  }

  getConnection(name = "default"): Connection | undefined {
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