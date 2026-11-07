<script lang="ts">
	import './layout.css';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Lenis from 'lenis';
	import SiteNav from '#lib/components/SiteNav.svelte';
	import Dock from '#lib/components/Dock.svelte';
	import Cursor from '#lib/components/Cursor.svelte';

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
		if (reduced)
			document.querySelectorAll('.rv').forEach((el) => {
				el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
			});
		if (reduced) document.querySelectorAll('.pg-reveal').forEach((el) => el.classList.add('is-in'));
		addEventListener('pg:intro-done', scanReveals);
		revealIo = new IntersectionObserver(
			(entries) => {
				for (const e of entries)
					if (e.isIntersecting) {
						const el = e.target as HTMLElement;
						if (el.classList.contains('pg-reveal')) el.classList.add('is-in');
						else {
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
								el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
								a.cancel();
							};
						}
						revealIo?.unobserve(el);
					}
			},
			{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
		);
		if (!reduced) scanReveals();

		return () => {
			cancelAnimationFrame(raf);
			lenis?.destroy();
			delete (window as unknown as { __lenis?: Lenis }).__lenis;
			revealIo?.disconnect();
			revealIo = null;
			removeEventListener('pg:intro-done', scanReveals);
		};
	});

	let revealIo: IntersectionObserver | null = null;

	function scanReveals() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const playing = document.documentElement.classList.contains('pg-intro-playing');
		document.querySelectorAll('.rv, .pg-reveal').forEach((el) => {
			if (playing && el.closest('.pg-intro')) return;
			revealIo?.observe(el);
		});
	}

	$effect(() => {
		page.url.pathname;
		tick().then(scanReveals);
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
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
	<meta property="og:image" content="/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="relative isolate min-h-dvh overflow-x-clip bg-white font-sans text-[15px] leading-[1.6] text-ink antialiased selection:bg-hlblue selection:text-ink"
>
	<SiteNav />
	{@render children()}
	<Dock />
	<Cursor />
</div>
