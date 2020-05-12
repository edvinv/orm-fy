import { SchemaBuilder } from "../src/schema/schema-builder";

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
  })