import pluralize from "pluralize";
import { snakeCase } from "snake-case";
import { EntitySchema } from "../schema/entity-schema";
import { PropertySchema } from "../schema/property-schema";

export class DefaultNamingConventions {
  /** 
   * Infers table name from class name
   * Default: plural of snakeCase  
   */
  tableName = (entitySchema: EntitySchema) => {
    return snakeCase(pluralize(entitySchema.name));
  };

  /** 
    * Infers column name from class property name
    * Default: snakeCase  
    */
  columnName = (propertySchema: PropertySchema, entitySchema: EntitySchema) => {
    return snakeCase(propertySchema.name as string);
  };
}  
