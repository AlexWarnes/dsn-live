<script lang="ts">
  import type { Dish, Source } from "../data/Models";
  import { getHumanReadableRange, getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";
  import ReferenceListModal from "./modals/ReferenceListModal.svelte";
  import { fade } from "svelte/transition";

  import {
    Tag,
    TooltipDefinition,
    OverflowMenu,
    OverflowMenuItem,
    ContentSwitcher,
    Switch,
    Tabs,
    Tab,
    TabContent,
  } from "carbon-components-svelte";
  import ArrowDown16 from "carbon-icons-svelte/lib/ArrowDown16";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";
  import Satellite16 from "carbon-icons-svelte/lib/Satellite16";
  import TargetDetails from "./TargetDetails.svelte";
  import SignalDetails from "./SignalDetails.svelte";

  // Inputs
  export let dish: Dish = null;

  // Component State
  let showReferencesModal: boolean = false;
  const closeReferencesModal = () => (showReferencesModal = false);
  let selectedIndex = 0;

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

<article
  class="dish-card-container {dish['metadata']['status']}"
  in:fade={{ duration: 300 }}
>
  <div class="dish-card-header">
    <h2>{dish["@name"]}</h2>
    <span>{dish["metadata"]["station"].toUpperCase()}</span>
  </div>

  <ContentSwitcher bind:selectedIndex size="sm">
    <Switch>
      <div style="display: flex; align-items: center;">
        <Satellite16 style="margin-right: 0.5rem;" />
        Targets
      </div>
    </Switch>
    <Switch>
      <div style="display: flex; align-items: center;">
        <ArrowUp16 style="margin-right: 0.5rem;" />
        Signal
      </div>
    </Switch>
    <Switch>
      <div style="display: flex; align-items: center;">
        <ArrowDown16 style="margin-right: 0.5rem;" />
        Signal
      </div>
    </Switch>
  </ContentSwitcher>
  <div class="dish-card-content">
    {#if selectedIndex === 0}
      <TargetDetails targets={dish["target"]} />
    {:else if selectedIndex === 1}
      <SignalDetails signals={dish["upSignal"]} direction="Up" />
    {:else}
      <SignalDetails signals={dish["downSignal"]} direction="Down" />
    {/if}
  </div>

  <div class="viz-row">
    <ElevationViz elevationAngle={dish["@elevationAngle"]} />
    <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
  </div>
  <!-- </div> -->
  <div class="dish-card-footer">
    <span class="subtitle">Updated: {dish["@updated"]}</span>
    <span class="abs">
      <OverflowMenu flipped>
        <!-- TODO: Models -->
        <!-- <OverflowMenuItem>Models</OverflowMenuItem> -->
        <OverflowMenuItem on:click={() => (showReferencesModal = true)}>
          Learn More
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
    padding: 0 30px 15px;
  }

  .dish-card-content {
    flex-grow: 1;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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

  .subtitle {
    opacity: 0.75;
    font-size: 0.75em;
  }

  .viz-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 5px 30px;
  }

  .abs {
    right: 0;
    bottom: 0;
  }

  /* CUSTOMIZE CARBON TABS */

  .dish-card-container :global(.bx--content-switcher-btn) {
    background: #35394888;
    border-bottom: 1px solid transparent;
    font-weight: 600;
    transition: border-bottom 0.5s ease;
  }
  .dish-card-container :global(.bx--content-switcher--selected) {
    background-color: #35394888 !important;
    color: var(--white-1) !important;
    border-bottom: 1px solid #1461fe;
  }

  .dish-card-container
    :global(.bx--content-switcher-btn:first-child, .bx--content-switcher-btn:last-child) {
    border-radius: 0;
  }

  .dish-card-container
    :global(.bx--content-switcher--selected
      + .bx--content-switcher-btn::before) {
    background-color: #393939;
  }

  .dish-card-container :global(.bx--content-switcher) {
    width: 95%;
    margin: 0 auto;
  }
</style>
