<script>
	import 'carbon-components-svelte/css/g100.css';
	import '../styles/global.css';

	import {
		Header,
		Button,
		Icon,
		HeaderUtilities,
		HeaderAction,
		HeaderPanelLinks,
		HeaderPanelLink
	} from 'carbon-components-svelte';
	import SatelliteRadar24 from 'carbon-icons-svelte/lib/SatelliteRadar24';
	import Notebook24 from 'carbon-icons-svelte/lib/Notebook24';
	import EarthEuropeAfrica24 from 'carbon-icons-svelte/lib/EarthEuropeAfrica24';
	let isOpen = false;
	let vw;
</script>

<svelte:window bind:innerWidth={vw} />
<!-- DESKTOP -->
{#if vw > 875}
	<Header platformName="Deep Space Network" href="/">
		<div class="flex-spacer" />
		<span class="nav-btn-wrapper">
			<Button href="/dashboard" kind="ghost">DASHBOARD</Button>
		</span>
		<span class="nav-btn-wrapper">
			<Button href="/about" kind="ghost">ABOUT</Button>
		</span>
	</Header>
{:else}
	<!-- MOBILE -->
	<Header platformName="Deep Space Network" href="/#/">
		<div class="flex-spacer" />
		<HeaderUtilities>
			<HeaderAction bind:isOpen>
				<HeaderPanelLinks>
					<span class="nav-menu-wrapper">
						<HeaderPanelLink href="/">
							<Icon render={EarthEuropeAfrica24} />
							HOME</HeaderPanelLink
						>
						<HeaderPanelLink href="/dashboard">
							<Icon render={SatelliteRadar24} />
							DASHBOARD</HeaderPanelLink
						>
						<HeaderPanelLink href="/about">
							<Icon render={Notebook24} />
							ABOUT</HeaderPanelLink
						>
					</span></HeaderPanelLinks
				>
			</HeaderAction>
		</HeaderUtilities>
	</Header>
{/if}

<main>
	<slot />
</main>

<style>
  main {
    padding: 60px 0 0;
    min-height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
  }
  .flex-spacer {
    flex-grow: 1;
  }

  .nav-btn-wrapper :global(a) {
    color: var(--white-1);
    text-decoration: none;
    font-weight: 600;
    margin: 0 12px;
  }

  .nav-menu-wrapper :global(a) {
    display: flex;
    align-items: center;
    margin: 12px 0;
  }
  .nav-menu-wrapper :global(svg) {
    margin: 0 10px 0 0;
  }
</style>
