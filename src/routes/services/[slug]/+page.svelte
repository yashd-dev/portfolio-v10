<script lang="ts">
	import CtaSection from '#lib/components/ctaSection.svelte';
	import FaqSection from '#lib/components/faqSection.svelte';
	import HeroBirds from '#lib/components/heroBirds.svelte';
	import Mark from '#lib/components/mark.svelte';
	import SiteFooter from '#lib/components/siteFooter.svelte';
	import { email } from '#lib/data/content.js';
	import { siteUrl } from '#lib/data/site.js';
	import { stackTools } from '#lib/data/icons.js';
	import { highlightCalm } from '#lib/marks.js';
	import { REVEAL } from '#lib/reveal.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { service, proofProjects, proofShenanigans, related } = $derived(data);

	const serviceLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Service',
			...(service.mumbai ? { areaServed: { '@type': 'City', name: 'Mumbai' } } : {}),
			description: service.seoDescription,
			name: service.nav,
			provider: {
				'@type': 'Person',
				email: `mailto:${email}`,
				name: 'Yash Deshpande',
				url: siteUrl
			},
			url: `${siteUrl}/services/${service.slug}`
		})
	);

	const faqLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: service.faqs.flatMap((g) =>
				g.items.map((i) => ({
					'@type': 'Question',
					acceptedAnswer: { '@type': 'Answer', text: i.answer },
					name: i.question
				}))
			)
		})
	);
</script>

<svelte:head>
	<title>{service.seoTitle}</title>
	<meta name="description" content={service.seoDescription} />
	<meta property="og:title" content={service.seoTitle} />
	<meta property="og:description" content={service.seoDescription} />
	<meta property="og:image" content="{siteUrl}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	{@html '<script type="application/ld+json">' + serviceLd + '</script>'}
	{@html '<script type="application/ld+json">' + faqLd + '</script>'}
</svelte:head>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
>
	<HeroBirds />
</div>

