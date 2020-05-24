import { ISchemaBuilder } from "./builder/schema-builder-contracts";
import { ISchema } from "./schema-contracts";
import { SchemaBuilder } from "./builder/schema-builder";
import { Schema } from "./schema";


export function buildSchema(schemaBuilder: ISchemaBuilder): ISchema {
  const schema = new Schema();
  return schema;
}