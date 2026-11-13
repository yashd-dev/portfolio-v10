<script lang="ts">
	import './layout.css';
	import { onMount, tick } from 'svelte';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Lenis from 'lenis';
	import { email, socials } from '#lib/data/content.js';
	import { siteUrl } from '#lib/data/site.js';
	import { animate, inView } from 'motion';
	import SiteNav from '#lib/components/siteNav.svelte';
	import Dock from '#lib/components/dock.svelte';
	import Cursor from '#lib/components/cursor.svelte';
	import { initAnalytics } from '#lib/analytics.js';

	let { children }: LayoutProps = $props();

	let stopReveals: (() => void)[] = [];

	const scanReveals = () => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {return;}
		const playing = document.documentElement.classList.contains('pg-intro-playing');
		for (const el of document.querySelectorAll<HTMLElement>('.rv, .pg-reveal')) {
			if (el.dataset.rvDone || (playing && el.closest('.pg-intro'))) {continue;}
			el.dataset.rvDone = '1';
			const delay = (Number(el.style.getPropertyValue('--d').replace(/ms$/u, '')) || 0) / 1000;
			let fired = false;
			const stop = inView(
				el,
				() => {
					if (fired) {return;}
					fired = true;
					stop();
					animate(
						el,
						{ filter: ['blur(6px)', 'blur(0px)'], opacity: [0, 1], y: [14, 0] },
						{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }
					)
						.finished.then(() =>
							el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]')
						)
						.catch(() => null);
				},
				{ margin: '0px 0px -12% 0px' }
			);
			stopReveals.push(stop);
		}
	};

	onMount(() => {
		initAnalytics();
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
			{for (const el of document.querySelectorAll('.rv, .pg-reveal')) {
				el.classList.remove('translate-y-3.5', 'opacity-0', 'blur-[6px]');
			}}
		addEventListener('pg:intro-done', scanReveals);
		if (!reduced) {scanReveals();}

		return () => {
			cancelAnimationFrame(raf);
			lenis?.destroy();
			delete (window as unknown as { __lenis?: Lenis }).__lenis;
			for (const stop of stopReveals) {stop();}
			stopReveals = [];
			removeEventListener('pg:intro-done', scanReveals);
		};
	});


	$effect(() => {
		void page.url.pathname;
		tick().then(scanReveals).catch(() => null);
	});

	const personLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		email: `mailto:${email}`,
		jobTitle: 'Designer & Developer',
		name: 'Yash Deshpande',
		sameAs: socials.map((s) => s.href),
		url: siteUrl
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="canonical" href="{siteUrl}{page.url.pathname}" />
	<meta property="og:url" content="{siteUrl}{page.url.pathname}" />
	{@html '<script type="application/ld+json">' + personLd + '</script>'}
	{#if !page.url.pathname.startsWith('/work/') && !page.url.pathname.startsWith('/services')}
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
		<meta property="og:image" content="{siteUrl}/og.png" />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	<meta property="og:type" content="website" />
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
	<Dock inline={page.url.pathname.startsWith('/work/')} />
	<Cursor />
</div>
