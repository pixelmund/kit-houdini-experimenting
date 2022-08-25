import fs from 'fs';
import path from 'path';
import { printSchema, lexicographicSortSchema, GraphQLSchema } from 'graphql';
import { builder } from './builder';
import './resolvers';
import { dev } from '$app/env';

export const schema = builder.toSchema({});

function writeSchema(schema: GraphQLSchema) {
	const schemaAsString = printSchema(lexicographicSortSchema(schema));
	const schemaPath = path.join(process.cwd(), 'schema.graphql');

	const existingSchema = fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8');

	// if (existingSchema !== schemaAsString) {
	// 	fs.writeFileSync(schemaPath, schemaAsString);
	// }
	fs.writeFileSync(schemaPath, schemaAsString);
}

if (dev) {
	writeSchema(schema);
}
