<script lang="ts">
  import { DataTable } from "carbon-components-svelte";
  import { fly } from "svelte/transition";

  import type { DownSignalEntry, UpSignalEntry } from "../data/Models";

  // Inputs
  export let signals: UpSignalEntry[] | DownSignalEntry[] = [];
  // export let direction: "Up" | "Down" = undefined;
</script>

<div class="signals-container" in:fly={{ x: -20, duration: 400 }}>
  {#if signals.length > 0}
    <DataTable
      size="compact"
      headers={[
        { key: "@spacecraft", value: "Target" },
        { key: "@signalType", value: "Type" },
        { key: "@signalTypeDebug", value: "Type Debug" },
        { key: "@power", value: "Power" }, // multiply by 100 for kw
        { key: "@frequency", value: "Frequency" }, // divide by 1000 for GHz
        { key: "@dataRate", value: "Data Rate" }, // in bits per second (divide by 1000 for kb/s)
      ]}
      rows={signals.map((s, idx) => {
        return { ...s, id: idx };
      })}
    />
  {:else}
    <p class="empty">No signals</p>
  {/if}
</div>

<style>
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

  .empty {
    margin: 0 0 0 30px;
  }
</style>
