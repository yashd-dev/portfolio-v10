<script lang="ts">
	import { page } from '$app/state';
	import BlogIsland from '#lib/blog/blogIsland.svelte';
	import SiteFooter from '#lib/components/siteFooter.svelte';
	import type { BlogMeta } from '#lib/blog/BlogPost.js';
	import type { ComponentType } from 'react';

	let { data } = $props();

	const mods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
		string,
		{ default: ComponentType; meta: BlogMeta }
	>;

	let mod = $derived(mods[`/src/lib/blog/content/${page.params.slug}.mdx`]);
</script>

<svelte:head>
	{#if mod}
		<title>{mod.meta.title} - Yash Deshpande</title>
		<meta name="description" content={mod.meta.summary} />
		<meta property="og:title" content="{mod.meta.title} - Yash Deshpande" />
		<meta property="og:description" content={mod.meta.summary} />
	{:else}
		<title>Post not found - Yash Deshpande</title>
	{/if}
</svelte:head>

{#if mod}
	<div id="posts">
		<BlogIsland content={mod.default} meta={mod.meta} html={data.html} />
		<div class="mx-auto max-w-[680px] px-5">
			<SiteFooter />
		</div>
	</div>
{:else}
	<main class="mx-auto max-w-3xl px-6 pt-[320px]">
		<h1 class="text-2xl font-medium tracking-tight text-ink">Post not found</h1>
		<p class="mt-2 text-soft">
			<a href="/blog" class="text-[#2667ff] underline">Back to the blog</a>
		</p>
	</main>
{/if}
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_35%,transparent_68%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
