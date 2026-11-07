<script lang="ts">
	import { onMount } from 'svelte';
	import { experience } from '#lib/data/content.js';

	let list: HTMLOListElement;
	let progress = $state(0);
	let reached = $state(0);

	onMount(() => {
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			progress = 1;
			reached = experience.length;
			return;
		}
		let raf = 0;
		const measure = () => {
			raf = 0;
			const rect = list.getBoundingClientRect();
			const trigger = innerHeight * 0.6;
			const u = Math.min(1, Math.max(0, (trigger - rect.top) / rect.height));
			progress = u;
			let count = 0;
			list.querySelectorAll('.fp-stop').forEach((stop) => {
				if (stop.getBoundingClientRect().top - rect.top + 10 <= u * rect.height + 1) count += 1;
			});
			reached = count;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		raf = requestAnimationFrame(measure);
		addEventListener('scroll', onScroll, { passive: true });
		addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('scroll', onScroll);
			removeEventListener('resize', onScroll);
		};
	});
</script>

<div class="fp">
	<p class="fp-label" aria-hidden="true">Flight plan</p>
	<ol bind:this={list} class="fp-list" style="--fp-p: {progress}">
		<span class="fp-rail" aria-hidden="true"></span>
		<span class="fp-lit" aria-hidden="true"></span>
		<span class="fp-head" aria-hidden="true">
			<svg class="fp-plane" viewBox="0 0 16 15" fill="none">
				<path
					d="M8 0c.73 0 1.32 1.05 1.32 2.35v2.2l6.13 3.54c.25.14.4.4.4.69v1.1a.44.44 0 0 1-.56.42L9.32 8.5v3.06l1.9 1.33c.15.11.24.28.24.47v.79a.44.44 0 0 1-.56.42L8 13.79l-2.9.78a.44.44 0 0 1-.56-.42v-.79c0-.19.09-.36.24-.47l1.9-1.33V8.5L.71 10.3a.44.44 0 0 1-.56-.42v-1.1c0-.29.15-.55.4-.69l6.13-3.54v-2.2C6.68 1.05 7.27 0 8 0Z"
					fill="currentColor"
				/>
			</svg>
		</span>
		{#each experience as stop, i}
			<li class="fp-stop" class:is-reached={i < reached}>
				<span class="fp-dot" aria-hidden="true"></span>
				<div class="fp-row">
					{#if stop.link}
						<a class="fp-company" href={stop.link} target="_blank" rel="noopener noreferrer">{stop.org}</a>
					{:else}
						<span class="fp-company">{stop.org}</span>
					{/if}
					<span class="fp-dates">{stop.span}</span>
				</div>
				<p class="fp-role">
					{stop.role} <span class="fp-code">· {stop.place}</span>
				</p>
				{#if stop.note}
					<p class="fp-note">{stop.note}</p>
				{/if}
			</li>
		{/each}
	</ol>
</div>
