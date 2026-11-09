<script lang="ts">
	import { REVEAL } from '#lib/reveal.js';
	import { formatBlogDate, type BlogMeta } from '#lib/blog/BlogPost.js';

	const mods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
		string,
		{ meta: BlogMeta }
	>;

	const posts = Object.entries(mods)
		.map(([path, m]) => ({ slug: path.split('/').pop()!.replace(/\.mdx$/, ''), ...m.meta }))
		.filter((p) => !p.draft)
		.sort((a, b) => (a.date < b.date ? 1 : -1));
</script>

<svelte:head>
	<title>Blog - Yash Deshpande</title>
	<meta name="description" content="Technical writing by Yash Deshpande." />
</svelte:head>

<main id="posts" class="mx-auto max-w-[960px] px-5 pt-36 pb-40 sm:px-8 max-sm:pt-28">
	<h1 class="{REVEAL} text-[32px] font-medium tracking-tight text-ink max-sm:text-[26px]">
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
</main>
