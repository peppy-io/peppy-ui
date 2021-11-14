<script>
	import { token } from '../globals';
</script>

<!-- source: https://v1.tailwindcss.com/components/navigation#responsive-header -->
<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
	<div class="flex items-center flex-shrink-0 text-white mr-6">
		<a href="/">
			<span class="font-semibold text-xl tracking-tight">Peppy</span>
		</a>
	</div>
	<div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
		<div class="text-sm lg:flex-grow">
			<a
				sveltekit:prefetch
				href="/about"
				class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
			>
				About
			</a>
			{#if $token !== ''}
				<a
					href="/dashboard"
					class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
				>
					My Dashboard
				</a>
			{/if}
		</div>
		<div>
			{#if $token === ''}
				<a
					sveltekit:prefetch
					href="/login"
					class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black-900 hover:bg-blue-400 mt-4 lg:mt-0 transition-all duration-200"
					>Login</a
				>
			{:else}
				<a
					sveltekit:prefetch
					href="/logout"
					class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black-900 hover:bg-blue-400 mt-4 lg:mt-0 transition-all duration-200"
					>Logout</a
				>
			{/if}
		</div>
	</div>
</nav>
