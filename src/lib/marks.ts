import type { MarkDefinition } from './components/Mark.svelte';

export const highlightCalm: MarkDefinition = {
	name: 'highlight-calm',
	viewBox: '0 0 100 30',
	placement: { top: '3%', left: '-4%', width: '108%', height: '96%' },
	layer: 'behind',
	layers: [
		{
			type: 'fill',
			path: 'M1 6 C18 3 38 5 55 4 C72 3 89 5 99 7 L97 25 C78 27 61 25 43 27 C26 28 11 26 2 24 Z',
			opacity: 0.46,
			reveal: {
				path: 'M1 16 C24 13 48 16 72 14 C84 13 93 15 100 16',
				strokeWidth: 27
			},
			timing: { duration: 480 }
		}
	]
};
