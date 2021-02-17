<script lang="ts">
  import type { DSNData } from "../data/Models";
  import StationSummaryChart from "./StationSummaryChart.svelte";
  import {
    Tag,
    Accordion,
    AccordionItem,
    InlineLoading,
    DataTable,
    Toolbar,
    ToolbarContent,
  } from "carbon-components-svelte";
  import ArrowDown16 from "carbon-icons-svelte/lib/ArrowDown16";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";

  import { fly, fade } from "svelte/transition";

  import {
    getSummarizedDataByStation,
    getUniqueTargetList,
    updateStationCount,
  } from "../util/utils";

  export let DSNData: DSNData = null;
  export let latestRequest: string = "";
  export let nextRequest: number = 0;
  let selectedChip = "";
  let dishesOnline = 0;
  let dishesByStation = {
    Goldstone: 0,
    Madrid: 0,
    Canberra: 0,
  };
  $: {
    let counts = updateStationCount(DSNData);
    dishesOnline = counts["dishTotal"];
    dishesByStation = counts["dishCountByStation"];
  }

  $: dataTimestamp =
    DSNData && DSNData.timestamp
      ? new Date(Number(DSNData.timestamp)).toLocaleString()
      : "";

  $: uniqueTargets = getUniqueTargetList(DSNData);
  $: goldstoneSummary = getSummarizedDataByStation("goldstone", DSNData);
  $: madridSummary = getSummarizedDataByStation("madrid", DSNData);
  $: canberraSummary = getSummarizedDataByStation("canberra", DSNData);
</script>

<section class="summary-container">
  {#if DSNData}
    <Accordion>
      <AccordionItem>
        <div slot="title">
          <h3>Data Timestamp:</h3>
          <div class="time-row">
            <p>{dataTimestamp}</p>

            {#if nextRequest}
              <p
                class="abs right update-text"
                in:fly={{ x: -10, duration: 250 }}
                out:fly={{ x: 10, duration: 250 }}
              >
                Update: {nextRequest + "s"}
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
        <p>Latest Request: {latestRequest}</p>
        <p>Next Request: {nextRequest ? nextRequest + "s" : "Loading..."}</p>
      </AccordionItem>
    </Accordion>
    <!-- Data Table -->
    <article class="station-summary-container">
      <h3>Summary of Station Activity</h3>
      <div class="station-summary-flex-row">
        <div class="summary-box">
          <h4 class="station-name">GOLDSTONE</h4>
          <StationSummaryChart stationSummary={goldstoneSummary} />
        </div>
        <div class="summary-box">
          <h4 class="station-name">CANBERRA</h4>
          <StationSummaryChart stationSummary={canberraSummary} />
        </div>
        <div class="summary-box">
          <h4 class="station-name">MADRID</h4>
          <StationSummaryChart stationSummary={madridSummary} />
        </div>
      </div>
    </article>
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
  }

  .targets-row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .targets-row .selection {
    margin: 0 0 0 15px;
  }

  .abs.right {
    right: 0;
  }

  .target-chip-container {
    max-width: 320px;
    overflow: auto;
    padding: 15px 0 20%;
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
