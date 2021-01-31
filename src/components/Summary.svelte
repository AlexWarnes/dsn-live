<script lang="ts">
  import type { DSNData } from "../data/Models";

  import { getStationByDishName } from "../util/utils";

  export let DSNData: DSNData = null;
  export let latestRequest: string = "";
  export let nextRequest: number = 0;
  export let dataTimestamp: string = "";
  let dishesByStation = {
    Goldstone: 0,
    Madrid: 0,
    Canberra: 0,
  };
  let dishesOnline = 0;
  $: {
    if (DSNData) {
      updateStationCount(DSNData.dishes);
      updateTimestamps(DSNData);
    }
  }

  const updateStationCount = (dishes: any[]): void => {
    let tempCount = {
      Goldstone: 0,
      Madrid: 0,
      Canberra: 0,
    };
    for (let dish of dishes) {
      // for each dish, incr the temp count for respective station
      const stationName = getStationByDishName(dish["@name"]);
      if (stationName && dish["metadata"]["status"] === "ONLINE") {
        tempCount[stationName] = tempCount[stationName] + 1;
      }
    }
    dishesByStation = { ...tempCount };
    dishesOnline = Object.values(tempCount).reduce((acc, v) => acc + v);
  };

  const updateTimestamps = (data: any): void => {
    dataTimestamp = new Date(Number(data.timestamp)).toLocaleString();
  };
</script>

<!-- Add a last requested  -->
<!-- Add a time until request -->
<!-- Current Data last updated -->
<section class="summary-container">
  {#if DSNData}
    <p>Data Timestamp: {dataTimestamp}</p>
    <p>Latest Request: {latestRequest}</p>
    <p>Next Request: {nextRequest ? nextRequest + "s" : "Loading..."}</p>
    <p>Dishes Online: {dishesOnline}</p>
    <p>Goldstone: {dishesByStation["Goldstone"]}</p>
    <p>Madrid: {dishesByStation["Madrid"]}</p>
    <p>Canberra: {dishesByStation["Canberra"]}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</section>

<style>
  .summary-container {
    background-color: #00000018;
    padding: 20px;
    border-radius: 3px;
    box-shadow: 2px 2px 12px #00000018;
  }
</style>
