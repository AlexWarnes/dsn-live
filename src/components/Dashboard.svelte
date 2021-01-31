<script lang="ts">
  import xml2json from "../util/xml2json";
  import { getStationByDishName } from "../util/utils";
  import Summary from "./Summary.svelte";
  import DishCard from "./DishCard.svelte";
  import type { Dish } from "../data/Models";
  const parser = new DOMParser();
  const dsnURL: string = "https://eyes.nasa.gov/dsn/data/dsn.xml";
  let latestRequest: string = "";
  let nextRequest: number = 10;

  let DSNData = getDSNData();
  // TODO: customize interval
  // setInterval(async () => {
  //   if (nextRequest <= 0) {
  //     let newData = await getDSNData();
  //     nextRequest = 10;
  //     DSNData = newData;
  //   } else {
  //     nextRequest -= 1;
  //   }
  // }, 1000);
  async function getDSNData() {
    latestRequest = new Date().toLocaleString();
    try {
      const res = await fetch(dsnURL);
      const text = await res.text();
      return parseDSNData(text);
    } catch {
      const err = "Error fetching data.";
      console.error(err);
      throw new Error(err);
    }
  }

  function parseDSNData(
    data
  ): { dish: Dish[]; station: any[]; timestamp: string } {
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const { dsn } = JSON.parse(xml2json(xmlDoc, ""));
    console.log("DSN JSON:", dsn);
    // TODO: create new Util for serialization and merging with default dish data
    let cleanData = dsn;
    cleanData["dish"] = cleanData["dish"].filter((dish) => {
      const dsArray = Array.isArray(dish["downSignal"]);
      const usArray = Array.isArray(dish["upSignal"]);
      const targetArray = Array.isArray(dish["target"]);
      return !(dsArray || usArray || targetArray);
    });
    return cleanData;
  }
</script>

{#await DSNData}
  <p>...loading</p>
{:then data}
  <Summary DSNData={data} {latestRequest} {nextRequest} />
  <div class="dish-grid">
    {#each data["dish"] as dish (dish["@name"])}
      <DishCard {dish} />
    {/each}
  </div>
{:catch error}
  <p style="color: red">{error}</p>
{/await}

<style>
  .dish-grid {
    /* display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: minmax(150px, 1fr); */
    /* background-color: salmon; */
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    margin: 20px;
  }
</style>
