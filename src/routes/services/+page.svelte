<script lang="ts">
	import SiteFooter from '#lib/components/siteFooter.svelte';
	import { projects, shenanigans } from '#lib/data/content.js';
	import { services } from '#lib/data/services.js';
	import { REVEAL } from '#lib/reveal.js';
</script>

<svelte:head>
	<title>Services - Yash Deshpande</title>
	<meta
		name="description"
		content="What Yash Deshpande designs and builds: landing pages, business websites, Shopify storefronts, custom web apps and AI features."
	/>
</svelte:head>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>

<main class="relative mx-auto w-full max-w-6xl px-5 pt-[320px] pb-10 max-sm:pt-[236px]">
	<header class="max-w-[600px]">
		<h1 class="{REVEAL} text-[20px] leading-normal font-medium">Services</h1>
		<p class="{REVEAL} text-soft" style="--d: 80ms">
			What I design and build, end to end. Every page here explains what you get, shows the work
			behind it and answers the questions people usually ask.
		</p>
	</header>

	<section id="services" aria-label="Services" class="mt-16 scroll-mt-[88px] max-sm:mt-12">
		<div class="{REVEAL} border-t border-rule" style="--d: 60ms">
			{#each services as s}
				<a
					href="/services/{s.slug}"
					class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
					data-cursor={s.nav}
				>
					<div>
						<span class="font-medium">{s.nav}</span>
						<p class="mt-0.5 text-soft">{s.indexNote}</p>
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

	<p class="{REVEAL} mt-16 text-[14px] text-soft" style="--d: 100ms">
		{projects.length} live projects and {shenanigans.length} side builds sit behind these pages.
		<a
			href="/work"
			class="font-medium text-ink underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-accent"
			data-cursor="All work">See the work</a
		>.
	</p>

	<SiteFooter />
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
