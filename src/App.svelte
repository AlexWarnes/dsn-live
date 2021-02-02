<script lang="ts">
  import Dashboard from "./components/Dashboard.svelte";
  import { Header, Button, Icon } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
</script>

<Header platformName="Deep Space Network">
  <div class="flex-spacer" />
  <Button
    class="dsn-btn"
    href="https://eyes.nasa.gov/dsn/dsn.html"
    target="_blank"
  >
    Learn More
    <Icon render={Launch16} class="tooltip-icon" />
  </Button>
</Header>
<main>
  <h1>DSN Live</h1>
  <p class="credit">All data courtesy of NASA/JPL</p>
  <Dashboard />
</main>

<style>
  .flex-spacer {
    flex-grow: 1;
  }

  .dsn-btn a {
    color: var(--white-1);
    text-decoration: none;
  }

  .credit {
    padding: 5px 20px;
    font-weight: 600;
    text-align: right;
  }
</style>
