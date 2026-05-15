<script lang="ts">
	import { onMount } from 'svelte';
	import { revealFrom, prefersReducedMotion } from '$lib/utils/animations';
	import type { RevealOptions } from '$lib/utils/animations';

	interface Props {
		options?: RevealOptions;
		threshold?: number;
		class?: string;
		children: import('svelte').Snippet;
	}

	let { options = {}, threshold = 0.15, class: cls = '', children }: Props = $props();

	let el = $state<HTMLDivElement | undefined>(undefined);

	onMount(() => {
		if (prefersReducedMotion() || !el) return;

		// Start invisible; the observer will fire the animation
		el.style.opacity = '0';

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						revealFrom(entry.target, options);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div bind:this={el} class={cls}>
	{@render children()}
</div>
