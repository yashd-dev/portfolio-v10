<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, scroll } from 'motion';
	import { experience } from '#lib/data/content.js';

	let list: HTMLOListElement;
	let reached = $state(0);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			list.style.setProperty('--fp-p', '1');
			reached = experience.length;
			return;
		}
		const stops = [...list.querySelectorAll('.fp-stop')];
		const stopLine = scroll(animate(list, { '--fp-p': [0, 1] }, { ease: 'linear' }), {
			target: list,
			offset: ['start 0.6', 'end 0.6']
		});
		const stopDots = scroll(
			(p) => {
				const rect = list.getBoundingClientRect();
				let count = 0;
				stops.forEach((s) => {
					if (s.getBoundingClientRect().top - rect.top + 10 <= p * rect.height + 1) count += 1;
				});
				reached = count;
			},
			{ target: list, offset: ['start 0.6', 'end 0.6'] }
		);
		return () => {
			stopLine();
			stopDots();
		};
	});
</script>

<div class="relative">
	<ol bind:this={list} class="relative m-0 list-none p-0 pl-[30px]" style="--fp-p: 0">
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
					<path d="M10.8 4.5 10.8 9.5 4.5 9.5Z M13.2 2.5 13.2 9.5 20 9.5Z M11.4 2h1.2v10.8h-1.2Z M2 13 22 13 18.5 17.5 5.5 17.5Z" fill="currentColor" />
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
