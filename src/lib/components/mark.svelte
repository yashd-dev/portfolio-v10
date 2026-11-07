<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	type Timing = { duration: number; delay?: number; easing?: string };
	type StrokeLayer = {
		type: 'stroke';
		path: string;
		strokeWidth: number;
		transform?: string;
		opacity?: number;
		timing: Timing;
	};
	type FillLayer = {
		type: 'fill';
		path: string;
		transform?: string;
		opacity?: number;
		reveal: { path: string; strokeWidth: number };
		timing: Timing;
	};
	export type MarkDefinition = {
		name: string;
		viewBox: string;
		placement: { top: string; left: string; width: string; height: string };
		layer: 'behind' | 'front';
		layers: (StrokeLayer | FillLayer)[];
	};

	let {
		definition,
		color = 'currentColor',
		fillColor,
		children
	}: {
		definition: MarkDefinition;
		color?: string;
		fillColor?: string;
		children: Snippet;
	} = $props();

	let root = $state<HTMLSpanElement>()!;
	let svg = $state<SVGSVGElement>()!;
	const maskId = 'mk' + Math.random().toString(36).slice(2, 9);

	onMount(() => {
		const layers = Array.from(svg.querySelectorAll<SVGPathElement>('[data-mk]'));
		const prepare = (el: SVGPathElement, visible: boolean) => {
			const len = el.getTotalLength();
			el.style.strokeDasharray = `${len} ${len}`;
			el.style.strokeDashoffset = visible ? '0' : String(len);
			el.style.opacity = '1';
			return len;
		};
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			layers.forEach((el) => prepare(el, true));
			return;
		}
		const play = () => {
			layers.forEach((el) => {
				const len = prepare(el, false);
				const a = el.animate(
					[{ strokeDashoffset: String(len) }, { strokeDashoffset: '0' }],
					{
						duration: Number(el.dataset.duration),
						delay: Number(el.dataset.delay ?? 0),
						easing: el.dataset.easing || 'cubic-bezier(.22,.72,.2,1)',
						fill: 'both'
					}
				);
				a.onfinish = () => {
					el.style.strokeDashoffset = '0';
					a.cancel();
				};
			});
		};
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					play();
					io.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		io.observe(root);
		return () => io.disconnect();
	});
</script>

<span bind:this={root} class="relative inline-block isolate">
	<span class="relative" style:z-index={definition.layer === 'behind' ? 1 : 0}>{@render children()}</span>
	<svg
		bind:this={svg}
		aria-hidden="true"
		focusable="false"
		preserveAspectRatio="none"
		viewBox={definition.viewBox}
		class="pointer-events-none absolute overflow-visible"
		style:z-index={definition.layer === 'behind' ? 0 : 1}
		style:color
		style:top={definition.placement.top}
		style:left={definition.placement.left}
		style:width={definition.placement.width}
		style:height={definition.placement.height}
	>
		{#each definition.layers as layer, i}
			{#if layer.type === 'fill'}
				<defs>
					<mask id="{maskId}-{i}" maskUnits="userSpaceOnUse" x="-20%" y="-20%" width="140%" height="140%">
						<path
							data-mk
							data-duration={layer.timing.duration}
							data-delay={layer.timing.delay ?? 0}
							data-easing={layer.timing.easing ?? ''}
							d={layer.reveal.path}
							transform={layer.transform}
							fill="none"
							stroke="white"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={layer.reveal.strokeWidth}
							style="opacity: 0"
						/>
					</mask>
				</defs>
				<path
					d={layer.path}
					fill={fillColor ?? 'currentColor'}
					mask="url(#{maskId}-{i})"
					opacity={layer.opacity ?? 1}
					transform={layer.transform}
				/>
			{:else}
				<path
					data-mk
					data-duration={layer.timing.duration}
					data-delay={layer.timing.delay ?? 0}
					data-easing={layer.timing.easing ?? ''}
					d={layer.path}
					fill="none"
					opacity={layer.opacity ?? 1}
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={layer.strokeWidth}
					transform={layer.transform}
					style="opacity: 0"
				/>
			{/if}
		{/each}
	</svg>
</span>
