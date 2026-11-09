<script lang="ts">
	import { page } from '$app/state';
	import { REVEAL } from '#lib/reveal.js';

	const isPlay = $derived(page.url.pathname === '/play');
</script>

<footer class="{REVEAL} mt-28 pb-[220px] text-[14px] max-sm:pb-[170px]">
	<p class="font-medium">Thanks for stopping by.</p>
	{#if isPlay}
		<p class="mt-3 text-soft">Won a round yet? Didn't think so.</p>
	{:else}
		<p class="mt-3 text-soft">
			Bored of the site?
			<a
				href="/play"
				class="font-medium text-ink underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
				data-cursor="Play">Play a round</a
			>.
		</p>
	{/if}
	<p class="mt-1 text-muted">
		<a
			href="/process"
			class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
			>How I work</a
		>
		·
		<a
			href="/tools"
			class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
			>Tools</a
		>
		· © 2026
	</p>
</footer>
