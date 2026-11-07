<script lang="ts">
	import { onMount } from 'svelte';
	import { springMotion } from '#lib/spring.js';

	let container: HTMLDivElement;
	let c1: HTMLDivElement;
	let c2: HTMLDivElement;
	let c3: HTMLDivElement;
	let cursor: HTMLDivElement;
	let tooltip: HTMLDivElement;

	const pages = ['Home', 'Work', 'Experience', 'Play', 'Case Studies'];

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let cancelled = false;
		const glide = {
			duration: 550,
			easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
			fill: 'forwards' as FillMode
		};
		const sp = springMotion(380, 28, 1);
		const spring = { duration: sp.duration, easing: sp.easing, fill: 'forwards' as FillMode };
		const center = (el: HTMLDivElement) => {
			const r = el.getBoundingClientRect();
			const c = container.getBoundingClientRect();
			return { x: r.left - c.left + r.width / 2, y: r.top - c.top + r.height / 2 };
		};
		const move = (p: { x: number; y: number }, opts: KeyframeAnimationOptions) =>
			cursor
				.animate(
					[
						{ transform: cursor.style.transform || 'translate(0px, 0px)' },
						{ transform: `translate(${p.x}px, ${p.y}px)` }
					],
					opts
				)
				.finished.then(() => {
					cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
				});
		const tip = (o: number, dur: number) =>
			tooltip.animate([{ opacity: o }], { duration: dur, fill: 'forwards' }).finished;
		const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
		(async () => {
			while (!cancelled) {
				const p1 = center(c1);
				cursor.style.transform = `translate(${p1.x - 44}px, ${Math.max(8, p1.y - 36)}px)`;
				tooltip.style.opacity = '0';
				await move(p1, glide);
				if (cancelled) break;
				await tip(1, 280);
				await wait(1100);
				await tip(0, 150);
				if (cancelled) break;
				await move(center(c2), spring);
				if (cancelled) break;
				await tip(1, 260);
				await wait(1000);
				await tip(0, 150);
				if (cancelled) break;
				await move(center(c3), spring);
				if (cancelled) break;
				await tip(1, 260);
				await wait(1000);
				await tip(0, 220);
				await wait(400);
			}
		})();
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="flex h-full flex-col">
	<div
		class="relative flex-1 bg-neutral-50 px-4 py-6 shadow-[0px_0px_14px_0px_var(--color-neutral-200)_inset] md:px-8 md:py-8"
	>
		<div
			class="relative z-20 flex h-full min-h-96 w-full overflow-hidden rounded-xl bg-neutral-100 shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
		>
			<div class="hidden h-full w-20 bg-white sm:block">
				<div class="flex items-center justify-between p-2">
					<svg
						viewBox="0 0 24 24"
						class="size-3 text-neutral-500"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><path
							d="M12 2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4M12 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"
						/></svg
					>
					<svg
						viewBox="0 0 24 24"
						class="size-3 text-neutral-500"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg
					>
				</div>
				<p class="px-2 text-[8px] font-medium text-neutral-700">Portfolio v10</p>
				<p class="mt-1 flex items-center gap-1 px-2 text-[8px] font-medium text-neutral-500">
					Drafts <span
						class="rounded-md border border-neutral-400 bg-neutral-200 px-1 text-[6px] text-neutral-600"
						>Pro</span
					>
				</p>
				<hr class="my-1 text-neutral-200" />
				<p class="px-2 text-[8px] font-medium text-neutral-500">Pages</p>
				<div class="mt-1 flex flex-col gap-1 px-2">
					{#each pages as page}
						<div class="flex items-center gap-1">
							<svg
								viewBox="0 0 24 24"
								class="size-2 text-neutral-500"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path
									d="M14 2v6h6"
								/></svg
							>
							<p class="text-[8px] text-neutral-500">{page}</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="relative flex min-h-48 w-full flex-1 items-start justify-center p-2">
				<div
					bind:this={container}
					class="relative flex h-full min-h-44 w-full max-w-full items-start justify-center gap-1.5"
				>
					<div bind:this={cursor} class="pointer-events-none absolute top-0 left-0 z-30">
						<div class="relative">
							<svg
								viewBox="0 0 24 24"
								class="size-4 text-neutral-900 drop-shadow-md"
								fill="currentColor"><path d="M4 2l16 11.5-7.5 1L16 22l-2.5 1-3.5-7.5L4 19z" /></svg
							>
							<div
								bind:this={tooltip}
								class="absolute top-3 left-[14px] flex items-center gap-1 rounded-md bg-white py-0.5 pr-1.5 pl-0.5 opacity-0 shadow-md ring-1 ring-black/10"
							>
								<img
									src="/avatar.jpg"
									alt=""
									class="size-3.5 shrink-0 rounded object-cover ring-1 ring-neutral-200"
								/>
								<span class="text-[9px] font-medium text-neutral-800">Yash</span>
							</div>
						</div>
					</div>
					<div
						bind:this={c1}
						class="flex h-full min-w-0 flex-1 flex-col rounded-md bg-white p-1.5 shadow-sm ring-1 ring-black/5"
					>
						<div class="flex items-center justify-between gap-1">
							<div class="flex items-center gap-0.5">
								<div class="size-2 animate-pulse rounded-sm bg-neutral-300"></div>
								<div class="h-1 w-6 animate-pulse rounded bg-neutral-200"></div>
							</div>
							<div class="flex gap-0.5">
								<div class="h-1 w-4 animate-pulse rounded-full bg-neutral-100"></div>
								<div class="h-1 w-4 animate-pulse rounded-full bg-neutral-100"></div>
								<div class="size-2 animate-pulse rounded-full bg-neutral-200"></div>
							</div>
						</div>
						<div
							class="relative mt-1 min-h-[56px] flex-1 rounded-md bg-gradient-to-b from-neutral-100/90 to-neutral-200/60 ring-1 ring-neutral-200/50 ring-inset"
						>
							<div
								class="absolute top-1 right-1 h-2 w-7 animate-pulse rounded-md bg-white/80 shadow-sm ring-1 ring-neutral-200/60"
							></div>
							<div class="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
								<div class="size-1 animate-pulse rounded-full bg-white/70"></div>
								<div class="size-1 animate-pulse rounded-full bg-white/40"></div>
								<div class="size-1 animate-pulse rounded-full bg-white/40"></div>
							</div>
						</div>
						<div class="mt-1.5 space-y-1 text-center">
							<div class="mx-auto h-1 w-12 animate-pulse rounded-full bg-neutral-300/90"></div>
							<div class="mx-auto h-2 w-[92%] animate-pulse rounded bg-neutral-200"></div>
							<div class="mx-auto h-1.5 w-3/4 animate-pulse rounded bg-neutral-100"></div>
							<div class="flex items-center justify-center gap-1 pt-0.5">
								<div class="h-3 w-10 animate-pulse rounded-md bg-neutral-800/80"></div>
								<div class="h-3 w-10 animate-pulse rounded-md bg-neutral-100"></div>
							</div>
						</div>
					</div>
					<div
						bind:this={c2}
						class="flex h-32 min-w-0 flex-1 flex-col justify-between rounded-md bg-white p-1.5 shadow-sm ring-1 ring-black/5"
					>
						<div class="flex items-center justify-between">
							<div class="h-1.5 w-6 animate-pulse rounded bg-neutral-300/80"></div>
							<div class="flex gap-px">
								<div class="size-1.5 animate-pulse rounded-sm bg-neutral-200"></div>
								<div class="size-1.5 animate-pulse rounded-sm bg-neutral-200"></div>
								<div class="size-1.5 animate-pulse rounded-sm bg-neutral-200"></div>
							</div>
						</div>
						<div class="space-y-0.5 rounded border border-neutral-100 bg-neutral-50/80 px-1 py-0.5">
							<div class="flex items-center gap-1">
								<div class="size-1.5 shrink-0 animate-pulse rounded-full bg-neutral-300"></div>
								<div class="h-1 flex-1 animate-pulse rounded-full bg-neutral-200/70"></div>
							</div>
						</div>
						<div class="flex items-center justify-center gap-1">
							<div class="h-2 w-2 animate-pulse rounded-full bg-neutral-300/90"></div>
							<div class="h-2 flex-1 animate-pulse rounded bg-neutral-200/60"></div>
						</div>
						<div class="flex justify-center gap-1">
							<div class="h-0.5 w-4 animate-pulse rounded-full bg-neutral-200"></div>
							<div class="h-0.5 w-4 animate-pulse rounded-full bg-neutral-100"></div>
							<div class="h-0.5 w-4 animate-pulse rounded-full bg-neutral-100"></div>
						</div>
					</div>
					<div
						bind:this={c3}
						class="flex h-44 min-w-0 flex-1 flex-row gap-1.5 rounded-md bg-white p-1.5 shadow-sm ring-1 ring-black/5"
					>
						<div class="flex w-[48%] shrink-0 flex-col gap-1">
							<div class="h-1 w-4 animate-pulse rounded bg-neutral-300/70"></div>
							<div
								class="min-h-0 flex-1 rounded-md bg-gradient-to-br from-neutral-50 via-white to-neutral-200/70 ring-1 ring-neutral-200/80 ring-inset"
							>
								<div class="m-1 space-y-0.5">
									<div class="h-0.5 w-full animate-pulse rounded bg-white/60"></div>
									<div class="h-0.5 w-4/5 animate-pulse rounded bg-white/50"></div>
									<div class="mt-1 grid grid-cols-2 gap-0.5">
										<div class="aspect-square animate-pulse rounded bg-white/40"></div>
										<div class="aspect-square animate-pulse rounded bg-white/30"></div>
									</div>
								</div>
							</div>
						</div>
						<div class="flex min-w-0 flex-1 flex-col justify-center gap-1 pl-0.5">
							<div class="h-1 w-3/4 animate-pulse rounded-full bg-neutral-300/80"></div>
							<div class="h-1 w-full animate-pulse rounded-full bg-neutral-200/70"></div>
							<div class="h-1 w-2/3 animate-pulse rounded-full bg-neutral-200/50"></div>
							<div class="mt-1 h-2 w-1/2 animate-pulse rounded-md bg-neutral-800/70"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
