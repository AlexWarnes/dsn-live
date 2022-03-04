<script lang="ts">
	import type { DSNDataInterface } from '../data/Models';
	import { filters } from '../data/stores';
	import StationSummaryChart from './StationSummaryChart.svelte';
	import DataFilters from './DataFilters.svelte';
	import BrowserNotifications from './BrowserNotifications.svelte';
	import { Accordion, AccordionItem, InlineLoading } from 'carbon-components-svelte';

	import { fly } from 'svelte/transition';

	import { getSummarizedDataByStation } from '../util/utils';

	export let DSNData: DSNDataInterface = null;
	export let latestRequest: string = '';
	export let nextRequest: number = 0;

	$: dataTimestamp =
		DSNData && DSNData.timestamp ? new Date(Number(DSNData.timestamp)).toLocaleString() : '';

	$: goldstoneSummary = getSummarizedDataByStation('goldstone', DSNData);
	$: madridSummary = getSummarizedDataByStation('madrid', DSNData);
	$: canberraSummary = getSummarizedDataByStation('canberra', DSNData);
</script>

<section class="summary-container">
	{#if DSNData}
		<Accordion>
			<div>
				<!-- <h3>Data Timestamp:</h3> -->
				<div class="time-row">
					<p class="timestamp">{dataTimestamp}</p>

					{#if nextRequest}
						<p
							class="abs right update-text"
							in:fly={{ x: -10, duration: 250 }}
							out:fly={{ x: 10, duration: 250 }}
						>
							Update: {nextRequest + 's'}
						</p>
					{:else}
						<span
							class="abs right"
							in:fly={{ x: -10, duration: 250 }}
							out:fly={{ x: 10, duration: 250 }}
						>
							<InlineLoading description="Updating..." />
						</span>
					{/if}
				</div>
			</div>
			<AccordionItem>
				<div slot="title">
					<h3>Data Filters & Notifications</h3>
				</div>
				<div class="filter-notify-row">
					<DataFilters />
					<BrowserNotifications />
				</div>
			</AccordionItem>
			<AccordionItem style="padding-right: 0;" open>
				<div slot="title">
					<h3>Summary of Station Activity</h3>
				</div>
				<!-- Data Table -->
				<article class="station-summary-container">
					<div class="station-summary-flex-row">
						<div
							class="summary-box"
							style:opacity={$filters.visibleStations.includes('GOLDSTONE') ? 1 : 0.5}
						>
							<h4 class="station-name">GOLDSTONE</h4>
							<StationSummaryChart stationSummary={goldstoneSummary} />
						</div>
						<div
							class="summary-box"
							style:opacity={$filters.visibleStations.includes('CANBERRA') ? 1 : 0.5}
						>
							<h4 class="station-name">CANBERRA</h4>
							<StationSummaryChart stationSummary={canberraSummary} />
						</div>
						<div
							class="summary-box"
							style:opacity={$filters.visibleStations.includes('MADRID') ? 1 : 0.5}
						>
							<h4 class="station-name">MADRID</h4>
							<StationSummaryChart stationSummary={madridSummary} />
						</div>
					</div>
				</article>
			</AccordionItem>
		</Accordion>
	{:else}
		<p>Loading...</p>
	{/if}
</section>

<style>
	.summary-container {
		margin: 0 auto;
		padding: 20px;
		width: 100%;
		max-width: 840px;
		background-color: var(--black-alpha);
		border-radius: 3px;
		box-shadow: 3px 3px 5px #00000045;
	}

	.time-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding: 0 1rem .5rem;
	}

	.time-row .timestamp {
		font-size: .75rem;
	}

	.time-row .update-text {
		font-size: 0.75em;
	}

	.station-summary-container {
		padding: 10px 20px;
	}

	.station-summary-flex-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		margin: 0 -1rem;
	}

	.filter-notify-row {
		width: 100%;
		min-height: 18rem;
		max-height: 32rem;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
	}

	.abs.right {
		right: 0;
	}

	.summary-box {
		flex-grow: 1;
		margin: 12px 0 4px 0;
	}

	.summary-container :global(h3) {
		font-size: 1.25em;
		font-weight: 600;
	}
	h4 {
		font-size: 1em;
		font-weight: 600;
	}

	.summary-container :global(.bx--inline-loading) {
		width: unset;
		min-height: unset;
	}
	.summary-container :global(.bx--inline-loading__animation) {
		width: 24px;
		height: 24px;
		margin: 0 5px 0 0;
	}

	.summary-container :global(.bx--loading__stroke) {
		stroke: var(--blue-1);
	}

	.summary-container :global(.bx--data-table-header) {
		background: transparent;
	}
</style>
