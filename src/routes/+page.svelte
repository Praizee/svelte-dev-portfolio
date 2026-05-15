<script lang="ts">
	import Hero from '$lib/components/hero/Hero.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import { getFeaturedProjects } from '$lib/data/projects';

	const featured = getFeaturedProjects();
</script>

<svelte:head>
	<title>Stephen Adeniji — Frontend Engineer</title>
	<meta
		name="description"
		content="Stephen Adeniji — Frontend Engineer building fast, polished, and accessible web experiences."
	/>
</svelte:head>

<Hero />

<!-- ── Featured Projects ── -->
<section class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
	<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
		<SectionHeader
			tag="// work"
			title="Featured Projects"
			subtitle="A selection of things I've shipped — from SaaS platforms to fintech products."
		/>
		<a
			href="/projects"
			class="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 hover:text-[var(--color-accent)]"
			style="color: var(--color-text-muted);"
		>
			View all projects
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
				<path d="M5 12h14M12 5l7 7-7 7" />
			</svg>
		</a>
	</div>

	<ProjectGrid projects={featured} />
</section>

<!-- Skills + Contact sections added in Phase 8 -->
