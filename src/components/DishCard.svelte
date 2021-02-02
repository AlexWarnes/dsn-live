<script lang="ts">
  import type { Dish } from "../data/Models";
  import { getHumanReadableRange, getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";
  import {
    Tag,
    TooltipDefinition,
    Tooltip,
    Icon,
    Link,
  } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";

  export let dish: Dish = null;
</script>

<article class="dish-container {dish['metadata']['status']}">
  <div class="dish-card-header">
    <h2>{dish["@name"]}</h2>
    <span>{dish["metadata"]["station"].toUpperCase()}</span>
  </div>
  <div class="dish-details">
    <div class="row">
      <h3>TARGETS</h3>
      <!-- TODO Make this a component -->
      <Tooltip align="center">
        <ul class="tooltip-list">
          {#each dish["target"] as target}
            {#each getSpacecraftDetails(target)["sources"] as source}
              <li>
                <a href={source.url} target="_blank" rel="noopener noreferrer"
                  >{source.title}
                  <Icon render={Launch16} class="tooltip-icon" />
                </a>
                <!-- <Link href={source.url} target="_blank" size="sm">
                  {source.title}
                  <Icon render={Launch16} class="tooltip-icon" />
                </Link> -->
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
        <p>{getHumanReadableRange(target["@downlegRange"])}</p>
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

<style>
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

  .dish-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  }

  h3 {
    font-size: 1em;
    font-weight: 600;
    margin: 0 0 5px 0;
  }

  .dish-card-footer {
    padding: 10px 0 5px;
  }

  .subtitle {
    opacity: 0.75;
    font-size: 0.75em;
  }

  .viz-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .tooltip-list {
    font-size: 0.85em;
  }

  .tooltip-list a {
    display: flex;
    align-items: center;
  }

  a {
    color: rgb(0, 100, 200);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:visited {
    color: rgb(0, 80, 160);
  }
</style>
