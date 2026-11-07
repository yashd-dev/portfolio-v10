<script lang="ts">
	import DesigningStep from '#lib/components/steps/DesigningStep.svelte';
	import DevelopmentStep from '#lib/components/steps/DevelopmentStep.svelte';
	import MicrointeractionsStep from '#lib/components/steps/MicrointeractionsStep.svelte';
	import CommunicationStep from '#lib/components/steps/CommunicationStep.svelte';
	import { projects, email } from '#lib/data/content.js';

	const stats = [
		{ value: String(projects.length), label: 'selected projects' },
		{ value: '2', label: 'teams worked with' },
		{ value: '2026', label: 'freelancing since' }
	];

	const services = [
		{ name: 'Design', note: 'Every screen in Figma first, revised until you approve it.' },
		{ name: 'Development', note: 'SvelteKit, Next.js, React and Tailwind, production ready.' },
		{ name: 'Ecommerce', note: 'Headless Shopify storefronts with calm, clear flows.' },
		{ name: 'CMS', note: 'A Sanity setup you can edit yourself.' }
	];

	const steps = [
		{
			n: '01',
			title: 'Designing',
			note: 'every screen in Figma first, with unlimited revisions until your first approval.',
			panel: DesigningStep
		},
		{
			n: '02',
			title: 'Development',
			note: 'with React, Next.js, SvelteKit and Tailwind, Shopify for ecommerce, and a CMS you can edit yourself.',
			panel: DevelopmentStep
		},
		{
			n: '03',
			title: 'Microinteractions',
			note: 'small details, built by hand, that make a page feel alive.',
			panel: MicrointeractionsStep
		},
		{
			n: '04',
			title: 'Communication',
			note: 'you see progress and share feedback along the way, not just at the end.',
			panel: CommunicationStep
		}
	];

	let copied = $state(false);
	async function copyEmail() {
		await navigator.clipboard.writeText(email);
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}
</script>

<div class="relative z-10 mx-auto max-w-[720px] border-x border-neutral-200 bg-white px-6 pt-28 pb-32 sm:px-10">
	<h1 class="text-2xl font-normal tracking-tight text-neutral-700">How I work</h1>
	<p class="mt-2 max-w-[46ch] text-neutral-500">
		We start with a conversation, agree scope and sign a contract. Then I design in Figma and build, and you see the design before it becomes a finished website.
	</p>

	<div class="mt-12 grid grid-cols-3 gap-4 border-y border-neutral-200 py-6">
		{#each stats as s}
			<div>
				<p class="text-2xl font-medium tracking-tight text-ink">{s.value}</p>
				<p class="mt-1 text-[13px] leading-snug text-soft">{s.label}</p>
			</div>
		{/each}
	</div>

	<p class="mt-16 mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">What I can help with</p>
	<div class="grid grid-cols-2 gap-3 md:grid-cols-4">
		{#each services as s}
			<div class="flex aspect-square flex-col justify-between rounded-2xl border border-neutral-200 p-4">
				<p class="text-[15px] font-medium text-ink">{s.name}</p>
				<p class="text-[13px] leading-snug text-soft">{s.note}</p>
			</div>
		{/each}
	</div>

	<p class="mt-16 mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">The process</p>
	<div class="flex flex-col gap-14">
		{#each steps as s}
			<section>
				<div class="flex items-baseline gap-3">
					<span class="text-[13px] font-medium text-faint">{s.n}</span>
					<h2 class="text-[16px] font-medium text-ink">
						{s.title} <span class="font-normal text-soft">{s.note}</span>
					</h2>
				</div>
				<div class="mt-5 h-[400px] overflow-hidden rounded-2xl border border-neutral-200 md:h-[440px]">
					<s.panel />
				</div>
			</section>
		{/each}
	</div>

	<div class="mt-20 border-t border-neutral-200 pt-10">
		<h2 class="text-[16px] font-medium text-ink">Have a project in mind?</h2>
		<p class="mt-1.5 max-w-[46ch] text-[15px] text-soft">
			Tell me what you are working on and we can set up a call.
		</p>
		<div class="mt-5 flex flex-wrap items-center gap-3">
			<a
				href="mailto:{email}"
				class="inline-flex h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-85"
				data-cursor="Message me"
			>
				Message me
			</a>
			<button
				type="button"
				class="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-neutral-200 px-4 text-[14px] font-medium text-ink transition-colors hover:bg-neutral-50"
				onclick={copyEmail}
				data-cursor="Copy email"
			>
				{copied ? 'Copied' : email}
			</button>
		</div>
	</div>
</div>
