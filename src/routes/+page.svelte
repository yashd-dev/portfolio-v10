<script lang="ts">
	import { onMount } from 'svelte';
	import HeroBirds from '#lib/components/heroBirds.svelte';
	import CtaSection from '#lib/components/ctaSection.svelte';
	import SiteFooter from '#lib/components/siteFooter.svelte';
	import Polaroid from '#lib/components/polaroid.svelte';
	import Mark from '#lib/components/mark.svelte';
	import { highlightCalm } from '#lib/marks.js';
	import FlightPlan from '#lib/components/flightPlan.svelte';
	import {
		projects,
		socials,
		email,
		freelance,
		education,
		shenanigans
	} from '#lib/data/content.js';
	import { stackTools, toolGroups } from '#lib/data/icons.js';
	import { REVEAL } from '#lib/reveal.js';
	import { formatBlogDate } from '#lib/blog/BlogPost.js';
	import type { BlogMeta } from '#lib/blog/BlogPost.js';

	const dailyNames = ['Figma', 'TypeScript', 'Next.js', 'Svelte', 'Tailwind CSS', 'GitHub'];
	const allTools = toolGroups.flatMap((g) => g.tools);
	const dailyTools = dailyNames
		.map((n) => allTools.find((t) => t.name === n))
		.filter((t) => t !== undefined);

	const blogMods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
		string,
		{ meta: BlogMeta }
	>;
	const blogPosts = Object.entries(blogMods)
		.map(([path, m]) => ({
			slug: path.split('/').at(-1)?.replace(/\.mdx$/u, '') ?? '',
			...m.meta
		}))
		.filter((p) => !p.draft)
		.toSorted((a, b) => (a.date < b.date ? 1 : -1));

	let copied = $state(false);
	let activeWork = $state(0);
	let workGrid = $state<HTMLElement | null>(null);
	let workText = $state<HTMLElement | null>(null);
	let workCards = $state<HTMLElement | null>(null);

	onMount(() => {
		let raf = 0;
		const textHalf = (workText?.offsetHeight ?? 0) / 2;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				if (!workGrid || !workText || !workCards) {return;}
				const g = workGrid.getBoundingClientRect();
				const span = (g.height - window.innerHeight) / projects.length;
				const t = span > 0 ? Math.min(Math.max((88 - g.top) / span, 0), 1) : 0;
				const pinTop = workText.parentElement?.getBoundingClientRect().top ?? 0;
				const room = (window.innerHeight - workText.offsetHeight) / 2 - pinTop;
				let ty = t * Math.max(room, 0);
				const last = workCards.lastElementChild;
				if (last) {
					const lr = last.getBoundingClientRect();
					const end = lr.top + lr.height / 2 - workText.offsetHeight / 2 - pinTop;
					const k = 120;
					const d = ty - end;
					ty = Math.min(ty, end) - Math.max(k - Math.abs(d), 0) ** 2 / (4 * k);
				}
				workText.style.transform = `translateY(${ty}px)`;
				const vc = pinTop + ty + textHalf;
				let best = 0;
				let bd = Infinity;
				let i = 0;
				for (const c of workCards.children) {
					const r = c.getBoundingClientRect();
					const d = Math.abs(r.top + r.height / 2 - vc);
					if (d < bd) {
						bd = d;
						best = i;
					}
					i += 1;
				}
				activeWork = best;
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(raf);
		};
	});

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			copied = false;
		}
	};
</script>

<svelte:head>
	<link rel="preload" as="image" href="/beach.webp" fetchpriority="high" />
</svelte:head>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
>
	<HeroBirds />
</div>

