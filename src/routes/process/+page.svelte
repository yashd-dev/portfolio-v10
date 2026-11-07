<script lang="ts">
	import DesigningStep from '#lib/components/steps/designingStep.svelte';
	import DevelopmentStep from '#lib/components/steps/developmentStep.svelte';
	import MicrointeractionsStep from '#lib/components/steps/microinteractionsStep.svelte';
	import CommunicationStep from '#lib/components/steps/communicationStep.svelte';
	import StepCircle from '#lib/components/steps/stepCircle.svelte';
	import FaqSection from '#lib/components/faqSection.svelte';
	import EnquiryForm from '#lib/components/enquiryForm.svelte';
	import CtaSection from '#lib/components/ctaSection.svelte';
	import Mark from '#lib/components/mark.svelte';
	import { highlightCalm } from '#lib/marks.js';
	import { projects } from '#lib/data/content.js';

	const stats = [
		{ value: String(projects.length), label: 'selected projects' },
		{ value: '2', label: 'teams worked with' },
		{ value: '2026', label: 'freelancing since' }
	];

	const services = [
		{
			name: 'Design',
			note: 'Every screen in Figma first, revised until you approve it.',
			icon: '<path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" />',
			color: '#f24e1e'
		},
		{
			name: 'Development',
			note: 'SvelteKit, Next.js, React and Tailwind, production ready.',
			icon: '<path d="m8 6-6 6 6 6M16 6l6 6-6 6" />',
			color: '#3178c6'
		},
		{
			name: 'Ecommerce',
			note: 'Headless Shopify storefronts with calm, clear flows.',
			icon: '<path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1h-13a1 1 0 0 1-1-1.1L6 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" />',
			color: '#7ab55c'
		},
		{
			name: 'CMS',
			note: 'A Sanity setup you can edit yourself.',
			icon: '<path d="M4 5h16M4 12h16M4 19h10" />',
			color: '#f03e2f'
		}
	];

	const steps = [
		{
			n: 1,
			id: 'designing',
			title: 'Designing',
			note: 'every screen in Figma first, with unlimited revisions until your first approval.',
			panel: DesigningStep
		},
		{
			n: 2,
			id: 'development',
			title: 'Development',
			note: 'with React, Next.js, SvelteKit and Tailwind, Shopify for ecommerce, and a CMS you can edit yourself.',
			panel: DevelopmentStep
		},
		{
			n: 3,
			id: 'microinteractions',
			title: 'Microinteractions',
			note: 'small details, built by hand, that make a page feel alive.',
			panel: MicrointeractionsStep
		},
		{
			n: 4,
			id: 'communication',
			title: 'Communication',
			note: 'you see progress and share feedback along the way, not just at the end.',
			panel: CommunicationStep
		}
	];
</script>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)]"
></div>

<div
	class="relative mx-auto w-full max-w-6xl before:pointer-events-none before:absolute before:top-24 before:bottom-0 before:left-0 before:-z-10 before:w-px before:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] before:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] before:[background-size:1px_8px] after:pointer-events-none after:absolute after:top-24 after:right-0 after:bottom-0 after:-z-10 after:w-px after:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] after:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] after:[background-size:1px_8px]"
>
	<div class="relative px-6 pt-[320px] pb-16 max-sm:pt-[280px] sm:px-10">
		<h1 class="relative max-w-[16ch] text-2xl font-medium tracking-tight text-ink">
			How I <Mark definition={highlightCalm} fillColor="#8ab6f2">work</Mark>
		</h1>
		<p class="relative mt-4 max-w-[46ch] text-soft">
			We start with a conversation, agree scope and sign a contract. Then I design in Figma and
			build, and you see the design before it becomes a finished website.
		</p>
	</div>

	<div class="grid grid-cols-3 gap-4 border-y border-dashed border-neutral-200 px-6 py-8 sm:px-10">
		{#each stats as s}
			<div>
				<p class="text-2xl font-medium tracking-tight text-ink">{s.value}</p>
				<p class="mt-2 text-[13px] leading-snug text-soft">{s.label}</p>
			</div>
		{/each}
	</div>

	<div class="px-6 sm:px-10">
		<p class="mt-16 mb-[22px] text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
			What I can help with
		</p>
		<div class="grid grid-cols-2 gap-3 md:grid-cols-4">
			{#each services as s}
				<div
					class="group flex aspect-square cursor-default flex-col rounded-2xl border border-neutral-200 p-4 transition-[transform,box-shadow] duration-300 ease-(--ease-mn) hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_rgba(38,38,43,0.25)] md:p-5"
				>
					<p class="text-[15px] font-medium text-ink">{s.name}</p>
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mx-auto my-auto size-9 text-neutral-300 transition-colors duration-300 group-hover:text-(--c) md:size-11"
						style="--c: {s.color}">{@html s.icon}</svg
					>
					<p class="text-[13px] leading-snug text-soft">{s.note}</p>
				</div>
			{/each}
		</div>

		<p class="mt-16 mb-[22px] text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
			The process
		</p>
		<div
			class="grid grid-cols-1 border-y border-dashed border-neutral-200 md:grid-cols-2 [&>*]:border-dashed [&>*]:border-neutral-200 [&>*:not(:last-child)]:border-b md:[&>*:nth-child(n+3)]:border-b-0 md:[&>*:nth-child(odd)]:border-r"
		>
			{#each steps as s}
				<section id={s.id} class="flex min-w-0 scroll-mt-[88px] flex-col px-4 py-6 md:px-8 md:py-8">
					<div
						class="h-[440px] overflow-hidden rounded-2xl border border-neutral-200 shadow-[0_20px_40px_-24px_rgba(38,38,43,0.25)] md:h-[500px]"
					>
						<s.panel />
					</div>
					<div class="mt-6 flex items-start gap-3">
						<StepCircle n={s.n} />
						<h2
							class="mt-1 max-w-[30ch] text-lg font-semibold tracking-tight text-balance text-neutral-700 md:text-xl"
						>
							{s.title} <span class="text-neutral-700/50">{s.note}</span>
						</h2>
					</div>
				</section>
			{/each}
		</div>
	</div>

	<FaqSection />

	<EnquiryForm />

	<CtaSection />
</div>
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
