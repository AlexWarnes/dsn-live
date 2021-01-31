<script lang="ts">
  import type { Dish } from "../data/Models";
  import { getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";

  export let dish: Dish = null;
</script>

<article class="dish-container {dish['metadata']['status']}">
  <div class="dish-details">
    <h2>{dish["@name"]}</h2>
    <p>{dish["@updated"]}</p>
    {#if dish["target"].length > 0 && dish["target"][0]["@name"]}
      <p>{dish["target"][0]["@name"]}</p>
      <p>{getSpacecraftDetails(dish["target"][0])["longName"]}</p>
    {/if}
  </div>
  <!-- <div class="dish-viz" /> -->
  <div class="viz-row">
    <ElevationViz elevationAngle={dish["@elevationAngle"]} />
    <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
  </div>
</article>

<style>
  .dish-container {
    width: 400px;
    height: 400px;
    line-height: 1.5;
    overflow-wrap: break-word;
    background: #fafbfc;
    border-radius: 12px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    margin: 8px;
    padding: 40px;
    border-width: 0px;
    border-style: solid;
    box-sizing: border-box;
    border-color: rgb(226, 232, 240);
  }

  .OFFLINE {
    background: #778899;
  }

  .viz-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
</style>
