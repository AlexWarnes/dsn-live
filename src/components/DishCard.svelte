<script lang="ts">
  import type { Dish } from "../data/Models";

  import { getSpacecraftDetails } from "../util/utils";
  import AzimuthViz from "./AzimuthViz.svelte";
  import ElevationViz from "./ElevationViz.svelte";

  export let dish: Dish = null;
</script>

<article class="dish-container">
  <div class="dish-details">
    <h2>{dish["@name"]}</h2>
    <p>{dish["@updated"]}</p>
    <p>{dish["target"] && dish["target"]["@name"]}</p>
    {#if dish["target"]}
      <p>{getSpacecraftDetails(dish["target"]["@id"])["longName"]}</p>
    {/if}
  </div>
  <!-- <div class="dish-viz" /> -->
  <ElevationViz elevationAngle={dish["@elevationAngle"]} />
  <AzimuthViz azimuthAngle={dish["@azimuthAngle"]} />
</article>

<style>
  .dish-container {
    /* background-color: lightsteelblue;
    padding: 8px;
    border-radius: 3px;
    box-shadow: 2px 2px 5px #00000018;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-grow: 1; */
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
  .dish-viz {
    height: 120px;
    width: 120px;
    flex-grow: 1;
    background-color: crimson;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
