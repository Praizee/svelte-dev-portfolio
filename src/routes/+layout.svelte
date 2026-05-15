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
	import Terminal from '$lib/components/terminal/Terminal.svelte';

	let { children } = $props();

	const siteUrl = 'https://stephen.dev';
	const ogImage = `${siteUrl}/og-image.png`;

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

<svelte:head>
	<meta property="og:site_name" content="Stephen Adeniji" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content="{siteUrl}{$page.url.pathname}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:creator" content="@steevenadeniji" />
	<link rel="canonical" href="{siteUrl}{$page.url.pathname}" />
</svelte:head>

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
<Terminal />
