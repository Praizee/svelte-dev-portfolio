<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { terminal, type TerminalLine } from '$lib/stores/terminal';
	import TerminalLineComp from './TerminalLine.svelte';
	import TerminalInput from './TerminalInput.svelte';
	import { projects } from '$lib/data/projects';

	let bodyEl = $state<HTMLDivElement | undefined>(undefined);
	let firstFocusable = $state<HTMLButtonElement | undefined>(undefined);

	// Scroll to bottom whenever history grows
	$effect(() => {
		void $terminal.history.length;
		tick().then(() => {
			if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight;
		});
	});

	// Focus the input whenever the terminal opens
	$effect(() => {
		if ($terminal.open) {
			tick().then(() => {
				const input = document.querySelector<HTMLInputElement>('#terminal-overlay input');
				input?.focus();
			});
		}
	});

	// ── Command resolver ────────────────────────────────────────────────────
	const SLUG_MAP: Record<string, string> = {
		'lloyd-autos': '/projects/lloyd-autos',
		'nomad-fitness': '/projects/nomad-fitness',
		pursfi: '/projects/pursfi',
		ezzymeans: '/projects/ezzymeans',
		gradific: '/projects/gradific',
		projects: '/projects',
		home: '/'
	};

	const HELP_LINES: TerminalLine[] = [
		{ type: 'output', text: '┌─ Available commands ───────────────────────────┐' },
		{ type: 'output', text: '│  help          Show this help message           │' },
		{ type: 'output', text: '│  whoami        About Stephen Adeniji            │' },
		{ type: 'output', text: '│  ls projects   List all projects                │' },
		{ type: 'output', text: '│  open <slug>   Navigate to a project            │' },
		{ type: 'output', text: '│  open projects Go to the projects page          │' },
		{ type: 'output', text: '│  open home     Go to homepage                   │' },
		{ type: 'output', text: '│  skills        View skills & tech stack         │' },
		{ type: 'output', text: '│  contact       View contact info                │' },
		{ type: 'output', text: '│  clear         Clear the terminal               │' },
		{ type: 'output', text: '│  exit          Close the terminal               │' },
		{ type: 'output', text: '└────────────────────────────────────────────────┘' },
		{ type: 'output', text: '' },
		{ type: 'output', text: '  Tip: Tab autocompletes · ↑↓ navigates history · Esc closes' }
	];

	const WHOAMI_LINES: TerminalLine[] = [
		{ type: 'output', text: '' },
		{ type: 'output', text: '  Stephen Adeniji' },
		{ type: 'output', text: '  ─────────────────────────────────────' },
		{ type: 'output', text: '  Role    Frontend Engineer' },
		{ type: 'output', text: '  Exp     2+ years' },
		{ type: 'output', text: '  Focus   React · Next.js · SvelteKit · TypeScript' },
		{ type: 'output', text: '  Email   adeolaastephen@gmail.com' },
		{ type: 'output', text: '  GitHub  github.com/Praizee' },
		{ type: 'output', text: '  X       @steevenadeniji' },
		{ type: 'output', text: '' }
	];

	const SKILLS_LINES: TerminalLine[] = [
		{ type: 'output', text: '' },
		{ type: 'output', text: '  // Frontend' },
		{ type: 'output', text: '  React · Next.js · SvelteKit · TypeScript · Tailwind CSS' },
		{ type: 'output', text: '' },
		{ type: 'output', text: '  // Animation' },
		{ type: 'output', text: '  GSAP · Framer Motion · CSS Animations' },
		{ type: 'output', text: '' },
		{ type: 'output', text: '  // Backend & Data' },
		{ type: 'output', text: '  Node.js · Prisma · PostgreSQL · Sanity CMS' },
		{ type: 'output', text: '' },
		{ type: 'output', text: '  // Tools' },
		{ type: 'output', text: '  Git · Figma · Vercel · Netlify · VS Code' },
		{ type: 'output', text: '' }
	];

	const CONTACT_LINES: TerminalLine[] = [
		{ type: 'output', text: '' },
		{ type: 'output', text: '  Email    adeolaastephen@gmail.com' },
		{ type: 'output', text: '  LinkedIn linkedin.com/in/stephen-adeniji' },
		{ type: 'output', text: '  GitHub   github.com/Praizee' },
		{ type: 'output', text: '  X        @steevenadeniji' },
		{ type: 'output', text: '' },
		{ type: 'output', text: '  → Scrolling to contact section…' }
	];

	function buildLsLines(): TerminalLine[] {
		return [
			{ type: 'output', text: '' },
			...projects.map((p, i) => ({
				type: 'output' as const,
				text: `  ${String(i + 1).padStart(2, '0')}  ${p.slug.padEnd(18)}  ${p.tagline.slice(0, 42)}…`
			})),
			{ type: 'output', text: '' },
			{ type: 'output', text: `  ${projects.length} projects total  ·  open <slug> to navigate` }
		];
	}

	function resolveCommand(raw: string): TerminalLine[] {
		const cmd = raw.trim().toLowerCase();

		if (cmd === 'help') return HELP_LINES;
		if (cmd === 'whoami') return WHOAMI_LINES;
		if (cmd === 'ls' || cmd === 'ls projects') return buildLsLines();
		if (cmd === 'skills') return SKILLS_LINES;
		if (cmd === 'contact') return CONTACT_LINES;
		if (cmd === 'clear') return [];
		if (cmd === 'exit') return [{ type: 'output', text: '  Goodbye! 👋' }];

		if (cmd.startsWith('open ')) {
			const target = cmd.slice(5).trim();
			if (SLUG_MAP[target]) {
				return [{ type: 'output', text: `  → Navigating to ${SLUG_MAP[target]}…` }];
			}
			return [
				{ type: 'error', text: `  No route for "${target}".` },
				{ type: 'output', text: '  Try: ls projects' }
			];
		}

		return [
			{ type: 'error', text: `  Command not found: ${raw}` },
			{ type: 'output', text: '  Type "help" for available commands.' }
		];
	}

	// ── Side-effects that happen after output is committed ──────────────────
	async function handleSideEffect(raw: string) {
		const cmd = raw.trim().toLowerCase();

		if (cmd === 'exit') {
			await tick();
			setTimeout(() => terminal.close(), 400);
			return;
		}

		if (cmd === 'clear') {
			terminal.clear();
			return;
		}

		if (cmd === 'contact') {
			await tick();
			setTimeout(() => {
				const el = document.getElementById('contact');
				el?.scrollIntoView({ behavior: 'smooth' });
			}, 300);
			return;
		}

		if (cmd.startsWith('open ')) {
			const target = cmd.slice(5).trim();
			if (SLUG_MAP[target]) {
				await tick();
				setTimeout(async () => {
					terminal.close();
					const { goto } = await import('$app/navigation');
					goto(SLUG_MAP[target]);
				}, 500);
			}
		}
	}

	async function execute(raw: string) {
		terminal.pushCommand(raw);
		const lines = resolveCommand(raw);
		if (lines.length > 0) terminal.pushLines(lines);
		await handleSideEffect(raw);
	}

	// Focus trap: keep Tab inside the terminal
	function trapFocus(e: KeyboardEvent) {
		if (!$terminal.open || e.key !== 'Tab') return;
		const focusable = Array.from(
			document.getElementById('terminal-overlay')?.querySelectorAll<HTMLElement>(
				'button, input, [tabindex]:not([tabindex="-1"])'
			) ?? []
		).filter((el) => !el.hasAttribute('disabled'));
		if (!focusable.length) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', trapFocus);
		return () => window.removeEventListener('keydown', trapFocus);
	});
