<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	type NavItem = { id: string; label: string; icon?: 'person' | 'grid' | 'plane' };

	const PAGES = [
		{ href: '/', label: 'Home' },
		{ href: '/work', label: 'Work' },
		{ href: '/process', label: 'Process' },
		{ href: '/tools', label: 'Tools' },
		{ href: '/blog', label: 'Blog' }
	];

	const LANDING: NavItem[] = [
		{ id: 'intro', label: 'Intro', icon: 'person' },
		{ id: 'work', label: 'Work', icon: 'grid' },
		{ id: 'experience', label: 'Experience', icon: 'plane' }
	];
	const PROCESS: NavItem[] = [
		{ id: 'designing', label: 'Designing' },
		{ id: 'development', label: 'Development' },
		{ id: 'microinteractions', label: 'Microinteractions' },
		{ id: 'communication', label: 'Communication' }
	];
	const WORK: NavItem[] = [{ id: 'projects', label: 'Projects', icon: 'grid' }];
	const BLOG: NavItem[] = [{ id: 'posts', label: 'Posts' }];
	const TOOLS: NavItem[] = [
		{ id: 'daily-drivers', label: 'Daily drivers' },
		{ id: 'experimenting', label: 'Experimenting' }
	];

	let pathname = $derived(page.url.pathname);
	let sections = $derived(
		page.url.pathname === '/process'
			? PROCESS
			: page.url.pathname === '/tools'
				? TOOLS
				: page.url.pathname === '/work'
					? WORK
					: page.url.pathname.startsWith('/blog')
						? BLOG
						: LANDING
	);

	let active = $state('intro');
	let openNav = $state<'sections' | 'pages' | null>(null);
	const anyPageCurrent = $derived(
		PAGES.some((p) => (p.href === '/' ? pathname === '/' : pathname.startsWith(p.href)))
	);
	let pagesNav: HTMLElement;
	let scrolled = $state(false);
	let track: HTMLDivElement;
	let pill = $state<{ x: number; w: number } | null>(null);

	let suppressUntil = 0;

	function measure() {
		scrolled = scrollY > 24;
		if (Date.now() < suppressUntil) return;
		const ids = sections.map((s) => s.id);
		if (!ids.some((id) => document.getElementById(id))) return;
		const trigger = innerHeight * 0.4;
		let current = ids[0];
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el && el.getBoundingClientRect().top <= trigger) current = id;
		}
		if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4)
			current = ids[ids.length - 1];
		active = current;
	}

	onMount(() => {
		let raf = 0;
		const onScroll = () => {
			if (!raf)
				raf = requestAnimationFrame(() => {
					raf = 0;
					measure();
				});
		};
		raf = requestAnimationFrame(() => {
			raf = 0;
			measure();
		});
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
		};
	});

	$effect(() => {
		sections;
		openNav = null;
		requestAnimationFrame(measure);
	});

	$effect(() => {
		if (!openNav) return;
		const onDown = (e: PointerEvent) => {
			const t = e.target as Node;
			if (!track?.contains(t) && !pagesNav?.contains(t)) openNav = null;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') openNav = null;
		};
		addEventListener('pointerdown', onDown);
		addEventListener('keydown', onKey);
		return () => {
			removeEventListener('pointerdown', onDown);
			removeEventListener('keydown', onKey);
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
			active = id;
			openNav = null;
			suppressUntil = Date.now() + 1400;
			const offset = id === 'intro' ? 0 : -88;
			const lenis = (
				window as unknown as {
					__lenis?: { scrollTo: (t: number | HTMLElement, o?: object) => void };
				}
			).__lenis;
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
	class="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 max-sm:px-3 max-sm:pt-3 max-sm:before:pointer-events-none max-sm:before:absolute max-sm:before:inset-x-0 max-sm:before:top-0 max-sm:before:-bottom-[22px] max-sm:before:-z-10 max-sm:before:bg-white/62 max-sm:before:[mask-image:linear-gradient(to_bottom,#000_62%,transparent)] max-sm:before:opacity-0 max-sm:before:backdrop-blur-[14px] max-sm:before:backdrop-saturate-140 max-sm:before:transition-opacity max-sm:before:duration-300 {scrolled
		? 'max-sm:before:opacity-100'
		: ''}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-3">
		<div
			class="pg-nav-track pointer-events-auto relative inline-flex items-center rounded-full bg-black/5 p-[3px] transition-[background-color,box-shadow,max-width] duration-[450ms] ease-(--ease-mn) max-sm:[scrollbar-width:none] max-sm:overflow-x-auto {openNav ===
			'sections'
				? 'max-sm:max-w-[calc(100vw-128px)]'
				: openNav === 'pages'
					? sections[0]?.icon
						? 'max-sm:max-w-[46px]'
						: 'max-sm:max-w-[110px]'
					: 'max-sm:max-w-[160px]'} {scrolled ? scrolledCls : ''}"
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
			{#each sections as s}
				{@const isActive = s.id === active}
				<a
					href="#{s.id}"
					data-id={s.id}
					data-cursor={s.label}
					class="pg-nav-item relative z-[1] inline-flex h-8 shrink-0 items-center rounded-full px-[13px] text-[13px] font-medium whitespace-nowrap transition-[color,width,padding,opacity] duration-200 max-sm:px-2.5 max-sm:duration-[450ms] max-sm:ease-(--ease-mn) {isActive ||
					openNav === 'sections'
						? ''
						: 'max-sm:w-0 max-sm:overflow-hidden max-sm:px-0! max-sm:opacity-0'} {isActive
						? 'text-ink'
						: 'text-muted'} hover:text-ink"
					aria-current={isActive ? 'true' : undefined}
					onclick={go(s.id)}
				>
					{#if s.icon}
						<span
							class="inline-grid h-[14px] place-items-center overflow-hidden transition-[width,opacity,margin] duration-[450ms] ease-(--ease-mn) {isActive
								? 'mr-1.5 w-[14px] opacity-100'
								: 'w-0 opacity-0 max-sm:w-[14px] max-sm:opacity-75'}"
							aria-hidden="true"
						>
							{#if s.icon === 'person'}
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.8"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="size-[13px] shrink-0"
									><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg
								>
							{:else if s.icon === 'grid'}
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.8"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="size-[13px] shrink-0"
									><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect
										x="13.5"
										y="3"
										width="7.5"
										height="7.5"
										rx="2"
									/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect
										x="13.5"
										y="13.5"
										width="7.5"
										height="7.5"
										rx="2"
									/></svg
								>
							{:else}
								<svg viewBox="0 0 24 20" class="size-[13px] shrink-0"
									><path
										fill="currentColor"
										d="M10.8 4.5 10.8 9.5 4.5 9.5Z M13.2 2.5 13.2 9.5 20 9.5Z M11.4 2h1.2v10.8h-1.2Z M2 13 22 13 18.5 17.5 5.5 17.5Z"
									/></svg
								>
							{/if}
						</span>
					{/if}
					<span
						class="{isActive || openNav === 'sections'
							? ''
							: s.icon
								? 'max-sm:sr-only'
								: ''} {isActive && openNav === 'pages' && s.icon
							? 'max-sm:sr-only'
							: ''} max-sm:truncate">{s.label}</span
					>
				</a>
			{/each}
			<span
				class="hidden size-[26px] flex-none place-items-center text-muted max-sm:grid"
				aria-hidden="true"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="size-3 transition-transform duration-300 ease-(--ease-mn) {openNav === 'sections'
						? 'rotate-180'
						: ''}"><path d="m6 9 6 6 6-6" /></svg
				>
			</span>
			{#if openNav !== 'sections'}
				<button
					type="button"
					class="absolute inset-0 z-[2] hidden cursor-pointer rounded-full max-sm:block"
					aria-label="Open section navigation"
					onclick={() => (openNav = 'sections')}
				></button>
			{/if}
		</div>
		<div class="inline-flex items-center gap-2">
			<nav
				bind:this={pagesNav}
				class="pointer-events-auto relative inline-flex items-center rounded-full bg-black/5 p-[3px] transition-[background-color,box-shadow,max-width] duration-[450ms] ease-(--ease-mn) max-sm:[scrollbar-width:none] max-sm:overflow-x-auto {openNav ===
				'pages'
					? 'max-sm:max-w-[calc(100vw-118px)]'
					: anyPageCurrent
						? 'max-sm:max-w-[104px]'
						: 'max-sm:max-w-[46px]'} {scrolled ? scrolledCls : ''}"
				aria-label="Pages"
			>
				{#each PAGES as p}
					{@const isCurrent = p.href === '/' ? pathname === '/' : pathname.startsWith(p.href)}
					<a
						href={p.href}
						data-cursor={p.label}
						aria-current={isCurrent ? 'page' : undefined}
						class="inline-flex h-8 shrink-0 items-center rounded-full px-[13px] text-[13px] font-medium whitespace-nowrap transition-[color,width,padding,opacity] duration-200 max-sm:px-2.5 max-sm:duration-[450ms] max-sm:ease-(--ease-mn) {isCurrent
							? 'bg-white text-ink shadow-[0_1px_2px_#00000014,0_0_0_0.5px_#0000000a]'
							: 'text-muted hover:text-ink'} {isCurrent || openNav === 'pages'
							? ''
							: 'max-sm:w-0 max-sm:overflow-hidden max-sm:px-0! max-sm:opacity-0'}"
						onclick={() => (openNav = null)}>{p.label}</a
					>
				{/each}
				{#if !anyPageCurrent}
					<span
						class="hidden size-8 flex-none place-items-center text-muted max-sm:grid {openNav ===
						'pages'
							? 'max-sm:hidden'
							: ''}"
						aria-hidden="true"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-3.5"
							><circle cx="12" cy="12" r="10" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5z" /></svg
						>
					</span>
				{/if}
				<span
					class="hidden size-[26px] flex-none place-items-center text-muted max-sm:grid"
					aria-hidden="true"
				>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-3 transition-transform duration-300 ease-(--ease-mn) {openNav === 'pages'
							? 'rotate-180'
							: ''}"><path d="m6 9 6 6 6-6" /></svg
					>
				</span>
				{#if openNav !== 'pages'}
					<button
						type="button"
						class="absolute inset-0 z-[2] hidden cursor-pointer rounded-full max-sm:block"
						aria-label="Open page navigation"
						onclick={() => (openNav = 'pages')}
					></button>
				{/if}
			</nav>
		</div>
	</div>
</header>
