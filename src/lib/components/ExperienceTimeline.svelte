<script lang="ts">
	import { onMount } from 'svelte';
	import { experience } from '#lib/data/content.js';

	let section: HTMLElement;
	let progress = $state(0);

	onMount(() => {
		let raf = 0;
		const update = () => {
			const r = section.getBoundingClientRect();
			progress = Math.min(1, Math.max(0, (innerHeight * 0.65 - r.top) / r.height));
		};
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(update);
		};
		update();
		addEventListener('scroll', onScroll, { passive: true });
		return () => {
			removeEventListener('scroll', onScroll);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div class="px-6 pt-16 sm:px-10" bind:this={section}>
	<p class="text-xs tracking-[0.18em] text-muted uppercase">Experience</p>
	<p class="mt-1 text-xs tracking-[0.18em] text-accent uppercase">Sail plan</p>
	<div class="relative mt-6">
		<div class="absolute top-0 bottom-0 left-[7px] border-l border-dashed border-ink/20"></div>
		<svg
			viewBox="0 0 16 14"
			class="absolute -left-[1px] h-5 w-5 transition-none"
			style="top: calc({progress} * (100% - 24px))"
			aria-hidden="true"
		>
			<rect x="7" y="0" width="2" height="9" fill="#151515" />
			<rect x="9" y="1" width="2" height="1" fill="#266c9c" />
			<rect x="9" y="2" width="3" height="1" fill="#266c9c" />
			<rect x="9" y="3" width="4" height="1" fill="#266c9c" />
			<rect x="9" y="4" width="5" height="1" fill="#266c9c" />
			<rect x="9" y="5" width="6" height="1" fill="#266c9c" />
			<rect x="5" y="3" width="2" height="1" fill="#6ba3c6" />
			<rect x="4" y="4" width="3" height="1" fill="#6ba3c6" />
			<rect x="3" y="5" width="4" height="1" fill="#6ba3c6" />
			<rect x="2" y="9" width="12" height="1" fill="#d65442" />
			<rect x="4" y="10" width="8" height="1" fill="#d65442" />
		</svg>
		<ol class="flex flex-col gap-8">
			{#each experience as e}
				<li class="relative pl-8">
					<span
						class="absolute top-1.5 left-[3px] h-[9px] w-[9px] rounded-full bg-white ring-2 ring-accent"
					></span>
					<div class="flex items-baseline justify-between gap-3">
						<p class="font-semibold">
							{#if e.link}
								<a href={e.link} target="_blank" rel="noreferrer" class="hover:underline">{e.org}</a
								>
							{:else}
								{e.org}
							{/if}
						</p>
						{#if e.span}
							<p class="shrink-0 text-[11px] tracking-wide text-muted uppercase">
								{e.span}
							</p>
						{/if}
					</div>
					<p class="mt-0.5 text-xs tracking-wide text-muted uppercase">
						{e.role} · {e.place}
					</p>
					{#if e.note}
						<p class="mt-1 text-sm leading-6 text-soft">{e.note}</p>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</div>
