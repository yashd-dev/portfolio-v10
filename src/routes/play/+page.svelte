<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let score = $state({ you: 0, ai: 0 });
	let running = $state(false);
	let winner = $state<'you' | 'ai' | null>(null);
	const W = 640;
	const H = 400;
	const PADDLE_H = 72;

	onMount(() => {
		const ctx = canvas.getContext('2d')!;
		const state = {
			you: H / 2,
			ai: H / 2,
			ball: { x: W / 2, y: H / 2, vx: 0, vy: 0 },
			raf: 0
		};
		const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

		function serve(dir: 1 | -1) {
			const base = Math.min(4.4 + 0.35 * (score.you + score.ai), 8.5);
			state.ball = { x: W / 2, y: H / 2, vx: base * dir, vy: (Math.random() - 0.5) * 5 };
		}

		function draw() {
			ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
			ctx.fillRect(0, 0, W, H);
			ctx.fillStyle = '#d4d4d4';
			for (let y = 0; y < H; y += 16) ctx.fillRect(W / 2 - 0.5, y, 1, 8);
			ctx.fillStyle = '#151515';
			ctx.fillRect(14, state.you - PADDLE_H / 2, 8, PADDLE_H);
			ctx.fillRect(W - 22, state.ai - PADDLE_H / 2, 8, PADDLE_H);
			ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--color-accent') || '#2f5bea';
			ctx.fillRect(state.ball.x - 5, state.ball.y - 5, 10, 10);
		}

		function step() {
			const b = state.ball;
			b.x += b.vx;
			b.y += b.vy;
			if (b.y < 6 || b.y > H - 6) b.vy *= -1;
			if (b.x < 30 && Math.abs(b.y - state.you) < PADDLE_H / 2 + 6) {
				b.vx = Math.min(Math.abs(b.vx) * 1.07, 12);
				b.vy += (b.y - state.you) * 0.09;
			}
			if (b.x > W - 30 && Math.abs(b.y - state.ai) < PADDLE_H / 2 + 6) {
				b.vx = -Math.min(Math.abs(b.vx) * 1.07, 12);
				b.vy += (b.y - state.ai) * 0.09;
			}
			// Predict where the ball crosses the AI side (with wall bounces) and give the
			// AI exactly the speed it needs to get there in time: as the rally speeds up,
			// so does the AI. It never deliberately misses.
			let target = H / 2;
			let v = 3.4;
			if (b.vx > 0) {
				let px = b.x;
				let py = b.y;
				let pvy = b.vy;
				let guard = 0;
				while (px < W - 30 && guard++ < 2000) {
					px += b.vx;
					py += pvy;
					if (py < 6 || py > H - 6) {
						pvy *= -1;
						py = Math.max(6, Math.min(H - 6, py));
					}
				}
				target = py;
				const frames = Math.max(1, (W - 30 - b.x) / b.vx);
				v = Math.max(3.4, Math.abs(target - state.ai) / frames);
			}
			state.ai += Math.max(-v, Math.min(v, target - state.ai));
			if (b.x < 0 || b.x > W) {
				const youScored = b.x > W;
				score = { you: score.you + (youScored ? 1 : 0), ai: score.ai + (youScored ? 0 : 1) };
				if (score.you >= 7 || score.ai >= 7) {
					winner = score.you >= 7 ? 'you' : 'ai';
					running = false;
					draw();
					return;
				}
				serve(youScored ? -1 : 1);
			}
			draw();
			state.raf = requestAnimationFrame(step);
		}

		function start() {
			if (running) return;
			winner = null;
			score = { you: 0, ai: 0 };
			serve(Math.random() > 0.5 ? 1 : -1);
			running = true;
			state.raf = requestAnimationFrame(step);
		}

		function point(e: PointerEvent) {
			const r = canvas.getBoundingClientRect();
			state.you = Math.max(
				PADDLE_H / 2,
				Math.min(H - PADDLE_H / 2, ((e.clientY - r.top) / r.height) * H)
			);
		}

		canvas.addEventListener('pointermove', point);
		canvas.addEventListener('pointerdown', (e) => {
			canvas.setPointerCapture(e.pointerId);
			point(e);
			start();
		});
		startGame = start;
		if (reduced) draw();
		else {
			state.you = H / 2;
			draw();
		}
		return () => {
			cancelAnimationFrame(state.raf);
			canvas.removeEventListener('pointermove', point);
		};
	});

	let startGame: () => void;
</script>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>

<div
	class="relative mx-auto w-full max-w-6xl px-6 pt-[320px] pb-[220px] max-sm:pt-[280px] max-sm:pb-[170px] sm:px-10"
>
	<h1 class="text-2xl font-medium tracking-tight text-ink">Pong</h1>
	<p class="mt-2 text-soft">Move your pointer over the board. First to 7.</p>
	<div class="mt-8 flex items-center justify-between text-sm text-muted">
		<span>You · {score.you}</span>
		<span>{score.ai} · Pixel AI</span>
	</div>
	<canvas
		bind:this={canvas}
		width={W}
		height={H}
		class="mt-3 w-full cursor-none touch-none rounded-xl border border-white/60 bg-white/55 backdrop-blur-[14px] backdrop-saturate-150 [image-rendering:pixelated]"
	></canvas>
	<button
		onclick={() => startGame()}
		class="mt-4 rounded-full bg-[#2e74ff] px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2667ff]"
	>
		{winner
			? winner === 'you'
				? 'You win - again?'
				: 'AI wins - rematch?'
			: running
				? 'Restart'
				: 'Start'}
	</button>
</div>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
