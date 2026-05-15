<script lang="ts">
	import { projects } from '$lib/data/projects';
	import type { ProjectCategory } from '$lib/data/projects';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ProjectGrid from '$lib/components/projects/ProjectGrid.svelte';
	import ProjectFilter from '$lib/components/projects/ProjectFilter.svelte';

	let active = $state<ProjectCategory | 'all'>('all');

	const categories: ProjectCategory[] = ['fullstack', 'ai', 'fintech', 'saas', 'landing'];

	const filterOptions = $derived([
		{ label: 'All', value: 'all' as const, count: projects.length },
		...categories
			.filter((c) => projects.some((p) => p.category === c))
			.map((c) => ({
				label: c.charAt(0).toUpperCase() + c.slice(1),
				value: c,
				count: projects.filter((p) => p.category === c).length
			}))
	]);

	const filtered = $derived(
		active === 'all' ? projects : projects.filter((p) => p.category === active)
	);
</script>

<svelte:head>
	<title>Projects — Stephen Adeniji</title>
	<meta name="description" content="All projects by Stephen Adeniji, Frontend Engineer." />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
	<!-- Header -->
	<div class="mb-12 flex flex-col gap-8">
		<!-- Breadcrumb -->
		<nav aria-label="Breadcrumb">
			<ol class="flex items-center gap-2 font-mono text-xs" style="color: var(--color-text-muted);">
				<li><a href="/" class="hover:text-accent transition-colors duration-150">~</a></li>
				<li aria-hidden="true">/</li>
				<li style="color: var(--color-text);">projects</li>
			</ol>
		</nav>

		<SectionHeader
			tag="// work"
			title="All Projects"
			subtitle="Everything I've built — {projects.length} projects across frontend engineering."
		/>

		<ProjectFilter options={filterOptions} {active} onchange={(v) => (active = v)} />
	</div>

	<!-- Count -->
	<p class="font-mono text-xs mb-6" style="color: var(--color-text-muted);">
		<span style="color: var(--color-accent);">{filtered.length}</span>
		{filtered.length === 1 ? 'project' : 'projects'}
		{active !== 'all' ? `in ${active}` : 'total'}
	</p>

	<ProjectGrid projects={filtered} />
</div>
