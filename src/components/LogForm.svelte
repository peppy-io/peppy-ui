<script lang="ts">
	import { postReq } from '../helpers';
	import Error from '../components/Error.svelte';
	import ApiResp from '../components/ApiResp.svelte';

	let errors = [];

	const energyLevels = [
		{ text: 'High increase', level: 3 },
		{ text: 'Low increase', level: 2 },
		{ text: 'Smol increase', level: 1 },
		{ text: 'Smol decrease', level: -1 },
		{ text: 'Low decrease', level: -2 },
		{ text: 'High decrease', level: -3 }
	];

	let energyLevel = energyLevels[0];
	let event = '';
	let timestamp = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
        let resp = null;

	function log() {
		let datetime = new Date();
		datetime = new Date(datetime.toDateString() + ' ' + timestamp);
                const data = {
			energy_level: energyLevel.level,
			event: event,
			timestamp: datetime.toUTCString()
		};
                console.log("Logging", data);
		resp = postReq('/log', data);
	}
</script>

<main class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-gray-50">
	<div class="max-w-md w-full space-y-8">
		<div>
			<h2 class="mt-6 text-center text-3xl font-extrabold">Log</h2>
		</div>
		<form class="mt-8 space-y-6">
			<input type="hidden" name="remember" value="true" />
			<div class="rounded-md shadow-sm -space-y-px">
				<div>
					<label for="event" class="sr-only">Event</label>
					<input
						id="event"
						name="event"
						type="text"
						autocomplete="event"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Event"
						bind:value={event}
					/>
				</div>
				<div>
					<label for="energy-level" class="sr-only">Energy level</label>
					<select
						bind:value={energyLevel}
						class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
					>
						{#each energyLevels as energy}
							<option value={energy}>
								{energy.text}
							</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="timestamp" class="sr-only">Time</label>
					<input
						id="timestamp"
						name="timestamp"
						type="time"
						autocomplete="time"
						required
						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
						placeholder="Time"
						bind:value={timestamp}
					/>
				</div>
			</div>

			<Error {errors} />

			<ApiResp prom={resp} />

			<div>
				<button
					type="submit"
					class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					on:click|preventDefault={log}
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<!-- Heroicon name: solid/lock-closed -->
						<svg
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Log
				</button>
			</div>
		</form>
	</div>
</main>
