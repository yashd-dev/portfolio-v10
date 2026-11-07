<script lang="ts">
	let { n, from, to }: { n: number; from: string; to: string } = $props();
</script>

<span
	class="mt-1 grid size-12 shrink-0 place-items-center rounded-full text-lg font-semibold text-white shadow-lg ring-1 ring-white/20 ring-inset"
	style="background: linear-gradient(to bottom, {from}, {to})">{n}</span
>
