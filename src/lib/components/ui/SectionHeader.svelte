<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		align?: 'left' | 'center';
		tag?: string;
	}

	let { title, subtitle, align = 'left', tag }: Props = $props();
</script>

<div class="flex flex-col gap-3" class:items-center={align === 'center'} class:text-center={align === 'center'}>
	{#if tag}
		<p class="font-mono text-xs font-medium tracking-widest uppercase" style="color: var(--color-accent);">
			{tag}
		</p>
	{/if}

	<h2 class="text-3xl sm:text-4xl font-bold leading-tight" style="color: var(--color-text);">
		{title}
	</h2>

	<!-- Accent underline -->
	<div class="flex" class:justify-center={align === 'center'}>
		<div class="h-1 w-12 rounded-full" style="background: var(--color-accent);"></div>
		<div class="h-1 w-4 rounded-full ml-1.5 opacity-40" style="background: var(--color-accent);"></div>
	</div>

	{#if subtitle}
		<p class="text-base sm:text-lg max-w-2xl leading-relaxed" style="color: var(--color-text-muted);">
			{subtitle}
		</p>
	{/if}
</div>
