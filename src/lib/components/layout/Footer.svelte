<script lang="ts">
	import { terminal } from '$lib/stores/terminal';

	const currentYear = new Date().getFullYear();

	const socials = [
		{
			label: 'GitHub',
			href: 'https://github.com/Praizee',
			icon: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/stephen-adeniji/',
			icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`
		},
		{
			label: 'Twitter / X',
			href: 'https://x.com/intent/follow?screen_name=steevenadeniji',
			icon: `<path d="M4 4l16 16M4 20L20 4"/>`
		},
		{
			label: 'Email',
			href: 'mailto:adeolaastephen@gmail.com',
			icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
		}
	];
</script>

<footer
	class="border-t mt-24"
	style="border-color: var(--color-border); background: var(--color-surface);"
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-12">
		<div class="flex flex-col sm:flex-row items-center justify-between gap-6">
			<!-- Left: branding + copy -->
			<div class="flex flex-col items-center sm:items-start gap-1">
				<a href="/" class="font-mono font-semibold text-base" style="color: var(--color-text);">
					<span>stephen</span><span style="color: var(--color-accent);">.dev</span>
				</a>
				<p class="text-xs" style="color: var(--color-text-muted);">
					&copy; {currentYear} Stephen Adeniji. Built with SvelteKit.
				</p>
			</div>

			<!-- Right: socials + terminal -->
			<div class="flex items-center gap-3">
				{#each socials as social}
					<a
						href={social.href}
						target={social.href.startsWith('mailto') ? undefined : '_blank'}
						rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
						aria-label={social.label}
						class="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
						style="border-color: var(--color-border); color: var(--color-text-muted);"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							{@html social.icon}
						</svg>
					</a>
				{/each}

				<button
					onclick={() => terminal.toggle()}
					class="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-150 hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] font-mono text-xs font-bold"
					style="border-color: var(--color-border); color: var(--color-text-muted);"
					aria-label="Open terminal"
				>
					&gt;_
				</button>
			</div>
		</div>
	</div>
</footer>
