<script lang="ts">
  export let elevationAngle: string = "";
</script>

<div class="column">
  <div class="elevation-viz-box">
    <div class="ground-line line" />
    <div
      class="elevation-line line"
      style="transform: rotate(-{elevationAngle}deg)"
    />
  </div>
  <p class="caption">Elevation:</p>
  <p class="caption">{elevationAngle ? `${elevationAngle}deg` : "N/A"}</p>
</div>

<style>
  .elevation-viz-box {
    width: 75px;
    height: 75px;
    position: relative;
    overflow: hidden;
  }

  .line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #434343;
    transform-origin: left bottom;
    z-index: 5;
  }

  .elevation-line {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    height: 1px;
    left: 1px;
    background-color: #20b2aa;
    box-shadow: 0px 0 2px #20b2aa;
    z-index: 4;
  }

  .caption {
    margin: 0;
    font-size: 0.75em;
  }
</style>
