<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const INTRO_KEY = 'pg-avatar-intro';

	let fly: HTMLDivElement;
	let inspectEl: HTMLDivElement;
	let size = $state('');

	onMount(() => {
		const el = fly;
		if (!el?.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let played = false;
		try {
			played = sessionStorage.getItem(INTRO_KEY) === '1';
			sessionStorage.setItem(INTRO_KEY, '1');
		} catch {}
		if (
			played ||
			matchMedia('(max-width: 760px), (pointer: coarse)').matches ||
			scrollY > 40 ||
			location.hash
		)
			return;
		document.documentElement.classList.add('pg-intro-playing');
		const r = el.getBoundingClientRect();
		const dx = innerWidth / 2 - (r.left + r.width / 2);
		const dy = innerHeight / 2 - (r.top + r.height / 2);
		const anim = el.animate(
			[
				{ transform: `translate(${dx}px, ${dy}px) scale(0.6)`, opacity: 0, borderRadius: '50%' },
				{ transform: `translate(${dx}px, ${dy}px) scale(2.1)`, opacity: 1, offset: 0.32 },
				{ transform: `translate(${dx}px, ${dy}px) scale(2.1)`, opacity: 1, offset: 0.52 },
				{ transform: 'none', opacity: 1 }
			],
			{ duration: 1700, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'backwards' }
		);
		anim.onfinish = () => document.documentElement.classList.remove('pg-intro-playing');
		return () => {
			anim.cancel();
			document.documentElement.classList.remove('pg-intro-playing');
		};
	});

	function onInspectEnter() {
		const r = inspectEl.getBoundingClientRect();
		size = `${Math.round(r.width)} × ${Math.round(r.height)}`;
	}
</script>

<div class="pg-me">
	<button
		type="button"
		class="pg-me__open"
		onclick={() => goto('/how-i-work')}
		aria-label="Know about me: how I work"
		data-cursor="Know about me"
	>
		<div bind:this={fly} class="pg-me__fly">
			<div
				bind:this={inspectEl}
				class="pg-inspect pg-avatar"
				role="presentation"
				onpointerenter={onInspectEnter}
			>
				<img src="/avatar.jpg" alt="Yash Deshpande" width="64" height="64" />
				<span class="pg-inspect__frame" aria-hidden="true">
					<i class="tl"></i>
					<i class="tr"></i>
					<i class="bl"></i>
					<i class="br"></i>
					<span class="pg-inspect__layer">img</span>
					<span class="pg-inspect__size">{size}</span>
				</span>
			</div>
		</div>
	</button>
</div>
