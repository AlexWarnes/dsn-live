<script lang="ts">
  import type { Dish, Source } from "../data/Models";
  import { getHumanReadableRange, getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";
  import ReferenceListModal from "./modals/ReferenceListModal.svelte";
  import {
    Tag,
    TooltipDefinition,
    OverflowMenu,
    OverflowMenuItem,
  } from "carbon-components-svelte";

  // Inputs
  export let dish: Dish = null;

  // Component State
  let showReferencesModal: boolean = false;
  const closeReferencesModal = () => (showReferencesModal = false);

  // List of targetEntry references for this card
  let targetReferences: Source[] = [];
  const updateTargetReferences = (dish) => {
    let tempRefs = [];
    for (let target of dish["target"]) {
      const spacecraft = getSpacecraftDetails(target);
      for (let source of spacecraft["sources"]) {
        tempRefs = [...tempRefs, source];
      }
    }
    targetReferences = tempRefs;
  };

  // Whenever a dish appears, populate a list of references for it
  $: {
    if (dish) {
      updateTargetReferences(dish);
    }
  }
</script>

<article class="dish-card-container {dish['metadata']['status']}">
  <div class="dish-card-header">
    <h2>{dish["@name"]}</h2>
    <span>{dish["metadata"]["station"].toUpperCase()}</span>
  </div>
  <div class="dish-card-content">
    <div class="row">
      <h3>TARGETS</h3>
    </div>
    <div class="target-container">
      {#if dish["target"].length > 0}
        {#each dish["target"] as target (target["@id"])}
          <div class="target-col">
            <TooltipDefinition
              tooltipText={getSpacecraftDetails(target)["longName"] ||
                "UNKNOWN"}
              align="start"
            >
              <Tag>{target["@name"]}</Tag>
            </TooltipDefinition>
            <p>{getHumanReadableRange(target["@downlegRange"])}</p>
          </div>
        {/each}
      {/if}
    </div>
    <div class="viz-row">
      <ElevationViz elevationAngle={dish["@elevationAngle"]} />
      <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
    </div>
  </div>
  <div class="dish-card-footer">
    <span class="subtitle">Updated: {dish["@updated"]}</span>
    <span class="abs">
      <OverflowMenu flipped>
        <OverflowMenuItem>Models</OverflowMenuItem>
        <OverflowMenuItem on:click={() => (showReferencesModal = true)}>
          References
        </OverflowMenuItem>
      </OverflowMenu>
    </span>
  </div>
</article>
<ReferenceListModal
  open={showReferencesModal}
  references={targetReferences}
  closeFn={closeReferencesModal}
/>

<style>
  .dish-card-container {
    width: 400px;
    height: 400px;
    line-height: 1.5;
    background: var(--black-alpha);
    border-radius: 2px;
    box-shadow: 3px 3px 5px #00000045;
    margin: 8px;
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
  }

  .dish-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .dish-card-content {
    flex-grow: 1;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .dish-card-footer {
    position: relative;
    padding: 10px 30px;
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

  h3 {
    font-size: 1em;
    font-weight: 600;
    margin: 0 0 5px 0;
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

  .target-container {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .target-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 10px;
  }

  .abs {
    right: 0;
    bottom: 0;
  }
</style>
