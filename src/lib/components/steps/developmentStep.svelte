<script lang="ts">
	import { REVEAL } from '#lib/reveal.js';
</script>

<div class="flex h-full flex-col">
	<div
		class="relative flex-1 bg-[linear-gradient(rgba(255,255,255,0.6),rgba(255,255,255,0.6)),url(/clouds.webp)] bg-cover bg-center px-4 py-6 shadow-[0px_0px_14px_0px_var(--color-neutral-200)_inset] md:px-8 md:py-8"
	>
		<div
			class="relative z-20 h-full min-h-96 w-full overflow-hidden rounded-xl bg-white shadow-[0_24px_40px_-20px_rgba(38,38,43,0.30),0_10px_24px_0_rgba(38,38,43,0.06),0_1px_1px_0_rgba(38,38,43,0.16),0_0_0_1px_rgba(38,38,43,0.05),0_8px_14px_-10px_rgba(38,38,43,0.40)]"
		>
			<div class="{REVEAL} absolute top-7 left-5 w-[70%] md:top-9 md:left-8" style="--d: 60ms">
				<div class="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/10">
					<div class="flex items-center gap-1.5 bg-neutral-50 px-3 py-2">
						<span class="size-1.5 rounded-full bg-neutral-300"></span>
						<span class="size-1.5 rounded-full bg-neutral-300"></span>
						<span class="size-1.5 rounded-full bg-neutral-300"></span>
						<span
							class="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[9px] text-neutral-400 ring-1 ring-neutral-100"
							>actuallyfair.in</span
						>
					</div>
					<img
						src="/work/actuallyfair.png"
						alt="Actually Fair storefront on desktop"
						class="block aspect-[16/9] w-full object-cover object-top"
					/>
				</div>
			</div>
			<div class="{REVEAL} absolute right-[27%] bottom-5 w-[23%]" style="--d: 200ms">
				<div class="rounded-[1rem] bg-neutral-900 p-[3px] shadow-xl ring-1 ring-black/20">
					<div class="overflow-hidden rounded-[0.8rem] bg-white">
						<img
							src="/work/m-twk.png"
							alt="Therapy With Kinnari site on mobile"
							class="block aspect-[390/720] w-full object-cover object-top"
						/>
					</div>
				</div>
			</div>
			<div class="{REVEAL} absolute right-5 bottom-9 w-[23%] md:right-8" style="--d: 340ms">
				<div class="rounded-[1rem] bg-neutral-900 p-[3px] shadow-xl ring-1 ring-black/20">
					<div class="overflow-hidden rounded-[0.8rem] bg-white">
						<img
							src="/work/m-mypaithani.png"
							alt="MyPaithani storefront on mobile"
							class="block aspect-[390/720] w-full object-cover object-top"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
