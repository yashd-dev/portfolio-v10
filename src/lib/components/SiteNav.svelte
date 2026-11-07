<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
		track.querySelectorAll('.pg-nav__item').forEach((el) => ro.observe(el));
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
</script>

<header class="pg-nav" class:is-scrolled={scrolled}>
	<div class="pg-nav__inner">
		<div class="pg-nav__track" role="navigation" aria-label="Sections" bind:this={track}>
			{#if pill}
				<span
					class="pg-nav__pill"
					style:transform="translateX({pill.x}px)"
					style:width="{pill.w}px"
					aria-hidden="true"
				></span>
			{/if}
			{#each SECTIONS as s}
				<a
					href="#{s.id}"
					data-id={s.id}
					data-cursor={s.label}
					class="pg-nav__item"
					class:is-active={s.id === active}
					aria-current={s.id === active ? 'true' : undefined}
					onclick={go(s.id)}
				>
					<span class="pg-nav__icon" aria-hidden="true">
						{#if s.icon === 'person'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
						{:else if s.icon === 'grid'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>
						{:else}
							<svg viewBox="0 0 16 15"><path fill="currentColor" d="M8 0c.73 0 1.32 1.05 1.32 2.35v2.2l6.13 3.54c.25.14.4.4.4.69v1.1a.44.44 0 0 1-.56.42L9.32 8.5v3.06l1.9 1.33c.15.11.24.28.24.47v.79a.44.44 0 0 1-.56.42L8 13.79l-2.9.78a.44.44 0 0 1-.56-.42v-.79c0-.19.09-.36.24-.47l1.9-1.33V8.5L.71 10.3a.44.44 0 0 1-.56-.42v-1.1c0-.29.15-.55.4-.69l6.13-3.54v-2.2C6.68 1.05 7.27 0 8 0Z" /></svg>
						{/if}
					</span>
					<span class="pg-nav__label">{s.label}</span>
				</a>
			{/each}
		</div>
		<div class="pg-nav__right">
			<a class="pg-nav__play" href="/play" aria-label="Play a game" data-cursor="Play">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5Z" /></svg>
			</a>
		</div>
	</div>
</header>
