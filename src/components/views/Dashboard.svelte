<script lang="ts">
  import { Loading } from "carbon-components-svelte";

  import Summary from "../Summary.svelte";
  import DishCard from "../DishCard.svelte";
  import { generateMockData, processDSNResponse } from "../../util/utils";
  import type { DSNData } from "../../data/Models";
  import { onDestroy, onMount } from "svelte";
  import { mockData } from "../../data/referenceData";
  const dsnURL: string = "https://eyes.nasa.gov/dsn/data/dsn.xml";
  let latestRequest: string = "";
  let requestIntervalUnits = 300;
  let nextRequest: number = 0;

  let DSNData: DSNData = null;

  // Start making requests based on interval
  onMount(() => {
    let requestInterval = setInterval(async () => {
      if (nextRequest <= 0) {
        nextRequest = requestIntervalUnits;
        DSNData = await getDSNData();
      } else {
        nextRequest -= 1;
      }
    }, 1000);

    // Clear interval
    return () => {
      clearInterval(requestInterval);
    };
  });

  async function getDSNData(): Promise<DSNData> {
    console.log("RUNNING getDSNData");
    latestRequest = new Date().toLocaleString();
    try {
      // Request DSN Data
      const res = await fetch(dsnURL);

      // Async process the XML response
      return await processDSNResponse(res);
    } catch {
      const err = "Error fetching data.";
      console.error(err);
      throw new Error(err);
    }
  }

  // const getNewData = () => {
  //   DSNData = generateMockData();
  // };
</script>

{#if DSNData}
  <!-- <button
    style="position:fixed;right:0; top:200px;"
    on:click={() => getNewData()}>update</button
  > -->
  <Summary {DSNData} {latestRequest} {nextRequest} />
  <div class="dish-grid">
    {#each DSNData["dishes"] as dish (dish["@name"])}
      <DishCard {dish} />
    {/each}
  </div>
{:else}
  <Loading />
{/if}

<style>
  .dish-grid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px;
  }
</style>
