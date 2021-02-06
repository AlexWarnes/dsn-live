<script lang="ts">
  import { Button, Icon, Link } from "carbon-components-svelte";
  import Launch16 from "carbon-icons-svelte/lib/Launch16";
  import LogoGithub32 from "carbon-icons-svelte/lib/LogoGithub32";
</script>

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

<style>
  section {
    margin: 2em 0;
    padding: 28px;
    max-width: 600px;
  }
</style>
