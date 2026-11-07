<script lang="ts">
	import { onMount } from 'svelte';
	import { springMotion } from '#lib/spring.js';
	import { fly } from 'svelte/transition';

	const devices = [
		{ id: 'macbook', image: '/work/actuallyfair.png', alt: 'Actually Fair storefront' },
		{ id: 'iphone', image: '/work/twk.png', alt: 'Therapy With Kinnari site' },
		{ id: 'ipad', image: '/work/medizone.png', alt: 'Medizone site' }
	];

	let index = $state(0);
	let island = $state<'idle' | 'loading' | 'connected'>('idle');
	const im = springMotion(591.79, 48.82, 2.89);
	const islandTransition = `transition: width ${im.duration}ms ${im.easing}, height ${im.duration}ms ${im.easing}, border-radius ${im.duration}ms ${im.easing}`;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let cancelled = false;
		const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
		(async () => {
			while (!cancelled) {
				island = 'loading';
				await wait(1200);
				if (cancelled) break;
				island = 'connected';
				await wait(4850);
				if (cancelled) break;
				island = 'idle';
				index = (index + 1) % devices.length;
			}
		})();
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="flex h-full flex-col">
	<div class="relative flex-1 bg-neutral-50 px-4 py-6 shadow-[0px_0px_14px_0px_var(--color-neutral-200)_inset] md:px-8 md:py-8">
		<div
			class="relative z-20 flex h-full min-h-96 w-full items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
		>
			{#key index}
				<div
					class="flex w-full items-center justify-center px-4 {devices[index].id === 'iphone' ? 'max-w-[240px]' : devices[index].id === 'ipad' ? 'max-w-[400px]' : 'max-w-[480px]'}"
					in:fly={{ y: 340, duration: 850, opacity: 0 }}
					out:fly={{ y: -340, duration: 1050, opacity: 0 }}
				>
					{#if devices[index].id === 'macbook'}
						<div class="mx-auto w-full max-w-2xl">
							<div class="mx-auto w-96 [perspective:1000px]">
								<div class="mx-auto h-48 [transform:rotateX(20deg)] [transform-origin:bottom]">
									<div class="relative h-full w-full overflow-hidden rounded-t-lg bg-white">
										<img src={devices[index].image} alt={devices[index].alt} class="absolute inset-0 h-full w-full object-cover object-center" />
										<div class="absolute inset-x-0 top-0 z-10">
											<div class="flex h-full w-full items-start justify-center pt-2">
												<div
													class="relative overflow-hidden bg-black transition-all duration-500 ease-mn"
													style="width: {island === 'connected' ? 50 : island === 'loading' ? 20 : 36}px; height: 12px; border-radius: {island === 'connected' ? 8 : 6}px; {islandTransition}"
												>
													{#if island === 'idle'}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<div class="h-1 w-1 rounded-full bg-neutral-800"></div>
															<div class="h-0.5 w-0.5 rounded-full bg-neutral-700"></div>
														</div>
													{:else if island === 'loading'}
														<div class="absolute inset-0 flex items-center justify-center gap-px">
															{#each [0, 1, 2] as d}
																<div class="h-0.5 w-0.5 animate-pulse rounded-full bg-white" style="animation-delay: {d * 150}ms"></div>
															{/each}
														</div>
													{:else}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<span class="text-[4px] leading-none font-medium whitespace-nowrap text-white">Deployed</span>
															<div class="flex h-1 w-2 items-center rounded-[1px] border border-green-500">
																<div class="h-full w-[85%] bg-green-500"></div>
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="relative h-3 w-full rounded-br-3xl rounded-bl-3xl rounded-tl-md rounded-tr-md bg-gradient-to-b from-neutral-100 to-neutral-300 shadow-[0px_1px_0px_0px_var(--color-neutral-200)_inset]">
									<div class="absolute inset-x-0 top-0 mx-auto h-1.5 w-10 rounded-br-sm rounded-bl-sm bg-neutral-400"></div>
								</div>
							</div>
						</div>
					{:else if devices[index].id === 'iphone'}
						<div class="mx-auto w-full max-w-2xl">
							<div class="relative mx-auto w-40">
								<div class="absolute top-14 -left-[2px] flex flex-col gap-2">
									<div class="h-3 w-[2px] rounded-l-sm bg-neutral-300"></div>
									<div class="h-5 w-[2px] rounded-l-sm bg-neutral-300"></div>
									<div class="h-5 w-[2px] rounded-l-sm bg-neutral-300"></div>
								</div>
								<div class="absolute top-20 -right-[2px]">
									<div class="h-8 w-[2px] rounded-r-sm bg-neutral-300"></div>
								</div>
								<div class="rounded-[1.5rem] bg-neutral-100 p-1 shadow-sm ring-1 ring-black/10">
									<div class="relative h-56 w-full overflow-hidden rounded-[1.25rem] bg-white">
										<img src={devices[index].image} alt={devices[index].alt} class="absolute inset-0 h-full w-full object-cover object-top" />
										<div class="absolute inset-x-0 top-0 z-10">
											<div class="flex h-full w-full items-start justify-center pt-2">
												<div
													class="relative overflow-hidden bg-black transition-all duration-500 ease-mn"
													style="width: {island === 'connected' ? 50 : island === 'loading' ? 20 : 36}px; height: 12px; border-radius: {island === 'connected' ? 8 : 6}px; {islandTransition}"
												>
													{#if island === 'idle'}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<div class="h-1 w-1 rounded-full bg-neutral-800"></div>
															<div class="h-0.5 w-0.5 rounded-full bg-neutral-700"></div>
														</div>
													{:else if island === 'loading'}
														<div class="absolute inset-0 flex items-center justify-center gap-px">
															{#each [0, 1, 2] as d}
																<div class="h-0.5 w-0.5 animate-pulse rounded-full bg-white" style="animation-delay: {d * 150}ms"></div>
															{/each}
														</div>
													{:else}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<span class="text-[4px] leading-none font-medium whitespace-nowrap text-white">Deployed</span>
															<div class="flex h-1 w-2 items-center rounded-[1px] border border-green-500">
																<div class="h-full w-[85%] bg-green-500"></div>
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="absolute inset-x-0 bottom-2 mx-auto h-1 w-10 rounded-full bg-neutral-300"></div>
							</div>
						</div>
					{:else}
						<div class="mx-auto w-full max-w-2xl">
							<div class="relative mx-auto w-72">
								<div class="absolute top-8 -right-[2px] flex flex-col gap-2">
									<div class="h-5 w-[2px] rounded-r-sm bg-neutral-300"></div>
									<div class="h-5 w-[2px] rounded-r-sm bg-neutral-300"></div>
								</div>
								<div class="absolute -top-[2px] right-10">
									<div class="h-[2px] w-6 rounded-t-sm bg-neutral-300"></div>
								</div>
								<div class="rounded-[1.5rem] bg-neutral-100 p-1.5 shadow-sm ring-1 ring-black/10">
									<div class="relative h-40 w-full overflow-hidden rounded-[1.25rem] bg-white">
										<img src={devices[index].image} alt={devices[index].alt} class="absolute inset-0 h-full w-full object-cover object-top" />
										<div class="absolute inset-x-0 top-0 z-10">
											<div class="flex h-full w-full items-start justify-center pt-2">
												<div
													class="relative overflow-hidden bg-black transition-all duration-500 ease-mn"
													style="width: {island === 'connected' ? 50 : island === 'loading' ? 20 : 36}px; height: 12px; border-radius: {island === 'connected' ? 8 : 6}px; {islandTransition}"
												>
													{#if island === 'idle'}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<div class="h-1 w-1 rounded-full bg-neutral-800"></div>
															<div class="h-0.5 w-0.5 rounded-full bg-neutral-700"></div>
														</div>
													{:else if island === 'loading'}
														<div class="absolute inset-0 flex items-center justify-center gap-px">
															{#each [0, 1, 2] as d}
																<div class="h-0.5 w-0.5 animate-pulse rounded-full bg-white" style="animation-delay: {d * 150}ms"></div>
															{/each}
														</div>
													{:else}
														<div class="absolute inset-0 flex items-center justify-center gap-1">
															<span class="text-[4px] leading-none font-medium whitespace-nowrap text-white">Deployed</span>
															<div class="flex h-1 w-2 items-center rounded-[1px] border border-green-500">
																<div class="h-full w-[85%] bg-green-500"></div>
															</div>
														</div>
													{/if}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/key}
		</div>
	</div>
</div>
