<script lang="ts">
  import { getHumanReadableRange, getSpacecraftDetails } from "../util/utils";
  import { Tag, TooltipDefinition } from "carbon-components-svelte";
  import type { TargetEntry } from "../data/Models";
  import { fly } from "svelte/transition";

  export let targets: TargetEntry[] = [];
</script>

<div class="target-container" in:fly={{ x: -20, duration: 400 }}>
  {#if targets.length > 0}
    {#each targets as target (target["@id"])}
      <div class="target-row">
        <TooltipDefinition
          tooltipText={getSpacecraftDetails(target)["longName"] || "UNKNOWN"}
          align="start"
        >
          <Tag>{target["@name"]}</Tag>
        </TooltipDefinition>
        <span class="target-detail"
          >{getHumanReadableRange(target["@downlegRange"])}</span
        >
      </div>
    {/each}
  {/if}
</div>

<style>
  .target-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-direction: column;
  }
  .target-row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin: 5px 0;
  }

  .target-detail {
    margin: 0 5px;
  }
</style>
