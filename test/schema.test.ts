import { SchemaBuilder, ISchemaEntity } from "../src/schema/schema-builder";

test("Basic schema definition", () => {
  class Customer {
    id!: string;
    firstName?: string;
    lastName?: string;
    contacts!: Contact[];
  }

  class Contact {
    id!: string;
    type!: string;
    value!: string;
  }

  const schemaBuilder = new SchemaBuilder();

  schemaBuilder
    .addEntity<Customer>({
      name: "customer",
      properties: [
        {
          name: "id",
          type: "string"
        },
        {
          name: "firstName",
          type: "string"
        },
        {
          name: "lastName",
          type: "string"
        },
        {
          name: "contacts",
          type: "string"
        }
      ]
    });

  const customerSchemaEntity = schemaBuilder.getEntity("customer") as ISchemaEntity<any>;
  expect(typeof customerSchemaEntity).toBe("object");
  expect(customerSchemaEntity.tableName).toBe("customers");
});

