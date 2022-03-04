<script>
	import { filters } from '../data/stores';
	import { Checkbox, Toggle } from 'carbon-components-svelte';
</script>

<div class="filter-container">

  <h4 class="form-title">Stations:</h4>
  <Checkbox labelText="GOLDSTONE" value="GOLDSTONE" bind:group={$filters.visibleStations} />
  <Checkbox labelText="CANBERRA" value="CANBERRA" bind:group={$filters.visibleStations} />
  <Checkbox labelText="MADRID" value="MADRID" bind:group={$filters.visibleStations} />
  
  <h4 class="form-title">Dishes</h4>
  <Toggle labelText="Only Show Dishes with Target Spacecraft" bind:toggled={$filters.onlyShowActiveDishes} />

</div>

<style>
	.form-title {
		font-weight: 600;
		font-size: 1.25rem;
		margin: 1rem 0 0.5rem;
	}

	.filter-container {
		padding: 0 0 0 .25rem;
	}
</style>
