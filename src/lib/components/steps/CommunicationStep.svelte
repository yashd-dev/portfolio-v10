<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

	type Msg = {
		id: string;
		mine: boolean;
		name: string;
		time: string;
		body: string;
	};

	const initial: Msg[] = [
		{
			id: '1',
			mine: false,
			name: 'Client',
			time: '9:41 AM',
			body: 'Morning, can we soften the hero animation a bit? Feels fast on mobile.'
		},
		{
			id: '2',
			mine: true,
			name: 'Yash',
			time: '9:42 AM',
			body: 'Done, eased the timing and added a small delay on enter so it lands softer. Sharing a preview link in a sec.'
		},
		{ id: '3', mine: false, name: 'Client', time: '9:46 AM', body: 'Got it, checking on my phone now.' }
	];

	let messages = $state<Msg[]>(initial);
	let draft = $state('');
	let scroller: HTMLDivElement;

	function formatTime(d: Date) {
		return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
	}

	function send() {
		const text = draft.trim();
		if (!text) return;
		const now = new Date();
		messages = [
			...messages,
			{ id: `u-${now.getTime()}`, mine: true, name: 'You', time: formatTime(now), body: text },
			{
				id: `r-${now.getTime()}`,
				mine: false,
				name: 'Client',
				time: formatTime(now),
				body: 'This is just a preview, not a live chat. On a real project this is how quick the loop feels.'
			}
		];
		draft = '';
		requestAnimationFrame(() => scroller?.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' }));
	}
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1 bg-neutral-50 px-4 py-6 shadow-[0px_0px_14px_0px_var(--color-neutral-200)_inset] md:px-8 md:py-8">
		<div
			class="relative z-20 flex h-96 w-full items-stretch justify-center overflow-hidden rounded-xl bg-white shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
		>
			<div class="flex h-full min-h-0 w-full flex-col bg-[#fafafa] text-[13px] leading-relaxed">
				<div class="flex shrink-0 items-center justify-between border-b border-neutral-200/90 bg-white px-3 py-2.5">
					<span class="truncate font-semibold text-neutral-800"><span class="text-neutral-400">#</span>daily-updates</span>
					<span class="rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500">Interactive demo</span>
				</div>
				<div class="relative flex min-h-0 flex-1 flex-col">
					<div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-[#fafafa] to-transparent"></div>
					<div bind:this={scroller} class="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 py-4 [scrollbar-width:none]">
						<div class="mb-4 flex justify-center">
							<span class="rounded-full bg-neutral-200/80 px-3 py-1 text-[10px] font-medium text-neutral-500">Today</span>
						</div>
						{#each messages as m, i (m.id)}
							<div
								class="mb-4 flex gap-2 {m.mine ? 'flex-row-reverse' : 'flex-row'}"
								in:fly={{ y: 10, duration: 500, delay: Math.min(i * 60, 400), easing: quartOut }}
							>
								{#if m.mine}
									<img src="/avatar.jpg" alt="" class="size-8 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-sky-200/80" />
								{:else}
									<div class="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-200 text-[11px] font-semibold text-neutral-600 shadow-sm ring-1 ring-neutral-200/90">C</div>
								{/if}
								<div class="flex max-w-[85%] min-w-0 flex-col {m.mine ? 'items-end' : 'items-start'}">
									<div class="mb-1 flex items-baseline gap-2 px-0.5 {m.mine ? 'flex-row-reverse' : 'flex-row'}">
										<span class="text-[11px] font-semibold text-neutral-700">{m.name}</span>
										<span class="text-[10px] text-neutral-400 tabular-nums">{m.time}</span>
									</div>
									<div
										class="relative max-w-full rounded-[1.15rem] px-3.5 py-2.5 shadow-sm ring-1 {m.mine
											? 'rounded-tr-md bg-gradient-to-b from-sky-500 to-sky-600 text-white ring-sky-600/20'
											: 'rounded-tl-md bg-white text-neutral-800 ring-neutral-200/80'}"
									>
										{m.body}
									</div>
								</div>
							</div>
						{/each}
					</div>
					<div class="shrink-0 border-t border-neutral-200/80 bg-white/95 px-2 py-2 backdrop-blur-sm">
						<form
							onsubmit={(e) => {
								e.preventDefault();
								send();
							}}
							class="flex items-center gap-2 rounded-lg border border-neutral-200/90 bg-neutral-50 px-2 py-1.5"
						>
							<input
								bind:value={draft}
								placeholder="Message #daily-updates"
								autocomplete="off"
								class="min-w-0 flex-1 bg-transparent text-[13px] text-neutral-800 outline-none placeholder:text-neutral-400"
								aria-label="Message daily-updates"
							/>
							<button
								type="submit"
								disabled={!draft.trim()}
								aria-label="Send message"
								class="flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-500 transition-colors duration-200 hover:bg-neutral-200/80 hover:text-neutral-700 disabled:pointer-events-none disabled:opacity-40"
							>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-4"><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></svg>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
