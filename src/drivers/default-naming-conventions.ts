import { ISchemaEntity, ISchemaProperty } from "../schema/schema-builder";
import pluralize from "pluralize";
import { snakeCase } from "snake-case";

export class DefaultNamingConventions {
  /** 
   * Infers table name from class name
   * Default: plural of snakeCase  
   */
  tableName = (entitySchema: ISchemaEntity<any>) => {
    return snakeCase(pluralize(entitySchema.name));
  };

  /** 
    * Infers column name from class property name
    * Default: snakeCase  
    */
  columnName = (propertySchema: ISchemaProperty<any>, entitySchema: ISchemaEntity<any>) => {
    return snakeCase(propertySchema.name as string);
  };
}  
