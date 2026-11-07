<script lang="ts">
	import SkyBand from '#lib/components/SkyBand.svelte';
	import IntroBlock from '#lib/components/IntroBlock.svelte';
	import LogoMarquee from '#lib/components/LogoMarquee.svelte';
	import WorkSection from '#lib/components/WorkSection.svelte';
	import ExperienceTimeline from '#lib/components/ExperienceTimeline.svelte';
</script>

<SkyBand />
<div
	class="relative z-10 mx-auto -mt-[10vh] max-w-[720px] border-x border-neutral-200"
>
	<section id="intro" class="rv translate-y-3.5 opacity-0 blur-[6px]">
		<IntroBlock />
	</section>
	<div class="rv translate-y-3.5 border-t border-neutral-200 opacity-0 blur-[6px]" data-d="80">
		<LogoMarquee />
	</div>
	<section id="work" class="rv translate-y-3.5 border-t border-neutral-200 opacity-0 blur-[6px]">
		<WorkSection />
	</section>
	<section id="experience" class="rv translate-y-3.5 border-t border-neutral-200 pb-28 opacity-0 blur-[6px]">
		<ExperienceTimeline />
	</section>
</div>
