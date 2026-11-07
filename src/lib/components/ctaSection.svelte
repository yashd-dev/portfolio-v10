<script lang="ts">
	import Mark from '#lib/components/mark.svelte';
	import { highlightCalm } from '#lib/marks.js';
	import { projects, email } from '#lib/data/content.js';
	import { REVEAL } from '#lib/reveal.js';

	let { guides = true }: { guides?: boolean } = $props();
</script>

<section
	class="relative left-[calc(50%-50vw)] mt-24 w-screen overflow-hidden max-sm:mt-[72px]"
	aria-label="Contact"
>
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden xl:block">
		<div
			class="absolute top-1/2 right-[calc(50%+448px)] flex -translate-y-1/2 flex-col gap-4 [mask-image:linear-gradient(to_right,transparent_0%,black_55%)]"
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
			class="absolute top-1/2 left-[calc(50%+448px)] flex -translate-y-1/2 flex-col gap-4 [mask-image:linear-gradient(to_left,transparent_0%,black_55%)]"
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
			class="{REVEAL} mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-black/10 shadow-[0_0_0_1px_var(--color-rule),0_10px_30px_rgba(0,0,0,0.05)] sm:grid-cols-2"
			style="--d: 90ms"
		>
			<div
				class="flex h-full min-h-0 flex-col justify-between bg-white ring-1 ring-black/10 ring-inset"
			>
				<div class="relative flex-1">
					<div class="mx-auto w-full max-w-sm px-4 py-4 md:px-8 md:py-12">
						<h3 class="text-xl font-medium text-ink">Start a project</h3>
						<p class="mt-2 max-w-sm text-sm text-soft">
							For founders and teams who need a site designed and built.
						</p>
						<span class="mt-4 block min-h-5 text-sm leading-5 text-soft/70">Freelance projects</span
						>
						<p class="text-3xl font-bold text-ink">Talk to me</p>
						<ul class="mt-6 flex flex-col gap-2 text-sm text-ink/80">
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-[#2e74ff]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Designed in Figma first, revised until you approve it</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-[#2e74ff]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>SvelteKit, React and Tailwind, production ready</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-[#2e74ff]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>A CMS you can edit yourself</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-[#2e74ff]"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Progress and feedback along the way, not just at the end</span>
							</li>
						</ul>
					</div>
				</div>
				<a
					href="/process"
					class="block w-full cursor-pointer bg-linear-to-b from-[#3578ff] to-[#4d8dff] px-6 py-4 text-center text-[15px] font-semibold text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset] ring ring-white/40 ring-offset-2 ring-offset-[#4d8dff] transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.45)_inset] hover:ring-white/60 active:scale-98"
					data-cursor="See how I work">See how I work</a
				>
			</div>
			<div
				class="flex h-full min-h-0 flex-col justify-between bg-linear-to-b from-[#3578ff] to-[#4d8dff] text-white ring-1 ring-white/20 ring-inset"
			>
				<div class="relative flex-1">
					<div class="mx-auto w-full max-w-sm px-4 py-4 md:px-8 md:py-12">
						<div class="flex items-center justify-between gap-2">
							<h3 class="text-xl font-medium">Hire me</h3>
							<span
								class="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/25 ring-inset"
								>Open to work</span
							>
						</div>
						<p class="mt-2 max-w-sm text-sm text-white/80">
							I'm open to job opportunities alongside freelance work.
						</p>
						<span class="mt-4 block min-h-5 text-sm leading-5 text-white/70">Class of 2028</span>
						<p class="text-3xl font-bold">Talk to me</p>
						<ul class="mt-6 flex flex-col gap-2 text-sm text-white/90">
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Technical lead at Actually Fair</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Full-stack developer at KonectU</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Production TypeScript across SvelteKit and headless Shopify</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>BTech Computer Engineering, MPSTME NMIMS</span>
							</li>
							<li class="flex items-center gap-2">
								<svg
									class="size-5 shrink-0 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
									aria-hidden="true"
								>
									<path
										d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
									/>
									<path d="M8 12.5L10.5 15L16 9" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
								<span>Based in Mumbai</span>
							</li>
						</ul>
						<a
							href="/yash-deshpande-resume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							class="mt-4 inline-block text-sm text-white/70 underline decoration-white/40 decoration-dotted underline-offset-[0.2em] transition-colors hover:text-white"
							data-cursor="Resume">Read my resume</a
						>
					</div>
				</div>
				<a
					href="https://cal.com/yashd-dev/discussion"
					target="_blank"
					rel="noopener noreferrer"
					class="block w-full cursor-pointer bg-linear-to-b from-[#3578ff] to-[#4d8dff] px-6 py-4 text-center text-[15px] font-semibold text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset] ring ring-white/40 ring-offset-2 ring-offset-[#4d8dff] transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.45)_inset] hover:ring-white/60 active:scale-98"
					data-cursor="Book a call">Book a call</a
				>
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
