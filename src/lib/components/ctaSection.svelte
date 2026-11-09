<script lang="ts">
	import Mark from '#lib/components/mark.svelte';
	import { highlightCalm } from '#lib/marks.js';
	import { projects, email } from '#lib/data/content.js';
	import { REVEAL } from '#lib/reveal.js';
	import { fade, fly } from 'svelte/transition';

	let { guides = true }: { guides?: boolean } = $props();

	const paths = [
		{
			id: 'project',
			title: 'Start a project',
			intro: 'For founders and teams who need a site designed and built.',
			points: [
				'Designed in Figma first, revised until you approve it',
				'SvelteKit, React and Tailwind, production ready',
				'A CMS you can edit yourself',
				'Progress and feedback along the way, not just at the end'
			],
			cta: 'See how I work',
			href: '/process',
			external: false
		},
		{
			id: 'hire',
			title: 'Hire me',
			intro: "I'm open to job opportunities alongside freelance work.",
			points: [
				'Technical lead at Actually Fair',
				'Full-stack developer at KonectU',
				'Production TypeScript across SvelteKit and headless Shopify',
				'BTech Computer Engineering, MPSTME NMIMS',
				'Based in Mumbai'
			],
			cta: 'Book a call',
			href: 'https://cal.com/yashd-dev/discussion',
			external: true
		}
	] as const;

	let choice = $state<'project' | 'hire' | null>(null);
	const reduced =
		typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
	const dur = reduced ? 0 : 220;

	// Animate the message area's height when a reply opens or the path switches,
	// so the card (and the section around it) glides instead of jumping.
	function smoothResize(node: HTMLElement) {
		let prev: number | null = null;
		let anim: Animation | null = null;
		const ro = new ResizeObserver(() => {
			// Ignore size changes caused by our own height animation, otherwise each
			// animated frame re-triggers the observer and animations stack forever.
			if (anim) return;
			const next = node.offsetHeight;
			if (prev === null || next === prev) {
				prev = next;
				return;
			}
			if (!reduced) {
				anim = node.animate([{ height: `${prev}px` }, { height: `${next}px` }], {
					duration: 300,
					easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
				});
				const done = () => {
					anim = null;
					// If content changed mid-animation, force a fresh measure so the
					// next observer fire animates to the real height.
					if (node.offsetHeight !== prev) prev = null;
				};
				anim.finished.then(done, done);
			}
			prev = next;
		});
		ro.observe(node);
		return {
			destroy() {
				ro.disconnect();
			}
		};
	}
</script>

<section
	class="relative left-[calc(50%-50vw)] mt-24 w-screen overflow-hidden max-sm:mt-[72px]"
	aria-label="Contact"
