import { browser } from '$app/environment';
import type { ComponentType } from 'react';
import type { CaseMeta } from '#lib/case/CaseStudy.js';

const mods = import.meta.glob('/src/lib/case/content/*.mdx', { eager: true }) as Record<
	string,
	{ default: ComponentType; meta: CaseMeta }
>;

export async function load({ params }) {
	const mod = mods[`/src/lib/case/content/${params.slug}.mdx`];
	if (!mod || browser) return { html: '' };
	const [{ renderToStaticMarkup }, { createElement }, { default: CaseStudy }] = await Promise.all([
		import('react-dom/server'),
		import('react'),
		import('#lib/case/CaseStudy.js')
	]);
	return {
		html: renderToStaticMarkup(createElement(CaseStudy, { meta: mod.meta, content: mod.default }))
	};
}
