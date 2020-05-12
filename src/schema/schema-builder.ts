interface ISchemaProperty<classT> {
  name: keyof classT;
  type: "string" | "number" | "boolean";
  dbType?: string;
  dbColumnName?: string;
}

/**
 * Entity Schema defines mappings between class/properies and table/columns.
 */
interface ISchemaEntity<classT> {
  /**
   * Name of entity
   */
  name: string;
  /**
   * Name of the table in database
   */
  tableName?: string;
  /**
   * Database schema name
   */
  dbSchemaName?: string;
  /**
   * Mappings between class properties and table columns. 
   */
  properties: ISchemaProperty<classT>[];
}

export class SchemaBuilder {
  private entities = new Map<string, ISchemaEntity<any>>();

  addEntity<classT>(schema: ISchemaEntity<classT>): SchemaBuilder {
    this.entities.set(schema.name, schema);

    return this;
  }

  removeEntity(name: string): void {
    this.entities.delete(name);
  }
}
