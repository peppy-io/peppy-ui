<script>
	import Info from '../components/Info.svelte';
	import Error from '../components/Error.svelte';

	export let prom = null;
</script>

{#if prom !== null}
	{#await prom}
		<p>Loading...</p>
	{:then resp}
		<Info info={resp.text} />
	{:catch error}
		<Error errors={[error]} mainMessage="Oops! There were some errors:" />
	{/await}
{/if}
