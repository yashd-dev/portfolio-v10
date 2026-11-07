<script lang="ts">
	import { page } from '$app/state';
	import CaseIsland from '#lib/case/caseIsland.svelte';
	import type { CaseMeta } from '#lib/case/CaseStudy.js';
	import type { ComponentType } from 'react';

	let { data } = $props();

	const mods = import.meta.glob('/src/lib/case/content/*.mdx', { eager: true }) as Record<
		string,
		{ default: ComponentType; meta: CaseMeta }
	>;

	let mod = $derived(mods[`/src/lib/case/content/${page.params.slug}.mdx`]);
</script>

<svelte:head>
	{#if mod}
		<title>{mod.meta.title} - Yash Deshpande</title>
		<meta name="description" content={mod.meta.subtitle} />
		<meta property="og:title" content="{mod.meta.title} - Yash Deshpande" />
		<meta property="og:description" content={mod.meta.subtitle} />
		<meta property="og:image" content={mod.meta.hero} />
	{:else}
		<title>Case study not found - Yash Deshpande</title>
	{/if}
</svelte:head>

{#if mod}
	<CaseIsland content={mod.default} meta={mod.meta} html={data.html} />
{:else}
	<main class="mx-auto max-w-3xl px-6 pt-[320px]">
		<h1 class="text-2xl font-medium tracking-tight text-ink">Case study not found</h1>
		<p class="mt-2 text-soft">
			<a href="/#work" class="text-[#2667ff] underline">Back to selected work</a>
		</p>
	</main>
{/if}
