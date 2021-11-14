<script lang="ts">
	import { getReq } from '../helpers';
	import { Chart, registerables } from 'chart.js';
	import 'chartjs-adapter-luxon';
	import ChartDataLabels from 'chartjs-plugin-datalabels';
	import { Line } from 'svelte-chartjs';
	import { DateTime } from 'luxon';

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
                                        clamp: true,
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
	let allData = [];
	export function updateGraph() {
		prom = getReq(endpoint);
		prom.then(async (resp: any) => {
			resp = await resp.json();
			allData = resp;
			const lineData = [];
			labels = [];
			let energy = 0;
			resp.forEach((log) => {
				labels.push(DateTime.fromISO(toISO(log.timestamp)));
				energy += log.energy_level;
				lineData.push(energy);
			});

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
