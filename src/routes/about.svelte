<script lang="ts">
  import { Button, Link } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import LogoGithub32 from "carbon-icons-svelte/lib/LogoGithub32";
  //<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</script>
<svelte:head>
	<title>DSN Live | About</title>
</svelte:head>
<section>
  <h2>What is the Deep Space Network?</h2>
  <p class="quote-text">
    “The Deep Space Network (DSN) is NASA’s international array of giant radio
    antennas that supports interplanetary spacecraft missions, plus a few that
    orbit Earth. The DSN also provides radar and radio astronomy observations
    that improve our understanding of the solar system and the larger universe.”
  </p>
  <p>- Read the rest at the official DSN Site.</p>
  <Button
    size="small"
    kind="tertiary"
    target="_blank"
    icon={Launch16}
    href="https://www.nasa.gov/directorates/heo/scan/services/networks/deep_space_network/about"
    >NASA DSN</Button
  >
</section>

<section>
  <h2>Is there an official dashboard?</h2>
  <p>Yes! The inspiration for this site is the official dashboard.</p>
  <Button
    size="small"
    kind="tertiary"
    target="_blank"
    icon={Launch16}
    href="https://eyes.nasa.gov/dsn/dsn.html">DSN Now</Button
  >
</section>
<section>
  <h2>Site Details</h2>
  <ul>
    <li>
      <h3>GitHub Repo</h3>
      <p>
        Come for the code, stay for the veryLongButDescriptiveVariableNames.
      </p>
      <Button
        kind="tertiary"
        size="small"
        href="https://github.com/AlexWarnes/dsn-live"
        target="_blank"
        tooltipPosition="top"
        tooltipAlignment="center"
        iconDescription="GitHub"
        disabled={false}
        icon={LogoGithub32}>GitHub</Button
      >
    </li>
    <li>
      <h3>Framework</h3>
      <p>
        The best way to learn a new tool is to build something with it. Made
        with Svelte.
      </p>
      <Button
        kind="tertiary"
        size="small"
        href="https://svelte.dev/"
        target="_blank"
        tooltipPosition="top"
        tooltipAlignment="center"
        iconDescription="Svelte"
        disabled={false}
        >Svelte
        <img
          class="icon"
          src="/assets/svelte-icon.png"
          alt="Svelte icon"
          width="16"
        />
      </Button>
    </li>
    <li>
      <h3>Design</h3>
      <p>
        <Link href="https://carbon-components-svelte.onrender.com/" target="_blank"
          >Carbon Components<Launch16 /></Link
        > and <Link
          href="https://carbon-icons-svelte.onrender.com/"
          target="_blank">Carbon Icons<Launch16 /></Link
        >
      </p>
    </li>
    <li>
      <h3>Favicon (the one on your browser tab)</h3>
      <p>
        Icon made by <Link
          href="https://www.freepik.com"
          target="_blank"
          title="Freepik">Freepik<Launch16 /></Link
        >
        from
        <Link href="https://www.flaticon.com/" target="_blank" title="Flaticon"
          >Flaticon<Launch16 />
        </Link>
      </p>
    </li>
  </ul>
</section>

<style>
  section {
    margin: 1.25em 12%;
    padding: 28px;
    max-width: 600px;
  }

  h3 {
    font-size: 1.25em;
    font-weight: 600;
  }

  li {
    margin: 1.5em 0;
  }

  .icon {
    position: absolute;
    right: 1rem;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
</style>
