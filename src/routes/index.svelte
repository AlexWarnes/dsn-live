<script lang="ts">
	import { Button, Link } from 'carbon-components-svelte';
	import Launch16 from 'carbon-icons-svelte/lib/Launch16';
	import LogoGithub32 from 'carbon-icons-svelte/lib/LogoGithub32';
	import ArrowRight24 from 'carbon-icons-svelte/lib/ArrowRight24';
</script>
<svelte:head>
	<title>DSN Live</title>
</svelte:head>

<header>
	<div class="header-content">
		<h1>Deep Space Network</h1>
		<ul>
			<li>
				<Button href="/dashboard" size="default" icon={ArrowRight24}>LIVE DASHBOARD</Button>
			</li>
			<li>
				<p>
					<span class="bold">Monitor</span> connections between NASA/JPL and interplanetary spacecraft
					missions in real time.
				</p>
			</li>
			<li>
				<p>
					<span class="bold">Learn</span> more from references in each section.
				</p>
			</li>
			<li>
				<p>
					All data on this site comes from the incredible work of
					<Link
						href="https://www.nasa.gov/directorates/heo/scan/services/networks/deep_space_network/about"
						target="_blank">NASA <Launch16 /></Link
					> and
					<Link href="https://eyes.nasa.gov/dsn/dsn.html" target="_blank">JPL <Launch16 /></Link>
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
		flex-grow: 1;
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
		margin: auto auto 0;
	}
</style>
