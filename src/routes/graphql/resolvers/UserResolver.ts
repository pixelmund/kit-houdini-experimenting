import { builder } from '../builder';

builder.prismaNode('User', {
	// This is used to load the node by id
	findUnique: (id) => ({ id }),
	// This is used to get the id from a node
	id: { resolve: (user) => user.id },
	fields: (t) => ({
		username: t.exposeString('username'),
		email: t.exposeString('email'),
		todos: t.relatedConnection('todos', {
			cursor: 'id',
			maxSize: 15,
			defaultSize: 7,
			query: () => ({ orderBy: { createdAt: 'desc' } })
		})
	})
});
