import { DriverNames } from "..";

export interface ConnectionOptions {

  /**
   * Name of the connection. 
   * Default: "default" 
   */
  name?: string;

  /**
   * Name of the driver, that this connection will use 
   */
  driver: DriverNames;

  user?: string,
  host?: string,
  database?: string,
  password?: string,
  port?: number,

  /**
   * When using connectionString, then user, host, database, password and port should be undefined  
   */
  connectionString?: string;
}