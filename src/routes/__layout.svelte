<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path
		}
	});
</script>

<script>
	import '../app.css';
	import PageTransitions from '../components/PageTransition.svelte';
	import NavBar from '../components/NavBar.svelte';
	export let key;
</script>

<NavBar />

<PageTransitions refresh={key}>
	<slot />
</PageTransitions>
