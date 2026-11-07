<script lang="ts">
	import { email } from '#lib/data/content.js';

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {}
	}

	function toTop() {
		const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
		if (lenis) lenis.scrollTo(0, { duration: 1.2 });
		else window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const icon =
		'inline-flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full bg-black/[0.035] text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-black/[0.08]';
</script>

<div class="fixed bottom-[18px] left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2.5" role="region" aria-label="Quick links">
	<div class="flex animate-gd-rise items-center gap-1 rounded-full bg-white/78 px-1.5 py-[5px] shadow-[0_0_0_1px_var(--color-rule),0_12px_36px_#0000001f] backdrop-blur-[16px] backdrop-saturate-150">
		<a class="grid h-[42px] w-[52px] place-items-center overflow-hidden rounded-full bg-card transition-transform duration-[400ms] ease-(--ease-spring) hover:scale-[1.08] hover:-rotate-4" href="/process" aria-label="How I work" data-cursor="How I work">
			<img src="/avatar.jpg" alt="" class="block h-full w-full object-cover object-[50%_28%]" />
		</a>
		<span class="mx-1 h-[22px] w-px bg-rule" aria-hidden="true"></span>
		<a class="inline-flex h-[38px] min-w-[38px] items-center justify-center rounded-full bg-black/[0.035] px-2.5 text-[13px] font-medium text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-black/[0.08]" href="/process" aria-label="How I work" data-cursor="How I work">Process</a>
		<a class={icon} href="/play" aria-label="Play" data-cursor="Play">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[17px]"><path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5Z" /></svg>
		</a>
		<button type="button" class={icon} aria-label="Copy email" data-cursor="Copy email" onclick={copyEmail}>
			{#if copied}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[17px]"><path d="M20 6 9 17l-5-5" /></svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[17px]"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></svg>
			{/if}
		</button>
		<a class={icon} href="https://github.com/yashd-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-cursor="GitHub ↗">
			<svg viewBox="0 0 24 24" fill="currentColor" class="size-[17px]"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.32-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" /></svg>
		</a>
		<a class={icon} href="https://www.linkedin.com/in/yashd-dev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-cursor="LinkedIn ↗">
			<svg viewBox="0 0 24 24" fill="currentColor" class="size-[17px]"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>
		</a>
		<span class="mx-1 h-[22px] w-px bg-rule" aria-hidden="true"></span>
		<button type="button" class="inline-flex h-[38px] min-w-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-full bg-black/[0.035] px-2.5 text-[13px] font-medium text-ink transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-black/[0.08]" onclick={toTop} data-cursor="Back to top">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="size-[17px]"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
			Top
		</button>
	</div>
</div>
