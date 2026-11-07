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

<div class="relative">
	<p class="mb-3.5 pl-[30px] text-[10px] uppercase tracking-[0.1em] text-sea" aria-hidden="true">The voyage</p>
	<ol bind:this={list} class="relative m-0 list-none p-0 pl-[30px]" style="--fp-p: {progress}">
		<span
			class="absolute top-0 bottom-0 left-[5px] w-px [background-image:linear-gradient(to_bottom,var(--color-faint)_50%,transparent_50%)] [background-size:1px_6px]"
			aria-hidden="true"
		></span>
		<span
			class="absolute top-0 left-[5px] -ml-[0.25px] w-[1.5px] bg-sea shadow-[0_0_6px_#6ba3c64d]"
			style="height: calc(var(--fp-p) * 100%)"
			aria-hidden="true"
		></span>
		<span
			class="absolute top-0 left-[-3px] grid size-[17px] -translate-y-1/2 place-items-center bg-white text-sea will-change-[top]"
			style="top: calc(var(--fp-p) * 100%)"
			aria-hidden="true"
		>
			<svg class="h-[11px] w-[16px]" viewBox="0 0 24 20" fill="none">
					<path d="M2.5 9.5 12 2.5 21.5 9.5ZM3.5 12.5 20.5 12.5 17 17.5 7 17.5Z" fill="currentColor" />
				</svg>
		</span>
		{#each experience as stop, i}
			{@const isReached = i < reached}
			<li class="fp-stop relative pb-[34px] last:pb-1">
				<span
					class="absolute top-2 left-[-28px] size-[7px] rounded-full transition-[box-shadow,background-color,transform] duration-300 ease-(--ease-mn) {isReached
						? 'scale-115 bg-sea shadow-[inset_0_0_0_1.5px_var(--color-sea)]'
						: 'bg-white shadow-[inset_0_0_0_1.5px_var(--color-faint)]'}"
					aria-hidden="true"
				></span>
				<div class="flex items-baseline justify-between gap-3">
					{#if stop.link}
						<a class="font-medium transition-colors duration-200 hover:text-sea" href={stop.link} target="_blank" rel="noopener noreferrer">{stop.org}</a>
					{:else}
						<span class="font-medium">{stop.org}</span>
					{/if}
					<span class="text-[11px] whitespace-nowrap text-muted">{stop.span}</span>
				</div>
				<p class="m-0 text-[14px] text-muted">
					{stop.role} <span class="text-[11px] whitespace-nowrap">· {stop.place}</span>
				</p>
				{#if stop.note}
					<p class="mt-1 text-[14px] leading-[1.6] text-soft">{stop.note}</p>
				{/if}
			</li>
		{/each}
	</ol>
</div>
