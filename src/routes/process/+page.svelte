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

	const stats = [
		{ value: '10+', label: 'projects' },
		{ value: '₹2Cr+', label: 'revenue gained by the teams' },
		{ value: '2024', label: 'freelancing since' }
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
		},
		{
			name: 'Consulting',
			note: 'A second pair of eyes on your site, stack or roadmap.',
			icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />',
			color: '#2e74ff'
		},
		{
			name: 'Copywriting',
			note: 'Words for your pages that sound like you, not a template.',
			icon: '<path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />',
			color: '#2e74ff'
		},
		{
			name: 'Mobile responsiveness',
			note: 'Layouts that work properly on phones, tablets and desktops.',
			icon: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" />',
			color: '#0ea5e9'
		},
		{
			name: 'Site fixes & recovery',
			note: 'Help with old WordPress sites, lost domains and things that stopped working.',
			icon: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />',
			color: '#f59e0b'
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

<div class="relative mx-auto w-full max-w-6xl">
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
		<p class="mt-16 mb-10 text-sm font-medium text-muted">What I can help with</p>
		<div class="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as s}
				<div class="flex flex-col">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-[18px] text-[#2e74ff]"
						aria-hidden="true">{@html s.icon}</svg
					>
					<p class="mt-5 text-[15px] font-medium text-ink">{s.name}</p>
					{#if s.note}<p class="mt-2 text-sm leading-relaxed text-soft">{s.note}</p>{/if}
				</div>
			{/each}
		</div>

		<p class="mt-16 mb-10 text-sm font-medium text-muted">The process</p>
		<div
			class="grid grid-cols-1 border-b border-dashed border-neutral-200 md:grid-cols-2 [&>*]:border-dashed [&>*]:border-neutral-200 [&>*:not(:last-child)]:border-b md:[&>*:nth-child(n+3)]:border-b-0 md:[&>*:nth-child(odd)]:border-r"
		>
			{#each steps as s, i}
				<section
					id={s.id}
					class="flex min-w-0 scroll-mt-[88px] flex-col px-4 py-6 md:py-8 {i % 2 === 0
						? 'md:pr-8 md:pl-0'
						: 'md:pr-0 md:pl-8'}"
				>
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

	<CtaSection guides={false} />
</div>
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
