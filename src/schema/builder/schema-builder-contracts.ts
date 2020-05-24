
export interface ISchemaBuilder {
  entity(name: string, entityBuilderCallback: (schemaEntityBuilder: IEntitySchemaBuilder) => void): this;
}

export interface IEntitySchemaInfo {
  name: string;
}

export interface ITableSchemaBuilderOption {
  tableName: string;
}

export interface IEntitySchemaBuilder {
  table(tableNameOrOptions: string | ITableSchemaBuilderOption): this;
  property(name: string): IPropertySchemaBuilder;
}

export interface IPropertySchemaInfo {
  name: string;
  pk?: boolean;
  columnName?: string;
  columnType?: string;
  notNull?: boolean;
}

export interface IColumnSchemaBuilderOption {
  columnName?: string;
  columnType?: string;
  notNull?: boolean;
}

export interface IOneToOnePropertySchemaBuilder {
}

export interface IManyToOnePropertySchemaBuilder {
}

export interface IManyToManyPropertySchemaBuilder {
}

export interface IPropertySchemaBuilder {
  column(options: IColumnSchemaBuilderOption): this;
  pk(): this;
  oneToOne(options: IOneToOnePropertySchemaBuilder): this;
  manyToOne(options: IManyToOnePropertySchemaBuilder): this;
  manyToMany(options: IManyToManyPropertySchemaBuilder): this;
}
