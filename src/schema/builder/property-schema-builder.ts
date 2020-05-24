import { IPropertySchemaBuilder, IColumnSchemaBuilderOption, IPropertySchemaInfo, IOneToOnePropertySchemaBuilder, IManyToOnePropertySchemaBuilder, IManyToManyPropertySchemaBuilder } from "./schema-builder-contracts";

export class SchemaPropertyBuilder implements IPropertySchemaBuilder {
  constructor(readonly propertySchema: IPropertySchemaInfo) {
  }

  column(options: IColumnSchemaBuilderOption): this {
    if (options) {
      Object.assign(this.propertySchema, options);
    }
    return this;
  }
  pk(): this {
    this.propertySchema.pk = true;
    return this;
  }

  oneToOne(options: IOneToOnePropertySchemaBuilder): this{
    return this;
  }
  manyToOne(options: IManyToOnePropertySchemaBuilder): this{
    return this;
  }
  manyToMany(options: IManyToManyPropertySchemaBuilder): this{
    return this;
  }


}
