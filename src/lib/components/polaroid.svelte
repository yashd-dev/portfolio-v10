<script lang="ts">
	let {
		src,
		alt,
		caption,
		cursor,
		class: cls = ''
	}: { src: string; alt: string; caption: string; cursor?: string; class?: string } = $props();

	let imgW = $state(0);
	let imgH = $state(0);
	let divW = $state(0);
	let divH = $state(0);

	const handle = 'absolute size-2 border border-[#f04ed8] bg-white';
</script>

<div class="group w-48 hover:z-20 {cls}" data-cursor={cursor}>
	<figure
		bind:clientWidth={divW}
		bind:clientHeight={divH}
		class="relative w-full bg-white p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-500 ease-out hover:shadow-[0_12px_36px_rgba(0,0,0,0.16)]"
	>
		<div
			class="pointer-events-none absolute inset-0 border-2 border-[#f04ed8] opacity-0 transition-opacity duration-200 select-none group-hover:opacity-100 motion-reduce:transition-none"
		>
			<span class="{handle} -top-1 -left-1"></span>
			<span class="{handle} -top-1 left-1/2 -translate-x-1/2"></span>
			<span class="{handle} -top-1 -right-1"></span>
			<span class="{handle} top-1/2 -left-1 -translate-y-1/2"></span>
			<span class="{handle} top-1/2 -right-1 -translate-y-1/2"></span>
			<span class="{handle} -bottom-1 -left-1"></span>
			<span class="{handle} -bottom-1 left-1/2 -translate-x-1/2"></span>
			<span class="{handle} -right-1 -bottom-1"></span>
			<span
				class="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-sm bg-[#f04ed8] px-1.5 py-0.5 text-[10px] leading-none whitespace-nowrap text-white"
			>
				{Math.round(divW)} × {Math.round(divH)}
			</span>
		</div>

		<div class="relative">
			<img
				{src}
				{alt}
				bind:clientWidth={imgW}
				bind:clientHeight={imgH}
				class="aspect-square w-full object-cover sepia-[0.15] transition-all duration-500 ease-out group-hover:sepia-0 motion-reduce:transition-none"
				loading="lazy"
				decoding="async"
			/>
			<div
				class="pointer-events-none absolute inset-0 border border-[#f04ed8] opacity-0 transition-opacity duration-200 select-none group-hover:opacity-100 motion-reduce:transition-none"
			>
				<span
					class="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-sm bg-[#f04ed8] px-1.5 py-0.5 text-[10px] leading-none whitespace-nowrap text-white"
				>
					{Math.round(imgW)} × {Math.round(imgH)}
				</span>
			</div>
		</div>
		<figcaption class="relative px-1 pt-2.5 pb-1 text-[13px] leading-snug text-neutral-500">
			{caption}
			<span
				class="pointer-events-none absolute inset-0 border border-[#f04ed8] opacity-0 transition-opacity duration-200 select-none group-hover:opacity-100 motion-reduce:transition-none"
			>
				<span
					class="absolute -right-1 -bottom-2 rounded-sm bg-[#f04ed8] px-1.5 py-0.5 text-[10px] leading-none whitespace-nowrap text-white"
				>
					13px / 0px
				</span>
			</span>
		</figcaption>
</figure>
</div>
