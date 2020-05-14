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

const connectionsOptions = [postgresConnectionOptions, sqliteConnectionOptions];

test("Use check method to test if connection is working.", async () => {
  const connectionManager = getConnectionManager();

  for (const options of connectionsOptions) {
    const connection = connectionManager.createConnection(options);
    const checked = await connection.check();

    expect(checked).toBe(true);
  }

  connectionManager.close();
});
