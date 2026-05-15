<script lang="ts">
	import type { ProjectCategory } from '$lib/data/projects';

	interface FilterOption {
		label: string;
		value: ProjectCategory | 'all';
		count: number;
	}

	interface Props {
		options: FilterOption[];
		active: ProjectCategory | 'all';
		onchange: (value: ProjectCategory | 'all') => void;
	}

	let { options, active, onchange }: Props = $props();
</script>

<div
	role="group"
	aria-label="Filter projects by category"
	class="flex flex-wrap gap-2"
>
	{#each options as option}
		<button
			onclick={() => onchange(option.value)}
			aria-pressed={active === option.value}
			class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
			style={active === option.value
				? 'background: var(--color-accent); border-color: var(--color-accent); color: #fff;'
				: 'background: var(--color-surface); border-color: var(--color-border); color: var(--color-text-muted);'}
		>
			{option.label}
			<span
				class="inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
				style={active === option.value
					? 'background: rgba(255,255,255,0.25); color: #fff;'
					: 'background: var(--color-surface-2); color: var(--color-text-muted);'}
			>
				{option.count}
			</span>
		</button>
	{/each}
</div>
