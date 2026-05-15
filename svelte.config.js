import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*'],
			handleMissingId: 'warn',
			handleHttpError: ({ path, message }) => {
				// Allow missing static assets (resume PDF, project images) during dev
				if (path.endsWith('.pdf') || path.startsWith('/images/')) return;
				throw new Error(message);
			}
		}
	}
};

export default config;
