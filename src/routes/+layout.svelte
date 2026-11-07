<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';
	import Lenis from 'lenis';
	import SiteNav from '#lib/components/SiteNav.svelte';
	import BottomDock from '#lib/components/BottomDock.svelte';
	import { dock } from '#lib/dock.svelte.js';

	let { children }: LayoutProps = $props();

	onMount(() => {
		let raf = 0;
		let lenis: Lenis | null = null;
		if (
			!matchMedia('(prefers-reduced-motion: reduce)').matches &&
			!matchMedia('(pointer: coarse)').matches
		) {
			lenis = new Lenis({ lerp: 0.15, wheelMultiplier: 1 });
			(window as unknown as { __lenis?: Lenis }).__lenis = lenis;
			const loop = (t: number) => {
				lenis?.raf(t);
				raf = requestAnimationFrame(loop);
			};
			raf = requestAnimationFrame(loop);
		}
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const els = document.querySelectorAll('.rv');
		const show = (el: Element) => el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
		if (reduced) els.forEach(show);
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries)
					if (e.isIntersecting) {
						const el = e.target as HTMLElement;
						const a = el.animate(
							[
								{ opacity: 0, transform: 'translateY(14px)', filter: 'blur(6px)' },
								{ opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' }
							],
							{
								duration: 900,
								delay: Number(el.dataset.d || 0),
								easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
								fill: 'forwards'
							}
						);
						a.onfinish = () => {
							show(el);
							a.cancel();
						};
						io.unobserve(el);
					}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
		);
		if (!reduced) els.forEach((el) => io.observe(el));
		return () => {
			cancelAnimationFrame(raf);
			lenis?.destroy();
			delete (window as unknown as { __lenis?: Lenis }).__lenis;
			io.disconnect();
		};
	});

	const display = $derived(
		dock.font === 'serif' ? "'IBM Plex Serif', Georgia, serif" : "'Plus Jakarta Sans', system-ui, sans-serif"
	);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
	<title>Yash Deshpande - Designer & Developer, Mumbai</title>
	<meta
		name="description"
		content="Yash Deshpande designs and builds polished websites: storefronts, business sites and the TypeScript services behind them."
	/>
	<meta property="og:title" content="Yash Deshpande - Designer & Developer" />
	<meta
		property="og:description"
		content="Polished websites that feel considered, work smoothly, and can grow into serious products."
	/>
	<meta property="og:type" content="website" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="min-h-screen font-sans text-ink"
	style="--color-accent: {dock.accent}; --font-display: {display}"
>
	<SiteNav />
	{@render children()}
	<BottomDock />
</div>
