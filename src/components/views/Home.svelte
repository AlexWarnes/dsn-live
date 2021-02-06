<script lang="ts">
  import { Button, Icon, Link } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import LogoGithub32 from "carbon-icons-svelte/lib/LogoGithub32";
</script>

<header>
  <div class="header-content">
    <h1>Deep Space Network</h1>
    <ul>
      <li>
        <p>
          <span class="bold">Monitor</span> signals sent between NASA's Deep Space
          Network and spacecraft in real time.
        </p>
        <Button href="/#/dashboard" size="small">DASHBOARD</Button>
      </li>
      <li>
        <p>
          <span class="bold">Learn</span> more from external references provided
          in each section.
        </p>
        <Button href="/#/about" size="small">ABOUT</Button>
      </li>
      <li>
        <p>
          All data on this site comes from the incredible work of
          <Link
            href="https://www.nasa.gov/directorates/heo/scan/services/networks/deep_space_network/about"
            target="_blank">NASA <Icon render={Launch16} /></Link
          > and
          <Link href="https://eyes.nasa.gov/dsn/dsn.html" target="_blank"
            >JPL <Icon render={Launch16} /></Link
          >
        </p>
      </li>
    </ul>
  </div>
</header>
<span class="github-btn-wrapper">
  <Button
    kind="tertiary"
    href="https://github.com/AlexWarnes/dsn-live"
    target="_blank"
    tooltipPosition="top"
    tooltipAlignment="center"
    iconDescription="GitHub"
    disabled={false}
    icon={LogoGithub32}
  />
</span>

<style>
  header {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2em;
  }

  li {
    margin: 32px 0;
  }

  li :global(a) {
    margin: 8px;
  }

  .bold {
    font-weight: 600;
  }
  .github-btn-wrapper {
    position: absolute;
    bottom: 10px;
    left: calc(50% - 56px);
    cursor: pointer;
  }
</style>
