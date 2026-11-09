<script lang="ts">
	import { faqGroups } from '#lib/data/faqs.js';
	import { REVEAL } from '#lib/reveal.js';
</script>

<div class="px-6 sm:px-10">
	<p
		class="{REVEAL} mt-24 mb-[22px] text-sm font-medium text-muted"
	>
		Questions, answered
	</p>
	<div class="{REVEAL} border-t border-dashed border-neutral-200">
		{#each faqGroups as group, gi}
			<section
				class="grid gap-6 border-b border-dashed border-neutral-200 py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12"
			>
				<div>
					<p class="text-[11px] text-faint tabular-nums">{String(gi + 1).padStart(2, '0')}</p>
					<h3 class="mt-1.5 text-[18px] leading-snug font-medium text-ink">{group.title}</h3>
				</div>
				<div class="divide-y divide-neutral-200/60">
					{#each group.items as item}
						<details class="group py-4 first:pt-0 last:pb-0">
							<summary
								class="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium text-neutral-700 [&::-webkit-details-marker]:hidden"
							>
								<span>{item.question}</span>
								<span
									class="mt-0.5 shrink-0 leading-none text-muted transition-transform duration-300 group-open:rotate-45"
									>+</span
								>
							</summary>
							<p class="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-soft">{item.answer}</p>
						</details>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
