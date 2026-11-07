<script lang="ts">
	import { intro, socials, email } from '#lib/data/content.js';

	let copied = $state(false);

	async function copyEmail() {
		await navigator.clipboard.writeText(email);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}
</script>

<div class="px-6 sm:px-10">
	<img
		src="/avatar.jpg"
		alt="Yash Deshpande"
		class="h-16 w-16 rounded-xl object-cover shadow-sm ring-1 ring-black/5"
	/>
	<h1 class="mt-5 font-display text-[28px] font-normal tracking-[-0.01em]">
		Hey, I'm Yash Deshpande
	</h1>
	<p class="mt-1 text-muted">A designer & developer based in Mumbai</p>

	<p class="mt-6 text-[17px] leading-7 text-soft">{intro}</p>
	<p class="mt-4 text-[17px] leading-7 text-soft">
		Right now that's storefronts like
		<a href="https://mypaithani.com/" target="_blank" rel="noreferrer" class="text-ink"
			><mark class="bg-hlblue px-0.5">MyPaithani</mark></a
		>
		and sites like
		<a href="https://therapywithkinnari.com/" target="_blank" rel="noreferrer" class="text-ink"
			><mark class="bg-hlgreen px-0.5">Therapy With Kinnari</mark></a
		>, with production <mark class="bg-hlpeach px-0.5">TypeScript</mark> across SvelteKit, headless Shopify
		and the odd microservice.
	</p>

	<div class="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
		{#each socials as s, i}
			{#if i > 0}<span class="text-faint">·</span>{/if}
			<a href={s.href} target="_blank" rel="noreferrer" class="transition-colors hover:text-ink"
				>{s.label}</a
			>
		{/each}
		<span class="text-faint">·</span>
		<button onclick={copyEmail} class="transition-colors hover:text-ink">
			{copied ? 'copied!' : email}
		</button>
	</div>
</div>
