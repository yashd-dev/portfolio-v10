<script lang="ts">
	import { onMount } from 'svelte';

	const items = [
		{ id: 'intro', label: 'Intro', icon: 'person' },
		{ id: 'work', label: 'Work', icon: 'grid' },
		{ id: 'experience', label: 'Experience', icon: 'plane' }
	];

	let active = $state('intro');
	let linkEls: (HTMLAnchorElement | null)[] = [];
	let ind = $state({ left: 4, width: 0 });
	let ready = $state(false);

	function measure() {
		const i = items.findIndex((it) => it.id === active);
		const el = linkEls[i];
		if (el) ind = { left: el.offsetLeft, width: el.offsetWidth };
	}

	function go(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement | number, o?: object) => void } })
			.__lenis;
		if (lenis) lenis.scrollTo(id === 'intro' ? 0 : el, { offset: id === 'intro' ? 0 : -88, duration: 1.2 });
		else
			window.scrollTo({
				top: id === 'intro' ? 0 : el.getBoundingClientRect().top + window.scrollY - 88,
				behavior: 'smooth'
			});
	}

	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) active = e.target.id;
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		items.forEach((it) => {
			const el = document.getElementById(it.id);
			if (el) io.observe(el);
		});
		document.fonts.ready.then(() => {
			measure();
			requestAnimationFrame(() => (ready = true));
		});
		return () => io.disconnect();
	});

	$effect(() => {
		active;
		measure();
	});
</script>

<nav
	class="fixed top-4 left-1/2 z-40 -translate-x-1/2 rounded-full border border-black/8 bg-white/75 p-1 text-xs tracking-wide shadow-sm backdrop-blur-md"
>
	<div class="relative flex items-center">
		<span
			class="absolute top-0 h-full rounded-full bg-white shadow-sm ring-1 ring-black/5 {ready
				? 'transition-[left,width] duration-[550ms] ease-mn'
				: ''}"
			style="left: {ind.left}px; width: {ind.width}px"
		></span>
		{#each items as it, i}
			<a
				bind:this={linkEls[i]}
				href="#{it.id}"
				onclick={(e) => {
					e.preventDefault();
					go(it.id);
				}}
				class="relative z-10 flex items-center rounded-full px-4 py-1.5 uppercase transition-colors duration-200 {active ===
				it.id
					? 'text-ink'
					: 'text-muted hover:text-ink'}"
			>
				<span
					class="inline-flex place-items-center overflow-hidden transition-all duration-[450ms] ease-mn max-sm:w-3.5 max-sm:opacity-100 {active ===
					it.id
						? 'w-3.5 opacity-100'
						: 'w-0 opacity-0'}"
					aria-hidden="true"
				>
					{#if it.icon === 'person'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 shrink-0"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
					{:else if it.icon === 'grid'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 shrink-0"><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>
					{:else}
						<svg viewBox="0 0 16 15" class="h-3.5 w-3.5 shrink-0"><path fill="currentColor" d="M8 0c.73 0 1.32 1.05 1.32 2.35v2.2l6.13 3.54c.25.14.4.4.4.69v1.1a.44.44 0 0 1-.56.42L9.32 8.5v3.06l1.9 1.33c.15.11.24.28.24.47v.79a.44.44 0 0 1-.56.42L8 13.79l-2.9.78a.44.44 0 0 1-.56-.42v-.79c0-.19.09-.36.24-.47l1.9-1.33V8.5L.71 10.3a.44.44 0 0 1-.56-.42v-1.1c0-.29.15-.55.4-.69l6.13-3.54v-2.2C6.68 1.05 7.27 0 8 0Z" /></svg>
					{/if}
				</span>
				<span class={active === it.id ? 'ml-1.5' : 'max-sm:ml-0 max-sm:hidden'}>{it.label}</span>
			</a>
		{/each}
	</div>
</nav>
