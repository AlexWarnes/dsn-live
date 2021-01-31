<script lang="ts">
  export let elevationAngle: string = "";
</script>

<div class="elevation-viz-container">
  <div class="ground-line line" />
  <div
    class="elevation-line line"
    style="transform: rotate(-{elevationAngle}deg)"
  />
</div>
<p class="caption">Elevation Angle:</p>
<p class="caption">{elevationAngle ? `${elevationAngle}deg` : "N/A"}</p>

<style>
  .elevation-viz-container {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
  }

  .line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #434343;
    transform-origin: left bottom;
    z-index: 5;
  }

  .elevation-line {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: lightseagreen;
    z-index: 4;
  }

  .caption {
    margin: 0;
    font-size: 0.75em;
  }
</style>
