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
			state.ball = { x: W / 2, y: H / 2, vx: 4.4 * dir, vy: (Math.random() - 0.5) * 5 };
		}

		function draw() {
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, W, H);
			ctx.fillStyle = '#e5e5e5';
			for (let y = 0; y < H; y += 16) ctx.fillRect(W / 2 - 1, y, 2, 8);
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
				b.vx = Math.abs(b.vx) * 1.04;
				b.vy += (b.y - state.you) * 0.09;
			}
			if (b.x > W - 30 && Math.abs(b.y - state.ai) < PADDLE_H / 2 + 6) {
				b.vx = -Math.abs(b.vx) * 1.04;
				b.vy += (b.y - state.ai) * 0.09;
			}
			state.ai += Math.max(-3.4, Math.min(3.4, b.y - state.ai));
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
			state.you = Math.max(PADDLE_H / 2, Math.min(H - PADDLE_H / 2, ((e.clientY - r.top) / r.height) * H));
		}

		canvas.addEventListener('pointermove', point);
		canvas.addEventListener('pointerdown', (e) => {
			point(e);
			start();
		});
		(startGame = start);
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

<div class="relative z-10 mx-auto max-w-[720px] border-x border-neutral-200 bg-white px-6 pt-28 pb-32 sm:px-10">
	<h1 class="text-2xl font-normal tracking-tight text-neutral-700">Pong</h1>
	<p class="mt-2 text-neutral-500">Move your pointer over the board. First to 7.</p>
	<div class="mt-8 flex items-center justify-between text-sm text-muted">
		<span>You · {score.you}</span>
		<span>{score.ai} · Pixel AI</span>
	</div>
	<canvas
		bind:this={canvas}
		width={W}
		height={H}
		class="mt-3 w-full cursor-none rounded-xl border border-neutral-200 [image-rendering:pixelated]"
	></canvas>
	<button
		onclick={() => startGame()}
		class="mt-4 rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-soft transition-colors duration-200 hover:bg-card"
	>
		{winner ? (winner === 'you' ? 'You win - again?' : 'AI wins - rematch?') : running ? 'Restart' : 'Start'}
	</button>
</div>
