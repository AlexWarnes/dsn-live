<script context="module">
	// Should be written like this now
	export async function handle({ event, resolve }) {
		return await resolve(event, {
			ssr: false
		});
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Summary from '../components/Summary.svelte';
	import DishCard from '../components/DishCard.svelte';
	import { diffDataByDish, processDSNResponse } from '../util/utils';
	import type { DSNDataInterface } from '../data/Models';
	import DashboardLoading from '../components/DashboardLoading.svelte';
	import { dishPassesFilters, filters, targetDiffByDish } from '../data/stores';
// import { generateMockData } from '../data/mockData';

	const dsnURL: string = 'https://eyes.nasa.gov/dsn/data/dsn.xml';
	let latestRequest: string = '';
	let requestIntervalUnits = 15;
	let nextRequest: number = 0;

	// let DSNData: DSNDataInterface = generateMockData();
	let DSNData: DSNDataInterface = null;
	// Start making requests based on interval
	onMount(() => {
		async function getDSNData(): Promise<DSNDataInterface> {
			latestRequest = new Date().toLocaleString();
			try {
				// Request DSN Data
				const res = await fetch(dsnURL);

				// Async process the XML response
				return await processDSNResponse(res);
			} catch {
				const err = 'Error fetching data.';
				console.error(err);
				throw new Error(err);
			}
		}

		let requestInterval = setInterval(async () => {
			if (nextRequest <= 0) {
				nextRequest = requestIntervalUnits;
				const nextData = await getDSNData();
				
				// Update the diff to determine notifications
				$targetDiffByDish = diffDataByDish(DSNData, nextData);

				DSNData = nextData;
			} else {
				nextRequest -= 1;
			}
		}, 1000);

		// Clear interval
		return () => {
			clearInterval(requestInterval);
		};
	});

</script>

<svelte:head>
	<title>DSN Live | Dashboard</title>
</svelte:head>

{#if DSNData}
	<Summary {DSNData} {latestRequest} {nextRequest} />
	<div class="dish-grid">
		{#each DSNData['dishes'] as dish (dish['@name'])}
			{#if dishPassesFilters(dish, $filters)}
				<DishCard {dish} updating={nextRequest <= 0} />
			{/if}
		{/each}
	</div>
{:else}
	<DashboardLoading initialDataLoaded={!!DSNData} />
{/if}

<style>
	.dish-grid {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		margin: 20px;
	}
</style>
