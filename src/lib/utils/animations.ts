import { browser } from '$app/environment';

export function prefersReducedMotion(): boolean {
	if (!browser) return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export async function getGsap() {
	const { gsap } = await import('gsap');
	const { ScrollTrigger } = await import('gsap/ScrollTrigger');
	gsap.registerPlugin(ScrollTrigger);
	return { gsap, ScrollTrigger };
}

export interface RevealOptions {
	y?: number;
	x?: number;
	opacity?: number;
	duration?: number;
	delay?: number;
	stagger?: number;
	ease?: string;
}

/** Animate a single element or NodeList in from below on intersection. */
export async function revealFrom(
	targets: Element | Element[] | NodeListOf<Element>,
	options: RevealOptions = {}
) {
	if (prefersReducedMotion()) return;
	const { gsap } = await getGsap();
	const {
		y = 40,
		x = 0,
		opacity = 0,
		duration = 0.65,
		delay = 0,
		stagger = 0,
		ease = 'power3.out'
	} = options;

	return gsap.from(targets, { y, x, opacity, duration, delay, stagger, ease, clearProps: 'transform,opacity' });
}

/** Animate a progress bar width from 0 to target on scroll trigger. */
export async function animateBar(el: Element, toWidth: string, delay = 0) {
	if (prefersReducedMotion()) return;
	const { gsap, ScrollTrigger } = await getGsap();

	gsap.fromTo(
		el,
		{ width: '0%' },
		{
			width: toWidth,
			duration: 0.9,
			delay,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: el,
				start: 'top 88%',
				once: true
			}
		}
	);
}

/** Stagger-reveal a list of elements triggered by scroll. */
export async function staggerReveal(
	container: Element,
	selector: string,
	options: RevealOptions = {}
) {
	if (prefersReducedMotion()) return;
	const { gsap, ScrollTrigger } = await getGsap();
	const items = container.querySelectorAll(selector);
	if (!items.length) return;

	gsap.from(items, {
		y: options.y ?? 32,
		opacity: options.opacity ?? 0,
		duration: options.duration ?? 0.6,
		stagger: options.stagger ?? 0.08,
		ease: options.ease ?? 'power3.out',
		delay: options.delay ?? 0,
		clearProps: 'transform,opacity',
		scrollTrigger: {
			trigger: container,
			start: 'top 82%',
			once: true
		}
	});
}
