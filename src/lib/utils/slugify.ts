/** Converts a string to a URL-safe slug. Canonical slugs live in projects.ts. */
export function slugify(str: string): string {
	return str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
