import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

function createThemeStore() {
	const initial: Theme = browser ? ((localStorage.getItem('theme') as Theme) ?? 'dark') : 'dark';

	const { subscribe, set } = writable<Theme>(initial);

	if (browser) {
		document.documentElement.classList.toggle('dark', initial === 'dark');
		document.documentElement.classList.toggle('light', initial === 'light');
	}

	return {
		subscribe,
		toggle() {
			const current = browser ? ((localStorage.getItem('theme') as Theme) ?? 'dark') : 'dark';
			const next: Theme = current === 'dark' ? 'light' : 'dark';
			set(next);
			if (browser) {
				document.documentElement.classList.toggle('dark', next === 'dark');
				document.documentElement.classList.toggle('light', next === 'light');
				localStorage.setItem('theme', next);
			}
		}
	};
}

export const theme = createThemeStore();
