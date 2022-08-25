import { useGraphQlJit } from '@envelop/graphql-jit';
import { createServer } from '@graphql-yoga/common';
import type { RequestEvent } from '@sveltejs/kit';
import { schema } from './schema';

const yogaApp = createServer<RequestEvent>({
	logging: false,
	schema,
	plugins: [useGraphQlJit()],
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
