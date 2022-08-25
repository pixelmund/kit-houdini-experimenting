<script lang="ts">
	import type { PageData } from './$houdini';
	import Create from './create.svelte';

	export let data: PageData;

	const { Todos } = data;
	$: todos = $Todos.data?.myTodos.edges || [];
</script>

{#each todos as edge}
	{@const todo = edge?.node}
	<div>
		{#if todo}
			<h3>{todo.text}</h3>
			<input type="checkbox" checked={todo.done} />
		{/if}
	</div>
{/each}

<Create />
