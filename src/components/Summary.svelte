<script lang="ts">
  import type { DSNData } from "../data/Models";
  import {
    Tag,
    Accordion,
    AccordionItem,
    InlineLoading,
  } from "carbon-components-svelte";
  import { fly, fade } from "svelte/transition";

  import { getUniqueTargetList, updateStationCount } from "../util/utils";

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
      <AccordionItem>
        <div slot="title">
          <h3>Dishes Online:</h3>
          <p>{dishesOnline}</p>
        </div>
        <p>Goldstone: {dishesByStation["Goldstone"]}</p>
        <p>Madrid: {dishesByStation["Madrid"]}</p>
        <p>Canberra: {dishesByStation["Canberra"]}</p>
      </AccordionItem>
      <AccordionItem>
        <div slot="title">
          <h3>Spacecraft:</h3>
          <div class="targets-row">
            <p>{uniqueTargets.length}</p>
            {#if selectedChip}
              <p class="selection" transition:fade={{ duration: 200 }}>
                {selectedChip}
              </p>
            {/if}
          </div>
        </div>
        <div class="target-chip-container">
          {#each uniqueTargets as target (target["id"])}
            <span
              transition:fade
              on:click={() => (selectedChip = target["longName"])}
            >
              <Tag type="cool-gray">
                {target["name"]}
              </Tag>
            </span>
          {/each}
        </div>
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
  }

  .time-row .update-text {
    font-size: 0.75em;
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

  .summary-container :global(h3) {
    font-size: 1.25em;
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
</style>
