import { browser } from '$app/environment';
import type { ComponentType } from 'react';
import type { BlogMeta } from '#lib/blog/BlogPost.js';

const mods = import.meta.glob('/src/lib/blog/content/*.mdx', { eager: true }) as Record<
	string,
	{ default: ComponentType; meta: BlogMeta }
>;

export async function load({ params }) {
	const mod = mods[`/src/lib/blog/content/${params.slug}.mdx`];
	if (!mod || browser) return { html: '' };
	const [{ renderToStaticMarkup }, { createElement }, { default: BlogPost }] = await Promise.all([
		import('react-dom/server'),
		import('react'),
		import('#lib/blog/BlogPost.js')
	]);
	return {
		html: renderToStaticMarkup(createElement(BlogPost, { meta: mod.meta, content: mod.default }))
	};
}
