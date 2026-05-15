<script lang="ts">
	import { onMount } from 'svelte';
	import { staggerReveal, prefersReducedMotion } from '$lib/utils/animations';

	const groups = [
		{
			label: 'Frontend',
			skills: ['React', 'Next.js', 'SvelteKit', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP']
		},
		{
			label: 'Backend & Data',
			skills: ['Supabase', 'Firebase', 'Sanity CMS']
			// 'Prisma'
		},
		{
			label: 'Tools',
			skills: ['Git', 'GitHub', 'Figma', 'Vercel', 'Netlify', 'VS Code']
		}
	];

	let sectionEl = $state<HTMLElement | undefined>(undefined);

	onMount(() => {
		if (!sectionEl || prefersReducedMotion()) return;
		staggerReveal(sectionEl, '[data-reveal]', { y: 24, stagger: 0.07, duration: 0.55 });
	});
</script>

<section id="skills" bind:this={sectionEl} class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
	<div class="flex flex-col gap-12">
		<!-- Header -->
		<div data-reveal class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
			<div class="flex flex-col gap-3">
				<p class="font-mono text-xs font-medium tracking-widest uppercase" style="color: var(--color-accent);">
					// skills
				</p>
				<h2 class="text-3xl sm:text-4xl font-bold" style="color: var(--color-text);">
					Tech Stack
				</h2>
				<div class="flex gap-1.5">
					<div class="h-1 w-12 rounded-full" style="background: var(--color-accent);"></div>
					<div class="h-1 w-4 rounded-full opacity-40" style="background: var(--color-accent);"></div>
				</div>
			</div>
			<p class="text-sm max-w-sm" style="color: var(--color-text-muted);">
				Tools and technologies I reach for when building products.
			</p>
		</div>

		<!-- Skill groups -->
		<div data-reveal class="flex flex-col gap-8">
			{#each groups as group}
				<div class="flex flex-col gap-3">
					<p class="font-mono text-xs tracking-widest uppercase" style="color: var(--color-text-muted);">
						{group.label}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each group.skills as skill}
							<span
								class="px-3 py-1.5 rounded-full font-mono text-xs border transition-all duration-200 hover:border-accent hover:text-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_6%,transparent)] cursor-default select-none"
								style="background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
