import { DefaultNamingConventions } from "../drivers/default-naming-conventions";

export interface ISchemaProperty<classT> {
  name: keyof classT;
  type: "string" | "number" | "boolean";
  dbType?: string;
  columnName?: string;
}

/**
 * Entity Schema defines mappings between class/properies and table/columns.
 */
export interface ISchemaEntity<classT> {
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
  constructor(private namingConventions = new DefaultNamingConventions()) {
  }

  private entities = new Map<string, ISchemaEntity<any>>();

  addEntity<classT>(schemaEntity: ISchemaEntity<classT>): SchemaBuilder {
    // infer table name
    schemaEntity.tableName = schemaEntity.tableName ?? this.namingConventions.tableName(schemaEntity);

    // infer defaults for properties
    for (const schemaProperty of schemaEntity.properties) {
      // infer column name
      schemaProperty.columnName = schemaProperty.columnName ?? this.namingConventions.columnName(schemaProperty, schemaEntity);

    }

    this.entities.set(schemaEntity.name, schemaEntity);

    return this;
  }

  removeEntity(name: string): void {
    this.entities.delete(name);
  }

  /**
   * Get added entity or undefined if entity was not added
   * @param name Name of the entity
   */
  getEntity(name: string): ISchemaEntity<any> | undefined {
    return this.entities.get(name);
  }

}
