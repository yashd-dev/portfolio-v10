<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { services } from '#lib/data/services.js';
	import { REVEAL } from '#lib/reveal.js';

	const isPlay = $derived(page.url.pathname === '/play');

	interface Counter { multiplier: number; score: number | null; visitors: number | null }
	let counter = $state<Counter | null>(null);

	const loadCounter = async () => {
		try {
			const res = await fetch('/api/visitors');
			if (!res.ok) {return;}
			const data = (await res.json()) as Counter;
			if (typeof data.score === 'number') {counter = data;}
		} catch {
			counter = null;
		}
	};

	onMount(() => {
		loadCounter().catch(() => null);
	});
</script>

<footer class="{REVEAL} mt-28 pb-[220px] text-[14px] max-sm:pb-[170px]">
	<p class="font-medium">Thanks for stopping by.</p>
	{#if isPlay}
		<p class="mt-3 text-soft">Won a round yet? Didn't think so.</p>
	{:else}
		<p class="mt-3 text-soft">
			Bored of the site?
			<a
				href="/play"
				class="font-medium text-ink underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
				data-cursor="Play">Play a round</a
			>.
		</p>
	{/if}
	<div class="mt-10 mb-6">
		<p class="text-[13px] font-medium text-muted">Services</p>
		<div class="mt-3 flex max-w-[560px] flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted">
			{#each services as s}
				<a
					href="/services/{s.slug}"
					class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
					data-cursor={s.nav}>{s.nav}</a
				>
			{/each}
		</div>
	</div>
	<p class="mt-1 text-muted">
		<a
			href="/process"
			class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
			>How I work</a
		>
		·
		<a
			href="/tools"
			class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
			>Tools</a
		>
		· © 2026
	</p>
	{#if counter}
		<p class="mt-3 text-[13px] text-muted">
			Traffic score <span class="font-medium text-ink tabular-nums"
				>{counter.score?.toLocaleString('en-IN')}</span
			>
			<span class="block text-[12px]"
				>{counter.multiplier} × {counter.visitors?.toLocaleString('en-IN')} tracked visitors</span
			>
		</p>
	{/if}
</footer>
