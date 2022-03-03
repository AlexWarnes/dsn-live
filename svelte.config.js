import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), optimizeImports()],
	// preprocess: [
	// 	optimizeImports(),
	// 	preprocess()
	// ],

	kit: {
		adapter: adapter({ split: false })
	}
};

export default config;
