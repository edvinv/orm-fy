import { ConnectionOptions } from "../connection/connection-options";
import { Connection } from "../connection/connection";
import { PgConnection } from "./postgres/connection/pg-connection";
import { SqliteConnection } from "./sqlite/connection/sqlite-connection";

export function createDriverConnection(option: ConnectionOptions): Connection {
  let connection!: Connection;
  switch (option.driver) {
    case "postgres":
      connection = new PgConnection(option);
      break;
    case "sqlite":
      connection = new SqliteConnection(option);
      break;
    default:
      throw Error(`Invalid driver name: '${option.driver}'`);
  }

  return connection;
}