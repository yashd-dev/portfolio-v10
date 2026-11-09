<script lang="ts">
	import { REVEAL } from '#lib/reveal.js';
	import SiteFooter from '#lib/components/siteFooter.svelte';
	import { formatBlogDate, type BlogMeta } from '#lib/blog/BlogPost.js';

	const mods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
		string,
		{ meta: BlogMeta }
	>;

	const posts = Object.entries(mods)
		.map(([path, m]) => ({
			slug: path
				.split('/')
				.pop()!
				.replace(/\.mdx$/, ''),
			...m.meta
		}))
		.filter((p) => !p.draft)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
</script>

<svelte:head>
	<title>Blog - Yash Deshpande</title>
	<meta name="description" content="Technical writing by Yash Deshpande." />
</svelte:head>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[520px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_35%,transparent_68%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>
<main id="posts" class="mx-auto max-w-[880px] px-5 pt-[320px] pb-40 max-sm:pt-[236px] sm:px-8">
	<h1 class="{REVEAL} text-[16px] leading-normal font-medium">
		Writing about things I build.
	</h1>

	{#if posts.length > 0}
		<div class="{REVEAL} mt-10 border-t border-rule" style="--d: 60ms">
			{#each posts as p}
				<a
					href="/blog/{p.slug}"
					class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[18px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent"
					data-cursor="Read"
				>
					<div>
						<span class="text-[15px] font-medium">{p.title}</span>
						<p class="mt-0.5 text-soft">{p.summary}</p>
					</div>
					<span class="shrink-0 text-[11px] text-muted">{formatBlogDate(p.date)}</span>
				</a>
			{/each}
		</div>
	{:else}
		<p class="{REVEAL} mt-8 text-[15px] text-soft" style="--d: 60ms">
			The first post is being written. It's a technical deep-dive into one of my side projects.
		</p>
	{/if}
	<SiteFooter />
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
