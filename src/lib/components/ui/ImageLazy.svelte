<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		class?: string;
		priority?: boolean;
	}

	let {
		src,
		alt,
		width = 1280,
		height = 720,
		class: cls = '',
		priority = false
	}: Props = $props();

	let loaded = $state(false);
	let errored = $state(false);
</script>

<div class="relative overflow-hidden {cls}" style="aspect-ratio: {width}/{height};">
	{#if !loaded && !errored}
		<!-- Shimmer placeholder -->
		<div
			class="absolute inset-0 shimmer"
			style="background: var(--color-surface-2);"
			aria-hidden="true"
		></div>
	{/if}

	{#if errored}
		<!-- Fallback when image is missing -->
		<div
			class="absolute inset-0 flex items-center justify-center"
			style="background: var(--color-surface-2);"
			aria-hidden="true"
		>
			<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3">
				<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
				<circle cx="8.5" cy="8.5" r="1.5"/>
				<polyline points="21 15 16 10 5 21"/>
			</svg>
		</div>
	{/if}

	<img
		{src}
		{alt}
		{width}
		{height}
		loading={priority ? 'eager' : 'lazy'}
		decoding="async"
		class="w-full h-full object-cover transition-opacity duration-500"
		class:opacity-0={!loaded}
		class:opacity-100={loaded}
		onload={() => (loaded = true)}
		onerror={() => (errored = true)}
	/>
</div>

<style>
	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}

	.shimmer {
		background: linear-gradient(
			90deg,
			var(--color-surface-2) 25%,
			color-mix(in srgb, var(--color-surface-2) 60%, var(--color-surface)) 50%,
			var(--color-surface-2) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.6s ease-in-out infinite;
	}

	@media (prefers-reduced-motion: reduce) {
		.shimmer { animation: none; }
	}
</style>
