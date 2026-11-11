<script lang="ts">
	import { onMount } from 'svelte';
	import { springStep, wait } from '#lib/spring.js';

	const code =
		'<div role="slider"\n  class="track"\n  data-cursor-hand="grab"\n  data-cursor="Drag">\n  <div class="fill"\n    style="width: {pct}%" />\n  <div class="thumb"\n    style="left: {pct}%" />\n</div>';

	interface Tok { c: string; t: string }

	const tokenize = (src: string): Tok[] => {
		const out: Tok[] = [];
		const re =
			/(?<open><\/?)(?<tag>[\w-]+)|(?<str>"[^"]*")|(?<attr>[\w-]+)(?==)|(?<close>\/?>)|(?<braces>\{[^}]*\})|(?<other>[\s\S])/gu;
		let m: RegExpExecArray | null;
		while ((m = re.exec(src))) {
			const g = m.groups ?? {};
			if (g.open) {
				out.push({ c: 'text-[#57606a]', t: g.open }, { c: 'text-[#116329]', t: g.tag });
			} else if (g.str) {
				for (const p of g.str.split(/(?<braces>\{[^}]*\})/u)) {
					if (!p) {continue;}
					out.push({ c: p.startsWith('{') ? 'text-[#8250df]' : 'text-[#0a3069]', t: p });
				}
			} else if (g.attr) {out.push({ c: 'text-[#0550ae]', t: g.attr });}
			else if (g.close) {out.push({ c: 'text-[#57606a]', t: g.close });}
			else if (g.braces) {out.push({ c: 'text-[#8250df]', t: g.braces });}
			else {out.push({ c: 'text-[#24292f]', t: g.other });}
		}
		return out;
	};

	const tokens = tokenize(code);
	const offsets: number[] = [];
	let running = 0;
	for (const tok of tokens) {
		running += tok.t.length;
		offsets.push(running);
	}

	const images = ['/work/actuallyfair.png', '/work/strive.png', '/work/sshealthcare.png'];

	let phase = $state<'typing' | 'ui'>('typing');
	let charCount = $state(0);
	let value = $state(0.4);
	let hovered = $state(false);
	let dragging = $state(false);
	let track = $state<HTMLDivElement>();
	let tilt = $state(0);
	let shown = $state(0.4);

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			phase = 'ui';
			return;
		}
		let cancelled = false;
		const typeChar = async (i: number): Promise<void> => {
			if (cancelled || i > code.length) {return;}
			charCount = i;
			await wait(5);
			await typeChar(i + 1);
		};
		const cycle = async (): Promise<void> => {
			if (cancelled) {return;}
			phase = 'typing';
			charCount = 0;
			await typeChar(0);
			if (cancelled) {return;}
			await wait(1000);
			phase = 'ui';
			await wait(10_000);
			await cycle();
		};
		void cycle();
		return () => {
			cancelled = true;
		};
	});

	onMount(() => {
		let raf = 0;
		let last = performance.now();
		let prevRot = -10 * 0.4;
		let sv = 0;
		let sx = 0.4;
		let tv = 0;
		let tx = 0;
		const loop = (now: number) => {
			const dt = Math.min(0.032, Math.max(0.001, (now - last) / 1000));
			last = now;
			[sx, sv] = springStep(sx, sv, value, 300, 10, 0.35, dt);
			shown = sx;
			const rot = -10 * sx;
			const vel = (rot - prevRot) / dt;
			prevRot = rot;
			[tx, tv] = springStep(tx, tv, vel, 300, 10, 0.35, dt);
			tilt = Math.max(-14, Math.min(14, tx));
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const applyValue = (clientX: number) => {
		const rect = track?.getBoundingClientRect();
		if (!rect) {return;}
		const next = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
		tilt = Math.max(-10, Math.min(10, (next - value) * -100));
		value = next;
	};

	const onDown = (e: PointerEvent) => {
		dragging = true;
		applyValue(e.clientX);
		const up = () => {
			dragging = false;
			tilt = 0;
			removeEventListener('pointerup', up);
			removeEventListener('pointercancel', up);
		};
		addEventListener('pointerup', up);
		addEventListener('pointercancel', up);
	};

	const imgIndex = $derived(Math.min(images.length - 1, Math.floor(value * images.length)));
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1 bg-[linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.6)),url(/clouds.webp)] bg-cover bg-center px-4 py-6 md:px-8 md:py-8">
		<div class="relative z-20 flex min-h-96 w-full items-center justify-center">
			<div
				class="w-full max-w-[min(100%,400px)] overflow-hidden rounded-3xl bg-white p-4 text-left shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
			>
				{#if phase === 'typing'}
					<pre class="text-[13px] leading-relaxed tracking-tight whitespace-pre"><code
							>{#each tokens as tok, i}{@const start =
									i === 0 ? 0 : offsets[i - 1]}{@const visible = Math.min(
									tok.t.length,
									Math.max(0, charCount - start)
								)}<span class={tok.c}>{tok.t.slice(0, visible)}</span>{/each}<span
								class="ml-px inline-block h-[1.1em] w-0.5 animate-pulse bg-[#0969da] align-[-0.125em]"
							></span></code
						></pre>
				{:else}
					<div class="mx-auto max-w-xs py-4">
						<h3 class="text-base tracking-tight text-neutral-700">
							This is an interactive slider,
							<span class="bg-gradient-to-r from-neutral-200 to-transparent"
								>made for this page</span
							>.
						</h3>
						<p class="mt-4 text-base tracking-tight text-neutral-700">
							Drag it. The preview tilts with
							<span class="bg-gradient-to-r from-neutral-200 to-transparent">your velocity</span>.
						</p>
						<div
							bind:this={track}
							role="slider"
							aria-valuemin={0}
							aria-valuemax={100}
							aria-valuenow={Math.round(100 * value)}
							tabindex="0"
							onpointerenter={() => (hovered = true)}
							onpointerleave={() => {
								if (!dragging) hovered = false;
							}}
							onpointerdown={onDown}
							onpointermove={(e) => {
								if (dragging) applyValue(e.clientX);
							}}
							onkeydown={(e) => {
								const step = e.shiftKey ? 0.1 : 0.05;
								if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')
									value = Math.max(0, value - step);
								if (e.key === 'ArrowRight' || e.key === 'ArrowUp')
									value = Math.min(1, value + step);
								if (e.key === 'Home') value = 0;
								if (e.key === 'End') value = 1;
							}}
							class="relative mt-4 h-8 w-full cursor-grab touch-none rounded-md bg-neutral-800 shadow-sm ring-1 ring-black/20 select-none active:cursor-grabbing"
						>
							<div
								class="pointer-events-none absolute inset-y-0 left-0 rounded-l-md bg-neutral-600/90"
								style="width: {100 * shown}%"
							></div>
							<div
								class="pointer-events-none absolute inset-x-2 inset-y-0 grid items-center opacity-[0.22]"
								style="grid-template-columns: repeat(9, minmax(0, 1fr))"
							>
								{#each Array(9) as _}
									<span class="mx-auto h-3 w-px rounded-full bg-neutral-300"></span>
								{/each}
							</div>
							{#if dragging}
								<div
									class="pointer-events-none absolute bottom-full z-20 mb-2"
									style="left: {100 * shown}%; transform: translateX(-50%) rotate({tilt}deg)"
								>
									<div
										class="flex h-16 w-20 flex-col overflow-hidden rounded-md bg-white p-1 shadow-xl ring-1 ring-black/10"
									>
										<img
											src={images[imgIndex]}
											alt=""
											class="h-full w-full rounded-sm object-cover object-top"
										/>
									</div>
								</div>
							{/if}
							{#if hovered || dragging}
								<div
									class="pointer-events-none absolute top-1/2 z-10 h-5 w-3 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-neutral-200 shadow-md ring-1 ring-black/25"
									style="left: {100 * shown}%"
								></div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
