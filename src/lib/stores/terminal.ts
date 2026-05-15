import { writable } from 'svelte/store';

export type TerminalLine =
	| { type: 'command'; text: string }
	| { type: 'output'; text: string }
	| { type: 'error'; text: string };

interface TerminalState {
	open: boolean;
	history: TerminalLine[];
	commandHistory: string[];
	historyIndex: number;
}

const INITIAL_HISTORY: TerminalLine[] = [
	{ type: 'output', text: 'Stephen Adeniji — Portfolio CLI v1.0.0' },
	{ type: 'output', text: 'Type `help` for available commands.' },
	{ type: 'output', text: '' }
];

function createTerminalStore() {
	const { subscribe, update } = writable<TerminalState>({
		open: false,
		history: INITIAL_HISTORY,
		commandHistory: [],
		historyIndex: -1
	});

	return {
		subscribe,
		open: () => update((s) => ({ ...s, open: true })),
		close: () => update((s) => ({ ...s, open: false })),
		toggle: () => update((s) => ({ ...s, open: !s.open })),
		pushLine: (line: TerminalLine) => update((s) => ({ ...s, history: [...s.history, line] })),
		pushLines: (lines: TerminalLine[]) =>
			update((s) => ({ ...s, history: [...s.history, ...lines] })),
		pushCommand: (raw: string) =>
			update((s) => ({
				...s,
				history: [...s.history, { type: 'command', text: `$ ${raw}` }],
				commandHistory: [raw, ...s.commandHistory].slice(0, 50),
				historyIndex: -1
			})),
		clear: () => update((s) => ({ ...s, history: [] })),
		navigateHistory: (dir: 'up' | 'down') =>
			update((s) => {
				const max = s.commandHistory.length - 1;
				const next =
					dir === 'up'
						? Math.min(s.historyIndex + 1, max)
						: Math.max(s.historyIndex - 1, -1);
				return { ...s, historyIndex: next };
			})
	};
}

export const terminal = createTerminalStore();
