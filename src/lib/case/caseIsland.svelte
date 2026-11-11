<script lang="ts">
	import { onMount } from 'svelte';
	import type { ComponentType } from 'react';
	import type { CaseMeta } from './CaseStudy.js';

	let { content, meta, html }: { content: ComponentType; meta: CaseMeta; html: string } = $props();
	let host: HTMLDivElement;

	onMount(() => {
		let root: import('react-dom/client').Root | null = null;
		let cancelled = false;
		(async () => {
			const [{ createRoot, hydrateRoot }, { createElement, StrictMode }, { default: CaseStudy }] =
				await Promise.all([import('react-dom/client'), import('react'), import('./CaseStudy.js')]);
			if (cancelled || !host) {return;}
			const tree = createElement(StrictMode, null, createElement(CaseStudy, { content, meta }));
			if (host.firstChild) {
				root = hydrateRoot(host, tree);
			} else {
				root = createRoot(host);
				root.render(tree);
			}
		})();
		return () => {
			cancelled = true;
			root?.unmount();
		};
	});
</script>

<div bind:this={host}>{@html html}</div>
