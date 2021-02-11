<script lang="ts">
  import type { Dish, Source, Spacecraft } from "../data/Models";
  import {
    determineSignalStatus,
    determineTargetStatus,
    getSpacecraftDetails,
  } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";
  import ReferenceListModal from "./modals/ReferenceListModal.svelte";
  import { fade } from "svelte/transition";
  import {
    OverflowMenu,
    OverflowMenuItem,
    ContentSwitcher,
    Switch,
  } from "carbon-components-svelte";
  import ArrowDown16 from "carbon-icons-svelte/lib/ArrowDown16";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";
  // import Maximize16 from "carbon-icons-svelte/lib/Maximize16";
  import Satellite16 from "carbon-icons-svelte/lib/Satellite16";
  import TargetDetails from "./TargetDetails.svelte";
  import SignalDetails from "./SignalDetails.svelte";

  // Inputs
  export let dish: Dish = null;

  // Modal State
  let showReferencesModal: boolean = false;
  const closeReferencesModal = () => (showReferencesModal = false);

  // Selected Tab
  let selectedIndex = 0;

  // Whenever a dish appears, populate a list of references for it
  $: targetDetails = readTargetDetailsForDish(dish);

  // List of spacecraft details from the specified dish
  const readTargetDetailsForDish = (dish: Dish): Spacecraft[] => {
    if (!dish) {
      return [];
    }
    let tempRefs = [];
    for (let target of dish["targets"]) {
      const targetDetails = getSpacecraftDetails(target);
      tempRefs = [...tempRefs, targetDetails];
    }
    return tempRefs;
  };

  // Determine the status for styling of each tab (this gets crazy)
  $: targetStatus = determineTargetStatus(dish);
  $: upSignalStatus = determineSignalStatus(dish, "upSignal");
  $: downSignalStatus = determineSignalStatus(dish, "downSignal");
</script>

<span class="rel dish-card-wrapper">
  <article
    class="dish-card-container 
    {dish['metadata'][
      'status'
    ]} 
    <!-- Enable dynamic styling without triggering ContentSwitcher autofocus (weird, I know) -->
    {`${targetStatus}-targets`}
    {`${upSignalStatus}-upSignal`}
    {`${downSignalStatus}-downSignal`} "
    in:fade={{ duration: 300 }}
  >
    <!-- HEADER -->
    <div class="dish-card-header">
      <h2>{dish["@name"]}</h2>
      <span>{dish["metadata"]["station"].toUpperCase()}</span>
    </div>

    <!-- TABS -->
    <ContentSwitcher bind:selectedIndex size="sm">
      <Switch>
        <div class="tab-slot --targets">
          <Satellite16 style="margin-right: 0.5rem;" />
          Spacecraft
        </div>
      </Switch>
      <Switch>
        <div class="tab-slot --upSignal">
          <ArrowUp16 style="margin-right: 0.5rem;" />
          Signal
        </div>
      </Switch>
      <Switch>
        <div class="tab-slot --downSignal">
          <ArrowDown16 style="margin-right: 0.5rem;" />
          Signal
        </div>
      </Switch>
    </ContentSwitcher>
    <div class="dish-card-content">
      {#if selectedIndex === 0}
        <TargetDetails targets={dish["targets"]} />
      {:else if selectedIndex === 1}
        <SignalDetails signals={dish["upSignal"]} />
      {:else}
        <SignalDetails signals={dish["downSignal"]} />
      {/if}
    </div>

    <!-- ELEVATION and AZIMUTH VIZ -->
    <div class="viz-row">
      <ElevationViz elevationAngle={dish["@elevationAngle"]} />
      <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
    </div>

    <!-- FOOTER -->
    <div class="dish-card-footer">
      <span class="subtitle">Updated: {dish["@updated"] || ""}</span>
    </div>
  </article>
  <span class="abs">
    <!-- <Button
      kind="ghost"
      tooltipPosition="left"
      tooltipAlignment="center"
      iconDescription="Maximize"
      icon={Maximize16}
    /> -->
    <OverflowMenu flipped>
      <!-- <OverflowMenuItem>Maximize</OverflowMenuItem> -->
      <OverflowMenuItem on:click={() => (showReferencesModal = true)}>
        Learn More
      </OverflowMenuItem>
    </OverflowMenu>
  </span>
</span>
<ReferenceListModal
  open={showReferencesModal}
  {targetDetails}
  closeFn={closeReferencesModal}
/>

<style>
  .dish-card-wrapper {
    width: 100%;
    max-width: 400px;
    margin: 20px 0px;
  }
  .dish-card-container {
    width: 100%;
    max-width: 100%;
    height: 400px;
    line-height: 1.5;
    background: var(--black-alpha);
    border-radius: 2px;
    box-shadow: 3px 3px 5px #00000045;
    padding: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .dish-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 15px;
  }

  .dish-card-content {
    flex-grow: 1;
    padding: 10px 0;
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
    /* Allows the menu to appear despite the card's overflow hidden */
    right: 1px;
    bottom: 1px;
  }

  /* CUSTOMIZE CARBON TABS */
  .tab-slot {
    display: flex;
    align-items: center;
  }
  .dish-card-container :global(.tab-slot svg) {
    transition: fill 0.2s ease;
  }
  .dish-card-container :global(.bx--content-switcher-btn) {
    background: #35394888;
    border-bottom: 1px solid transparent;
    font-weight: 600;
    transition: border-bottom 0.5s ease;
  }
  .dish-card-container :global(.bx--content-switcher--selected) {
    background-color: #35394888 !important;
    color: var(--white-1) !important;
    border-bottom: 1px solid var(--blue-1);
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

  /* Enable dynamic SVG styling without triggering Switch autofocus (weird, I know)
  This monstrosity avoids a bug with the ContentSwitcher whereby any dynamic classes
  inside the Switch slot would auto focus and scroll into view. This was super annoying
  if you were looking at the dashboard and updates caused your view to jump around.
  */
  .dish-card-container.ACTIVE-targets :global(.tab-slot.--targets svg) {
    fill: lime;
  }
  .dish-card-container.ACTIVE-upSignal :global(.tab-slot.--upSignal svg) {
    fill: lime;
  }
  .dish-card-container.ACTIVE-downSignal :global(.tab-slot.--downSignal svg) {
    fill: lime;
  }
  .dish-card-container.IDLE-targets :global(.tab-slot.--targets svg) {
    fill: gold;
  }
  .dish-card-container.IDLE-upSignal :global(.tab-slot.--upSignal svg) {
    fill: gold;
  }
  .dish-card-container.IDLE-downSignal :global(.tab-slot.--downSignal svg) {
    fill: gold;
  }
  .dish-card-container.NONE-targets :global(.tab-slot.--targets svg) {
    fill: var(--coral-1);
  }
  .dish-card-container.NONE-upSignal :global(.tab-slot.--upSignal svg) {
    fill: var(--coral-1);
  }
  .dish-card-container.NONE-downSignal :global(.tab-slot.--downSignal svg) {
    fill: var(--coral-1);
  }
</style>
