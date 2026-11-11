<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const INTRO_KEY = 'pg-avatar-intro';

	let fly: HTMLDivElement;
	let inspectEl: HTMLDivElement;
	let size = $state('');

	onMount(() => {
		const el = fly;
		if (!el?.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) {return;}
		let played = false;
		try {
			played = sessionStorage.getItem(INTRO_KEY) === '1';
			sessionStorage.setItem(INTRO_KEY, '1');
		} catch {
			played = false;
		}
		if (
			played ||
			matchMedia('(max-width: 760px), (pointer: coarse)').matches ||
			scrollY > 40 ||
			location.hash
		)
			{return;}
		document.documentElement.classList.add('pg-intro-playing');
		const r = el.getBoundingClientRect();
		const dx = innerWidth / 2 - (r.left + r.width / 2);
		const dy = innerHeight / 2 - (r.top + r.height / 2);
		const anim = el.animate(
			[
				{ borderRadius: '50%', opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(0.6)` },
				{ offset: 0.32, opacity: 1, transform: `translate(${dx}px, ${dy}px) scale(2.1)` },
				{ offset: 0.52, opacity: 1, transform: `translate(${dx}px, ${dy}px) scale(2.1)` },
				{ opacity: 1, transform: 'none' }
			],
			{ duration: 1700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'backwards' }
		);
		anim.onfinish = () => {
			document.documentElement.classList.remove('pg-intro-playing');
			dispatchEvent(new Event('pg:intro-done'));
		};
		return () => {
			anim.cancel();
			document.documentElement.classList.remove('pg-intro-playing');
		};
	});

	const onInspectEnter = () => {
		const r = inspectEl.getBoundingClientRect();
		size = `${Math.round(r.width)} × ${Math.round(r.height)}`;
	};

	const handle = 'absolute size-[7px] border-[1.5px] border-inspect bg-white';
</script>

<div class="mb-[22px] flex items-center gap-3.5">
	<button
		type="button"
		class="block cursor-pointer rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
		onclick={() => goto('/process')}
		aria-label="Know about me: how I work"
		data-cursor="Know about me"
	>
		<div bind:this={fly} class="relative z-[5] will-change-transform">
			<div
				bind:this={inspectEl}
				class="group/ins relative h-16 w-16"
				role="presentation"
				onpointerenter={onInspectEnter}
			>
				<img
					src="/avatar.jpg"
					alt="Yash Deshpande"
					width="64"
					height="64"
					class="block h-full w-full rounded-[14px] bg-card object-cover object-[50%_28%]"
				/>
				<span
					class="pointer-events-none absolute -inset-px rounded-sm border-[1.5px] border-inspect opacity-0 transition-opacity duration-[180ms] group-hover/ins:opacity-100"
					aria-hidden="true"
				>
					<i class="{handle} -top-[4.5px] -left-[4.5px]"></i>
					<i class="{handle} -top-[4.5px] -right-[4.5px]"></i>
					<i class="{handle} -bottom-[4.5px] -left-[4.5px]"></i>
					<i class="{handle} -right-[4.5px] -bottom-[4.5px]"></i>
					<span class="absolute -left-px bottom-[calc(100%+6px)] text-[10px] leading-none whitespace-nowrap text-inspect">img</span>
					<span class="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded bg-inspect px-[5px] py-[3px] text-[10px] font-medium leading-none whitespace-nowrap text-white tabular-nums">{size}</span>
				</span>
			</div>
		</div>
	</button>
</div>
