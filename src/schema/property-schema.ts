import { SchemaPropertyType } from "./schema-contracts";
import { PkSchema } from "./pk-schema";

export class PropertySchema {
  /**
   * 
   * @param name Name of the property (in object model)
   */
  constructor(readonly name: string) {
  }
  /**
   * Type of the property (in object model)
   */
  type: SchemaPropertyType = "string";

  /**
   * Name of the column (in database model)
   */
  columnName!: string;

  /**
   * Type of the column (in database model)
   */
  columnType!: string;

  /**
   * Construction function used to generate entity class instance. Construction must be able to accept zero parameters. 
   */
  ctor: string | null = null;

  /**
   * Instance of PKSchema (if this property is primary key) or undefined otherwise 
   */
  pk: PkSchema | undefined;
}