>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden xl:block">
		<div
			class="absolute top-1/2 right-[calc(50%+348px)] flex -translate-y-1/2 flex-col gap-4 [mask-image:linear-gradient(to_right,transparent_0%,black_55%)]"
		>
			{#each projects.slice(0, 2) as p}
				<div
					class="h-[188px] w-60 shrink-0 overflow-hidden rounded-md bg-neutral-100 shadow-sm ring-1 ring-black/10"
				>
					<img
						src={p.image}
						alt=""
						class="h-full w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		</div>
		<div
			class="absolute top-1/2 left-[calc(50%+348px)] flex -translate-y-1/2 flex-col gap-4 [mask-image:linear-gradient(to_left,transparent_0%,black_55%)]"
		>
			{#each projects.slice(2, 4) as p}
				<div
					class="h-[188px] w-60 shrink-0 overflow-hidden rounded-md bg-neutral-100 shadow-sm ring-1 ring-black/10"
				>
					<img
						src={p.image}
						alt=""
						class="h-full w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="relative mx-auto max-w-[960px] px-5 py-16 sm:px-8 md:py-24">
		{#if guides}
			<svg
				aria-hidden="true"
				class="pointer-events-none absolute inset-y-0 left-0 h-full w-1"
				preserveAspectRatio="none"
			>
				<defs>
					<pattern id="cta-dots-left" width="4" height="8" patternUnits="userSpaceOnUse">
						<circle cx="2" cy="4" r="1" class="fill-neutral-300" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#cta-dots-left)" />
			</svg>
			<svg
				aria-hidden="true"
				class="pointer-events-none absolute inset-y-0 right-0 h-full w-1"
				preserveAspectRatio="none"
			>
				<defs>
					<pattern id="cta-dots-right" width="4" height="8" patternUnits="userSpaceOnUse">
						<circle cx="2" cy="4" r="1" class="fill-neutral-300" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#cta-dots-right)" />
			</svg>
		{/if}
		<h2 class="{REVEAL} text-center text-2xl font-medium tracking-tight text-ink">
			Have a <Mark definition={highlightCalm} fillColor="#2e74ff">project or a role</Mark> in mind?
		</h2>
		<div
			class="{REVEAL} mx-auto mt-8 max-w-[560px] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_var(--color-rule),0_10px_30px_rgba(0,0,0,0.06)]"
			style="--d: 90ms"
		>
			<div class="flex items-center gap-3 border-b border-black/[0.06] px-5 py-3.5">
				<div class="relative size-9 shrink-0">
					<img src="/avatar.jpg" alt="" class="size-9 rounded-full object-cover" />
					<span
						class="absolute -right-px -bottom-px size-2.5 rounded-full bg-[#2e74ff] ring-2 ring-white"
					></span>
				</div>
				<div class="leading-tight">
					<p class="text-[15px] font-medium text-ink">Yash Deshpande</p>
					<p class="text-xs text-[#2e74ff]">Open to work</p>
				</div>
			</div>
			<div
				class="flex flex-col gap-3 overflow-hidden px-5 py-5"
				aria-live="polite"
				use:smoothResize
			>
				<p
					class="max-w-[88%] self-start rounded-[18px] rounded-bl bg-neutral-100 px-4 py-2.5 text-[15px] text-ink"
				>
					Do you have a project, or do you want to hire me?
				</p>
				{#if choice === null}
					<div class="flex flex-wrap justify-end gap-2.5" in:fade={{ duration: dur }}>
						{#each paths as p}
							<button
								type="button"
								class="cursor-pointer rounded-full border-[1.5px] border-[#2e74ff] px-[18px] py-2 text-[15px] font-medium ring ring-inset ring-offset-2 transition-all duration-200 active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e74ff] {p.id ===
								'project'
									? 'peer bg-[#2e74ff] text-white ring-white/40 ring-offset-[#2e74ff] hover:bg-white hover:text-[#2e74ff] hover:ring-[#2e74ff]/30 hover:ring-offset-white'
									: 'bg-white text-[#2e74ff] ring-[#2e74ff]/30 ring-offset-white peer-hover:bg-[#2e74ff] peer-hover:text-white peer-hover:ring-white/40 peer-hover:ring-offset-[#2e74ff]'}"
								data-cursor={p.title}
								onclick={() => (choice = p.id)}>{p.title}</button
							>
						{/each}
					</div>
				{:else}
					{@const p = paths.find((x) => x.id === choice)!}
					{@const other = paths.find((x) => x.id !== choice)!}
					<div class="flex flex-col gap-3" in:fly={{ y: 8, duration: dur }}>
						<p
							class="self-end rounded-[18px] rounded-br bg-[#2e74ff] px-4 py-2.5 text-[15px] font-medium text-white"
						>
							{p.title}
						</p>
						<div
							class="max-w-[92%] self-start rounded-[18px] rounded-bl bg-neutral-100 px-4 py-3.5"
						>
							<p class="text-sm text-soft">{p.intro}</p>
							<ul class="mt-3 mb-4 text-sm text-ink">
								{#each p.points as pt}
									<li
										class="relative border-t border-dashed border-black/15 py-1.5 pl-4 first:border-t-0"
									>
										<span
											class="absolute top-[14px] left-0 size-1.5 rounded-full border-[1.5px] border-[#2e74ff]"
										></span>
										{pt}
									</li>
								{/each}
							</ul>
							<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
								<a
									href={p.href}
									target={p.external ? '_blank' : undefined}
									rel={p.external ? 'noopener noreferrer' : undefined}
									class="rounded-full bg-linear-to-b from-[#3578ff] to-[#2e74ff] px-[18px] py-2.5 text-sm font-medium text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-inset ring-offset-2 ring-offset-[#2e74ff] transition-all duration-200 hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98"
									data-cursor={p.cta}>{p.cta}</a
								>
								{#if p.id === 'hire'}
									<a
										href="/yash-deshpande-resume.pdf"
										target="_blank"
										rel="noopener noreferrer"
										class="text-sm text-soft underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-ink"
										data-cursor="Resume">Read my resume</a
									>
								{/if}
							</div>
						</div>
						<button
							type="button"
							class="cursor-pointer self-end rounded-full border-[1.5px] border-[#2e74ff] bg-white px-[18px] py-2 text-[15px] font-medium text-[#2e74ff] ring ring-[#2e74ff]/30 ring-inset ring-offset-2 ring-offset-white transition-all duration-200 hover:bg-[#2e74ff] hover:text-white hover:ring-white/40 hover:ring-offset-[#2e74ff] active:scale-98 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2e74ff]"
							data-cursor={other.title}
							onclick={() => (choice = other.id)}>{other.title} instead</button
						>
					</div>
				{/if}
			</div>
		</div>
		<p class="{REVEAL} mt-6 text-center text-sm text-soft" style="--d: 140ms">
			<a
				href="https://cal.com/yashd-dev/discussion"
				target="_blank"
				rel="noopener noreferrer"
				class="font-medium text-ink underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
				data-cursor="Book a call">Schedule a call</a
			>
			or email me at
			<a
				href="mailto:{email}"
				class="underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
				data-cursor="Email">{email}</a
			>
		</p>
	</div>
</section>
