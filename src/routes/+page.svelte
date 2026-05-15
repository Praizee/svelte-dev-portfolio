<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import SkillsSection from '$lib/components/skills/SkillsSection.svelte';
	import ContactSection from '$lib/components/contact/ContactSection.svelte';
	import { getFeaturedProjects } from '$lib/data/projects';
	import { staggerReveal } from '$lib/utils/animations';

	const featured = getFeaturedProjects();

	let projectsSection = $state<HTMLElement | undefined>(undefined);

	onMount(() => {
		if (projectsSection) {
			staggerReveal(projectsSection, 'article', { y: 28, stagger: 0.09, duration: 0.6 });
		}
	});
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
<section bind:this={projectsSection} class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
	<ScrollReveal class="mb-12">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
			<SectionHeader
				tag="// work"
				title="Featured Projects"
				subtitle="A selection of things I've shipped — from SaaS platforms to fintech products."
			/>
			<a
				href="/projects"
				class="shrink-0 inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 hover:text-accent"
				style="color: var(--color-text-muted);"
			>
				View all projects
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</ScrollReveal>

	<ProjectGrid projects={featured} />
</section>

<SkillsSection />

<ContactSection />
