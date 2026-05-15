<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} — Stephen Adeniji</title>
</svelte:head>

<div class="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center gap-8">
	<!-- Status code -->
	<div class="relative">
		<p
			class="text-[120px] sm:text-[160px] font-bold leading-none select-none"
			style="color: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface-2));"
			aria-hidden="true"
		>
			{$page.status}
		</p>
		<div class="absolute inset-0 flex items-center justify-center">
			<span
				class="font-mono text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
				style="background: color-mix(in srgb, var(--color-accent) 14%, transparent); color: var(--color-accent);"
			>
				{$page.status === 404 ? 'not found' : 'error'}
			</span>
		</div>
	</div>

	<div class="flex flex-col gap-3 max-w-md">
		<h1 class="text-2xl sm:text-3xl font-bold" style="color: var(--color-text);">
			{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="text-base" style="color: var(--color-text-muted);">
			{$page.status === 404
				? "That page doesn't exist or has been moved."
				: $page.error?.message ?? 'An unexpected error occurred.'}
		</p>
	</div>

	<!-- Terminal-style hint -->
	<div
		class="font-mono text-sm px-5 py-3 rounded-xl border"
		style="background: var(--color-terminal-bg); border-color: rgba(255,255,255,0.08); color: var(--color-terminal-text);"
	>
		<span style="color: var(--color-terminal-green);">❯</span>
		<span class="ml-2">open home</span>
		<span class="ml-3 opacity-40"># navigate back</span>
	</div>

	<div class="flex gap-3">
		<a
			href="/"
			class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.03]"
			style="background: var(--color-accent);"
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
			Go home
		</a>
		<a
			href="/projects"
			class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:scale-[1.03]"
			style="border-color: var(--color-border); color: var(--color-text); background: var(--color-surface);"
		>
			View projects
		</a>
	</div>
</div>
