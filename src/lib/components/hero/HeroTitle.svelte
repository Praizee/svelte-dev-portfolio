<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const name = 'Stephen Adeniji';
	const chars = name.split('');

	const roles = ['Frontend Engineer.', 'UI Developer.', 'React & Svelte Dev.', 'Product Builder.'];
	let roleIndex = $state(0);
	let displayed = $state('');
	let isDeleting = $state(false);
	let charIndex = $state(0);

	let titleEl: HTMLHeadingElement;

	onMount(async () => {
		// GSAP letter reveal
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!prefersReduced) {
			const { gsap } = await import('gsap');
			const chars = titleEl.querySelectorAll('[data-char]');
			gsap.from(chars, {
				y: 80,
				opacity: 0,
				duration: 0.7,
				stagger: 0.035,
				ease: 'back.out(1.4)',
				delay: 0.15
			});
		}

		// Typewriter
		let timeout: ReturnType<typeof setTimeout>;

		function tick() {
			const current = roles[roleIndex];
			if (isDeleting) {
				displayed = current.slice(0, charIndex - 1);
				charIndex -= 1;
			} else {
				displayed = current.slice(0, charIndex + 1);
				charIndex += 1;
			}

			let delay = isDeleting ? 40 : 70;

			if (!isDeleting && displayed === current) {
				delay = 1800;
				isDeleting = true;
			} else if (isDeleting && displayed === '') {
				isDeleting = false;
				roleIndex = (roleIndex + 1) % roles.length;
				charIndex = 0;
				delay = 300;
			}

			timeout = setTimeout(tick, delay);
		}

		timeout = setTimeout(tick, 900);
		return () => clearTimeout(timeout);
	});
</script>

<div class="flex flex-col gap-3 sm:gap-4">
	<!-- Eyebrow -->
	<p
		class="font-mono text-xs sm:text-sm font-medium tracking-widest uppercase"
		style="color: var(--color-accent);"
	>
		<span class="inline-block animate-[fadeSlideIn_0.6s_ease_0.1s_both]">
			&gt; Hello, I'm
		</span>
	</p>

	<!-- Name with per-character reveal -->
	<h1
		bind:this={titleEl}
		class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none tracking-tight"
		style="color: var(--color-text);"
		aria-label={name}
	>
		{#each chars as char, i}
			<span
				data-char
				class="inline-block"
				style={char === ' ' ? 'width: 0.35em;' : ''}
				aria-hidden="true"
			>{char}</span>
		{/each}
	</h1>

	<!-- Typewriter role -->
	<div
		class="font-mono text-lg sm:text-xl lg:text-2xl font-medium h-8 sm:h-9 flex items-center"
		style="color: var(--color-text-muted);"
		aria-live="polite"
		aria-label="Role: {displayed}"
	>
		<span>{displayed}</span><span
			class="inline-block w-0.5 h-5 sm:h-6 ml-0.5 animate-[blink_1s_step-end_infinite]"
			style="background: var(--color-accent);"
			aria-hidden="true"
		></span>
	</div>
</div>

<style>
	@keyframes fadeSlideIn {
		from { opacity: 0; transform: translateY(8px); }
		to { opacity: 1; transform: translateY(0); }
	}

	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>
