<script lang="ts">
	import ContactForm from './ContactForm.svelte';

	const socials = [
		{
			label: 'GitHub',
			handle: 'stephenadeniji',
			href: 'https://github.com/stephenadeniji',
			icon: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`
		},
		{
			label: 'LinkedIn',
			handle: 'stephen-adeniji',
			href: 'https://linkedin.com/in/stephen-adeniji',
			icon: `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>`
		},
		{
			label: 'Email',
			handle: 'praiseadeniji2017@gmail.com',
			href: 'mailto:praiseadeniji2017@gmail.com',
			icon: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`
		}
	];
</script>

<section
	id="contact"
	class="border-t"
	style="border-color: var(--color-border);"
>
	<div class="max-w-6xl mx-auto px-4 sm:px-6 py-24">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

			<!-- Left: copy + socials -->
			<div class="flex flex-col gap-8">
				<div class="flex flex-col gap-3">
					<p class="font-mono text-xs font-medium tracking-widest uppercase" style="color: var(--color-accent);">
						// contact
					</p>
					<h2 class="text-3xl sm:text-4xl font-bold leading-tight" style="color: var(--color-text);">
						Let's build<br />something together.
					</h2>
					<div class="flex gap-1.5">
						<div class="h-1 w-12 rounded-full" style="background: var(--color-accent);"></div>
						<div class="h-1 w-4 rounded-full opacity-40" style="background: var(--color-accent);"></div>
					</div>
				</div>

				<p class="text-base leading-relaxed max-w-sm" style="color: var(--color-text-muted);">
					Open to freelance projects, full-time roles, and interesting collaborations.
					Whether it's a quick question or a full product — reach out.
				</p>

				<!-- Status pill -->
				<div
					class="inline-flex items-center gap-2 px-4 py-2 rounded-full border self-start"
					style="border-color: var(--color-border); background: var(--color-surface);"
				>
					<span class="relative flex h-2 w-2" aria-hidden="true">
						<span
							class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
							style="background: #10B981;"
						></span>
						<span class="relative inline-flex rounded-full h-2 w-2" style="background: #10B981;"></span>
					</span>
					<span class="text-xs font-medium" style="color: var(--color-text);">Available for work</span>
				</div>

				<!-- Social links -->
				<div class="flex flex-col gap-3">
					{#each socials as social}
						<a
							href={social.href}
							target={social.href.startsWith('mailto') ? undefined : '_blank'}
							rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
							class="flex items-center gap-3 group w-fit"
							aria-label="{social.label}: {social.handle}"
						>
							<span
								class="w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-150 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]"
								style="border-color: var(--color-border); color: var(--color-text-muted); background: var(--color-surface);"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="15"
									height="15"
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
							</span>
							<span
								class="text-sm transition-colors duration-150 group-hover:text-[var(--color-accent)]"
								style="color: var(--color-text-muted);"
							>
								{social.handle}
							</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Right: form -->
			<div>
				<ContactForm />
			</div>
		</div>
	</div>
</section>
