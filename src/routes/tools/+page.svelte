<script lang="ts">
	import { toolIcons } from '#lib/data/icons.js';
</script>

<div class="relative z-10 mx-auto max-w-[720px] border-x border-neutral-200 bg-white px-6 pt-28 pb-32 sm:px-10">
	<h1 class="text-2xl font-normal tracking-tight text-neutral-700">Tools I reach for</h1>
	<p class="mt-2 text-neutral-500">The everyday stack behind the projects on the front page.</p>
	<div class="mt-10 grid grid-cols-2 border-t border-l border-neutral-200 sm:grid-cols-3">
		{#each toolIcons as t}
			<div
				class="group flex flex-col items-center gap-3 border-r border-b border-neutral-200 py-8 transition-colors duration-200 hover:bg-neutral-50"
			>
				<svg
					viewBox="0 0 24 24"
					class="h-8 w-8 fill-faint transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:fill-ink"
					role="img"
					aria-label={t.name}><path d={t.path} /></svg
				>
				<span class="text-sm text-muted transition-colors duration-200 group-hover:text-ink">{t.name}</span>
			</div>
		{/each}
	</div>
</div>
