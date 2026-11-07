<script lang="ts">
	import { REVEAL } from '#lib/reveal.js';

	const CURRENCIES = [
		{ code: 'INR', symbol: '₹', rate: 1 },
		{ code: 'USD', symbol: '$', rate: 0.012 },
		{ code: 'EUR', symbol: '€', rate: 0.011 },
		{ code: 'GBP', symbol: '£', rate: 0.0095 },
		{ code: 'AUD', symbol: 'A$', rate: 0.018 },
		{ code: 'CAD', symbol: 'C$', rate: 0.016 },
		{ code: 'AED', symbol: 'AED ', rate: 0.044 }
	] as const;

	const BUDGET_RANGES_INR = [
		{ min: 30000, max: 50000 },
		{ min: 50000, max: 80000 },
		{ min: 80000, max: 120000 },
		{ min: 120000, max: null }
	];

	type Currency = (typeof CURRENCIES)[number];

	let currencyCode = $state<Currency['code']>('INR');
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	let selectedCurrency = $derived(CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0]);

	function formatBudgetValue(amount: number, currency: Currency) {
		const converted = amount * currency.rate;
		if (currency.code === 'INR') {
			if (amount >= 100000) return `${currency.symbol}${(amount / 100000).toFixed(1)} lakh`;
			return `${currency.symbol}${Math.round(amount / 1000)}k`;
		}
		if (converted >= 1000) return `${currency.symbol}${(converted / 1000).toFixed(1)}k`;
		return `${currency.symbol}${Math.round(converted)}`;
	}

	function formatBudgetRange(range: (typeof BUDGET_RANGES_INR)[number], currency: Currency) {
		const min = formatBudgetValue(range.min, currency);
		if (!range.max) return `${min}+`;
		return `${min}-${formatBudgetValue(range.max, currency)}`;
	}

	const FIELD =
		'border-0 border-b border-neutral-300 bg-transparent px-0 pt-1 pb-3 text-[18px] leading-snug text-ink transition-colors outline-none placeholder:text-faint focus:border-ink';
	const LABEL = 'grid gap-2.5 text-sm leading-5 text-muted';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		formState = 'submitting';
		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: { Accept: 'application/json' }
			});
			if (response.ok) {
				form.reset();
				currencyCode = 'INR';
				formState = 'success';
			} else {
				formState = 'error';
			}
		} catch {
			formState = 'error';
		}
	}
</script>

<div class="px-6 sm:px-10">
	<p
		class="{REVEAL} mt-24 mb-[22px] text-[11px] font-medium tracking-[0.08em] text-muted uppercase"
	>
		Start a project
	</p>
	<div class="{REVEAL} grid gap-10 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-16">
		<h3 class="text-2xl font-medium tracking-tight text-ink">Tell me what you need built.</h3>
		<form
			action="https://formspree.io/f/xljgggoo"
			method="POST"
			onsubmit={handleSubmit}
			class="grid gap-8"
		>
			<div class="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
				<label class={LABEL}>
					Name
					<input
						type="text"
						name="name"
						required
						autocomplete="name"
						class={FIELD}
						placeholder="Your name"
					/>
				</label>
				<label class={LABEL}>
					Email
					<input
						type="email"
						name="email"
						required
						autocomplete="email"
						class={FIELD}
						placeholder="you@example.com"
					/>
				</label>
			</div>

			<label class={LABEL}>
				Business / website
				<input
					type="text"
					name="business"
					autocomplete="organization"
					class={FIELD}
					placeholder="Your business or current website"
				/>
			</label>

			<div class="grid gap-8">
				<input type="hidden" name="currency" value={currencyCode} />

				<div class="grid gap-3 text-sm leading-5 text-muted">
					Currency
					<div class="flex flex-wrap gap-2.5">
						{#each CURRENCIES as currency}
							<button
								type="button"
								onclick={() => (currencyCode = currency.code)}
								class="rounded-full border px-4 py-2.5 text-sm leading-none transition-colors {currencyCode ===
								currency.code
									? 'border-[#2e74ff] bg-[#2e74ff] text-white'
									: 'border-neutral-300 text-ink hover:border-ink'}"
							>
								{currency.code}
							</button>
						{/each}
					</div>
				</div>

				<div class="grid gap-3 text-sm leading-5 text-muted">
					Budget range
					<div class="grid grid-cols-2 gap-x-8 gap-y-3 max-sm:grid-cols-1 max-sm:gap-y-0">
						{#each BUDGET_RANGES_INR as range}
							{@const label = formatBudgetRange(range, selectedCurrency)}
							<label class="group cursor-pointer">
								<input
									type="radio"
									name="budget_range"
									value="{currencyCode} {label}"
									required
									class="peer sr-only"
								/>
								<span
									class="block border-b border-neutral-300 pt-3 pb-4 text-[18px] leading-none text-ink transition-colors group-hover:border-ink peer-checked:border-ink peer-checked:text-accent max-sm:py-4"
								>
									{label}
								</span>
							</label>
						{/each}
					</div>
				</div>
			</div>

			<label class={LABEL}>
				What do you need?
				<textarea
					name="message"
					required
					rows={4}
					class="min-h-32 resize-y border-0 border-b border-neutral-300 bg-transparent px-0 pt-1 pb-3 text-[18px] leading-[1.5] text-ink transition-colors outline-none placeholder:text-faint focus:border-ink"
					placeholder="A new site, redesign, Shopify store, timeline, budget..."></textarea>
			</label>

			<button
				type="submit"
				disabled={formState === 'submitting'}
				class="mt-2 inline-flex h-11 w-fit items-center rounded-full bg-[#2e74ff] px-6 text-[14px] font-medium text-white transition-[transform,background-color] duration-300 ease-(--ease-mn) hover:-translate-y-0.5 hover:bg-[#2667ff] disabled:opacity-60 max-sm:w-full max-sm:justify-center"
				data-cursor="Send"
			>
				{formState === 'submitting' ? 'Sending...' : 'Send project details'}
			</button>

			{#if formState === 'success'}
				<p role="status" class="max-w-[520px] text-[18px] leading-[1.3] text-ink">
					Thanks. Your project details landed safely. I'll read through it and get back to you soon.
				</p>
			{/if}

			{#if formState === 'error'}
				<p role="alert" class="max-w-[520px] text-base leading-6 text-soft">
					Something got stuck while sending. Please try again in a moment.
				</p>
			{/if}
		</form>
	</div>
</div>
