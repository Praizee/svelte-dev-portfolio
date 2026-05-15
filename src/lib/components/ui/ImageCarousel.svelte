<script lang="ts">
	import ImageLazy from './ImageLazy.svelte';

	interface Image {
		src: string;
		alt: string;
		width: number;
		height: number;
	}

	interface Props {
		images: Image[];
		accentColor?: string;
		priority?: boolean;
	}

	let { images, accentColor = 'var(--color-accent)', priority = false }: Props = $props();

	let current = $state(0);

	function prev() {
		current = (current - 1 + images.length) % images.length;
	}

	function next() {
		current = (current + 1) % images.length;
	}

	function goTo(i: number) {
		current = i;
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') prev();
		else if (e.key === 'ArrowRight') next();
	}
</script>

<div
	class="relative rounded-2xl overflow-hidden border"
	style="border-color: var(--color-border); box-shadow: 0 24px 64px -12px color-mix(in srgb, {accentColor} 20%, transparent);"
	role="region"
	aria-label="Project screenshots"
>
	<!-- Slides -->
	<div class="relative overflow-hidden" style="aspect-ratio: 16/9;">
		{#each images as img, i}
			<div
				class="absolute inset-0 transition-opacity duration-400"
				style="opacity: {i === current ? 1 : 0}; pointer-events: {i === current ? 'auto' : 'none'};"
				aria-hidden={i !== current}
			>
				<ImageLazy
					src={img.src}
					alt={img.alt}
					width={img.width}
					height={img.height}
					priority={priority && i === 0}
					class="w-full h-full object-cover"
				/>
			</div>
		{/each}
	</div>

	<!-- Prev / Next arrows (only when multiple images) -->
	{#if images.length > 1}
		<button
			onclick={prev}
			aria-label="Previous screenshot"
			class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-white"
			style="background: rgba(0,0,0,0.5); color: #fff; backdrop-filter: blur(4px);"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
				<path d="M15 18l-6-6 6-6" />
			</svg>
		</button>

		<button
			onclick={next}
			aria-label="Next screenshot"
			class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 focus-visible:outline-2 focus-visible:outline-white"
			style="background: rgba(0,0,0,0.5); color: #fff; backdrop-filter: blur(4px);"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
				<path d="M9 18l6-6-6-6" />
			</svg>
		</button>

		<!-- Dot indicators -->
		<div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5" role="tablist" aria-label="Screenshot navigation">
			{#each images as _, i}
				<button
					role="tab"
					aria-selected={i === current}
					aria-label="Screenshot {i + 1} of {images.length}"
					onclick={() => goTo(i)}
					class="rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-white"
					style="
						width: {i === current ? '20px' : '6px'};
						height: 6px;
						background: {i === current ? '#fff' : 'rgba(255,255,255,0.4)'};
					"
				></button>
			{/each}
		</div>

		<!-- Counter -->
		<div
			class="absolute top-3 right-3 font-mono text-[10px] px-2 py-1 rounded-full"
			style="background: rgba(0,0,0,0.5); color: rgba(255,255,255,0.8); backdrop-filter: blur(4px);"
			aria-live="polite"
			aria-atomic="true"
		>
			{current + 1} / {images.length}
		</div>
	{/if}
</div>
