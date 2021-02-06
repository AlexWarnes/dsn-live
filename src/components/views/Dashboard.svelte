<script lang="ts">
  import { Loading } from "carbon-components-svelte";

  import Summary from "../Summary.svelte";
  import DishCard from "../DishCard.svelte";
  import { processDSNResponse } from "../../util/utils";
  import type { DSNData } from "../../data/Models";
  const dsnURL: string = "https://eyes.nasa.gov/dsn/data/dsn.xml";
  let latestRequest: string = "";
  let nextRequest: number = 10;

  let DSNData: Promise<DSNData> = getDSNData();
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
  async function getDSNData(): Promise<DSNData> {
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
</script>

{#await DSNData}
  <Loading />
{:then data}
  <Summary DSNData={data} {latestRequest} {nextRequest} />
  <div class="dish-grid">
    {#each data["dishes"] as dish (dish["@name"])}
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
