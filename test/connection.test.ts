import { getConnectionManager, ConnectionOptions } from "../src";

const postgresConnectionOptions: ConnectionOptions = {
  driver: "sqlite",
  connectionString: ":memory:",
  port: 5000,
  user: "postgres",
  password: "1"
};

test("Use check method to test if connection is working.", async () => {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.createConnection(postgresConnectionOptions);
  const checked = await connection.check();

  expect(checked).toBe(true);

  connectionManager.close();
});
