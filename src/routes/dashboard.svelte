<script lang="ts">
	import { token } from '../globals';
	import { goto } from '$app/navigation';
	import { Line } from 'svelte-chartjs';

	// TODO: validate token from backend here
	if ($token === '') {
		goto('/login');
	}

	const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
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
				}
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
</main>
