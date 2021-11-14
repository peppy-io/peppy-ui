<script>
	import Footer from '../components/Footer.svelte';
</script>

<main class="container mx-auto px-4">
	<p class="text-xl py-5">
		Peppy was built at <a href="https://fossunited.org/fosshack/2021/">FOSS Hack 2021</a> by
		<a href="https://github.com/Samyak2/">Samyak</a>
		and <a href="https://github.com/psiayn/">Pranav</a>.
	</p>

	<p class="text-lg py-4">
		Peppy is completely open source. You can find all of the code powering Peppy in our GitHub
		organization: <a href="https://github.com/peppy-io" class="underline">peppy-io</a>
	</p>

	<p class="text-lg">Attributions:</p>
	<ul class="list-inside list-disc">
		<li>
			<a href="https://iconscout.com/illustrations/flat" target="_blank"
				>Flat Design Illustration For Presentation, Web, Landing Page: A Man Tired With A Dead
				Battery And Energetic With A Full Battery Illustration</a
			>
			on <a href="https://iconscout.com">Iconscout</a>
		</li>
		<li>
			<a href="https://iconscout.com/illustrations/employee" target="_blank"
				>Employee tired and battery down Illustration</a
			>
			on <a href="https://iconscout.com">Iconscout</a>
		</li>
		<li>
			<a href="https://iconscout.com/illustrations/indian" target="_blank"
				>Indian man analysis company growth Illustration</a
			>
			by <a href="https://iconscout.com/contributors/iconscout" target="_blank">Iconscout Store</a>
		</li>
		<li>
			<a href="https://iconscout.com/illustrations/lazy" target="_blank"
				>Lazy Stickman sleeping on office desk Illustration</a
			>
			on <a href="https://iconscout.com">Iconscout</a>
		</li>
		<li>
			<a href="https://iconscout.com/illustrations/jumping" target="_blank">Jumping Illustration</a>
			on <a href="https://iconscout.com">Iconscout</a>
		</li>
	</ul>
</main>

<Footer />

<style>
	img {
		width: 30em;
	}
	a {
		@apply underline;
	}
</style>
