<script lang="ts">
	import Info from '../components/Info.svelte';
	import Error from '../components/Error.svelte';

	export let prom = null;
        export let callback = (_: Response) => {};
</script>

{#if prom !== null}
	{#await prom}
		<p>Loading...</p>
	{:then resp}
                {#if resp.ok}
                    {callback(resp) || ""}
                    <Info info="Success!" />
                {:else}
                    {#await resp.text() then text}
                        <Error errors={[text]} mainMessage="Oops! There were some errors:" />
                    {/await}
                {/if}
	{:catch error}
		<Error errors={[error]} mainMessage="Oops! There were some errors:" />
	{/await}
{/if}
