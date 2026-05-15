<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Project[];
		columns?: 2 | 3;
	}

	let { projects, columns = 3 }: Props = $props();
</script>

{#if projects.length === 0}
	<div class="col-span-full text-center py-16" style="color: var(--color-text-muted);">
		<p class="font-mono text-sm">No projects in this category yet.</p>
	</div>
{:else}
	<div
		class="grid gap-6"
		class:grid-cols-1={true}
		style="grid-template-columns: repeat(1, 1fr);"
	>
		{#each projects as project, i}
			<div
				class="project-item flex flex-col"
				style="animation: fadeSlideUp 0.45s ease both; animation-delay: {i * 80}ms;"
			>
				<ProjectCard {project} index={i} />
			</div>
		{/each}
	</div>
{/if}

<style>
	div[style*="grid-template-columns"] {
		display: grid;
	}

	@media (min-width: 640px) {
		div[style*="grid-template-columns"] {
			grid-template-columns: repeat(2, 1fr) !important;
		}
	}

	@media (min-width: 1024px) {
		div[style*="grid-template-columns"] {
			grid-template-columns: repeat(3, 1fr) !important;
		}
	}

	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@media (prefers-reduced-motion: reduce) {
		.project-item { animation: none !important; opacity: 1 !important; }
	}
</style>
