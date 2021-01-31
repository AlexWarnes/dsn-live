<script lang="ts">
  export let azimuthAngle: string = "";
</script>

<div class="azimuth-viz-container">
  <div class="grid-line vertical line" />
  <div class="grid-line horizontal line" />
  <div class="azimuth-line line" style="transform: rotate({azimuthAngle}deg)" />
</div>
<p class="caption">Azimuth:</p>
<p class="caption">{azimuthAngle ? `${azimuthAngle}deg` : "N/A"}</p>

<style>
  .azimuth-viz-container {
    width: 100px;
    height: 100px;
    position: relative;
    overflow: hidden;
  }

  .line {
    position: absolute;
    background-color: #434343;
    transform-origin: left bottom;
    z-index: 5;
  }
  .vertical.line {
    height: 100%;
    width: 2px;
    left: 50%;
  }

  .horizontal.line {
    height: 2px;
    width: 100%;
    left: 0;
    bottom: 50%;
  }

  .azimuth-line {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: lightseagreen;
    height: 50%;
    width: 2px;
    left: 50%;
    bottom: 50%;
    z-index: 4;
    transform-origin: bottom;
  }

  .caption {
    margin: 0;
    font-size: 0.75em;
  }
</style>