<main class="relative mx-auto w-full max-w-6xl px-5 pt-[320px] pb-10 max-sm:pt-0">
	<section id="intro" class="pg-intro relative">
		<div class="max-sm:flex max-sm:min-h-[calc(100dvh-66px)] max-sm:flex-col max-sm:justify-end max-sm:pt-14">
		<div class="mb-10 hidden items-start gap-5 max-sm:flex max-[390px]:mb-3">
			<Polaroid
				src="/devfest.jpg"
				alt="Yash speaking on stage at Google DevFest"
				caption="Speaking at DevFest"
				cursor="Spoke at Google's DevFest"
				class="{REVEAL} max-w-20 -rotate-3 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none min-[350px]:max-w-36 sm:max-w-44"
			/>
			<Polaroid
				src="/teaching.webp"
				alt="Yash teaching web development in a classroom"
				caption="Teaching web dev"
				cursor="I love educating and teaching"
				class="{REVEAL} mt-2 max-w-20 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none min-[350px]:mt-8 min-[350px]:max-w-36"
			/>
		</div>
		<div class="relative">
			<div class="max-w-[600px]">
				<h1 class="{REVEAL} text-[20px] leading-normal font-medium" style="--d: 60ms">
					Hey, I'm Yash Deshpande
				</h1>
				<p class={REVEAL} style="--d: 100ms">a designer & developer based in Mumbai</p>
				<div class="{REVEAL} mt-[26px]" style="--d: 160ms">
					<p class="text-pretty text-soft">
						I design and build websites that feel considered and work smoothly, and I stick around
						after launch. Right now I'm taking on
						<Mark definition={highlightCalm} fillColor="#8ab6f2">freelance projects</Mark>
						and I'm open to
						<Mark definition={highlightCalm} fillColor="#8ab6f2">job opportunities</Mark>.
					</p>
				</div>
				{#snippet techIcon(name: string)}
					{@const t = allTools.find((x) => x.name === name)}
					{#if t}
						{#if name === 'TypeScript'}
							<span
								class="mr-1 inline-flex size-[16px] translate-y-[2px] items-center justify-center rounded-[5px] bg-neutral-200 ring-1 ring-white/45 ring-inset"
								title={t.name}
							>
								<span
									class="flex size-[11px] items-center justify-center rounded-[3px]"
									style="background-color: {t.color}"
								>
									<svg
										viewBox="2.4 8.7 19.2 14.4"
										class="size-[8px]"
										style="fill: #ffffff"
										role="img"
										aria-label={t.name}
										><path
											d="m17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"
										/></svg
									>
								</span>
							</span>
						{:else}
							<span
								class="mr-1 inline-flex size-[16px] translate-y-[2px] items-center justify-center rounded-[5px] ring-1 ring-white/45 ring-inset"
								style="background-color: {t.color}"
								title={t.name}
							>
								<svg
									viewBox={t.viewBox ?? '0 0 24 24'}
									class="size-[10px]"
									style={t.raw ? '' : 'fill: #ffffff'}
									role="img"
									aria-label={t.name}
								>
									{#if t.raw}{@html t.raw}{:else}<path d={t.path} />{/if}
								</svg>
							</span>
						{/if}
					{/if}
				{/snippet}
				<div class="{REVEAL} mt-6" style="--d: 220ms">
					<p class="text-pretty text-soft">
						I design user flows and interfaces in Figma, then take them into production code.
						The stack is
						{@render techIcon('TypeScript')}<Mark definition={highlightCalm} fillColor="#ffb26b">TypeScript</Mark>
						across {@render techIcon('Svelte')}SvelteKit, headless
						{@render techIcon('Shopify')}<Mark definition={highlightCalm} fillColor="#8ed3a4">Shopify</Mark>
						and the odd microservice in {@render techIcon('Bun')}Bun, {@render techIcon('ElysiaJS')}ElysiaJS
						and {@render techIcon('Python')}Python.
					</p>
				</div>
			</div>
		</div>
		</div>

		<div class="max-w-[600px]">
			<nav
				class="{REVEAL} mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted"
				style="--d: 280ms"
				aria-label="Links"
			>
				{#each socials as s}
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex p-1 transition-colors duration-200 hover:text-ink"
						data-cursor={s.label}
						aria-label={s.label}
					>
						{#if s.label === 'LinkedIn'}
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path
									d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
								/>
							</svg>
						{:else}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								/>
							</svg>
						{/if}
					</a>
				{/each}
				<button
					type="button"
					class="inline-flex cursor-pointer items-center p-1 transition-colors duration-200 hover:text-ink"
					data-cursor="Copy email"
					aria-label="Copy email address {email}"
					onclick={copyEmail}
				>
					<span class="inline-flex" aria-live="polite">
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							{#if copied}
								<path d="M20 6 9 17l-5-5" class="text-accent" />
							{:else}
								<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
							{/if}
						</svg>
					</span>
				</button>
				<span class="text-faint" aria-hidden="true">·</span>
				<a
					href="/yash-deshpande-resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors duration-200 hover:text-ink"
					data-cursor="Resume">Resume</a
				>
				<a
					href="#contact"
					class="rounded-full border border-rule px-3.5 py-1 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-ink"
					data-cursor="Let's talk">Start a project</a
				>
			</nav>
		</div>

		<div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[400px] lg:block">
			<Polaroid
				src="/devfest.jpg"
				alt="Yash speaking on stage at Google DevFest"
				caption="Speaking at DevFest"
				cursor="Spoke at Google's DevFest"
				class="{REVEAL} pointer-events-auto absolute top-2 right-44 -rotate-3 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none"
			/>
			<Polaroid
				src="/teaching.webp"
				alt="Yash teaching web development in a classroom"
				caption="Teaching web dev"
				cursor="I love educating and teaching"
				class="{REVEAL} pointer-events-auto absolute top-40 right-0 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none"
			/>
		</div>
		<div class="mt-12 hidden items-start gap-5 sm:flex lg:hidden">
			<Polaroid
				src="/devfest.jpg"
				alt="Yash speaking on stage at Google DevFest"
				caption="Speaking at DevFest"
				cursor="Spoke at Google's DevFest"
				class="{REVEAL} w-36 -rotate-3 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none sm:w-44"
			/>
			<Polaroid
				src="/teaching.webp"
				alt="Yash teaching web development in a classroom"
				caption="Teaching web dev"
				cursor="I love educating and teaching"
				class="{REVEAL} mt-8 w-36 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none sm:mt-10 sm:w-44"
			/>
		</div>

	</section>

	<section id="work" class="mt-24 scroll-mt-[88px] max-sm:mt-[72px]">
		{#snippet workDetail(p: (typeof projects)[number])}
			<div>
				<div
					class="aspect-[16/10] w-full rounded-xl bg-cover bg-center"
					style="background-image: url({p.dither})"
				>
					<div class="flex h-full items-center justify-center p-[7%]">
						<img
							src={p.imageLg}
							srcset="{p.imageSm} 700w, {p.imageLg} 1400w"
							sizes="(max-width: 1023px) 86vw, 650px"
							width={p.imageW}
							height={p.imageH}
							alt="{p.name} homepage"
							loading="lazy"
							decoding="async"
							class="h-full {p.fit === 'full' ? 'w-auto' : 'w-full object-cover'} rounded-lg shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
						/>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<h2 class="text-[18px] leading-[1.35] font-medium">{p.name}</h2>
				<p class="mt-3 text-[14px] leading-[1.6] text-soft">{p.description}</p>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each stackTools(p.meta) as t}
						<span
							class="grid size-9 place-items-center rounded-[10px] bg-neutral-100 ring-1 ring-white ring-offset-2 ring-offset-neutral-100 ring-inset"
							data-cursor={t.name}
							title={t.name}
						>
							<svg
								viewBox="0 0 24 24"
								class="size-4"
								style="fill: {t.color}"
								role="img"
								aria-label={t.name}><path d={t.path} /></svg
							>
						</span>
					{/each}
				</div>
				<div class="mt-5 flex flex-wrap items-center gap-4">
					{#if p.caseStudy}
						<a
							class="relative z-10 rounded-full bg-linear-to-b from-[#3578ff] to-[#2e74ff] px-4 py-2 text-[13px] font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-[#2e74ff] transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98"
							href={p.caseStudy}
							data-cursor="Case study">Case Study</a
						>
					{/if}
					<a
						class="group relative z-10 inline-flex items-center gap-1.5 text-[14px] text-muted underline underline-offset-4 transition-colors duration-200 hover:text-ink"
						href={p.link}
						target="_blank"
						rel="noopener noreferrer"
						data-cursor={p.cta}
					>
						{p.cta}
						<svg
							class="transition-transform duration-300 ease-(--ease-mn) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg
						>
					</a>
				</div>
			</div>
			<a
				class="absolute inset-0 rounded-xl"
				href={p.caseStudy ?? p.link}
				target={p.caseStudy ? undefined : '_blank'}
				rel={p.caseStudy ? undefined : 'noopener noreferrer'}
				aria-label={p.caseStudy ? `${p.name} case study` : p.cta}
				data-cursor={p.caseStudy ? 'Case study' : p.cta}
			></a>
		{/snippet}

		<div
			class="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16"
			bind:this={workGrid}
		>
			<div
				class="max-lg:mb-[22px] lg:self-start lg:sticky lg:top-[88px]"
			>
				<div class="hidden lg:block" bind:this={workText}>
					<div class={REVEAL}>
						<div>
							<p class="text-[11px] text-faint">
								{String(activeWork + 1).padStart(2, '0')} / {String(projects.length).padStart(
									2,
									'0'
								)}
							</p>
							<h2 class="mt-2 text-[20px] leading-[1.25] font-medium">
								{projects[activeWork].name}
							</h2>
							<p class="mt-3 text-[14px] leading-[1.6] text-soft">
								{projects[activeWork].description}
							</p>
							<div class="mt-5 flex flex-wrap gap-2">
								{#each stackTools(projects[activeWork].meta) as t}
									<span
										class="grid size-9 place-items-center rounded-[10px] bg-neutral-100 ring-1 ring-white ring-offset-2 ring-offset-neutral-100 ring-inset"
										data-cursor={t.name}
										title={t.name}
									>
										<svg
											viewBox="0 0 24 24"
											class="size-4"
											style="fill: {t.color}"
											role="img"
											aria-label={t.name}><path d={t.path} /></svg
										>
									</span>
								{/each}
							</div>
							<div class="mt-6 flex flex-wrap items-center gap-4">
								{#if projects[activeWork].caseStudy}
									<a
										class="rounded-full bg-linear-to-b from-[#3578ff] to-[#2e74ff] px-4 py-2 text-[13px] font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-[#2e74ff] transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98"
										href={projects[activeWork].caseStudy}
										data-cursor="Case study">Case Study</a
									>
								{/if}
								<a
									class="group/link inline-flex items-center gap-1.5 text-[14px] text-muted underline underline-offset-4 transition-colors duration-200 hover:text-ink"
									href={projects[activeWork].link}
									target="_blank"
									rel="noopener noreferrer"
									data-cursor={projects[activeWork].cta}
								>
									{projects[activeWork].cta}
									<svg
										class="transition-transform duration-300 ease-(--ease-mn) group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg
									>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hidden space-y-24 lg:block" bind:this={workCards}>
				{#each projects as p, i}
					<a
						class="{REVEAL} group block"
						style="--d: {i * 60}ms"
						href={p.caseStudy ?? p.link}
						target={p.caseStudy ? undefined : '_blank'}
						rel={p.caseStudy ? undefined : 'noopener noreferrer'}
						aria-label={p.caseStudy ? `${p.name} case study` : p.cta}
						data-cursor={p.caseStudy ? 'Case study' : p.cta}
					>
						<div
							class="aspect-[16/10] w-full rounded-xl bg-cover bg-center"
							style="background-image: url({p.dither})"
						>
							<div class="flex h-full items-center justify-center p-[7%]">
								<img
									src={p.imageLg}
									srcset="{p.imageSm} 700w, {p.imageLg} 1400w"
									sizes="(max-width: 1023px) 86vw, 650px"
									width={p.imageW}
									height={p.imageH}
									alt="{p.name} homepage"
									loading="lazy"
									decoding="async"
									class="h-full {p.fit === 'full' ? 'w-auto' : 'w-full object-cover'} rounded-lg shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
								/>
							</div>
						</div>
					</a>
				{/each}
			</div>

			<div class="space-y-14 lg:hidden">
				{#each projects as p, i}
					<article class={REVEAL} style="--d: {i * 60}ms">
						<div class="group relative">
							{@render workDetail(p)}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section aria-label="Tools I use daily" class="mt-24 max-sm:mt-[72px]">
		<div class="{REVEAL} flex items-baseline justify-between gap-4">
			<p class="text-sm font-medium text-muted">Tools I use daily</p>
			<a
				href="/tools"
				class="text-[13px] text-soft underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-ink"
				data-cursor="All tools">All tools</a
			>
		</div>
		<div class="{REVEAL} mt-[22px] flex flex-wrap gap-2" style="--d: 60ms">
			{#each dailyTools as t}
				<span
					class="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-[13px] font-medium text-ink ring-1 ring-white ring-offset-2 ring-offset-neutral-100 ring-inset"
				>
					<svg
						viewBox="0 0 24 24"
						class="size-4"
						style="fill: {t.color}"
						role="img"
						aria-label={t.name}><path d={t.path} /></svg
					>
					{t.name}
				</span>
			{/each}
		</div>
	</section>

	<section
		id="experience"
		class="mt-24 grid scroll-mt-[88px] gap-16 max-sm:mt-[72px] md:grid-cols-2"
	>
		<div>
			<p class="{REVEAL} mb-[22px] text-sm font-medium text-muted">Experience</p>
			<FlightPlan />
		</div>
		<div>
			<div class={REVEAL}>
				<p class="mb-[22px] text-sm font-medium text-muted">Freelance</p>
				<div class="border-t border-rule">
					<div
						class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
					>
						<div>
							<span class="font-medium">{freelance.role}</span>
							<span class="text-muted"> · {freelance.place}</span>
							<p class="mt-0.5 text-soft">{freelance.note}</p>
						</div>
						<span class="shrink-0 text-[11px] text-muted">{freelance.span}</span>
					</div>
				</div>
			</div>
			<div class="{REVEAL} mt-12">
				<p class="mb-[22px] text-sm font-medium text-muted">Education</p>
				<div class="border-t border-rule">
					<div
						class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
					>
						<div>
							<span class="font-medium">{education.org}</span>
							<span class="text-muted"> · {education.role} · {education.place}</span>
						</div>
						<span class="shrink-0 text-[11px] text-muted">{education.span}</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section aria-label="Side shenanigans" class="mt-24 max-sm:mt-[72px]">
		<p class="{REVEAL} mb-[22px] text-sm font-medium text-muted">Side shenanigans</p>
		<div class="{REVEAL} border-t border-rule" style="--d: 60ms">
			{#each shenanigans as s}
				<div
					class="group/row flex items-center justify-between gap-5 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent max-sm:flex-col max-sm:items-start"
				>
					<div class="min-w-0">
						<span class="font-medium">{s.title}</span>
						<p class="mt-0.5 max-w-[40ch] text-soft">{s.note}</p>
						<div class="mt-1.5 flex items-center gap-5">
							{#if s.link}
								<a
									href={s.link}
									target="_blank"
									rel="noopener noreferrer"
									class="group/gh inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink"
									data-cursor="Live"
								>
									Live
									<svg
										class="transition-transform duration-300 ease-(--ease-mn) group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg
									>
								</a>
							{/if}
							{#if s.repo}
								<a
									href={s.repo}
									target="_blank"
									rel="noopener noreferrer"
									class="group/gh inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink"
									data-cursor="GitHub"
								>
									GitHub
									<svg
										class="transition-transform duration-300 ease-(--ease-mn) group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5"
										width="12"
										height="12"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg
									>
								</a>
							{/if}
							</div>
						</div>
						<img
							src={s.thumb}
							width={s.thumbW}
							height={s.thumbH}
							alt="{s.title} preview"
							class="w-[150px] shrink-0 rounded-lg ring-1 ring-black/10 max-sm:w-[120px]"
							loading="lazy"
							decoding="async"
						/>
					</div>
			{/each}
		</div>
	</section>

	{#if blogPosts.length > 0}
		<section aria-label="Writing" class="mt-24 max-sm:mt-[72px]">
			<div class="{REVEAL} flex items-baseline justify-between gap-4">
				<p class="text-sm font-medium text-muted">Writing</p>
				<a
					href="/blog"
					class="text-[13px] text-soft underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-ink"
					data-cursor="All writing">All writing</a
				>
			</div>
			<div
				class="{REVEAL} mt-[22px] border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-10"
				style="--d: 60ms"
			>
				{#each blogPosts.slice(0, 3) as p}
					<a
						href="/blog/{p.slug}"
						class="group/row block border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
						data-cursor="Read"
					>
						{#if p.thumb}
							<img
								src={p.thumb}
								alt="{p.title} thumbnail"
								loading="lazy"
								class="mb-3 aspect-[16/9] w-full rounded-lg object-cover ring-1 ring-black/10"
							/>
						{/if}
						<span class="font-medium">{p.title}</span>
						<span class="mt-1 block text-[11px] text-muted">{formatBlogDate(p.date)}</span>
						<p class="mt-1 max-w-[36ch] text-soft">{p.summary}</p>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<CtaSection guides={false} />

	<SiteFooter />
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
