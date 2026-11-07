<script lang="ts">
	let { n }: { n: number } = $props();
</script>

<span
	class="mt-1.5 grid size-9 shrink-0 place-items-center rounded-full bg-linear-to-b from-[#3578ff] to-[#2e74ff] text-sm font-semibold text-white shadow-md ring-1 ring-white/25 ring-offset-1 ring-offset-[#2e74ff] ring-inset"
	aria-hidden="true"
>
	{n}
</span>
