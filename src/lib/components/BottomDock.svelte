<script lang="ts">
	import { dock } from '#lib/dock.svelte.js';

	const swatches = ['#2f5bea', '#0d9488', '#d65442'];
	const fonts = ['serif', 'sans'] as const;

	function cycleFont() {
		dock.font = fonts[(fonts.indexOf(dock.font) + 1) % fonts.length];
	}
</script>

<div
	class="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-black/8 bg-white/85 p-1.5 shadow-lg backdrop-blur-md"
>
	<button
		onclick={cycleFont}
		class="flex h-8 items-center rounded-full px-3 text-xs text-soft transition-colors duration-200 hover:bg-card"
	>
		{dock.font}
	</button>
	<span class="h-5 w-px bg-black/10"></span>
	{#each swatches as s}
		<button
			onclick={() => (dock.accent = s)}
			aria-label="accent {s}"
			class="h-5 w-5 rounded-full transition-transform duration-300 ease-mn hover:scale-110 {dock.accent ===
			s
				? 'ring-2 ring-ink/60 ring-offset-2'
				: ''}"
			style="background: {s}"
		></button>
	{/each}
	<span class="h-5 w-px bg-black/10"></span>
	<button
		onclick={() => scrollTo({ top: 0, behavior: 'smooth' })}
		class="flex h-8 items-center gap-1 rounded-full px-3 text-xs text-soft transition-colors duration-200 hover:bg-card"
	>
		↑ Top
	</button>
</div>
