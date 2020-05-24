import { IEntitySchemaBuilder, IPropertySchemaBuilder, IEntitySchemaInfo, IPropertySchemaInfo, ITableSchemaBuilderOption } from "./schema-builder-contracts";
import { SchemaPropertyBuilder } from "./property-schema-builder";

export class EntitySchemaBuilder implements IEntitySchemaBuilder {
  constructor(readonly entitySchemaBuilderOptions: IEntitySchemaInfo) {
  }
  properties: Map<string, IPropertySchemaInfo> = new Map();
  tableOptions?: ITableSchemaBuilderOption;

  /**
   * Set database options for entity
   * @param tableNameOrOptions
   */
  table(tableNameOrOptions: string | ITableSchemaBuilderOption): this {
    this.tableOptions = typeof tableNameOrOptions === "string" ? { tableName: tableNameOrOptions } as ITableSchemaBuilderOption : tableNameOrOptions;
    return this;
  }

  /**
   * Add new property to schema
   * @param name 
   */
  property(name: string): IPropertySchemaBuilder {
    const propertyInfo: IPropertySchemaInfo = {
      name
    };
    this.properties.set(name, propertyInfo);

    const schemaPropertyBuilder = new SchemaPropertyBuilder(propertyInfo)
    return schemaPropertyBuilder;
  }
}