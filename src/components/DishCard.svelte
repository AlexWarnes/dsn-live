<script lang="ts">
  import type { Dish } from "../data/Models";
  import { getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";
  import {
    Tag,
    TooltipDefinition,
    Tooltip,
    Icon,
  } from "carbon-components-svelte";
  import { Launch32 } from "carbon-icons-svelte";

  export let dish: Dish = null;
</script>

<article class="dish-container {dish['metadata']['status']}">
  <h2>{dish["@name"]}</h2>
  <div class="dish-details">
    <div class="row">
      <h3>TARGETS</h3>
      <Tooltip align="center">
        <ul>
          {#each dish["target"] as target}
            {#each getSpacecraftDetails(target)["sources"] as source}
              <li>
                <a href={source.url} target="_blank" rel="noreferrer"
                  >{source.title}</a
                >
                <Icon render={Launch32} />
              </li>
            {/each}
          {/each}
        </ul>
      </Tooltip>
    </div>
    {#if dish["target"].length > 0}
      {#each dish["target"] as target (target["@id"])}
        <TooltipDefinition
          tooltipText={getSpacecraftDetails(target)["longName"] || "UNKNOWN"}
          align="start"
        >
          <Tag>{target["@name"]}</Tag>
        </TooltipDefinition>
        <!-- <p>{getSpacecraftDetails(target)["longName"] || "UNKNOWN"}</p> -->
      {/each}
    {/if}
  </div>
  <!-- <div class="dish-viz" /> -->
  <div class="viz-row">
    <ElevationViz elevationAngle={dish["@elevationAngle"]} />
    <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
  </div>
  <div class="dish-card-footer">
    <span class="subtitle">Updated: {dish["@updated"]}</span>
  </div>
</article>

<style lang="scss">
  .dish-container {
    width: 400px;
    height: 400px;
    line-height: 1.5;
    overflow-wrap: break-word;
    background: var(--black-alpha);
    border-radius: 2px;
    box-shadow: 3px 3px 5px #00000045;
    margin: 8px;
    padding: 20px 40px 0;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .OFFLINE {
    opacity: 0.5;
  }

  .dish-details {
    flex-grow: 1;
    padding: 10px 0;
    h3 {
      font-size: 1em;
      font-weight: 600;
      margin: 0 0 5px 0;
    }
  }

  .dish-card-footer {
    padding: 10px 0 5px;
    .subtitle {
      opacity: 0.75;
      font-size: 0.75em;
    }
  }

  .viz-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
