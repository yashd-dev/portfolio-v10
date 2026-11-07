<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	const SECTIONS = [
		{ id: 'intro', label: 'Intro', icon: 'person' },
		{ id: 'work', label: 'Work', icon: 'grid' },
		{ id: 'experience', label: 'Experience', icon: 'plane' }
	] as const;

	let active = $state('intro');
	let scrolled = $state(false);
	let track: HTMLDivElement;
	let pill = $state<{ x: number; w: number } | null>(null);

	onMount(() => {
		let raf = 0;
		const measure = () => {
			raf = 0;
			scrolled = scrollY > 24;
			if (location.pathname !== '/') {
				active = '';
				return;
			}
			const trigger = innerHeight * 0.4;
			let current = 'intro';
			for (const s of SECTIONS) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= trigger) current = s.id;
			}
			if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
				current = SECTIONS[SECTIONS.length - 1].id;
			active = current;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		raf = requestAnimationFrame(measure);
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
		};
	});

	$effect(() => {
		const item = track?.querySelector(`[data-id="${active}"]`);
		if (!track || !(item instanceof HTMLElement)) return;
		const update = () => (pill = { x: item.offsetLeft, w: item.offsetWidth });
		update();
		const ro = new ResizeObserver(update);
		ro.observe(item);
		track.querySelectorAll('.pg-nav-item').forEach((el) => ro.observe(el));
		document.fonts?.ready.then(update).catch(() => {});
		return () => ro.disconnect();
	});

	function go(id: string) {
		return (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			const el = document.getElementById(id);
			if (!el) {
				goto(`/#${id}`);
				return;
			}
			const offset = id === 'intro' ? 0 : -88;
			const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number | HTMLElement, o?: object) => void } }).__lenis;
			if (lenis) lenis.scrollTo(id === 'intro' ? 0 : el, { offset, duration: 1.2 });
			else
				window.scrollTo({
					top: id === 'intro' ? 0 : el.getBoundingClientRect().top + scrollY + offset,
					behavior: 'smooth'
				});
		};
	}

	const scrolledCls =
		'bg-white/72 shadow-[0_0_0_1px_var(--color-rule),0_6px_24px_#0000000f] backdrop-blur-[14px] backdrop-saturate-150';
</script>

<header
	class="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 max-sm:px-3 max-sm:pt-3 max-sm:before:absolute max-sm:before:inset-x-0 max-sm:before:top-0 max-sm:before:-bottom-[22px] max-sm:before:-z-10 max-sm:before:pointer-events-none max-sm:before:bg-white/62 max-sm:before:opacity-0 max-sm:before:backdrop-blur-[14px] max-sm:before:backdrop-saturate-140 max-sm:before:[mask-image:linear-gradient(to_bottom,#000_62%,transparent)] max-sm:before:transition-opacity max-sm:before:duration-300 {scrolled
		? 'max-sm:before:opacity-100'
		: ''}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3">
		<div
			class="pg-nav-track pointer-events-auto relative inline-flex items-center rounded-full bg-black/5 p-[3px] transition-[background-color,box-shadow] duration-[350ms] {scrolled
				? scrolledCls
				: ''}"
			role="navigation"
			aria-label="Sections"
			bind:this={track}
		>
			{#if pill}
				<span
					class="absolute top-[3px] bottom-[3px] left-0 rounded-full bg-white shadow-[0_1px_2px_#00000014,0_0_0_0.5px_#0000000a] transition-[transform,width] duration-[550ms] ease-(--ease-mn) motion-reduce:transition-none"
					style:transform="translateX({pill.x}px)"
					style:width="{pill.w}px"
					aria-hidden="true"
				></span>
			{/if}
			{#each SECTIONS as s}
				{@const isActive = s.id === active}
				<a
					href="#{s.id}"
					data-id={s.id}
					data-cursor={s.label}
					class="pg-nav-item relative z-[1] inline-flex h-8 items-center rounded-full px-[13px] text-[13px] font-medium whitespace-nowrap transition-colors duration-200 max-sm:px-2.5 {isActive
						? 'text-ink'
						: 'text-muted'} hover:text-ink"
					aria-current={isActive ? 'true' : undefined}
					onclick={go(s.id)}
				>
					<span
						class="inline-grid h-[14px] place-items-center overflow-hidden transition-[width,opacity,margin] duration-[450ms] ease-(--ease-mn) {isActive
							? 'mr-1.5 w-[14px] opacity-100'
							: 'w-0 opacity-0 max-sm:w-[14px] max-sm:opacity-75'}"
						aria-hidden="true"
					>
						{#if s.icon === 'person'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[13px] shrink-0"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
						{:else if s.icon === 'grid'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[13px] shrink-0"><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>
						{:else}
							<svg viewBox="0 0 24 20" class="size-[13px] shrink-0"><path fill="currentColor" d="M10.8 4.5 10.8 9.5 4.5 9.5Z M13.2 2.5 13.2 9.5 20 9.5Z M11.4 2h1.2v10.8h-1.2Z M2 13 22 13 18.5 17.5 5.5 17.5Z" /></svg>
						{/if}
					</span>
					<span class={isActive || page.url.pathname !== '/' ? '' : 'max-sm:sr-only'}>{s.label}</span>
				</a>
			{/each}
		</div>
		<div class="inline-flex items-center gap-2">
			<a
				class="pointer-events-auto inline-grid size-[34px] place-items-center rounded-full bg-black/5 text-muted transition-[color,background-color,box-shadow] duration-200 hover:text-ink {scrolled
					? scrolledCls
					: ''}"
				href="/play"
				aria-label="Play a game"
				data-cursor="Play"
			>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[17px]"><path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5Z" /></svg>
			</a>
		</div>
	</div>
</header>
