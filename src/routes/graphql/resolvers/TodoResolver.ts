import { db } from '$lib/db';
import { builder } from '../builder';

builder.prismaNode('Todo', {
	// This is used to load the node by id
	findUnique: (id) => ({ id }),
	// This is used to get the id from a node
	id: { resolve: (todo) => todo.id },
	fields: (t) => ({
		text: t.exposeString('text'),
		done: t.exposeBoolean('done'),
		user: t.relation('user'),
		createdAt: t.expose('createdAt', { type: 'DateTime' })
	})
});

const CreateTodoInput = builder.inputType('CreateTodoInput', {
	fields: (t) => ({
		text: t.string({ required: true })
	})
});

builder.queryField('myTodos', (t) =>
	t.prismaConnection({
		type: 'Todo',
		cursor: 'id',
		resolve: (query, _root, _args, _ctx) => {
			return db.todo.findMany({ ...query });
		}
	})
);

builder.mutationField('createTodo', (t) =>
	t.prismaField({
		type: 'Todo',
		args: {
			input: t.arg({ type: CreateTodoInput })
		},
		resolve: (query, _root, { input }) => {
			return {
				id: '121313',
				text: input.text,
				done: false,
				createdAt: new Date(),
				userId: '123',
				updatedAt: new Date(),
				doneAt: null
			};
		}
	})
);
