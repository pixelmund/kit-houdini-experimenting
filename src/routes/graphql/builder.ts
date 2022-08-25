import SchemaBuilder from '@pothos/core';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import ValidationPlugin from '@pothos/plugin-validation';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { db } from '$lib/db';
import type { RequestEvent } from '@sveltejs/kit';

export interface Context {
	event: RequestEvent;
}

export const builder = new SchemaBuilder<{
	// We change the defaults for arguments to be `required`. Any non-required
	// argument can be set to `required: false`.
	DefaultInputFieldRequiredness: true;
	PrismaTypes: PrismaTypes;
	Context: Context;
	Scalars: {
		// We modify the types for the `ID` type to denote that it's always a string when it comes in.
		ID: { Input: string; Output: string | number };
		DateTime: { Input: Date; Output: Date };
	};
	// Define the shape of the auth scopes that we'll be using:
	AuthScopes: {
		public: boolean;
		// user: boolean;
		// unauthenticated: boolean;
	};
}>({
	defaultInputFieldRequiredness: true,
	plugins: [SimpleObjectsPlugin, ScopeAuthPlugin, ValidationPlugin, RelayPlugin, PrismaPlugin],
	authScopes: async ({}) => ({
		public: true
	}),
	prisma: { client: db },
	relayOptions: {
		cursorType: "String"
	}
});

// This initializes the query and mutation types so that we can add fields to them dynamically:
builder.queryType({});

builder.mutationType({});

// Provide the custom DateTime scalar that allows dates to be transmitted over GraphQL:
builder.scalarType('DateTime', {
	serialize: (date) => date.toISOString(),
	parseValue: (date) => {
		if (typeof date !== 'string') {
			throw new Error('Unknown date value.');
		}
		return new Date(date);
	}
});

import('./schema');
