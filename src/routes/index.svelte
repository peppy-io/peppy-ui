<script>
	import { token } from '../globals';
	import Footer from '../components/Footer.svelte';
</script>

<main class="container mx-auto px-4 sm:px-6 lg:px-8">
	<div class="py-16">
		<p class="short-intro">
			You know those days when you <span class="text-red-200">don't feel like doing anything?</span>
		</p>
		<p class="short-intro">
			When a meeting <span class="text-red-200">saps all the energy out of you?</span>
		</p>
		<p class="short-intro">With <span class="text-green-400">Peppy</span>, you can track them!</p>
	</div>

	<div class="flex self-center justify-items-center justify-center justify-self-center pb-20">
		{#if $token === ''}
			<a sveltekit:prefetch href="/login">
				<button
					type="button"
					class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Get started
				</button>
			</a>
		{:else}
			<a sveltekit:prefetch href="/dashboard">
				<button
					type="button"
					class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Go to dashboard
				</button>
			</a>
		{/if}
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center content-center">
		<div class="p-10 text-xl">
			✍️ You log how energetic or motivated you feel throughout the day. If something you did, like
			attending a meeting or playing a game, made you gain/lose energy, add them to Peppy.
		</div>
		<img class="rounded-xl" src="/batteries.svg" alt="A person with various energy levels" />
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center content-center">
		<img
			class="rounded-xl"
			src="/graphs.svg"
			alt="A vector illustration of a person looking at a graph"
		/>
		<div class="p-10 text-xl">
			📈 At the end of the day, you can see how you felt throughout the day, the last month or
			throughout your usage of Peppy.
		</div>
	</div>
</main>

<Footer />

<style>
	.short-intro {
		@apply text-3xl;
		@apply font-semibold;
		@apply text-center;
		@apply pb-3;
	}
</style>
