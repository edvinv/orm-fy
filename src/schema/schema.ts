import { ISchema } from "./schema-contracts";
import { EntitySchema } from "./entity-schema";

export class Schema implements ISchema {
  /**
   * 
   * @param name Name of the schema
   */
  constructor(name = "default") {
  }

  /**
   * All entities defined for this schema. Key is entity name.
   */
  private entities = new Map<string, EntitySchema>();

  /**
   * Entities defined for this schema that have ctor function defined. Key is ctor name
   */
  private entitiesByCtorName = new Map<string, EntitySchema>();

  /**
   * Returns schema name from object instance. Default implementation returns value of "__discriminator__" property.  
   * @param obj Object instance
   */
  identifyEntitySchemaName = (obj: Object) => {
    return (obj as any).__discriminator__;
  }

  /**
   * Returns entity schema from object instance. If object has ctor name other then "Object" it will first look in entitiesByCtorName map.
   * If there is no match it will try to identify object with method identifyEntitySchemaName.    
   * @param obj 
   */
  findEntityFromObject(obj: Object): EntitySchema | undefined {
    let entitySchema: EntitySchema | undefined;
    const ctorName = obj.constructor.name;
    if (ctorName !== "Object") {
      entitySchema = this.entitiesByCtorName.get(ctorName);
    }
    if (!entitySchema) {
      const entitySchemaName = this.identifyEntitySchemaName(obj);
      if (typeof entitySchemaName === "string") {
        entitySchema = this.entities.get(entitySchemaName);
      }
    }
    return entitySchema;
  }
}