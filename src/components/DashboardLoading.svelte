<script>
	import { navigating } from '$app/stores';
	import { Loading } from 'carbon-components-svelte';
	export let initialDataLoaded = false;
	$: pageLoading = !!$navigating && $navigating.to.pathname === '/dashboard';
	$: if (!initialDataLoaded || pageLoading) {
		console.log('SHOW PAGE LOADING');
	} else {
		console.log('DO NOT SHOW PAGE LOADING');
	}
</script>

{#if !initialDataLoaded || pageLoading}
	<Loading />
{/if}