<main class="relative mx-auto w-full max-w-6xl px-5 pt-[320px] pb-10 max-sm:pt-[236px]">
	<header class="max-w-[600px]">
		<h1 class="{REVEAL} text-[20px] leading-normal font-medium">
			{service.titlePre}<Mark definition={highlightCalm} fillColor={service.markFill}
				>{service.titleMark}</Mark
			>{service.titlePost}
		</h1>
		{#each service.intro as para, i}
			<p class="{REVEAL} mt-[26px] text-pretty text-soft" style="--d: {100 + i * 60}ms">
				{para}
			</p>
		{/each}
	</header>

	{#if service.stats}
		<div
			class="{REVEAL} mt-16 grid grid-cols-3 gap-4 border-y border-dashed border-neutral-200 py-8 max-sm:mt-12"
			style="--d: 160ms"
		>
			{#each service.stats as s}
				<div>
					<p class="text-2xl font-medium tracking-tight text-ink">{s.value}</p>
					<p class="mt-2 text-[13px] leading-snug text-soft">{s.label}</p>
				</div>
			{/each}
		</div>
	{/if}

	<section id="offerings" aria-label="What you get" class="mt-24 scroll-mt-[88px] max-sm:mt-[72px]">
		<p class="{REVEAL} mb-10 text-sm font-medium text-muted max-sm:mb-6">What you get</p>
		<div
			class="{REVEAL} grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-10 lg:grid-cols-3"
			style="--d: 60ms"
		>
			{#each service.offerings as o}
				<div class="flex flex-col">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-[18px]"
						style="color: {o.color}"
						aria-hidden="true">{@html o.icon}</svg
					>
					<p class="mt-5 text-[15px] font-medium text-ink">{o.name}</p>
					<p class="mt-2 text-sm leading-relaxed text-soft">{o.note}</p>
				</div>
			{/each}
		</div>
	</section>

	{#if proofProjects.length > 0}
		<section aria-label="Proof" class="mt-24 max-sm:mt-[72px]">
			<div class="{REVEAL} flex items-baseline justify-between gap-4">
				<p class="text-sm font-medium text-muted">The work behind it</p>
				<a
					href="/work"
					class="text-[13px] text-soft underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-ink"
					data-cursor="All work">All work</a
				>
			</div>
			<div
				class="mt-[22px] grid grid-cols-1 gap-x-12 gap-y-16 max-sm:gap-y-14 sm:grid-cols-2"
			>
				{#each proofProjects as p, i}
					<article class={REVEAL} style="--d: {(i % 2) * 80}ms">
						<a
							class="group block"
							href={p.caseStudy ?? p.link}
							target={p.caseStudy ? undefined : '_blank'}
							rel={p.caseStudy ? undefined : 'noopener noreferrer'}
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
						<div class="mt-5">
							<h3 class="text-[18px] leading-[1.35] font-medium text-ink">{p.name}</h3>
							<p class="mt-1 text-[12px] tracking-[0.02em] text-faint max-sm:hidden">{p.meta}</p>
							<div class="mt-3 hidden flex-wrap gap-2 max-sm:flex">
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
							<p class="mt-3 text-[14px] leading-[1.6] text-soft">{p.description}</p>
							<div class="mt-4 flex flex-wrap items-center gap-4">
								{#if p.caseStudy}
									<a
										class="group/cs inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors duration-200 hover:text-accent"
										href={p.caseStudy}
										data-cursor="Case study"
									>
										Read the case study
										<svg
											class="transition-transform duration-300 ease-(--ease-mn) group-hover/cs:translate-x-0.5"
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
									class="group/ext inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors duration-200 hover:text-accent {p.caseStudy
										? 'text-muted'
										: 'text-ink'}"
									href={p.link}
									target="_blank"
									rel="noopener noreferrer"
									data-cursor={p.cta}
								>
									{p.cta}
									<svg
										class="transition-transform duration-300 ease-(--ease-mn) group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5"
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
					</article>
				{/each}
			</div>
		</section>
	{/if}

	{#if proofShenanigans.length > 0}
		<section aria-label="Built proof" class="mt-24 max-sm:mt-[72px]">
			<p class="{REVEAL} mb-[22px] text-sm font-medium text-muted">Built and shipped</p>
			<div class="{REVEAL} border-t border-rule" style="--d: 60ms">
				{#each proofShenanigans as s}
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
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if service.compare}
		<section aria-label={service.compare.title} class="mt-24 max-sm:mt-[72px]">
			<p class="{REVEAL} mb-[22px] text-sm font-medium text-muted">{service.compare.title}</p>
			<div
				class="{REVEAL} grid grid-cols-1 border-y border-dashed border-neutral-200 md:grid-cols-2"
				style="--d: 60ms"
			>
				{#each [service.compare.a, service.compare.b] as side, i}
					<div
						class="py-6 md:py-8 {i === 0
							? 'max-md:border-b max-md:border-dashed max-md:border-neutral-200 md:border-r md:border-dashed md:border-neutral-200 md:pr-8'
							: 'md:pl-8'}"
					>
						<p class="text-[15px] font-medium text-ink">{side.heading}</p>
						<ul class="mt-3 text-sm text-soft">
							{#each side.points as pt}
								<li
									class="relative border-t border-dashed border-black/15 py-1.5 pl-4 first:border-t-0"
								>
									<span
										class="absolute top-[14px] left-0 size-1.5 rounded-full border-[1.5px] border-[#2e74ff]"
									></span>
									{pt}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<div id="faqs" class="scroll-mt-[88px]">
		<FaqSection groups={service.faqs} padded={false} />
	</div>

	<section id="related" aria-label="Related services" class="mt-16 scroll-mt-[88px] max-sm:mt-12">
		<p class="{REVEAL} mb-[22px] text-sm font-medium text-muted">Related</p>
		<div class="{REVEAL} border-t border-rule" style="--d: 60ms">
			{#each related as r}
				<a
					href="/services/{r.slug}"
					class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
					data-cursor={r.nav}
				>
					<div>
						<span class="font-medium">{r.nav}</span>
						<p class="mt-0.5 text-soft">{r.indexNote}</p>
					</div>
					<svg
						class="shrink-0 transition-transform duration-300 ease-(--ease-mn) group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
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
			{/each}
		</div>
	</section>

	<CtaSection guides={false} />
	<SiteFooter />
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
