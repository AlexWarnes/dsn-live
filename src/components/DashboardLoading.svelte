<script>
	import { navigating } from '$app/stores';
	import { Loading } from 'carbon-components-svelte';
	export let initialDataLoaded = false;
	$: pageLoading = !!$navigating && $navigating.to.pathname === '/dashboard';
</script>

{#if !initialDataLoaded || pageLoading}
	<Loading />
{/if}
