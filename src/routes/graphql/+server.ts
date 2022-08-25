import { useGraphQlJit } from '@envelop/graphql-jit';
import { createServer } from '@graphql-yoga/common';
import type { RequestEvent } from '@sveltejs/kit';

const yogaApp = createServer<RequestEvent>({
	logging: false,
	schema: {
		typeDefs: `
			type Query {
				hello: String
			}
		`,
		resolvers: {
			Query: {
				hello: () => 'SvelteKit - GraphQL Yoga'
			}
		}
	},
	plugins: [
		useGraphQlJit()
	],
	graphiql: {
		endpoint: '/graphql',
		defaultQuery: ``
	}
});

export function GET(event: RequestEvent) {
	return yogaApp.handleRequest(event.request, event);
}

export function POST(event: RequestEvent) {
	return yogaApp.handleRequest(event.request, event);
}
