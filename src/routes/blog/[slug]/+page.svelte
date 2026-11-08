<script lang="ts">
	import { page } from '$app/state';
	import BlogIsland from '#lib/blog/blogIsland.svelte';
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
	</div>
{:else}
	<main class="mx-auto max-w-3xl px-6 pt-[320px]">
		<h1 class="text-2xl font-medium tracking-tight text-ink">Post not found</h1>
		<p class="mt-2 text-soft">
			<a href="/blog" class="text-[#2667ff] underline">Back to the blog</a>
		</p>
	</main>
{/if}
