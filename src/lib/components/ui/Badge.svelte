<script lang="ts">
	import type { ProjectCategory } from '$lib/data/projects';

	interface Props {
		label: string;
		variant?: 'tech' | 'category';
		category?: ProjectCategory;
	}

	let { label, variant = 'tech', category }: Props = $props();

	const categoryColors: Record<ProjectCategory, string> = {
		fullstack: 'color: #3B82F6; background: color-mix(in srgb, #3B82F6 12%, transparent);',
		ai: 'color: #10B981; background: color-mix(in srgb, #10B981 12%, transparent);',
		fintech: 'color: #F59E0B; background: color-mix(in srgb, #F59E0B 12%, transparent);',
		saas: 'color: #EF4444; background: color-mix(in srgb, #EF4444 12%, transparent);',
		landing: 'color: #8B5CF6; background: color-mix(in srgb, #8B5CF6 12%, transparent);'
	};

	const style = $derived(
		variant === 'category' && category
			? categoryColors[category]
			: 'color: var(--color-text-muted); background: var(--color-surface-2);'
	);
</script>

<span
	class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-medium leading-5 whitespace-nowrap"
	{style}
>
	{label}
</span>