</script>

{#if $terminal.open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-[90]"
		style="background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);"
		onclick={() => terminal.close()}
		aria-hidden="true"
		transition:fade={{ duration: 200 }}
	></div>

	<!-- Terminal window -->
	<div
		id="terminal-overlay"
		role="dialog"
		aria-modal="true"
		aria-label="Portfolio CLI Terminal"
		class="fixed z-[100] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
		style="
			background: var(--color-terminal-bg);
			border: 1px solid rgba(255,255,255,0.1);
			width: min(720px, calc(100vw - 2rem));
			height: min(460px, calc(100vh - 8rem));
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
		"
		transition:fly={{ y: 24, duration: 280, easing: cubicOut }}
	>
		<!-- Title bar -->
		<div
			class="flex items-center gap-3 px-4 py-3 shrink-0"
			style="background: rgba(255,255,255,0.04); border-bottom: 1px solid rgba(255,255,255,0.07);"
		>
			<!-- Traffic lights -->
			<div class="flex items-center gap-1.5">
				<button
					bind:this={firstFocusable}
					onclick={() => terminal.close()}
					class="w-3 h-3 rounded-full transition-opacity duration-150 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
					style="background: #FF5F57;"
					aria-label="Close terminal"
				></button>
				<div class="w-3 h-3 rounded-full opacity-40" style="background: #FFBD2E;" aria-hidden="true"></div>
				<div class="w-3 h-3 rounded-full opacity-40" style="background: #28C840;" aria-hidden="true"></div>
			</div>

			<!-- Title -->
			<div class="flex-1 flex justify-center">
				<span class="font-mono text-xs" style="color: rgba(255,255,255,0.4);">
					portfolio@cli — ~/stephen-adeniji
				</span>
			</div>

			<!-- Shortcut hint -->
			<kbd class="hidden sm:block font-mono text-[10px] px-1.5 py-0.5 rounded" style="background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3);">
				Esc
			</kbd>
		</div>

		<!-- Output body -->
		<div
			bind:this={bodyEl}
			class="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-0.5"
			style="scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent;"
		>
			{#each $terminal.history as line}
				<TerminalLineComp {line} />
			{/each}
		</div>

		<!-- Input -->
		<TerminalInput onsubmit={execute} />
	</div>
{/if}
