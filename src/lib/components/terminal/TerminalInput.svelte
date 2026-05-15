<script lang="ts">
	import { terminal } from '$lib/stores/terminal';

	interface Props {
		onsubmit: (value: string) => void;
	}

	let { onsubmit }: Props = $props();

	let value = $state('');
	let inputEl = $state<HTMLInputElement | undefined>(undefined);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			const trimmed = value.trim();
			if (trimmed) onsubmit(trimmed);
			value = '';
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			terminal.navigateHistory('up');
			const idx = $terminal.historyIndex;
			if ($terminal.commandHistory[idx] !== undefined) {
				value = $terminal.commandHistory[idx];
			}
			return;
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			terminal.navigateHistory('down');
			const idx = $terminal.historyIndex;
			value = idx === -1 ? '' : ($terminal.commandHistory[idx] ?? '');
			return;
		}

		// Tab autocomplete
		if (e.key === 'Tab') {
			e.preventDefault();
			const commands = ['help', 'whoami', 'ls', 'ls projects', 'skills', 'contact', 'clear', 'exit',
				'open lloyd-autos', 'open nomad-fitness', 'open pursfi', 'open ezzymeans', 'open gradific',
				'open projects', 'open home'];
			const match = commands.find((c) => c.startsWith(value) && c !== value);
			if (match) value = match;
		}
	}
</script>

<div class="flex items-center gap-2 px-4 py-3 border-t shrink-0" style="border-color: rgba(255,255,255,0.08);">
	<span class="font-mono text-sm shrink-0" style="color: var(--color-terminal-green);">❯</span>
	<input
		bind:this={inputEl}
		bind:value
		type="text"
		onkeydown={handleKeydown}
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck={false}
		aria-label="Terminal input"
		class="flex-1 bg-transparent font-mono text-sm outline-none caret-[var(--color-terminal-green)] min-w-0"
		style="color: var(--color-terminal-text);"
		placeholder="type a command…"
	/>
</div>
