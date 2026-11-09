<script lang="ts">
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
	import { toolGroups, toolIcons } from '#lib/data/icons.js';

	const dailyNames = ['Figma', 'TypeScript', 'Next.js', 'Svelte', 'Tailwind CSS', 'GitHub'];
	const allTools = toolGroups.flatMap((g) => g.tools);
	const dailyTools = dailyNames
		.map((n) => allTools.find((t) => t.name === n))
		.filter((t) => t !== undefined);
	import { REVEAL } from '#lib/reveal.js';
	import { formatBlogDate, type BlogMeta } from '#lib/blog/BlogPost.js';

	const blogMods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
		string,
		{ meta: BlogMeta }
	>;
	const blogPosts = Object.entries(blogMods)
		.map(([path, m]) => ({
			slug: path
				.split('/')
				.pop()!
				.replace(/\.mdx$/, ''),
			...m.meta
		}))
		.filter((p) => !p.draft)
		.sort((a, b) => (a.date < b.date ? 1 : -1));

	let copied = $state(false);
	let activeWork = $state(0);
	let workSection = $state<HTMLElement | null>(null);

	import { onMount } from 'svelte';

	onMount(() => {
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				if (!workSection) return;
				const r = workSection.getBoundingClientRect();
				const total = r.height - window.innerHeight;
				if (total <= 0) return;
				const progress = Math.min(Math.max(-r.top / total, 0), 0.999);
				activeWork = Math.floor(progress * projects.length);
			});
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => {
			window.removeEventListener('scroll', onScroll);
			cancelAnimationFrame(raf);
		};
	});

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {}
	}
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
				<h1 class="{REVEAL} text-[16px] leading-normal font-medium" style="--d: 60ms">
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
				<div class="{REVEAL} mt-6" style="--d: 220ms">
					<p class="text-pretty text-soft">
						I design and build B2B, agency, portfolio, SaaS and ecommerce sites, from Figma to
						production
						<Mark definition={highlightCalm} fillColor="#ffb26b">TypeScript</Mark>
						across SvelteKit, headless
						<Mark definition={highlightCalm} fillColor="#8ed3a4">Shopify</Mark>
						and the odd microservice.
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

	<section id="work" class="mt-24 scroll-mt-[88px] max-sm:mt-[72px]" bind:this={workSection}>
		{#snippet workDetail(p: (typeof projects)[number])}
			<div class="p-2 pb-0">
				<a
					class="group block"
					href={p.link}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor={p.cta}
				>
					<img
						src={p.image}
						alt="{p.name} homepage"
						loading="lazy"
						class="block aspect-[16/10] w-full rounded-xl bg-card object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.04)] transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
					/>
				</a>
			</div>
			<div class="p-6 max-sm:p-5">
				<h3 class="text-[18px] leading-[1.35] font-medium">{p.name}</h3>
				<div
					class="mt-4 grid grid-cols-[72px_1fr] gap-y-3 text-[14px] leading-[1.6] max-sm:flex max-sm:flex-col max-sm:gap-y-4"
				>
					<div class="contents max-sm:flex max-sm:flex-col max-sm:gap-y-1">
						<span class="text-faint">Problem</span>
						<p class="text-soft">{p.problem}</p>
					</div>
					<div class="contents max-sm:flex max-sm:flex-col max-sm:gap-y-1">
						<span class="text-faint">Outcome</span>
						<p>{p.outcome}</p>
					</div>
				</div>
				<div class="mt-4 flex flex-wrap gap-1.5">
					{#each p.meta.split(', ') as tag}
						<span
							class="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] text-ink/70 ring-1 ring-white ring-inset ring-offset-2 ring-offset-neutral-100"
							>{tag}</span
						>
					{/each}
				</div>
				<div class="mt-5 flex flex-wrap items-center gap-4">
					{#if p.caseStudy}
						<a
							class="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-accent"
							href={p.caseStudy}
							data-cursor="Case study"
						>
							Read the case study
							<svg
								class="transition-transform duration-300 ease-(--ease-mn) group-hover:translate-x-0.5"
								width="13"
								height="13"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg
							>
						</a>
					{/if}
					<a
						class="group inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors duration-200 hover:text-accent {p.caseStudy
							? 'text-muted'
							: ''}"
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
		{/snippet}

		<div class="lg:grid lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
			<div
				class="max-lg:mb-[22px] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center"
			>
				<div class="hidden lg:block">
					<h3 class="text-[24px] leading-[1.25] font-medium">{projects[activeWork].name}</h3>
					<p class="mt-2 text-[12px] tracking-[0.02em] text-faint">{projects[activeWork].meta}</p>
					<p class="mt-1 text-[11px] text-faint">
						{String(activeWork + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
					</p>
					<div class="mt-5 flex flex-wrap items-center gap-4">
						{#if projects[activeWork].caseStudy}
							<a
								class="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-accent"
								href={projects[activeWork].caseStudy}
								data-cursor="Case study"
							>
								Read the case study
								<svg
									class="transition-transform duration-300 ease-(--ease-mn) group-hover:translate-x-0.5"
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg
								>
							</a>
						{/if}
						<a
							class="group inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors duration-200 hover:text-accent {projects[
								activeWork
							].caseStudy
								? 'text-muted'
								: ''}"
							href={projects[activeWork].link}
							target="_blank"
							rel="noopener noreferrer"
							data-cursor={projects[activeWork].cta}
						>
							{projects[activeWork].cta}
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
			</div>

			<div class="hidden space-y-12 lg:block">
				{#each projects as p, i}
					<div
						class="{REVEAL} rounded-2xl bg-white shadow-[0_0_0_1px_var(--color-rule),0_10px_30px_rgba(0,0,0,0.05)]"
						style="--d: {i * 60}ms"
					>
						{@render workDetail(p)}
					</div>
				{/each}
			</div>

			<div class="space-y-14 lg:hidden">
				{#each projects as p, i}
					<article class={REVEAL} style="--d: {i * 60}ms">
						<div
							class="rounded-2xl bg-white shadow-[0_0_0_1px_var(--color-rule),0_10px_30px_rgba(0,0,0,0.05)]"
						>
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
					class="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3.5 py-2 text-[13px] font-medium text-ink ring-1 ring-white ring-inset ring-offset-2 ring-offset-neutral-100"
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
							<span class="font-medium">{freelance.org}</span>
							<span class="text-muted"> · {freelance.role} · {freelance.place}</span>
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
					class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
				>
					<div>
						<span class="font-medium">{s.title}</span>
						<p class="mt-0.5 text-soft">{s.note}</p>
					</div>
					{#if s.repo}
						<a
							href={s.repo}
							target="_blank"
							rel="noopener noreferrer"
							class="group/gh inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-ink"
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
			<div class="{REVEAL} mt-[22px] border-t border-rule" style="--d: 60ms">
				{#each blogPosts.slice(0, 3) as p}
					<a
						href="/blog/{p.slug}"
						class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
						data-cursor="Read"
					>
						<div>
							<span class="font-medium">{p.title}</span>
							<p class="mt-0.5 text-soft">{p.summary}</p>
						</div>
						<span class="shrink-0 text-[11px] text-muted">{formatBlogDate(p.date)}</span>
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
