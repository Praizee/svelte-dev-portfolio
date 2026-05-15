<script lang="ts">
	import type { PageData } from './$types';
	import { getRelatedProjects } from '$lib/data/projects';
	import Badge from '$lib/components/ui/Badge.svelte';
	import ImageCarousel from '$lib/components/ui/ImageCarousel.svelte';
	import SectionHeader from '$lib/components/ui/SectionHeader.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);
	const related = $derived(getRelatedProjects(project, 2));

	// External link icon path
	const externalIcon = `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/>`;
	const githubIcon = `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`;

	function getIcon(icon?: string) {
		if (icon === 'github') return githubIcon;
		return externalIcon;
	}
</script>

<svelte:head>
	<title>{project.title} — Stephen Adeniji</title>
	<meta name="description" content={project.tagline} />
</svelte:head>

<!-- ── Hero Header ── -->
<div
	class="relative overflow-hidden"
	style="background: linear-gradient(135deg, color-mix(in srgb, {project.color} 18%, var(--color-bg)) 0%, var(--color-bg) 70%);"
>
	<!-- Background glow -->
	<div
		class="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
		style="background: {project.color};"
		aria-hidden="true"
	></div>

	<div class="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16">
		<!-- Breadcrumb -->
		<nav aria-label="Breadcrumb" class="mb-8">
			<ol class="flex items-center gap-2 font-mono text-xs" style="color: var(--color-text-muted);">
				<li><a href="/" class="hover:text-accent transition-colors duration-150">~</a></li>
				<li aria-hidden="true">/</li>
				<li><a href="/projects" class="hover:text-accent transition-colors duration-150">projects</a></li>
				<li aria-hidden="true">/</li>
				<li style="color: var(--color-text);">{project.slug}</li>
			</ol>
		</nav>

		<!-- Title block -->
		<div class="flex flex-col gap-4 max-w-3xl">
			<div class="flex items-center gap-3 flex-wrap">
				<Badge label={project.category} variant="category" category={project.category} />
				<span class="font-mono text-xs" style="color: var(--color-text-muted);">{project.year}</span>
			</div>

			<h1
				class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
				style="color: var(--color-text);"
			>
				{project.title}
			</h1>

			<p class="text-lg sm:text-xl leading-relaxed max-w-2xl" style="color: var(--color-text-muted);">
				{project.tagline}
			</p>

			<!-- CTA links in header -->
			<div class="flex flex-wrap gap-3 pt-2">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
						style="background: {project.color};"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							{@html getIcon(link.icon)}
						</svg>
						{link.label}
					</a>
				{/each}

				<a
					href="/projects"
					class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
					style="border-color: var(--color-border); color: var(--color-text); background: var(--color-surface);"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
						<path d="M19 12H5M12 19l-7-7 7-7" />
					</svg>
					All Projects
				</a>
			</div>
		</div>
	</div>
</div>

<!-- ── Main Content ── -->
<div class="max-w-6xl mx-auto px-4 sm:px-6 py-16">
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

		<!-- Left: image + description -->
		<div class="lg:col-span-2 flex flex-col gap-10">

			<!-- Image carousel / placeholder -->
			{#if project.images.length > 0}
				<ImageCarousel images={project.images} accentColor={project.color} priority={true} />
			{:else}
				<div
					class="rounded-2xl flex items-center justify-center border"
					style="aspect-ratio: 16/9; border-color: var(--color-border); background: linear-gradient(135deg, color-mix(in srgb, {project.color} 14%, var(--color-surface-2)), color-mix(in srgb, {project.color} 5%, var(--color-surface-2)));"
				>
					<span class="font-bold text-6xl opacity-20" style="color: {project.color};">
						{project.title.slice(0, 2).toUpperCase()}
					</span>
				</div>
			{/if}

			<!-- Description -->
			<div class="flex flex-col gap-4">
				<h2 class="text-xl font-bold" style="color: var(--color-text);">About this project</h2>
				<div
					class="prose-content text-base leading-relaxed"
					style="color: var(--color-text-muted);"
				>
					{#each project.description.split('\n').filter(Boolean) as para}
						<p class="mb-4 last:mb-0">{para.trim()}</p>
					{/each}
				</div>
			</div>
		</div>

		<!-- Right: sidebar -->
		<div class="flex flex-col gap-8">

			<!-- Tech stack -->
			<div
				class="rounded-2xl border p-6 flex flex-col gap-4"
				style="border-color: var(--color-border); background: var(--color-surface);"
			>
				<h3 class="font-mono text-xs font-semibold tracking-widest uppercase" style="color: var(--color-accent);">
					// tech stack
				</h3>
				<div class="flex flex-wrap gap-2">
					{#each project.stack as tech}
						<Badge label={tech} />
					{/each}
				</div>
			</div>

			<!-- Links -->
			<div
				class="rounded-2xl border p-6 flex flex-col gap-4"
				style="border-color: var(--color-border); background: var(--color-surface);"
			>
				<h3 class="font-mono text-xs font-semibold tracking-widest uppercase" style="color: var(--color-accent);">
					// links
				</h3>
				<div class="flex flex-col gap-2">
					{#each project.links as link}
						<a
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 hover:border-[var(--color-accent)] group"
							style="border-color: var(--color-border);"
						>
							<span
								class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150"
								style="background: color-mix(in srgb, {project.color} 14%, var(--color-surface-2)); color: {project.color};"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									{@html getIcon(link.icon)}
								</svg>
							</span>
							<span class="text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors duration-150" style="color: var(--color-text);">
								{link.label}
							</span>
							<svg
								class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-150"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								aria-hidden="true"
								style="color: var(--color-accent);"
							>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Meta card -->
			<div
				class="rounded-2xl border p-6 flex flex-col gap-4"
				style="border-color: var(--color-border); background: var(--color-surface);"
			>
				<h3 class="font-mono text-xs font-semibold tracking-widest uppercase" style="color: var(--color-accent);">
					// details
				</h3>
				<dl class="flex flex-col gap-3">
					<div class="flex justify-between items-center text-sm">
						<dt style="color: var(--color-text-muted);">Category</dt>
						<dd><Badge label={project.category} variant="category" category={project.category} /></dd>
					</div>
					<div class="flex justify-between items-center text-sm">
						<dt style="color: var(--color-text-muted);">Year</dt>
						<dd class="font-mono font-medium" style="color: var(--color-text);">{project.year}</dd>
					</div>
					<div class="flex justify-between items-center text-sm">
						<dt style="color: var(--color-text-muted);">Stack size</dt>
						<dd class="font-mono font-medium" style="color: var(--color-text);">{project.stack.length} technologies</dd>
					</div>
				</dl>
			</div>
		</div>
	</div>

	<!-- ── Related Projects ── -->
	{#if related.length > 0}
		<div class="mt-24 pt-16 border-t" style="border-color: var(--color-border);">
			<div class="mb-10">
				<SectionHeader tag="// more work" title="Related Projects" />
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{#each related as rel, i}
					<ProjectCard project={rel} index={i} />
				{/each}
			</div>
		</div>
	{/if}
</div>
