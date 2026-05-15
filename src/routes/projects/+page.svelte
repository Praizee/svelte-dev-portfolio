<script lang="ts">
	import { projects } from '$lib/data/projects';
	import type { ProjectCategory } from '$lib/data/projects';

	let activeCategory = $state<ProjectCategory | 'all'>('all');

	const categories: { label: string; value: ProjectCategory | 'all' }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Fullstack', value: 'fullstack' },
		{ label: 'AI', value: 'ai' },
		{ label: 'Fintech', value: 'fintech' },
		{ label: 'SaaS', value: 'saas' },
		{ label: 'Landing', value: 'landing' }
	];

	const filtered = $derived(
		activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory)
	);
</script>

<svelte:head>
	<title>Projects — Stephen Adeniji</title>
	<meta name="description" content="All projects by Stephen Adeniji, Frontend Engineer." />
</svelte:head>

<!-- Placeholder — full UI built in Phase 5 -->
<main id="main-content">
	<h1>Projects</h1>
	{#each filtered as project}
		<a href="/projects/{project.slug}">{project.title}</a>
	{/each}
</main>
