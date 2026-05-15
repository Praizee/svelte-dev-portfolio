<script lang="ts">
	import type { TerminalLine } from '$lib/stores/terminal';

	interface Props {
		line: TerminalLine;
	}

	let { line }: Props = $props();

	const colorMap = {
		command: 'var(--color-terminal-prompt)',
		output: 'var(--color-terminal-text)',
		error: 'var(--color-terminal-red)'
	};
</script>

<div
	class="font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
	style="color: {colorMap[line.type]};"
>
	{#if line.type === 'command'}
		<span style="color: var(--color-terminal-green);">❯</span>
		<span class="ml-2">{line.text.replace(/^\$ /, '')}</span>
	{:else if line.text === ''}
		<span>&nbsp;</span>
	{:else}
		{line.text}
	{/if}
</div>
