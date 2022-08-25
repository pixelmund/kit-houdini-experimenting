<script lang="ts">
	import { type AddTodoStore, graphql } from '$houdini';

	let value: string = '';

	const AddTodo: AddTodoStore = graphql`
		mutation AddTodo($input: CreateTodoInput!) {
			createTodo(input: $input) {
				...My_Todos_insert
			}
		}
	`;

	async function createTodo() {
		await AddTodo.mutate({ input: { text: value } });
	}
</script>

<form on:submit|preventDefault={createTodo}>
	<input type="text" bind:value />
	<button type="submit"> Add </button>
</form>
