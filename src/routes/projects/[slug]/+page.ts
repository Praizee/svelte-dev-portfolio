import { getAllSlugs, getProjectBySlug } from '$lib/data/projects';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => getAllSlugs().map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) throw error(404, `Project "${params.slug}" not found`);
	return { project };
};
