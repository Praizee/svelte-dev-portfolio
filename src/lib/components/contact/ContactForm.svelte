<script lang="ts">
	type Status = 'idle' | 'loading' | 'success' | 'error';

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let status = $state<Status>('idle');

	type Errors = { name?: string; email?: string; subject?: string; message?: string };
	let errors = $state<Errors>({});
	let touched = $state<Record<string, boolean>>({});

	function stripHtml(str: string) {
		return str.replace(/<[^>]*>/g, '');
	}

	function validate(): Errors {
		const e: Errors = {};
		if (!name.trim()) e.name = 'Name is required.';
		if (!email.trim()) e.email = 'Email is required.';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address.';
		if (!subject.trim()) e.subject = 'Subject is required.';
		if (!message.trim()) e.message = 'Message is required.';
		else if (message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
		return e;
	}

	const currentErrors = $derived(validate());
	const isValid = $derived(Object.keys(currentErrors).length === 0);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		// Touch all fields to show errors
		touched = { name: true, email: true, subject: true, message: true };
		if (!isValid) return;

		status = 'loading';

		try {
			const form = e.target as HTMLFormElement;
			const body = new FormData(form);

			// Sanitize
			body.set('name', stripHtml(name));
			body.set('email', stripHtml(email));
			body.set('subject', stripHtml(subject));
			body.set('message', stripHtml(message));

			const res = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(body as unknown as Record<string, string>).toString()
			});

			status = res.ok ? 'success' : 'error';
		} catch {
			status = 'error';
		}
	}

	function fieldError(field: keyof Errors) {
		return touched[field] ? currentErrors[field] : undefined;
	}
</script>

