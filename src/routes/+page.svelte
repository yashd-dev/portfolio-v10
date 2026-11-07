<script lang="ts">
	import HeroBirds from '#lib/components/HeroBirds.svelte';
	import Polaroid from '#lib/components/Polaroid.svelte';
	import Mark from '#lib/components/Mark.svelte';
	import { highlightCalm } from '#lib/marks.js';
	import FlightPlan from '#lib/components/FlightPlan.svelte';
	import { projects, socials, email, freelance, education } from '#lib/data/content.js';
	import { toolIcons } from '#lib/data/icons.js';
	import { REVEAL } from '#lib/reveal.js';

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {}
	}
</script>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] bg-[url(/beach.webp)] bg-cover bg-[center_71%] opacity-85 [filter:saturate(0.85)_brightness(1.02)] [mask-image:linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.85)_55%,transparent_100%)]"
>
	<HeroBirds />
</div>

<main
	class="relative mx-auto w-full max-w-6xl px-5 pt-[140px] pb-10 before:pointer-events-none before:absolute before:top-24 before:bottom-0 before:left-0 before:-z-10 before:w-px before:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] before:[background-size:1px_8px] before:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] after:pointer-events-none after:absolute after:top-24 after:right-0 after:bottom-0 after:-z-10 after:w-px after:[background-image:linear-gradient(to_bottom,var(--color-guide)_50%,transparent_50%)] after:[background-size:1px_8px] after:[mask-image:linear-gradient(to_bottom,transparent,#000_72px)] max-sm:pt-28 max-sm:before:hidden max-sm:after:hidden"
