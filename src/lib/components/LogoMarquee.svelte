<script lang="ts">
	import { onMount } from 'svelte';
	import { toolIcons } from '#lib/data/icons.js';

	let track: HTMLDivElement;

	onMount(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;
		let raf = 0;
		let x = 0;
		const tick = () => {
			const half = track.scrollWidth / 2;
			x -= 0.4;
			if (-x >= half) x += half;
			track.style.transform = `translateX(${x}px)`;
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div
	class="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
>
	<div bind:this={track} class="flex w-max items-center gap-10">
		{#each [...toolIcons, ...toolIcons] as t}
			<svg viewBox="0 0 24 24" class="h-6 w-6 shrink-0 fill-faint transition-transform duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:fill-muted" role="img" aria-label={t.name}>
				<path d={t.path} />
			</svg>
		{/each}
	</div>
</div>
