<script lang="ts">
	import { projects } from '#lib/data/content.js';
</script>

<div class="px-6 pt-16 sm:px-10">
	<p class="text-xs tracking-[0.18em] text-muted uppercase">Selected Work</p>
	<div class="mt-6 flex flex-col gap-10">
		{#each projects as p}
			<a href={p.link} target="_blank" rel="noreferrer" class="group block">
				<div class="overflow-hidden rounded-2xl border border-black/6 bg-card">
					<img
						src={p.image}
						alt={p.name}
						loading="lazy"
						class="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-mn group-hover:scale-[1.02]"
					/>
				</div>
				<div class="mt-3 flex items-baseline justify-between gap-3">
					<p class="font-semibold">
						{p.name}
						<span
							class="ml-1 inline-block text-accent opacity-0 transition-all duration-[400ms] ease-mn group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
							>↗</span
						>
					</p>
					<p class="shrink-0 text-[11px] tracking-wide text-muted uppercase">{p.meta}</p>
				</div>
				<p class="mt-1 text-sm leading-6 text-soft">{p.description}</p>
			</a>
		{/each}
	</div>
</div>
