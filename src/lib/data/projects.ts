export interface ProjectLink {
	label: string;
	url: string;
	icon?: 'github' | 'external' | 'figma';
}

export interface ProjectImage {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export type ProjectCategory = 'fullstack' | 'landing' | 'saas' | 'fintech' | 'ai';

export interface Project {
	id: number;
	slug: string;
	title: string;
	tagline: string;
	description: string;
	category: ProjectCategory;
	featured: boolean;
	featuredOrder?: number;
	stack: string[];
	images: ProjectImage[];
	links: ProjectLink[];
	color: string;
	year: number;
}

export const projects: Project[] = [
	{
		id: 1,
		slug: 'lloyd-autos',
		title: 'Lloyd Autos',
		tagline: 'Car dealership platform with live inventory and CMS-driven listings.',
		description:
			'A full-featured car dealership web application built for real-world use. Inventory is managed through Sanity CMS with rich media support, while fluid page transitions powered by Framer Motion make browsing feel native. Vehicle detail pages are fully SSR-rendered for SEO, with search and filtering that works without JavaScript.',
		category: 'fullstack',
		featured: true,
		featuredOrder: 1,
		stack: ['Next.js', 'Sanity CMS', 'Framer Motion', 'TypeScript', 'Tailwind CSS'],
		images: [
			{
				src: '/images/projects/lloyd-autos/hero.webp',
				alt: 'Lloyd Autos homepage showing car listings grid',
				width: 1280,
				height: 720
			}
		],
		links: [{ label: 'Live Demo', url: 'https://lloyd-autos.netlify.app/', icon: 'external' }],
		color: '#3B82F6',
		year: 2024
	},
	{
		id: 2,
		slug: 'nomad-fitness',
		title: 'Nomad Fitness',
		tagline: 'AI-powered fitness platform for location-independent workouts.',
		description:
			'A high-conversion landing page and multi-step onboarding flow for an AI fitness platform designed for digital nomads. Features scroll-triggered animations via AOS, a Stripe-powered payment UI integration, and a TypeScript-strict codebase. The onboarding questionnaire adapts workout recommendations based on user environment and goals.',
		category: 'ai',
		featured: true,
		featuredOrder: 2,
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AOS', 'Stripe'],
		images: [
			{
				src: '/images/projects/nomad-fitness/hero.webp',
				alt: 'Nomad Fitness landing page with hero section',
				width: 1280,
				height: 720
			}
		],
		links: [
			{ label: 'Live Demo', url: 'https://nomad-landing.vercel.app/', icon: 'external' }
		],
		color: '#10B981',
		year: 2024
	},
	{
		id: 3,
		slug: 'pursfi',
		title: 'Pursfi',
		tagline: 'Finance app landing page with cinematic motion design.',
		description:
			'A product-grade marketing site for a personal finance application. The design centres on sophisticated Framer Motion scroll sequences that reveal key product benefits as the user moves through the page. Clean typographic hierarchy and a conversion-focused layout guide visitors from awareness to sign-up.',
		category: 'fintech',
		featured: true,
		featuredOrder: 3,
		stack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
		images: [
			{
				src: '/images/projects/pursfi/hero.webp',
				alt: 'Pursfi finance app landing page',
				width: 1280,
				height: 720
			}
		],
		links: [{ label: 'Live Demo', url: 'https://pursfi-home.vercel.app/', icon: 'external' }],
		color: '#8B5CF6',
		year: 2024
	},
	{
		id: 4,
		slug: 'ezzymeans',
		title: 'Ezzymeans',
		tagline: 'Salary earner loan platform for First Primus Financial.',
		description:
			'A production loan application platform for salary earners, deployed under First Primus Financial. The platform handles loan eligibility checks, application flows, and repayment scheduling. The trust-focused UI is designed specifically for the Nigerian financial services context, prioritising clarity and confidence.',
		category: 'fintech',
		featured: true,
		featuredOrder: 4,
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		images: [
			{
				src: '/images/projects/ezzymeans/hero.webp',
				alt: 'Ezzymeans loan platform homepage',
				width: 1280,
				height: 720
			}
		],
		links: [{ label: 'Live Site', url: 'https://firstprimus.com.ng/', icon: 'external' }],
		color: '#F59E0B',
		year: 2024
	},
	{
		id: 5,
		slug: 'gradific',
		title: 'Gradific',
		tagline: 'Assignment management SaaS for students and educators.',
		description:
			'A fully-featured SaaS platform for managing student assignments, submission workflows, and grading. Built with a multi-tenant architecture supporting role-based access for students, instructors, and administrators. Designed to reduce administrative overhead so educators can focus on teaching.',
		category: 'saas',
		featured: true,
		featuredOrder: 5,
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
		images: [
			{
				src: '/images/projects/gradific/hero.webp',
				alt: 'Gradific assignment management dashboard',
				width: 1280,
				height: 720
			}
		],
		links: [{ label: 'Live Site', url: 'https://gradific.com/', icon: 'external' }],
		color: '#EF4444',
		year: 2024
	}
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
	return projects
		.filter((p) => p.featured)
		.sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getAllSlugs(): string[] {
	return projects.map((p) => p.slug);
}

export function getRelatedProjects(current: Project, count = 2): Project[] {
	const same = projects.filter((p) => p.slug !== current.slug && p.category === current.category);
	if (same.length >= count) return same.slice(0, count);
	const others = projects.filter(
		(p) => p.slug !== current.slug && p.category !== current.category
	);
	return [...same, ...others].slice(0, count);
}
