<script lang="ts">
  import { getSpacecraftDetails } from "../util/utils";
  import { DataTable } from "carbon-components-svelte";
  import { fly } from "svelte/transition";

  import type { DownSignalEntry, UpSignalEntry } from "../data/Models";

  export let signals: UpSignalEntry[] | DownSignalEntry[] = [];
  export let direction: "Up" | "Down" = undefined;
</script>

<div class="signals-container" in:fly={{ x: -20, duration: 400 }}>
  <h3>{direction} Signals</h3>
  {#if signals.length > 0}
    <DataTable
      size="compact"
      headers={[
        { key: "@spacecraft", value: "Target" },
        { key: "@type", value: "Type" },
        { key: "@power", value: "Power" }, // multiply by 100 for kw
        { key: "@frequency", value: "Frequency" }, // divide by 1000 for GHz
        { key: "@dataRate", value: "Data" },
      ]}
      rows={signals.map((s, idx) => {
        return { ...s, id: idx };
      })}
    />
  {:else}
    <p>No signals</p>
  {/if}
</div>

<style>
  h3 {
    font-size: 1em;
    font-weight: 600;
  }
  .signals-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-direction: column;
  }

  .signals-container :global(.bx--data-table-container) {
    width: 100%;
  }
</style>
