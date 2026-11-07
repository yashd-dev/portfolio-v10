<script lang="ts">
	import { onMount } from 'svelte';

	let { name = 'You' }: { name?: string } = $props();

	const HANDS: Record<string, string> = {
		grab: 'M18 11.5V9a2 2 0 0 0-4 0v1.4V8a2 2 0 0 0-4 0v1.9V9a2 2 0 0 0-4 0v5a2 2 0 0 0-4 0 8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-3a2 2 0 0 0-4 0Z',
		point: 'M18 11V6a2 2 0 0 0-4 0v4V4a2 2 0 0 0-4 0v6.5V6a2 2 0 0 0-4 0v9l-1.6-1.6a2 2 0 0 0-2.8 2.8l3.6 3.6C6.5 21.1 8.2 22 11 22h2a8 8 0 0 0 8-8V8a2 2 0 0 0-3 0Z'
	};

	let root: HTMLDivElement;
	let label = $state(name);
	let hand = $state('');
	let visible = $state(false);
	let enabled = $state(false);

	onMount(() => {
		enabled =
			matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!enabled) return;
		document.documentElement.classList.add('pg-hide-cursor');
		const pos = { x: -100, y: -100 };
		let raf = 0;
		let lastLabel = 0;
		const render = () => {
			raf = 0;
			root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
		};
		const readTarget = (el: Element | null) => {
			label = el?.closest?.('[data-cursor]')?.getAttribute('data-cursor') || name;
			hand = el?.closest?.('[data-cursor-hand]')?.getAttribute('data-cursor-hand') || '';
		};
		const onMove = (e: PointerEvent) => {
			pos.x = e.clientX;
			pos.y = e.clientY;
			if (!raf) raf = requestAnimationFrame(render);
			const t = e.target as Element | null;
			visible = !t?.closest?.('[data-cursor-native]');
			if (e.timeStamp - lastLabel > 40) {
				lastLabel = e.timeStamp;
				readTarget(t);
			}
		};
		const onLeave = () => (visible = false);
		const refresh = () => {
			if (pos.x <= -50) return;
			readTarget(document.elementFromPoint(pos.x, pos.y));
		};
		addEventListener('pointermove', onMove, { passive: true });
		document.documentElement.addEventListener('pointerleave', onLeave);
		addEventListener('scroll', refresh, { passive: true });
		const interval = setInterval(refresh, 500);
		return () => {
			cancelAnimationFrame(raf);
			clearInterval(interval);
			removeEventListener('pointermove', onMove);
			removeEventListener('scroll', refresh);
			document.documentElement.removeEventListener('pointerleave', onLeave);
			document.documentElement.classList.remove('pg-hide-cursor');
		};
	});
</script>

{#if enabled}
	<div
		bind:this={root}
		class="pointer-events-none fixed top-0 left-0 z-[2147483000] opacity-0 transition-opacity duration-200 will-change-transform {visible
			? 'opacity-100'
			: ''}"
		aria-hidden="true"
	>
		{#if hand}
			<svg width="24" height="24" viewBox="0 0 24 24" class="-m-3 block fill-white stroke-[#151515] stroke-[1.5] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.25))]" stroke-linejoin="round" stroke-linecap="round">
				<path d={HANDS[hand] ?? HANDS.point} />
			</svg>
		{:else}
			<svg width="18" height="18" viewBox="0 0 18 18" class="-mt-0.5 -ml-0.5 block fill-accent stroke-white stroke-[1.2] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.18))]">
				<path
					d="M2.2 1.6 15.4 7.4c.6.3.6 1.1-.1 1.3l-5.4 1.6-2.3 5.1c-.3.6-1.1.6-1.3-.1L1.3 2.5c-.2-.6.4-1.1.9-.9Z"
				/>
			</svg>
		{/if}
		<span
			class="absolute rounded-full bg-accent px-2 py-[3px] text-[11.5px] font-medium whitespace-nowrap text-white shadow-[0_2px_8px_#2f5bea40] transition-transform duration-[350ms] ease-(--ease-mn) {label !== name
				? 'scale-[1.04]'
				: ''} {hand ? 'top-3 left-3' : 'top-4 left-[14px]'}"
			style="transform-origin: 0 0">{label}</span
		>
	</div>
{/if}
