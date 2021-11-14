<script lang="ts">
	import { getReq } from '../helpers';
	import { Chart, registerables } from 'chart.js/dist/chart.esm';
	import 'chartjs-adapter-luxon';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Line } from 'svelte-chartjs';
	import { DateTime, Settings } from 'luxon';

	Chart.register(...registerables, ChartDataLabels);

	export let endpoint = '/energyLevels/day';
	export let name = "Todays' energy level";

	let labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				label: name,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [5, 10, -5, 0, 5, 10],
				pointBorderWidth: 2,
				pointHoverRadius: 1,
				lineTension: 0.3,
				color: '#fff',
				datalabels: {
					formatter: function (value: string, context) {
						return allData[context.dataIndex].event;
					},
					backgroundColor: 'rgba(255, 99, 132, 0.8)',
					borderRadius: 5,
					color: '#fff',
					padding: 3,
					align: 'end',
					anchor: 'end',
					clamp: true
				}
			},
			{
				label: 'Baseline',
				data: Array(6).fill(0),
				backgroundColor: 'rgb(100, 100, 100, 0.5)',
				borderColor: 'rgb(100, 100, 100, 0.5)',
				pointRadius: 0,
				color: '#fff',
				datalabels: {
					display: false
				}
			}
		]
	};

	// converts "2021-11-14 07:30:00 +0530" to "2021-11-14T07:30:00+0530"
	function toISO(timestamp: string) {
		return timestamp.replace(' ', 'T').replace(' ', '');
	}

	let prom = null;
	let finalEnergy = 0;
	let count = 0;
	let allData = [];
	export function updateGraph() {
		prom = getReq(endpoint);
		prom.then(async (resp: any) => {
			resp = await resp.json();
			allData = resp;
			const lineData = [];
			labels = [];
			let energy = 0;
			let lastDay = 0;
			resp.forEach((log) => {
				let dt = DateTime.fromISO(toISO(log.timestamp), { setZone: true }).setZone(
					Settings.defaultZone,
					{ keepLocalTime: true }
				);
				labels.push(dt);
				if (dt.day != lastDay) {
					energy = 0;
					lastDay = dt.day;
				}
				energy += log.energy_level;
				lineData.push(energy);
			});
			finalEnergy = energy;
			count = resp.length;
			console.log(finalEnergy, count);

			data.labels = labels;
			data.datasets[0].data = lineData;
			data.datasets[1].data = Array(lineData.length).fill(0);
			console.log(data);
		});
	}
	updateGraph();

	const fontSize = 15;
	const fontColor = 'white';

	const options = {
		responsive: true,
		scales: {
			x: {
				ticks: {
					color: fontColor
				},
				font: {
					size: fontSize
				},
				title: {
					color: fontColor
				},
				type: 'time'
			},
			y: {
				ticks: {
					color: fontColor
				},
				font: {
					size: fontSize
				},
				title: {
					color: fontColor
				}
			}
		},
		grid: {
			font: {
				size: fontSize
			},
			color: fontColor
		},
		title: {
			font: {
				size: fontSize
			},
			color: fontColor
		},
		plugins: {
			legend: {
				labels: {
					font: {
						size: fontSize
					},
					color: fontColor
				}
			}
		}
	};
</script>

<Line {data} {options} />

{#if count <= 1}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">Try adding more events.</p>
		<img class="illus" src="/monk-stickman.png" alt="A stickman monk meditating" />
	</div>
{:else if finalEnergy > 0 && finalEnergy < 10}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">You're doing alright. Keep it up!</p>
		<img class="illus" src="/happy-stick-figure.png" alt="A happy stick figure" />
	</div>
{:else if finalEnergy >= 10}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">You can move mountains with all this energy!</p>
		<img class="illus" src="/jumping.svg" alt="A vector illustration of a jumping man" />
	</div>
{:else if finalEnergy < 0 && finalEnergy >= -10}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">Not very good :( Try to take some rest.</p>
		<img
			class="illus"
			src="/lazy-stickman-sleeping-on-office-desk.png"
			alt="A stickman sleeping on a work desk"
		/>
	</div>
{:else if finalEnergy < -10}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">Don't overwork yourself. Take rest.</p>
		<img
			class="illus"
			src="/employee-tired-and-battery-down.svg"
			alt="A tired man bending, with a low battery indictor on top of him."
		/>
	</div>
{:else}
	<div class="flex flex-col items-center">
		<p class="text-xl pt-10 pb-4">Meh</p>
		<img class="illus" src="/monk-stickman.png" alt="A stickman monk meditating" />
	</div>
{/if}

<style>
	.illus {
		width: 40%;
		background-color: #ffffffdd;
		color: #000;
		@apply rounded-xl;
	}
</style>