{#if status === 'success'}
	<div
		class="rounded-2xl border p-8 flex flex-col items-center text-center gap-4"
		style="border-color: var(--color-accent); background: color-mix(in srgb, var(--color-accent) 8%, var(--color-surface));"
		role="alert"
	>
		<div
			class="w-14 h-14 rounded-full flex items-center justify-center"
			style="background: color-mix(in srgb, var(--color-accent) 16%, var(--color-surface));"
		>
			<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-accent);" aria-hidden="true">
				<polyline points="20 6 9 17 4 12" />
			</svg>
		</div>
		<div>
			<h3 class="font-bold text-lg mb-1" style="color: var(--color-text);">Message sent!</h3>
			<p class="text-sm" style="color: var(--color-text-muted);">
				Thanks for reaching out. I'll get back to you within 24–48 hours.
			</p>
		</div>
	</div>
{:else}
	<form
		name="contact"
		method="POST"
		data-netlify="true"
		netlify-honeypot="bot-field"
		onsubmit={handleSubmit}
		novalidate
		class="flex flex-col gap-5"
		aria-label="Contact form"
	>
		<!-- Netlify hidden fields -->
		<input type="hidden" name="form-name" value="contact" />
		<p class="hidden" aria-hidden="true">
			<label>Don't fill this out: <input name="bot-field" /></label>
		</p>

		<!-- Name + Email row -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			<!-- Name -->
			<div class="flex flex-col gap-1.5">
				<label for="contact-name" class="text-sm font-medium" style="color: var(--color-text);">
					Name <span aria-hidden="true" style="color: var(--color-accent);">*</span>
				</label>
				<input
					id="contact-name"
					name="name"
					type="text"
					bind:value={name}
					onblur={() => (touched.name = true)}
					required
					aria-required="true"
					aria-invalid={!!fieldError('name')}
					aria-describedby={fieldError('name') ? 'name-error' : undefined}
					class="px-4 py-3 rounded-xl border text-sm outline-none transition-colors duration-150 w-full"
					style="
						background: var(--color-surface-2);
						border-color: {fieldError('name') ? '#EF4444' : 'var(--color-border)'};
						color: var(--color-text);
					"
					placeholder="Stephen Adeniji"
				/>
				{#if fieldError('name')}
					<p id="name-error" class="text-xs" style="color: #EF4444;" role="alert">{fieldError('name')}</p>
				{/if}
			</div>

			<!-- Email -->
			<div class="flex flex-col gap-1.5">
				<label for="contact-email" class="text-sm font-medium" style="color: var(--color-text);">
					Email <span aria-hidden="true" style="color: var(--color-accent);">*</span>
				</label>
				<input
					id="contact-email"
					name="email"
					type="email"
					bind:value={email}
					onblur={() => (touched.email = true)}
					required
					aria-required="true"
					aria-invalid={!!fieldError('email')}
					aria-describedby={fieldError('email') ? 'email-error' : undefined}
					class="px-4 py-3 rounded-xl border text-sm outline-none transition-colors duration-150 w-full"
					style="
						background: var(--color-surface-2);
						border-color: {fieldError('email') ? '#EF4444' : 'var(--color-border)'};
						color: var(--color-text);
					"
					placeholder="you@example.com"
				/>
				{#if fieldError('email')}
					<p id="email-error" class="text-xs" style="color: #EF4444;" role="alert">{fieldError('email')}</p>
				{/if}
			</div>
		</div>

		<!-- Subject -->
		<div class="flex flex-col gap-1.5">
			<label for="contact-subject" class="text-sm font-medium" style="color: var(--color-text);">
				Subject <span aria-hidden="true" style="color: var(--color-accent);">*</span>
			</label>
			<input
				id="contact-subject"
				name="subject"
				type="text"
				bind:value={subject}
				onblur={() => (touched.subject = true)}
				required
				aria-required="true"
				aria-invalid={!!fieldError('subject')}
				aria-describedby={fieldError('subject') ? 'subject-error' : undefined}
				class="px-4 py-3 rounded-xl border text-sm outline-none transition-colors duration-150 w-full"
				style="
					background: var(--color-surface-2);
					border-color: {fieldError('subject') ? '#EF4444' : 'var(--color-border)'};
					color: var(--color-text);
				"
				placeholder="Project enquiry, collab, etc."
			/>
			{#if fieldError('subject')}
				<p id="subject-error" class="text-xs" style="color: #EF4444;" role="alert">{fieldError('subject')}</p>
			{/if}
		</div>

		<!-- Message -->
		<div class="flex flex-col gap-1.5">
			<label for="contact-message" class="text-sm font-medium" style="color: var(--color-text);">
				Message <span aria-hidden="true" style="color: var(--color-accent);">*</span>
			</label>
			<textarea
				id="contact-message"
				name="message"
				bind:value={message}
				onblur={() => (touched.message = true)}
				required
				aria-required="true"
				aria-invalid={!!fieldError('message')}
				aria-describedby={fieldError('message') ? 'message-error' : undefined}
				rows={5}
				class="px-4 py-3 rounded-xl border text-sm outline-none transition-colors duration-150 w-full resize-none"
				style="
					background: var(--color-surface-2);
					border-color: {fieldError('message') ? '#EF4444' : 'var(--color-border)'};
					color: var(--color-text);
				"
				placeholder="Tell me about your project or just say hi…"
			></textarea>
			<div class="flex items-start justify-between gap-2">
				{#if fieldError('message')}
					<p id="message-error" class="text-xs" style="color: #EF4444;" role="alert">{fieldError('message')}</p>
				{:else}
					<span></span>
				{/if}
				<span class="text-xs shrink-0" style="color: var(--color-text-muted);">
					{message.length} chars
				</span>
			</div>
		</div>

		<!-- Error state -->
		{#if status === 'error'}
			<p class="text-sm rounded-xl px-4 py-3 border" style="color: #EF4444; border-color: #EF4444; background: color-mix(in srgb, #EF4444 8%, var(--color-surface));" role="alert">
				Something went wrong. Try emailing me directly at praiseadeniji2017@gmail.com.
			</p>
		{/if}

		<!-- Submit -->
		<button
			type="submit"
			disabled={status === 'loading'}
			class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
			style="background: var(--color-accent);"
		>
			{#if status === 'loading'}
				<svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
					<path d="M21 12a9 9 0 1 1-6.219-8.56" />
				</svg>
				Sending…
			{:else}
				Send Message
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
					<path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
				</svg>
			{/if}
		</button>
	</form>
{/if}
