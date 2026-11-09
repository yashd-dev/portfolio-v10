<script lang="ts">
	import { toolSections } from '#lib/data/icons.js';
	import CtaSection from '#lib/components/ctaSection.svelte';
	import SiteFooter from '#lib/components/siteFooter.svelte';

	const slug = (c: string) =>
		c
			.toLowerCase()
			.replace(/[^a-z]+/g, '-')
			.replace(/(^-|-$)/g, '');
	import { REVEAL } from '#lib/reveal.js';
</script>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>

<div class="relative mx-auto w-full max-w-6xl pb-[220px] max-sm:pb-[170px]">
	<header class="px-6 pt-[320px] max-sm:pt-[280px] sm:px-10">
		<h1 class="{REVEAL} text-[16px] leading-normal font-medium">Tools I reach for</h1>
		<p class="{REVEAL} text-soft" style="--d: 60ms">
			The daily stack, plus the things I'm currently trying out.
		</p>
	</header>

	{#each toolSections as sec, si}
		<section
			id={slug(sec.title)}
			class="mt-16 scroll-mt-[88px] px-6 first:mt-14 sm:px-10"
			aria-label={sec.title}
		>
			<h2 class="{REVEAL} text-sm font-medium text-muted">{sec.title}</h2>
			{#each sec.groups as group, gi}
				<div id={slug(group.category)} class="mt-10 scroll-mt-[88px] first:mt-8">
					<h3 class="{REVEAL} mb-[22px] text-sm font-medium text-muted">
						{group.category}
					</h3>
					<div
						class="{REVEAL} grid grid-cols-1 gap-x-12 border-t border-dashed border-neutral-200 sm:grid-cols-2"
						style="--d: {60 + (si * 10 + gi) * 40}ms"
					>
						{#each group.tools as t}
							<div
								class="group flex items-start gap-4 border-b border-dashed border-neutral-200 py-5"
							>
								<span
									class="relative grid size-11 flex-none place-items-center rounded-lg border border-neutral-200 bg-neutral-100 transition-[transform] duration-300 ease-(--ease-spring) after:pointer-events-none after:absolute after:inset-[4px] after:rounded-[4px] after:border-[1.5px] after:border-white/90 after:content-[''] after:transition-[border-color] after:duration-200 group-hover:scale-105 group-hover:after:border-white"
								>
									<svg
										viewBox={t.viewBox ?? '0 0 24 24'}
										class="size-5"
										style={t.raw ? '' : `fill: ${t.color}`}
										role="img"
										aria-label={t.name}
									>
										{#if t.raw}{@html t.raw}{:else}<path d={t.path} />{/if}
									</svg>
								</span>
								<div class="min-w-0">
									<h3 class="text-[15px] font-medium text-neutral-700">{t.name}</h3>
									<p class="mt-1 text-sm leading-relaxed text-neutral-500">{t.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</section>
	{/each}

	<CtaSection guides={false} />
	<SiteFooter />
</div>
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
