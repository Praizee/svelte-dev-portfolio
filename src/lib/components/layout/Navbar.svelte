<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { terminal } from '$lib/stores/terminal';

	let mobileOpen = $state(false);
	let hidden = $state(false);
	let lastY = 0;

	onMount(() => {
		const onScroll = () => {
			const y = window.scrollY;
			// Only hide after scrolling past 80px
			if (y > 80) {
				hidden = y > lastY;
			} else {
				hidden = false;
			}
			lastY = y;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Skills', href: '/#skills' },
		{ label: 'Contact', href: '/#contact' }
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href.replace(/#.*/, ''));
	}

	function closeMenu() {
		mobileOpen = false;
	}
</script>

<header
	class="fixed top-0 left-0 right-0 z-50 border-b transition-transform duration-300"
	style="
		background: color-mix(in srgb, var(--color-bg) 85%, transparent);
		backdrop-filter: blur(12px);
		border-color: var(--color-border);
		transform: translateY({hidden ? '-100%' : '0'});
	"
>
	<nav
		class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
		aria-label="Main navigation"
	>
		<!-- Logo -->
		<a
			href="/"
			class="font-mono font-semibold text-lg tracking-tight flex items-center gap-2 group"
			aria-label="Stephen Adeniji — home"
		>
			<span
				class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white transition-transform duration-200 group-hover:scale-110"
				style="background: var(--color-accent);"
			>
				SA
			</span>
			<span class="hidden sm:block" style="color: var(--color-text);">stephen</span>
			<span class="hidden sm:block" style="color: var(--color-accent);">.dev</span>
		</a>

		<!-- Desktop nav -->
		<div class="hidden md:flex items-center gap-1">
			{#each navLinks as link}
				<a
					href={link.href}
					class="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
					style={isActive(link.href)
						? 'color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 10%, transparent);'
						: 'color: var(--color-text-muted);'}
					class:hover:text-[var(--color-text)]={!isActive(link.href)}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Right side -->
		<div class="flex items-center gap-2">
			<!-- Terminal button (desktop) -->
			<button
				onclick={() => terminal.toggle()}
				class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors duration-150"
				style="color: var(--color-terminal-green); border-color: var(--color-border); background: var(--color-surface);"
				aria-label="Open terminal (Ctrl+`)"
			>
				<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v16h16V4H4zm2.5 7.5 3-3-3-3L5 6.9 7.1 9 5 11.1l1.5 1.4zm4.5 1.5h5v-2h-5v2z" />
				</svg>
				~/terminal
			</button>

			<ThemeToggle />

			<!-- Mobile hamburger -->
			<button
				onclick={() => (mobileOpen = !mobileOpen)}
				class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-[var(--color-surface-2)]"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={mobileOpen}
				aria-controls="mobile-menu"
			>
				{#if mobileOpen}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						<path d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div
			id="mobile-menu"
			class="md:hidden border-t px-4 py-4 flex flex-col gap-1"
			style="background: var(--color-bg); border-color: var(--color-border);"
		>
			{#each navLinks as link}
				<a
					href={link.href}
					onclick={closeMenu}
					class="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
					style={isActive(link.href)
						? 'color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 10%, transparent);'
						: 'color: var(--color-text-muted);'}
				>
					{link.label}
				</a>
			{/each}
			<button
				onclick={() => { terminal.toggle(); closeMenu(); }}
				class="mt-2 flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-mono font-medium border w-full text-left transition-colors duration-150"
				style="color: var(--color-terminal-green); border-color: var(--color-border); background: var(--color-surface);"
			>
				~/terminal
			</button>
		</div>
	{/if}
</header>

<!-- Spacer so content doesn't hide behind fixed nav -->
<div class="h-16" aria-hidden="true"></div>
