<script lang="ts">
  import {
    getHumanReadableLightTime,
    getHumanReadableRange,
    getSpacecraftDetails,
  } from "../util/utils";
  import { Tag, TooltipDefinition, DataTable } from "carbon-components-svelte";
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
          <Tag type="cool-gray">{target["@name"]}</Tag>
        </TooltipDefinition>
        <span class="target-detail"
          >{getHumanReadableLightTime(target["@rtlt"])
            ? getHumanReadableLightTime(target["@rtlt"]) + " @ "
            : ""}{getHumanReadableRange(target["@downlegRange"])}</span
        >
      </div>
    {/each}
    <!-- <DataTable
      size="compact"
      headers={[
        { key: "longName", value: "Name" },
        { key: "@name", value: "Abbr" },
        { key: "@downlegRange", value: "Range" },
        { key: "@rtld", value: "Light Hours" },
      ]}
      rows={targets.map((t) => {
        return {
          ...t,
          id: t["@id"],
          longName: getSpacecraftDetails(t).longName,
          "@rtld": getHumanReadableLightTime(t["@rtlt"]),
          "@downlegRange": getHumanReadableRange(t["@downlegRange"]),
        };
      })}
    /> -->
  {:else}
    <p>No Targets</p>
  {/if}
</div>

<style>
  .target-container {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-direction: column;
    padding: 0 30px;
  }
  .target-row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin: 5px 0;
  }

  .target-row :global(.bx--tag) {
    word-break: normal;
  }

  .target-detail {
    margin: 0 0 0 5px;
  }
</style>
