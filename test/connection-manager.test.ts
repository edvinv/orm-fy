import { getConnectionManager, ConnectionOptions, Connection } from "../src";

test("getConnectionManager should always return valid connection manager.", () => {
  const connectionManager = getConnectionManager();
  expect(connectionManager).toBeInstanceOf(Object);

  connectionManager.close();
  expect(connectionManager.count).toBe(0);
});

test("Creating connection without a name should create one with 'default' name.", async () => {
  const connectionManager = getConnectionManager();
  connectionManager.close();

  connectionManager.createConnection({ driver: "postgres" });
  expect(connectionManager.count).toBe(1);

  expect(connectionManager.getConnection("default")).toBeInstanceOf(Connection);
  expect(connectionManager.getConnection("some-not-defined-connection")).toBeUndefined();

  await connectionManager.close();
  expect(connectionManager.count).toBe(0);
});

test("Creating connection with specific name should be correctly named.", async () => {
  const connectionManager = getConnectionManager();
  connectionManager.close();

  connectionManager.createConnection({ name: "test-connection", driver: "postgres" });
  expect(connectionManager.count).toBe(1);

  expect(connectionManager.getConnection("default")).toBeUndefined();
  expect(connectionManager.getConnection("test-connection")).toBeInstanceOf(Connection);

  await connectionManager.close();
  expect(connectionManager.count).toBe(0);
});
