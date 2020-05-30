import { EntitySchema } from "./entity-schema";
import { PropertySchema } from "./property-schema";

export abstract class RelationSchema {
  /**
   * Source entity schema
   */
  entity!: EntitySchema;
    /**
   * Source properties
   */
  properties!: PropertySchema;
  /**
   * Target entity schema
   */
  targetEntity!: EntitySchema;
    /**
   * Target properties
   */
  targetProperties!: PropertySchema;
}