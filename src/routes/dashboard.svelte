<script lang="ts">
	import { token } from '../globals';
	import { getReq } from '../helpers';
	import { goto } from '$app/navigation';
	import { Chart, registerables } from 'chart.js';
	import 'chartjs-adapter-luxon';
	import { Line } from 'svelte-chartjs';
	import ApiResp from '../components/ApiResp.svelte';
	import LogForm from '../components/LogForm.svelte';
	import { DateTime } from 'luxon';

	Chart.register(...registerables);

	// TODO: validate token from backend here
	if ($token === '') {
		goto('/login');
	}

	let prom = getReq('/energyLevels/day');

	let labels = [];
	const data = {
		labels: labels,
		datasets: [
			{
				label: "Today's energy level",
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgb(255, 99, 132)',
				data: [5, 10, -5, 0, 5, 10],
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				lineTension: 0.3,
				color: '#fff'
			},
			{
				label: 'Baseline',
				data: Array(6).fill(0),
				backgroundColor: 'rgb(100, 100, 100, 0.5)',
				borderColor: 'rgb(100, 100, 100, 0.5)',
				color: '#fff'
			}
		]
	};

        // converts "2021-11-14 07:30:00 +0530" to "2021-11-14T07:30:00+0530"
	function toISO(timestamp: string) {
		return timestamp.replace(' ', 'T').replace(' ', '');
	}

	prom.then(async (resp: any) => {
		resp = await resp.json();
		const lineData = [];
		resp.forEach((log) => {
			console.log(log);
			labels.push(DateTime.fromISO(toISO(log.timestamp)));
			lineData.push(log.energy_level);
		});

		data.labels = labels;
		data.datasets[0].data = lineData;
		data.datasets[1].data = Array(lineData.length).fill(0);
		console.log(data);
	});

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
				type: 'time',
				/* time: { */
				/* 	unit: 'hour' */
				/* } */
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

<main class="md:container md:mx-auto px-4">
	<h1 class="text-3xl">Your energy levels for today:</h1>

	<!-- TODO: get data from api, form to log a task -->

	<Line {data} {options} />

	<ApiResp {prom} />

	<LogForm />
</main>
