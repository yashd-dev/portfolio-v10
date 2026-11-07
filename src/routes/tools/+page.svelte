<script lang="ts">
	import { toolGroups } from '#lib/data/icons.js';

	const slug = (c: string) =>
		c
			.toLowerCase()
			.replace(/[^a-z]+/g, '-')
			.replace(/(^-|-$)/g, '');
	import { REVEAL } from '#lib/reveal.js';
</script>

<div
	class="relative mx-auto w-full max-w-6xl pb-40 before:pointer-events-none before:absolute before:top-24 before:bottom-0 before:left-0 before:-z-10 before:w-px before:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] before:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] before:[background-size:1px_8px] after:pointer-events-none after:absolute after:top-24 after:right-0 after:bottom-0 after:-z-10 after:w-px after:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] after:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] after:[background-size:1px_8px]"
>
	<header class="px-6 pt-28 sm:px-10">
		<h1 class="{REVEAL} text-2xl font-normal tracking-tight text-neutral-700">Tools I reach for</h1>
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
								viewBox="0 0 24 24"
								class="size-5 opacity-60 grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0"
								style="fill: {t.color}"
								role="img"
								aria-label={t.name}><path d={t.path} /></svg
							>
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
</div>
