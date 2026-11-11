<script lang="ts">
	let {
		src,
		alt,
		caption,
		cursor,
		class: cls = ''
	}: { src: string; alt: string; caption: string; cursor?: string; class?: string } = $props();
</script>

<figure
	class="group w-48 bg-white p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-500 ease-out hover:shadow-[0_12px_36px_rgba(0,0,0,0.16)] {cls}"
	data-cursor={cursor}
>
	<img
		{src}
		{alt}
		class="aspect-square w-full object-cover sepia-[0.15] transition-all duration-500 ease-out group-hover:sepia-0 motion-reduce:transition-none"
		loading="lazy"
		decoding="async"
	/>
	<figcaption class="px-1 pt-2.5 pb-1 text-[13px] leading-snug text-neutral-500">
		{caption}
	</figcaption>
</figure>
