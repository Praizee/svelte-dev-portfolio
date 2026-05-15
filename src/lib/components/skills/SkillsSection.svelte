<script lang="ts">
	import { onMount } from 'svelte';
	import { animateBar, staggerReveal, prefersReducedMotion } from '$lib/utils/animations';

	type Skill = { name: string; level: number; icon: string };
	type SkillGroup = { label: string; skills: Skill[] };

	const groups: SkillGroup[] = [
		{
			label: 'Frontend',
			skills: [
				{ name: 'React / Next.js', level: 90, icon: '⚛' },
				{ name: 'SvelteKit', level: 85, icon: '🔥' },
				{ name: 'TypeScript', level: 88, icon: '𝙏' },
				{ name: 'Tailwind CSS', level: 92, icon: '💨' },
				{ name: 'Framer Motion', level: 80, icon: '✦' },
				{ name: 'GSAP', level: 75, icon: '🎯' }
			]
		},
		{
			label: 'Backend & Data',
			skills: [
				{ name: 'Node.js', level: 72, icon: '🟢' },
				{ name: 'Prisma', level: 70, icon: '▲' },
				{ name: 'PostgreSQL', level: 65, icon: '🐘' },
				{ name: 'Sanity CMS', level: 78, icon: '📦' }
			]
		},
		{
			label: 'Tools',
			skills: [
				{ name: 'Git / GitHub', level: 90, icon: '🐙' },
				{ name: 'Figma', level: 75, icon: '🎨' },
				{ name: 'Vercel / Netlify', level: 85, icon: '🚀' },
				{ name: 'VS Code', level: 95, icon: '💙' }
			]
		}
	];

	let activeGroup = $state(0);
	let sectionEl = $state<HTMLElement | undefined>(undefined);
	// Map of "groupIndex-skillIndex" -> bar element
	let barEls = $state<Record<string, HTMLDivElement>>({});

	function setBar(key: string, el: HTMLDivElement | null) {
		if (el) barEls[key] = el;
	}

	// Re-animate bars whenever active tab changes
	$effect(() => {
		const group = groups[activeGroup];
		if (!group || prefersReducedMotion()) return;

		// Defer so DOM is updated first
		setTimeout(() => {
			group.skills.forEach((skill, j) => {
				const bar = barEls[`${activeGroup}-${j}`];
				if (bar) animateBar(bar, `${skill.level}%`, j * 0.06);
			});
		}, 0);
	});

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

		<!-- Group tabs -->
		<div data-reveal role="tablist" aria-label="Skill categories" class="flex gap-2 flex-wrap">
			{#each groups as group, i}
				<button
					role="tab"
					aria-selected={activeGroup === i}
					aria-controls="skill-panel-{i}"
					id="skill-tab-{i}"
					onclick={() => (activeGroup = i)}
					class="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200"
					style={activeGroup === i
						? 'background: var(--color-accent); border-color: var(--color-accent); color: #fff;'
						: 'background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);'}
				>
					{group.label}
				</button>
			{/each}
		</div>

		<!-- Skill panels -->
		{#each groups as group, i}
			<div
				role="tabpanel"
				id="skill-panel-{i}"
				aria-labelledby="skill-tab-{i}"
				hidden={activeGroup !== i}
				class="grid grid-cols-1 sm:grid-cols-2 gap-4"
			>
				{#each group.skills as skill, j}
					<div
						data-reveal
						class="rounded-xl border p-4 flex flex-col gap-3 transition-all duration-300 hover:border-[var(--color-accent)]"
						style="background: var(--color-surface); border-color: var(--color-border);"
					>
						<div class="flex items-center justify-between gap-3">
							<div class="flex items-center gap-2.5">
								<span
									class="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
									style="background: var(--color-surface-2);"
									aria-hidden="true"
								>{skill.icon}</span>
								<span class="text-sm font-semibold" style="color: var(--color-text);">{skill.name}</span>
							</div>
							<span class="font-mono text-xs shrink-0" style="color: var(--color-text-muted);">
								{skill.level}%
							</span>
						</div>

						<!-- Bar track -->
						<div
							class="h-1 rounded-full overflow-hidden"
							style="background: var(--color-surface-2);"
							role="progressbar"
							aria-valuenow={skill.level}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-label="{skill.name} proficiency {skill.level}%"
						>
							<div
								bind:this={barEls[`${i}-${j}`]}
								class="h-full rounded-full"
								style="width: 0%; background: linear-gradient(90deg, var(--color-accent), var(--color-accent-2));"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{/each}

		<!-- Badge cloud -->
		<div data-reveal class="flex flex-wrap gap-2 pt-2">
			{#each ['React', 'Next.js', 'SvelteKit', 'TypeScript', 'Tailwind', 'GSAP', 'Framer Motion', 'Prisma', 'PostgreSQL', 'Sanity', 'Figma', 'Vercel'] as tech}
				<span
					class="px-3 py-1 rounded-full font-mono text-xs border transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-default"
					style="background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);"
				>
					{tech}
				</span>
			{/each}
		</div>
	</div>
</section>
