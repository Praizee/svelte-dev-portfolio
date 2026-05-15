<script lang="ts">
	import HeroBackground from './HeroBackground.svelte';
	import HeroTitle from './HeroTitle.svelte';
	import { terminal } from '$lib/stores/terminal';

	const socials = [
		{
			label: 'GitHub',
			href: 'https://github.com/Praizee',
			icon: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/stephen-adeniji/',
			icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`
		},
		{
			label: 'Twitter / X',
			href: 'https://x.com/intent/follow?screen_name=steevenadeniji',
			icon: `<path d="M4 4l16 16M4 20L20 4"/>`
		},
		{
			label: 'Email',
			href: 'mailto:adeolaastephen@gmail.com',
			icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
		}
	];
</script>

<section
	class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
	aria-label="Introduction"
>
	<HeroBackground />

	<div class="relative z-10 max-w-4xl w-full mx-auto flex flex-col gap-8 sm:gap-10">
		<!-- Title + typewriter -->
		<HeroTitle />

		<!-- Bio -->
		<p
			class="max-w-xl text-base sm:text-lg leading-relaxed animate-[fadeSlideIn_0.7s_ease_0.5s_both]"
			style="color: var(--color-text-muted);"
		>
			I build fast, polished, and accessible web experiences — turning product ideas into
			interfaces people enjoy using. 2+ years shipping across fintech, SaaS, and AI.
		</p>

		<!-- CTAs -->
		<div class="flex flex-wrap gap-3 animate-[fadeSlideIn_0.7s_ease_0.7s_both]">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
				style="background: var(--color-accent);"
			>
				View Projects
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>

			<a
				href="https://docs.google.com/document/d/1jcShwi6kIsihQ1aFXs85n65K07yycl1Kel53FiCy2bo/edit?usp=sharing"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
				style="border-color: var(--color-border); color: var(--color-text); background: var(--color-surface);"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
				</svg>
				Resume
			</a>

			<button
				onclick={() => terminal.toggle()}
				class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono font-medium border transition-all duration-200 hover:scale-[1.03] hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] active:scale-[0.97]"
				style="border-color: var(--color-border); color: var(--color-text-muted); background: var(--color-surface);"
				aria-label="Open terminal (Ctrl+`)"
			>
				<span style="color: var(--color-terminal-green);">&gt;_</span>
				Open Terminal
				<kbd
					class="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded border font-mono"
					style="border-color: var(--color-border); color: var(--color-text-muted);"
				>Ctrl+`</kbd>
			</button>
		</div>

		<!-- Socials -->
		<div class="flex items-center gap-3 animate-[fadeSlideIn_0.7s_ease_0.9s_both]">
			{#each socials as social}
				<a
					href={social.href}
					target={social.href.startsWith('mailto') ? undefined : '_blank'}
					rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
					aria-label={social.label}
					class="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:scale-110"
					style="border-color: var(--color-border); color: var(--color-text-muted); background: var(--color-surface);"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						{@html social.icon}
					</svg>
				</a>
			{/each}

			<span class="w-px h-5 mx-1" style="background: var(--color-border);"></span>

			<span class="font-mono text-xs" style="color: var(--color-text-muted);">
				<span style="color: var(--color-terminal-green);">●</span> Available for work
			</span>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-[fadeSlideIn_1s_ease_1.2s_both]"
		aria-hidden="true"
	>
		<span class="font-mono text-[10px] tracking-widest uppercase" style="color: var(--color-text-muted);">scroll</span>
		<div class="w-px h-8 relative overflow-hidden" style="background: var(--color-border);">
			<div class="absolute top-0 left-0 w-full h-full origin-top animate-[scrollLine_1.8s_ease-in-out_infinite]" style="background: var(--color-accent);"></div>
		</div>
	</div>
</section>

<style>
	@keyframes fadeSlideIn {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes scrollLine {
		0% { transform: scaleY(0); transform-origin: top; }
		50% { transform: scaleY(1); transform-origin: top; }
		51% { transform: scaleY(1); transform-origin: bottom; }
		100% { transform: scaleY(0); transform-origin: bottom; }
	}

	@media (prefers-reduced-motion: reduce) {
		:global([class*='animate-']) { animation: none !important; opacity: 1 !important; }
	}
</style>
