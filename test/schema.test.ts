import { SchemaBuilder} from "../src";

test("Basic schema definition", () => {
  const schemaBuilder = new SchemaBuilder();

  schemaBuilder
    .entity("customer", _ => {
      _.property("id").pk();
      _.property("firstName");
      _.property("lastName");
      _.property("contacts");
    })
    .entity("contacts", _ => {
      _.property("id").pk();
      _.property("type");
      _.property("value");
      _.property("contacts");
    });

  expect(typeof schemaBuilder).toBe("object");
});

