<script lang="ts">
	import DesigningStep from '#lib/components/steps/DesigningStep.svelte';
	import DevelopmentStep from '#lib/components/steps/DevelopmentStep.svelte';
	import MicrointeractionsStep from '#lib/components/steps/MicrointeractionsStep.svelte';
	import CommunicationStep from '#lib/components/steps/CommunicationStep.svelte';
</script>

<div class="relative z-10 mx-auto max-w-[1100px] border-x border-neutral-200 bg-white pt-24">
	<div class="px-4 py-8 md:px-8 md:py-12">
		<h1 class="max-w-[40ch] text-2xl font-normal tracking-tight text-neutral-700">
			How I work
		</h1>
		<p class="mt-2 max-w-[46ch] text-neutral-500">
			We start with a conversation, agree scope and sign a contract. Then I design in Figma and build, and you see the design before it becomes a finished website.
		</p>
	</div>
	<div
		class="grid grid-cols-1 border-y border-neutral-200 md:grid-cols-2 [&>*]:border-neutral-200 [&>*:not(:last-child)]:border-b md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(n+3)]:border-b-0"
	>
		<DesigningStep />
		<DevelopmentStep />
		<MicrointeractionsStep />
		<CommunicationStep />
	</div>
</div>
