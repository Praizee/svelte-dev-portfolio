<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} — Stephen Adeniji</title>
	<meta name="description" content={project.tagline} />
</svelte:head>

<!-- Placeholder — full UI built in Phase 6 -->
<main id="main-content">
	<a href="/projects">← Back to Projects</a>
	<h1>{project.title}</h1>
	<p>{project.description}</p>
	<ul>
		{#each project.stack as tech}
			<li>{tech}</li>
		{/each}
	</ul>
	{#each project.links as link}
		<a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
	{/each}
</main>
