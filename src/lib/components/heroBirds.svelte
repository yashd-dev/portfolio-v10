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
		{ bob: 6, dur: 26, off: 0.05, size: 2.5, top: 18 },
		{ bob: 9, dur: 34, off: 0.45, size: 2, top: 30 },
		{ bob: 5, dur: 30, off: 0.75, size: 3, top: 12 }
	];

	let band = $state<SVGSVGElement | null>(null);
	let birdEls: (SVGGElement | null)[] = [];
	let flap = $state(false);
	let visible = $state(false);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {return;}
		visible = true;
		const flapper = setInterval(() => (flap = !flap), 240);
		let raf = 0;
		const t0 = performance.now();
		const tick = (now: number) => {
			const t = (now - t0) / 1000;
			if (!band) {return;}
			const w = band.clientWidth;
			const h = band.clientHeight;
			for (const [i, b] of birds.entries()) {
				const el = birdEls[i];
				if (!el) {continue;}
				const x = (((t / b.dur + b.off) % 1.25) - 0.12) * w;
				const y = (b.top / 100) * h + Math.sin(t * 1.7 + i * 2.1) * b.bob;
				el.style.transform = `translate(${x}px, ${y}px)`;
			}
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => {
			clearInterval(flapper);
			cancelAnimationFrame(raf);
		};
	});
</script>

{#if visible}
	<svg bind:this={band} class="absolute inset-0 h-full w-full text-ink/55" aria-hidden="true">
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
{/if}