>
	<section id="intro" class="pg-intro relative">
		<div class="max-w-[600px]">
			<h1 class="{REVEAL} text-[16px] font-medium leading-normal" style="--d: 60ms">
				Hey, I'm Yash Deshpande
			</h1>
			<p class={REVEAL} style="--d: 100ms">a designer & developer based in Mumbai</p>
			<div class="{REVEAL} mt-[26px]" style="--d: 160ms">
				<p class="text-pretty text-soft">
					I design and build websites that feel considered and work smoothly, and I stick around
					after launch. Right now I'm taking on
					<Mark definition={highlightCalm} fillColor="#8ab6f2">client projects</Mark>.
				</p>
			</div>
			<div class="{REVEAL} mt-6" style="--d: 220ms">
				<p class="text-pretty text-soft">
					I've worked across storefronts, therapy and healthcare sites, and consultancy pages,
					from Figma to production
					<Mark definition={highlightCalm} fillColor="#ffb26b">TypeScript</Mark>
					across SvelteKit, headless
					<Mark definition={highlightCalm} fillColor="#8ed3a4">Shopify</Mark>
					and the odd microservice.
				</p>
			</div>
			<nav
				class="{REVEAL} mt-8 flex flex-wrap items-center gap-y-1 text-muted"
				style="--d: 280ms"
				aria-label="Links"
			>
				{#each socials as s, i}
					{#if i > 0}<span class="mx-2 text-faint">·</span>{/if}
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-colors duration-200 hover:text-ink">{s.label}</a
					>
				{/each}
				<button
					type="button"
					class="inline-flex cursor-pointer items-center gap-1.5 transition-colors duration-200 hover:text-ink max-sm:mt-1 max-sm:basis-full"
					data-cursor="Copy email"
					aria-label="Copy email address {email}"
					onclick={copyEmail}
				>
					<span class="mx-2 hidden text-faint max-sm:hidden! sm:inline">·</span>
					<span>{email}</span>
					<span class="inline-flex min-w-[13px] text-xs" aria-live="polite">
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-muted" aria-hidden="true">
							{#if copied}
								<path d="M20 6 9 17l-5-5" class="text-accent" />
							{:else}
								<rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
							{/if}
						</svg>
					</span>
				</button>
			</nav>
		</div>

		<div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[400px] lg:block">
			<Polaroid
				src="/devfest.jpg"
				alt="Yash speaking on stage at Google DevFest"
				caption="Speaking at DevFest"
				class="{REVEAL} pointer-events-auto absolute top-2 right-44 -rotate-3 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none"
			/>
			<Polaroid
				src="/teaching.webp"
				alt="Yash teaching web development in a classroom"
				caption="Teaching web dev"
				class="{REVEAL} pointer-events-auto absolute top-40 right-0 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none"
			/>
		</div>
		<div class="mt-12 flex items-start gap-5 lg:hidden">
			<Polaroid
				src="/devfest.jpg"
				alt="Yash speaking on stage at Google DevFest"
				caption="Speaking at DevFest"
				class="{REVEAL} w-36 -rotate-3 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none sm:w-44"
			/>
			<Polaroid
				src="/teaching.webp"
				alt="Yash teaching web development in a classroom"
				caption="Teaching web dev"
				class="{REVEAL} mt-8 w-36 rotate-2 transition-transform duration-500 ease-out hover:rotate-0 motion-reduce:transition-none sm:mt-10 sm:w-44"
			/>
		</div>

		<div class="max-w-[600px]">
			<div
				class="{REVEAL} group mt-12 mb-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
				style="--d: 340ms"
			>
				<div class="flex w-max animate-tools group-hover:[animation-play-state:paused] motion-reduce:animate-none">
					{#each [0, 1] as half}
						<ul class="m-0 flex list-none items-center gap-10 px-6 py-2" aria-hidden={half === 1}>
							{#each toolIcons as t}
								<li class="group/item grid h-[30px] flex-none place-items-center" style="--c: {t.color}" data-cursor={t.name}>
									<svg
										viewBox="0 0 24 24"
										role="img"
										aria-label={t.name}
										class="block h-[26px] w-auto fill-ink opacity-[0.28] transition-[fill,opacity,transform] duration-[350ms] ease-(--ease-spring) group-hover/item:-translate-y-0.5 group-hover/item:scale-[1.12] group-hover/item:fill-(--c) group-hover/item:opacity-100"
									><path d={t.path} /></svg>
								</li>
							{/each}
						</ul>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section id="work" class="mt-24 scroll-mt-[88px] max-sm:mt-[72px]">
		<p class="{REVEAL} mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Selected work</p>
		<div class="grid gap-x-8 gap-y-14 sm:grid-cols-2 max-sm:gap-11">
			{#each projects as p, i}
				<a
					class="{REVEAL} group block"
					style="--d: {i * 60}ms"
					href={p.link}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor="Visit site"
				>
					<div class="rounded-2xl transition-[transform,opacity] duration-[180ms] ease-(--ease-mn) group-active:scale-[0.975] group-active:opacity-[0.88]">
						<img
							src={p.image}
							alt="{p.name} homepage"
							loading="lazy"
							class="block aspect-[16/10] w-full rounded-2xl bg-card object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.04)] transition-[transform,filter] duration-[700ms] ease-(--ease-mn) group-hover:scale-[1.012]"
						/>
					</div>
					<div class="mt-4">
						<h3 class="flex items-center gap-1.5 text-[15px] font-medium leading-[1.4]">
							{p.name}
							<svg class="-translate-x-1 text-muted opacity-0 transition-[opacity,transform] duration-300 ease-(--ease-mn) group-hover:translate-x-0 group-hover:opacity-100" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
						</h3>
						<p class="mt-0.5 mb-2 text-[11px] tracking-[0.02em] text-faint">{p.meta}</p>
						<p class="text-[14px] leading-[1.6] text-soft">{p.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section id="experience" class="mt-24 grid scroll-mt-[88px] gap-16 md:grid-cols-2 max-sm:mt-[72px]">
		<div>
			<p class="{REVEAL} mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Experience</p>
			<FlightPlan />
		</div>
		<div>
			<div class="{REVEAL}">
			<p class="mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Freelance</p>
			<div class="border-t border-rule">
				<div class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent">
					<div>
						<span class="font-medium">{freelance.org}</span>
						<span class="text-muted"> · {freelance.role} · {freelance.place}</span>
						<p class="mt-0.5 text-soft">{freelance.note}</p>
					</div>
					<span class="shrink-0 text-[11px] text-muted">{freelance.span}</span>
				</div>
			</div>
		</div>
		<div class="{REVEAL} mt-12">
			<p class="mb-[22px] text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Education</p>
			<div class="border-t border-rule">
				<div class="group/row flex items-baseline justify-between gap-4 border-b border-rule py-[15px] text-[14px] transition-[color,padding] duration-200 ease-(--ease-mn) hover:pl-1.5 hover:text-accent">
					<div>
						<span class="font-medium">{education.org}</span>
						<span class="text-muted"> · {education.role} · {education.place}</span>
					</div>
					<span class="shrink-0 text-[11px] text-muted">{education.span}</span>
				</div>
			</div>
		</div>
		</div>
	</section>

	<footer class="{REVEAL} mt-28 pb-[220px] text-[14px] max-sm:pb-[170px]">
		<p class="font-medium">Thanks for stopping by.</p>
		<p class="mt-1 text-muted">
			<a href="/how-i-work" class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current">How I work</a> ·
			<a href="/tools" class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current">Tools</a> ·
			<a href="/play" class="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current">Play</a> · © 2026
		</p>
	</footer>
</main>

<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[420px] bg-[url(/reef.webp)] bg-cover bg-[center_88%] opacity-50 [filter:saturate(0.6)_brightness(1.06)_contrast(0.92)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.55)_45%,#000_100%)] transition-opacity duration-500 max-sm:h-[300px]"
></div>
