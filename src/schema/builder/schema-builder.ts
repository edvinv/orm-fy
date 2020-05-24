import { EntitySchemaBuilder } from "./entity-schema-builder";
import { IEntitySchemaBuilder, ISchemaBuilder, IEntitySchemaInfo } from "./schema-builder-contracts";
import { ISchema } from "../schema-contracts";
import { buildSchema } from "../build-schema";

export class SchemaBuilder implements ISchemaBuilder {
  constructor() {
  }
  entities: Map<string, IEntitySchemaInfo> = new Map();

  /**
   * 
   * @param name Add new entity to schema builder
   * @param entityBuilderCallback 
   */
  entity(name: string, entityBuilderCallback: (schemaEntityBuilder: IEntitySchemaBuilder) => void): this {
    const entityInfo: IEntitySchemaInfo = {
      name
    };
    this.entities.set(name, entityInfo);

    const schemaEntityBuilder = new EntitySchemaBuilder(entityInfo);
    entityBuilderCallback(schemaEntityBuilder);

    return this;
  }

  build(): ISchema {
    return buildSchema(this);
  }

}
