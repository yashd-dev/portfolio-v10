<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quartOut } from 'svelte/easing';

	type Msg = {
		id: string;
		mine: boolean;
		time: string;
		body: string;
		link?: boolean;
	};

	const initial: Msg[] = [
		{
			id: '1',
			mine: false,
			time: '9:41 AM',
			body: 'Morning, can we soften the hero animation a bit? Feels fast on mobile.'
		},
		{
			id: '2',
			mine: true,
			time: '9:42 AM',
			body: 'Done, eased the timing and added a small delay on enter so it lands softer. Sharing a preview link in a sec.'
		},
		{ id: '3', mine: true, time: '9:43 AM', body: 'yashd.in', link: true },
		{ id: '4', mine: false, time: '9:46 AM', body: 'Got it, checking on my phone now.' }
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
			{ id: `u-${now.getTime()}`, mine: true, time: formatTime(now), body: text },
			{
				id: `r-${now.getTime()}`,
				mine: false,
				time: formatTime(now),
				body: 'This is just a preview, not a live chat. On a real project this is how quick the loop feels.'
			}
		];
		draft = '';
		requestAnimationFrame(() =>
			scroller?.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' })
		);
	}
</script>

<div class="flex h-full flex-col">
	<div
		class="relative min-h-0 flex-1 bg-[url(/clouds.webp)] bg-cover bg-center px-3 py-3 shadow-[0px_0px_14px_0px_var(--color-neutral-200)_inset] md:px-5 md:py-5"
	>
		<div
			class="relative z-20 flex h-full min-h-0 w-full items-stretch justify-center overflow-hidden rounded-xl bg-[#efeae2] shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
		>
			<div class="flex h-full min-h-0 w-full flex-col text-[13px] leading-snug">
				<div class="flex shrink-0 items-center gap-2.5 bg-[#f0f2f5] px-3 py-2">
					<div
						class="grid size-9 shrink-0 place-items-center rounded-full bg-[#dfe5e7] text-[14px] font-medium text-[#667781]"
						aria-hidden="true"
					>
						C
					</div>
					<div class="min-w-0 flex-1">
						<p class="truncate text-[13.5px] leading-tight font-medium text-[#111b21]">Client</p>
						<p class="text-[11px] leading-tight text-[#667781]">online</p>
					</div>
					<span
						class="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 ring-1 ring-neutral-200/80"
						>Interactive demo</span
					>
				</div>
				<div class="relative flex min-h-0 flex-1 flex-col">
					<div
						bind:this={scroller}
						class="flex min-h-0 flex-1 [scrollbar-width:none] flex-col overflow-y-auto px-3 py-3"
					>
						<div class="mb-3 flex justify-center">
							<span
								class="rounded-md bg-white px-2.5 py-1 text-[10px] font-medium text-[#667781] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]"
								>Today</span
							>
						</div>
						{#each messages as m, i (m.id)}
							<div
								class="mb-1.5 flex {m.mine ? 'justify-end' : 'justify-start'}"
								in:fly={{ y: 8, duration: 280, delay: Math.min(i * 90, 360), easing: quartOut }}
							>
								<div
									class="relative max-w-[80%] rounded-lg px-2.5 pt-1.5 pb-[18px] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] {m.mine
										? 'rounded-tr-none bg-[#d9fdd3]'
										: 'rounded-tl-none bg-white'}"
								>
									<p class="pr-11 text-[13px] {m.link ? 'text-[#027eb5]' : 'text-[#111b21]'}">
										{#if m.link}
											<a
												href="https://yashd.in"
												target="_blank"
												rel="noopener noreferrer"
												class="underline decoration-[#027eb5]/40 underline-offset-2">{m.body}</a
											>
										{:else}
											{m.body}
										{/if}
									</p>
									<span
										class="absolute right-1.5 bottom-1 flex items-center gap-1 text-[10px] text-[#667781] tabular-nums"
									>
										{m.time}
										{#if m.mine}
											<svg viewBox="0 0 18 12" class="size-3.5" fill="none" aria-hidden="true">
												<path
													d="m10.6 11-4.35-5.1 1.05-1L11.9 9.6l4.9-5.75 1.05 1L10.6 11Z"
													fill="#53bdeb"
													transform="translate(-4 0) scale(0.86)"
												/>
												<path
													d="m10.6 11-4.35-5.1 1.05-1L11.9 9.6l4.9-5.75 1.05 1L10.6 11Z"
													fill="#53bdeb"
													transform="translate(0.5 0) scale(0.86)"
												/>
											</svg>
										{/if}
									</span>
								</div>
							</div>
						{/each}
					</div>
					<div class="shrink-0 bg-[#f0f2f5] px-2.5 py-2">
						<form
							onsubmit={(e) => {
								e.preventDefault();
								send();
							}}
							class="flex items-center gap-2"
						>
							<input
								bind:value={draft}
								placeholder="Message"
								autocomplete="off"
								class="min-w-0 flex-1 rounded-full bg-white px-4 py-2 text-[13.5px] text-[#111b21] outline-none placeholder:text-[#667781]"
								aria-label="Type a message"
							/>
							<button
								type="submit"
								disabled={!draft.trim()}
								aria-label="Send message"
								class="grid size-10 shrink-0 place-items-center rounded-full bg-[#00a884] text-white transition-opacity duration-200 hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
							>
								<svg viewBox="0 0 24 24" class="size-5" fill="currentColor" aria-hidden="true">
									<path d="M3.4 20.4 21.85 12 3.4 3.6l-.01 6.53L14 12 3.39 13.87l.01 6.53Z" />
								</svg>
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
