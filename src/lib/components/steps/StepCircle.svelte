<script lang="ts">
	let { n, color = '#6ba3c6' }: { n: number; color?: string } = $props();
</script>

<span
	class="mt-1 grid size-12 shrink-0 place-items-center rounded-full text-lg font-semibold text-white"
	style="background: {color}">{n}</span
>
