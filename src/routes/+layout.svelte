<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import SkipLink from '$lib/components/ui/SkipLink.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { terminal } from '$lib/stores/terminal';

	let { children } = $props();

	onMount(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === '`') {
				e.preventDefault();
				terminal.toggle();
			}
			if (e.key === 'Escape') {
				terminal.close();
			}
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	});
</script>

<SkipLink />
<Navbar />

{#key $page.url.pathname}
	<main
		id="main-content"
		tabindex="-1"
		in:fly={{ y: 16, duration: 350, easing: cubicOut }}
	>
		{@render children()}
	</main>
{/key}

<Footer />

<!-- Terminal overlay — mounted here so it's always available; built in Phase 7 -->
