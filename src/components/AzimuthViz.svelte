<script lang="ts">
  export let azimuthAngle: string = "";
</script>

<div class="column">
  <div class="azimuth-viz-box">
    <span class="north-icon">N</span>
    <div class="grid-line vertical line" />
    <div class="grid-line horizontal line" />
    <div
      class="azimuth-line line"
      style="transform: rotate({azimuthAngle}deg)"
    />
  </div>
  <p class="caption">Azimuth:</p>
  <p class="caption">{azimuthAngle ? `${azimuthAngle}deg` : "N/A"}</p>
</div>

<style>
  .azimuth-viz-box {
    width: 75px;
    height: 75px;
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
    width: 1px;
    left: 50%;
  }

  .horizontal.line {
    height: 1px;
    width: 100%;
    left: 0;
    bottom: 50%;
  }

  .azimuth-line {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background-color: #20b2aa;
    box-shadow: 0px 0 2px #20b2aa;
    height: 50%;
    width: 1px;
    left: 50%;
    bottom: 50%;
    z-index: 4;
    transform-origin: bottom;
    transition: transform 0.2s ease-in-out;
  }

  .north-icon {
    position: absolute;
    left: 52%;
    top: -2px;
  }

  .caption,
  .north-icon {
    margin: 0;
    font-size: 0.75em;
  }
</style>
