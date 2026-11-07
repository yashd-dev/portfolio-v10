<script lang="ts">
	import './layout.css';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Lenis from 'lenis';
	import { animate, inView } from 'motion';
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
			document.querySelectorAll('.rv, .pg-reveal').forEach((el) => {
				el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
			});
		addEventListener('pg:intro-done', scanReveals);
		if (!reduced) scanReveals();

		return () => {
			cancelAnimationFrame(raf);
			lenis?.destroy();
			delete (window as unknown as { __lenis?: Lenis }).__lenis;
			stopReveals.forEach((stop) => stop());
			stopReveals = [];
			removeEventListener('pg:intro-done', scanReveals);
		};
	});

	let stopReveals: (() => void)[] = [];

	function scanReveals() {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const playing = document.documentElement.classList.contains('pg-intro-playing');
		document.querySelectorAll<HTMLElement>('.rv, .pg-reveal').forEach((el) => {
			if (el.dataset.rvDone || (playing && el.closest('.pg-intro'))) return;
			el.dataset.rvDone = '1';
			const delay = (parseFloat(el.style.getPropertyValue('--d')) || 0) / 1000;
			let fired = false;
			const stop = inView(
				el,
				() => {
					if (fired) return;
					fired = true;
					stop();
					animate(
						el,
						{ opacity: [0, 1], y: [14, 0], filter: ['blur(6px)', 'blur(0px)'] },
						{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }
					).finished.then(() => {
						el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
					});
				},
				{ margin: '0px 0px -12% 0px' }
			);
			stopReveals.push(stop);
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
		href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap"
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
