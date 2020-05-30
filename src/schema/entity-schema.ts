import { PropertySchema } from "./property-schema";
import { RelationSchema } from "./relation-schema";
import { PkSchema } from "./pk-schema";

export class EntitySchema {
  /**
   * 
   * @param name Name of the entity schema
   */
  constructor(readonly name: string) {
  }
  /**
   * Name of the table (in database model) 
   */
  tableName!: string;
  /**
   * All properties defined in this entity. Sorted by entity name.
   */
  properties = new Map<string, PropertySchema>();

  /**
   * Primary keys for this entity.
   */
  pks!: PkSchema[];

  /**
   * All relations defined in this schema.
   */
  relations: RelationSchema[] = [];
}