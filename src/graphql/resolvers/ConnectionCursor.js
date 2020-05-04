import { createRequire } from "module";

const require = createRequire(import.meta.url); // eslint-disable-line
const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const toCursor = (value) => (value ? Buffer.from(value).toString("base64") : null);
const fromCursor = (cursor) => (cursor ? Buffer.from(cursor, "base64").toString("utf8") : null);

const description = `
An opaque string that identifies a particular result within a connection,
allowing you to request a subset of results before or after that result.
`;

export default new GraphQLScalarType({
  description,
  name: "Cursor",
  serialize: toCursor,
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) return fromCursor(ast.value);
    return null;
  },
  parseValue: fromCursor
});
