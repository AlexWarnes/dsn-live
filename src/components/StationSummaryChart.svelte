<script lang="ts">
  export let stationSummary = [];
  import { Tag } from "carbon-components-svelte";
  import ArrowDown16 from "carbon-icons-svelte/lib/ArrowDown16";
  import ArrowUp16 from "carbon-icons-svelte/lib/ArrowUp16";
  const iconColorMap = {
    NONE: "var(--coral-1)",
    IDLE: "gold",
    ACTIVE: "#00ff00",
  };
</script>

<ul class="station-summary">
  {#each stationSummary as dish (dish["@name"])}
    <li>
      <!-- TODO: add scroll to dish on click -->
      <span class="dish-name">{dish["@name"]}</span>
      <ArrowUp16
        style={`margin-right: 0.5rem; fill: ${
          iconColorMap[dish.upSignalStatus]
        };`}
      />
      <ArrowDown16
        style={`margin-right: 0.5rem; fill: ${
          iconColorMap[dish.downSignalStatus]
        };`}
      />
      <span class="target-row">
        {#each dish["abbreviatedTargets"] as target}
          <Tag type="cool-gray">
            {target}
          </Tag>
        {/each}
      </span>
    </li>
  {/each}
</ul>

<style>
  .station-summary {
    padding: 0 5px 5px 8px;
    border-left: 2px solid #ffffff25;
  }
  li {
    display: flex;
    align-items: center;
  }

  .dish-name {
    margin: 0 8px 0 0;
  }
</style>
