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
	import { Loading } from 'carbon-components-svelte';
	import Summary from '../components/Summary.svelte';
	import DishCard from '../components/DishCard.svelte';
	import { processDSNResponse } from '../util/utils';
	import type { DSNDataInterface } from '../data/Models';

	const dsnURL: string = 'https://eyes.nasa.gov/dsn/data/dsn.xml';
	let latestRequest: string = '';
	let requestIntervalUnits = 15;
	let nextRequest: number = 0;

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
				DSNData = await getDSNData();
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
			<DishCard {dish} updating={nextRequest <= 0} />
		{/each}
	</div>
{:else}
	<Loading />
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
