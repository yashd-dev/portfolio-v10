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
	import { stackTools, toolGroups, toolIcons } from '#lib/data/icons.js';
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

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
>
	<HeroBirds />
</div>

<main class="relative mx-auto w-full max-w-6xl px-5 pt-[320px] pb-10 max-sm:pt-[236px]">
	<section id="intro" class="pg-intro relative">
		<div class="mb-10 hidden items-start gap-5 max-sm:flex">
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
				class="{REVEAL} mt-8 w-36 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none"
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
						I design and build B2B, agency, portfolio, SaaS and ecommerce sites, from Figma to
						production
						{@render techIcon('TypeScript')}<Mark definition={highlightCalm} fillColor="#ffb26b">TypeScript</Mark>
						across {@render techIcon('Svelte')}SvelteKit, headless
						{@render techIcon('Shopify')}<Mark definition={highlightCalm} fillColor="#8ed3a4">Shopify</Mark>
						and the odd microservice in {@render techIcon('Bun')}Bun, {@render techIcon('ElysiaJS')}ElysiaJS
						and {@render techIcon('Python')}Python.
					</p>
				</div>
			</div>
		</div>

		<div class="max-w-[600px]">
			<nav
				class="{REVEAL} mt-8 flex flex-wrap items-center gap-y-1 text-muted"
				style="--d: 280ms"
				aria-label="Links"
			>
				{#each socials as s, i}
					{#if i > 0}<span class="mx-2 text-faint">·</span>{/if}
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors duration-200 hover:text-ink">{s.label}</a
					>
				{/each}
				<span class="mx-2 text-faint">·</span>
				<a
					href="/yash-deshpande-resume.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors duration-200 hover:text-ink"
					data-cursor="Resume">Resume</a
				>
				<button
					type="button"
					class="inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-200 hover:text-ink max-sm:mt-1 max-sm:basis-full"
					data-cursor="Copy email"
					aria-label="Copy email address {email}"
					onclick={copyEmail}
				>
					<span class="mx-2 hidden text-faint max-sm:hidden! sm:inline">·</span>
					<span>{email}</span>
					<span class="inline-flex min-w-[13px] text-xs" aria-live="polite">
						<svg
							width="13"
							height="13"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="text-muted"
							aria-hidden="true"
						>
							{#if copied}
								<path d="M20 6 9 17l-5-5" class="text-accent" />
							{:else}
								<rect x="9" y="9" width="12" height="12" rx="2" /><path
									d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
								/>
							{/if}
						</svg>
					</span>
				</button>
				<span class="mx-2 text-faint max-sm:hidden" aria-hidden="true">·</span>
				<a href="/process" class="transition-colors duration-200 hover:text-ink max-sm:mt-1"
					>How I work</a
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

		<div class="max-w-[600px]">
			<div
				class="{REVEAL} group mt-12 mb-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
				style="--d: 340ms"
			>
				<div
					class="flex w-max animate-tools group-hover:[animation-play-state:paused] motion-reduce:animate-none"
				>
					{#each [0, 1] as half}
						<ul class="m-0 flex list-none items-center gap-10 px-6 py-2" aria-hidden={half === 1}>
							{#each toolIcons as t}
								<li
									class="group/item grid h-[30px] flex-none place-items-center"
									style="--c: {t.color}"
									data-cursor={t.name}
								>
									<svg
										viewBox="0 0 24 24"
										role="img"
										aria-label={t.name}
										class="block h-[26px] w-auto fill-(--c) opacity-90 transition-[opacity,transform] duration-[350ms] ease-(--ease-spring) group-hover/item:-translate-y-0.5 group-hover/item:scale-[1.12] group-hover/item:opacity-100"
										><path d={t.path} /></svg
									>
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			</div>
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
							src={p.image}
							alt="{p.name} homepage"
							loading="lazy"
							class="h-full w-full rounded-lg object-cover shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
						/>
					</div>
				</div>
			</div>
			<div class="mt-5">
				<h3 class="text-[18px] leading-[1.35] font-medium">{p.name}</h3>
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
							<h3 class="mt-2 text-[20px] leading-[1.25] font-medium">
								{projects[activeWork].name}
							</h3>
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
									src={p.image}
									alt="{p.name} homepage"
									loading="lazy"
									class="h-full w-full rounded-lg object-cover shadow-[0_10px_28px_rgba(0,0,0,0.22)] ring-1 ring-black/10 transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
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
					</div>
					<div
						class="flex shrink-0 items-center gap-9 max-sm:w-full max-sm:items-start max-sm:justify-between"
					>
						<img
							src={s.thumb}
							alt="{s.title} preview"
							class="w-[150px] rounded-lg ring-1 ring-black/10 max-sm:w-[120px]"
							loading="lazy"
						/>
						<div class="flex shrink-0 items-center gap-5">
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
