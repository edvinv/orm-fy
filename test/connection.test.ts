import { getConnectionManager, ConnectionOptions } from "../src";

const postgresConnectionOptions: ConnectionOptions = {
  name: "postgres",
  driver: "postgres",
  port: 5000,
  user: "postgres",
  password: "1"
};

const sqliteConnectionOptions: ConnectionOptions = {
  name: "sqlite",
  driver: "sqlite",
  connectionString: ":memory:",
};

const mysqlConnectionOptions: ConnectionOptions = {
  name: "mysql",
  driver: "mysql",
  port: 5003,
  user: "root",
  password: "1"
};

const connectionsOptions = [postgresConnectionOptions, sqliteConnectionOptions, mysqlConnectionOptions];

test("Use check method to test if connection is working.", async () => {
  const connectionManager = getConnectionManager();

  for (const options of connectionsOptions) {
    const connection = connectionManager.createConnection(options);
    const checked = await connection.ping();

    expect(checked).toBe(true);
  }

  connectionManager.close();
});
