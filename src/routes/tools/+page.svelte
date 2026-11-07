<script lang="ts">
	import { toolGroups } from '#lib/data/icons.js';
	import CtaSection from '#lib/components/ctaSection.svelte';

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

<div
	class="relative mx-auto w-full max-w-6xl pb-[220px] before:pointer-events-none before:absolute before:top-24 before:bottom-0 before:left-0 before:-z-10 before:w-px before:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] before:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] before:[background-size:1px_8px] after:pointer-events-none after:absolute after:top-24 after:right-0 after:bottom-0 after:-z-10 after:w-px after:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] after:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] after:[background-size:1px_8px] max-sm:pb-[170px]"
>
	<header class="px-6 pt-[320px] max-sm:pt-[280px] sm:px-10">
		<h1 class="{REVEAL} text-2xl font-medium tracking-tight text-ink">Tools I reach for</h1>
		<p class="{REVEAL} mt-2 text-neutral-500" style="--d: 60ms">
			What shows up across my repos, web to mobile to AI.
		</p>
	</header>

	{#each toolGroups as group, gi}
		<section id={slug(group.category)} class="mt-14 scroll-mt-[88px] px-6 sm:px-10">
			<h2 class="{REVEAL} mb-[22px] text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
				{group.category}
			</h2>
			<div
				class="{REVEAL} grid grid-cols-1 gap-x-12 border-t border-dashed border-neutral-200 sm:grid-cols-2"
				style="--d: {60 + gi * 40}ms"
			>
				{#each group.tools as t}
					<div class="group flex items-start gap-4 border-b border-dashed border-neutral-200 py-5">
						<span
							class="grid size-11 flex-none place-items-center rounded-lg border border-neutral-200 bg-neutral-50 transition-transform duration-300 ease-(--ease-spring) group-hover:scale-105"
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
		</section>
	{/each}

	<CtaSection />
</div>
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
