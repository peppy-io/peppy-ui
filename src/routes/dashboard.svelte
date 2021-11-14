<script lang="ts">
	import { token } from '../globals';
	import { goto } from '$app/navigation';
	import { Chart, registerables } from 'chart.js';
	import 'chartjs-adapter-luxon';
        import ChartDataLabels from 'chartjs-plugin-datalabels';
	import LogForm from '../components/LogForm.svelte';
	import Graph from '../components/Graph.svelte';

	Chart.register(...registerables, ChartDataLabels);

	// TODO: validate token from backend here
	if ($token === '') {
		goto('/login');
	}

	let graph1 = { updateGraph: () => {} };
	let graph2 = { updateGraph: () => {} };
	let graph3 = { updateGraph: () => {} };
        let currentGraph = graph1;

	let selectedGraph = 'day';

	function changeGraph() {
            console.log("Changing graph to", selectedGraph);
            switch (selectedGraph) {
                case 'day': currentGraph = graph1;
                case 'month': currentGraph = graph2;
                case 'all': currentGraph = graph3;
            }
            console.log(currentGraph);
	}

	function changeGraphTo(name: string) {
		selectedGraph = name;
                changeGraph();
	}
</script>

<main class="md:container md:mx-auto px-4">
	<div>
		<div class="sm:hidden">
			<label for="tabs" class="sr-only">Select a tab</label>
			<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
			<select
				id="tabs"
				name="tabs"
				class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
				bind:value={selectedGraph}
				on:change={changeGraph}
			>
				<option selected value="day">Today</option>

				<option value="month">Last month</option>

				<option value="all">All time</option>
			</select>
		</div>
		<div class="hidden sm:block">
			<nav class="flex space-x-4" aria-label="Tabs">
				<!-- Current: "bg-indigo-100 text-indigo-700", Default: "text-gray-500 hover:text-gray-700" -->
				{#if selectedGraph == 'day'}
					<button
						class="bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('day')}
					>
						Today
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('day')}
					>
						Today
					</button>
				{/if}

				{#if selectedGraph == 'month'}
					<button
						class="bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('month')}
					>
						Last month
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('month')}
					>
						Last month
					</button>
				{/if}

				{#if selectedGraph == 'all'}
					<button
						class="bg-indigo-100 text-indigo-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('all')}
					>
						All time
					</button>
				{:else}
					<button
						class="text-gray-500 hover:text-gray-700 px-3 py-2 font-medium text-sm rounded-md"
						on:click={() => changeGraphTo('all')}
					>
						All time
					</button>
				{/if}
			</nav>
		</div>
	</div>

	{#if selectedGraph == 'day'}
		<h1 class="text-3xl">Your energy levels for today:</h1>
		<Graph bind:this={graph1} endpoint={'/energyLevels/day'} name={"Today's energy levels"} />
	{:else if selectedGraph == 'month'}
		<h1 class="text-3xl">Your energy levels for the last month:</h1>
		<Graph bind:this={graph2} endpoint={'/energyLevels/month'} name={"Last month's energy levels"} />
	{:else if selectedGraph == 'all'}
		<h1 class="text-3xl">Your energy levels:</h1>
		<Graph bind:this={graph3} endpoint={'/energyLevels'} name={"All time energy levels"} />
	{/if}

	<LogForm callback={() => currentGraph.updateGraph()} />
</main>
