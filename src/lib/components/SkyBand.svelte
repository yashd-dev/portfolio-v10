<script lang="ts">
	import { onMount } from 'svelte';

	const wingsUp = [
		[0, 0, 2, 1],
		[2, 1, 2, 1],
		[4, 2, 2, 1],
		[6, 3, 2, 1],
		[8, 2, 2, 1],
		[10, 1, 2, 1],
		[12, 0, 2, 1]
	];
	const wingsDown = [
		[0, 4, 2, 1],
		[2, 3, 2, 1],
		[4, 2, 2, 1],
		[6, 3, 2, 1],
		[8, 2, 2, 1],
		[10, 3, 2, 1],
		[12, 4, 2, 1]
	];
	const birds = [
		{ top: 18, dur: 26, off: 0.05, size: 2.5, bob: 6 },
		{ top: 30, dur: 34, off: 0.45, size: 2, bob: 9 },
		{ top: 12, dur: 30, off: 0.75, size: 3, bob: 5 }
	];
	const clouds = [
		{ top: 8, dur: 95, off: 0.2, w: 96, o: 0.9 },
		{ top: 38, dur: 130, off: 0.65, w: 64, o: 0.75 }
	];

	let band: HTMLDivElement;
	let birdEls: (SVGGElement | null)[] = [];
	let cloudEls: (SVGSVGElement | null)[] = [];
	let flap = $state(false);

	onMount(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;
		const flapper = setInterval(() => (flap = !flap), 240);
		let raf = 0;
		const t0 = performance.now();
		const tick = (now: number) => {
			const t = (now - t0) / 1000;
			const w = band.offsetWidth;
			const h = band.offsetHeight;
			birds.forEach((b, i) => {
				const el = birdEls[i];
				if (!el) return;
				const x = (((t / b.dur + b.off) % 1.25) - 0.12) * w;
				const y = (b.top / 100) * h + Math.sin(t * 1.7 + i * 2.1) * b.bob;
				el.style.transform = `translate(${x}px, ${y}px)`;
			});
			clouds.forEach((c, i) => {
				const el = cloudEls[i];
				if (!el) return;
				const x = (((t / c.dur + c.off) % 1.3) - 0.15) * w;
				el.style.transform = `translateX(${x}px)`;
			});
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			clearInterval(flapper);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div bind:this={band} class="relative h-[54vh] max-h-[600px] min-h-[320px] overflow-hidden">
	<img
		src="/beach.webp"
		alt="Pixel beach: azure sky, cumulus clouds, banded teal sea, sand and a green headland"
		class="absolute inset-0 h-full w-full object-cover object-[center_40%] [image-rendering:pixelated] md:object-[center_64%]"
		fetchpriority="high"
	/>
	{#each clouds as c, i}
		<svg
			bind:this={cloudEls[i]}
			viewBox="0 0 64 24"
			class="absolute left-0 text-white"
			style="top: {c.top}%; width: {c.w}px; opacity: {c.o}"
			aria-hidden="true"
		>
			<path fill="currentColor" d="M8 20h48v-4h4v-4h-4V8h-8V4H32v4h-8v4H12v4H8z" />
		</svg>
	{/each}
	<svg class="absolute inset-0 h-full w-full text-ink/80" aria-hidden="true">
		{#each birds as b, i}
			<g bind:this={birdEls[i]}>
				<g transform="scale({b.size})">
					{#each flap ? wingsDown : wingsUp as px}
						<rect x={px[0]} y={px[1]} width={px[2]} height={px[3]} fill="currentColor" />
					{/each}
				</g>
			</g>
		{/each}
	</svg>
	<div
		class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_54%,rgba(255,255,255,0.55)_82%,#ffffff_100%)]"
	></div>
</div>
