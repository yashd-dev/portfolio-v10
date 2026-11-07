<script lang="ts">
	import AboutMe from '#lib/components/AboutMe.svelte';
	import FlightPlan from '#lib/components/FlightPlan.svelte';
	import { projects, socials, email } from '#lib/data/content.js';
	import { toolIcons } from '#lib/data/icons.js';

	const COLORS: Record<string, string> = {
		Figma: '#f24e1e',
		Svelte: '#ff3e00',
		'Next.js': '#000000',
		'Tailwind CSS': '#06b6d4',
		TypeScript: '#3178c6',
		Shopify: '#7ab55c',
		Sanity: '#f03e2f',
		Cloudflare: '#f38020',
		Vercel: '#000000',
		GitHub: '#181717'
	};

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(email);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {}
	}
</script>

<div class="pg-sky" style="--pg-scene: url(/beach.webp)" aria-hidden="true"></div>

<main class="pg-shell">
	<section id="intro" class="pg-intro">
		<AboutMe />
		<h1 class="pg-name pg-reveal" style="--d: 60ms">Hey, I'm Yash Deshpande</h1>
		<p class="pg-role pg-reveal" style="--d: 100ms">a designer & developer based in Mumbai</p>
		<div class="pg-bio pg-bio--first pg-reveal" style="--d: 160ms">
			<p>
				I design and build websites that feel considered and work smoothly, and I stick around
				after launch. Right now I'm a technical lead at
				<a
					href="https://actuallyfair.in/"
					target="_blank"
					rel="noopener noreferrer"
					class="pg-hl pg-hl--blue pg-hl--link">Actually Fair</a
				>.
			</p>
		</div>
		<div class="pg-bio pg-reveal" style="--d: 220ms">
			<p>
				I've worked across storefronts, therapy and healthcare sites, and consultancy pages, from
				Figma to production
				<mark class="pg-hl pg-hl--peach">TypeScript</mark> across SvelteKit, headless
				<mark class="pg-hl pg-hl--green">Shopify</mark>
				and the odd microservice.
			</p>
		</div>
		<nav class="pg-links pg-reveal" style="--d: 280ms" aria-label="Links">
			{#each socials as s}
				<a
					href={s.href}
					target={s.href.startsWith('http') ? '_blank' : undefined}
					rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{s.label}</a
				>
			{/each}
			<button
				type="button"
				class="pg-email"
				data-cursor="Copy email"
				aria-label="Copy email address {email}"
				onclick={copyEmail}
			>
				<span>{email}</span>
				<span class="pg-email__hint" aria-live="polite">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
						{#if copied}
							<path d="M20 6 9 17l-5-5" />
						{:else}
							<rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
						{/if}
					</svg>
				</span>
			</button>
		</nav>
		<div class="pg-tools pg-reveal" style="--d: 340ms">
			<div class="pg-tools__track">
				{#each [0, 1] as half}
					<ul class="pg-tools__row" aria-hidden={half === 1}>
						{#each toolIcons as t}
							<li class="pg-tools__item" style="--c: {COLORS[t.name] ?? '#151515'}">
								<svg viewBox="0 0 24 24" role="img" aria-label={t.name}><path d={t.path} /></svg>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	</section>

	<section id="work" class="pg-section">
		<p class="pg-label pg-reveal">Selected work</p>
		<div class="pg-projects">
			{#each projects as p, i}
				<a
					class="pg-project pg-reveal"
					style="--d: {i * 60}ms"
					href={p.link}
					target="_blank"
					rel="noopener noreferrer"
					data-cursor="Visit site"
				>
					<div class="pg-project__frame">
						<img src={p.image} alt="{p.name} homepage" loading="lazy" />
					</div>
					<div class="pg-project__text">
						<h3>
							{p.name}
							<svg class="pg-project__arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
						</h3>
						<p class="pg-project__meta">{p.meta}</p>
						<p class="pg-project__desc">{p.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<section id="experience" class="pg-section">
		<p class="pg-label pg-reveal">Experience</p>
		<FlightPlan />
	</section>

	<footer class="pg-footer pg-reveal">
		<p class="pg-footer__thanks">Thanks for stopping by.</p>
		<p class="pg-footer__meta">
			<a href="/how-i-work">How I work</a> · <a href="/tools">Tools</a> ·
			<a href="/play">Play</a> · © 2026
		</p>
	</footer>
</main>

<div class="pg-meadow" style="--pg-scene: url(/reef.webp)" aria-hidden="true"></div>
