<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ImageLazy from '$lib/components/ui/ImageLazy.svelte';

	interface Props {
		project: Project;
		index?: number;
	}

	let { project, index = 0 }: Props = $props();

	const MAX_STACK = 4;
	const visibleStack = $derived(project.stack.slice(0, MAX_STACK));
	const extraStack = $derived(Math.max(0, project.stack.length - MAX_STACK));

	const hasImage = $derived(project.images.length > 0);
</script>

<article class="group relative flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-xl"
	style="
		background: var(--color-surface);
		border-color: var(--color-border);
		--shadow-color: color-mix(in srgb, {project.color} 15%, transparent);
		animation: fadeSlideUp 0.5s ease both;
		animation-delay: {index * 80}ms;
	"
>
	<!-- Image -->
	<a
		href="/projects/{project.slug}"
		class="block overflow-hidden"
		aria-label="View {project.title} project details"
		tabindex="-1"
	>
		<div class="overflow-hidden" style="background: color-mix(in srgb, {project.color} 8%, var(--color-surface-2));">
			{#if hasImage}
				<ImageLazy
					src={project.images[0].src}
					alt={project.images[0].alt}
					width={project.images[0].width}
					height={project.images[0].height}
					class="transition-transform duration-500 group-hover:scale-[1.04]"
				/>
			{:else}
				<!-- Colour-coded placeholder when no screenshot yet -->
				<div
					class="w-full flex items-center justify-center"
					style="aspect-ratio: 16/9; background: linear-gradient(135deg, color-mix(in srgb, {project.color} 18%, var(--color-surface-2)), color-mix(in srgb, {project.color} 6%, var(--color-surface-2)));"
				>
					<span class="font-mono text-4xl font-bold opacity-20" style="color: {project.color};">
						{project.title.slice(0, 2).toUpperCase()}
					</span>
				</div>
			{/if}

			<!-- Hover overlay -->
			<div
				class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				style="background: color-mix(in srgb, {project.color} 70%, #000);"
				aria-hidden="true"
			>
				<span class="text-white text-sm font-semibold flex items-center gap-2">
					View Project
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<path d="M5 12h14M12 5l7 7-7 7" />
					</svg>
				</span>
			</div>
		</div>
	</a>

	<!-- Content -->
	<div class="flex flex-col gap-3 p-5 flex-1">
		<!-- Meta row -->
		<div class="flex items-center justify-between gap-2">
			<Badge label={project.category} variant="category" category={project.category} />
			<span class="font-mono text-xs" style="color: var(--color-text-muted);">{project.year}</span>
		</div>

		<!-- Title + tagline -->
		<div class="flex flex-col gap-1.5">
			<h3 class="font-bold text-lg leading-snug" style="color: var(--color-text);">
				<a
					href="/projects/{project.slug}"
					class="hover:text-[var(--color-accent)] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:rounded"
				>
					{project.title}
				</a>
			</h3>
			<p class="text-sm leading-relaxed line-clamp-2" style="color: var(--color-text-muted);">
				{project.tagline}
			</p>
		</div>

		<!-- Stack -->
		<div class="flex flex-wrap gap-1.5 mt-auto pt-1">
			{#each visibleStack as tech}
				<Badge label={tech} />
			{/each}
			{#if extraStack > 0}
				<Badge label="+{extraStack}" />
			{/if}
		</div>

		<!-- Footer row -->
		<div class="flex items-center justify-between pt-2 border-t" style="border-color: var(--color-border);">
			<a
				href="/projects/{project.slug}"
				class="text-xs font-medium flex items-center gap-1 transition-colors duration-150 hover:text-[var(--color-accent)]"
				style="color: var(--color-text-muted);"
			>
				View details
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>

			{#if project.links[0]}
				<a
					href={project.links[0].url}
					target="_blank"
					rel="noopener noreferrer"
					onclick={(e) => e.stopPropagation()}
					aria-label="Open {project.title} live site (new tab)"
					class="w-7 h-7 rounded-lg flex items-center justify-center border transition-colors duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
					style="border-color: var(--color-border); color: var(--color-text-muted);"
				>
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
					</svg>
				</a>
			{/if}
		</div>
	</div>
</article>

<style>
	@keyframes fadeSlideUp {
		from { opacity: 0; transform: translateY(24px); }
		to { opacity: 1; transform: translateY(0); }
	}

	article:hover {
		box-shadow: 0 20px 48px -8px var(--shadow-color, rgba(0,0,0,0.3));
	}
</style>
