<script lang="ts">
	import HeroBirds from '#lib/components/heroBirds.svelte';
	import CtaSection from '#lib/components/ctaSection.svelte';
import SiteFooter from '#lib/components/siteFooter.svelte';
	import { projects } from '#lib/data/content.js';
	import { REVEAL } from '#lib/reveal.js';
</script>

<svelte:head>
	<title>Work - Yash Deshpande</title>
	<meta
		name="description"
		content="Selected projects by Yash Deshpande: storefronts, therapy and healthcare sites, and consultancy pages, each designed, built and still maintained."
	/>
</svelte:head>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
>
	<HeroBirds />
</div>

<main class="relative mx-auto w-full max-w-6xl px-5 pt-[320px] pb-10 max-sm:pt-[236px]">
	<header class="max-w-[600px]">
		<h1 class="{REVEAL} text-[30px] leading-[1.2] font-medium tracking-tight text-ink">
			Every project here is live, and still looked after.
		</h1>
		<p class="{REVEAL} mt-4 text-[15px] leading-[1.7] text-soft" style="--d: 80ms">
			Storefronts, therapy and healthcare sites, and consultancy pages - designed, built and
			maintained by me, end to end.
		</p>
		<p class="{REVEAL} mt-3 text-[12px] tracking-[0.02em] text-faint" style="--d: 120ms">
			{String(projects.length).padStart(2, '0')} projects
		</p>
	</header>

	<section
		id="projects"
		class="mt-16 grid scroll-mt-[88px] grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 max-sm:mt-12 max-sm:gap-y-14"
	>
		{#each projects as p, i}
			<article class="{REVEAL}" style="--d: {(i % 2) * 80}ms">
				<a
					class="group block"
					href={p.caseStudy ?? p.link}
					target={p.caseStudy ? undefined : '_blank'}
					rel={p.caseStudy ? undefined : 'noopener noreferrer'}
					data-cursor={p.caseStudy ? 'Case study' : p.cta}
				>
					<img
						src={p.image}
						alt="{p.name} homepage"
						loading="lazy"
						class="block aspect-[16/10] w-full rounded-xl bg-card object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.04)] transition-transform duration-700 ease-(--ease-mn) group-hover:scale-[1.012]"
					/>
				</a>
				<div class="mt-5">
					<h3 class="text-[18px] leading-[1.35] font-medium text-ink">{p.name}</h3>
					<p class="mt-1 text-[12px] tracking-[0.02em] text-faint">{p.meta}</p>
					<p class="mt-3 text-[14px] leading-[1.6] text-soft">{p.description}</p>
					<div class="mt-4 flex flex-wrap items-center gap-4">
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
								: 'text-ink'}"
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
			</article>
		{/each}
	</section>

	<CtaSection guides={false} />
	<SiteFooter />
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
