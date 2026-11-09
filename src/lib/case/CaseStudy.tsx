import type { ComponentType } from 'react';
import * as blocks from './helpers';
import CaseBar from './CaseBar';
import CaseSidebar from './CaseSidebar';
import CaseReveal from './CaseReveal';

export type CaseMeta = {
	title: string;
	eyebrow: string;
	subtitle: string;
	role: string;
	timeline: string;
	stack: string;
	live: string;
	liveLabel: string;
	tags: string[];
	hero: string;
	heroAlt: string;
	heroCaption: string;
	sections: { id: string; label: string }[];
	next?: { href: string; title: string };
};

export default function CaseStudy({
	meta,
	content: Content
}: {
	meta: CaseMeta;
	content: ComponentType<any>;
}) {
	return (
		<div className="mn-page mn-case devatri-case devatri-case--domis devatri-case--yash relative isolate min-h-screen antialiased [font-family:Inter,system-ui,-apple-system,sans-serif] [--case-accent:#2e74ff] [--case-accent-deep:#1e5ee8] [--case-accent-text:#2667ff] [--case-accent-line:#2e74ff59] [--case-accent-tint:#2e74ff14] [--case-accent-glow:#2e74ff21] [--case-accent-wash:#fff] [--case-accent-wash-2:#fff1e9] [--mn-sans:Inter,system-ui,-apple-system,'Segoe_UI',sans-serif]  [--mn-ease:cubic-bezier(0.22,1,0.36,1)] [&_:is(h1,h2,h3,h4,h5,p,li,a,span,dt,dd,button,figcaption,blockquote,td,th,label,input,strong,em)]:[font-family:Inter,system-ui,-apple-system,sans-serif] [&_a]:[font-family:Plus_Jakarta_Sans,system-ui,-apple-system,sans-serif]! [&_h1]:[font-family:Plus_Jakarta_Sans,system-ui,-apple-system,sans-serif]! [&_h2]:[font-family:Plus_Jakarta_Sans,system-ui,-apple-system,sans-serif]! [&_h3]:[font-family:Plus_Jakarta_Sans,system-ui,-apple-system,sans-serif]! [&_:focus-visible]:[outline:2px_solid_var(--mn-accent)] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:rounded-[6px]">
			<CaseBar title={meta.title} />
			<CaseSidebar sections={meta.sections} />

			<main className="case-domis-main mx-auto w-full max-w-[680px] overflow-visible px-5 pt-[136px] pb-12 text-left max-[1023px]:pt-[92px] lg:px-6 lg:pt-[152px] lg:pb-14">
				<section id="intro" className="case-domis-intro scroll-mt-28">
					<h1 className="case-domis-intro__title case-reveal overflow-hidden text-[clamp(30px,5vw,40px)]/[1.12] font-medium tracking-[-0.025em] [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] delay-[50ms] max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none [@media(hover:none)]:delay-0">
						<span className="case-rise block [transform:translateY(110%)] [transition:transform_0.9s_var(--mn-ease)] [.case-reveal.is-visible_&]:[transform:translate(0)] max-lg:[transform:none] max-lg:transition-none motion-reduce:[transform:none] motion-reduce:transition-none [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none">{meta.title}</span>
					</h1>
					<p className="case-domis-intro__subtitle case-reveal mt-4 overflow-hidden text-[17px]/[1.65] text-pretty [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] delay-[0.13s] max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none [@media(hover:none)]:delay-0">
						<span className="case-rise block [transform:translateY(110%)] [transition:transform_0.9s_var(--mn-ease)] [.case-reveal.is-visible_&]:[transform:translate(0)] delay-[0.12s] max-lg:delay-0 [@media(hover:none)]:delay-0 motion-reduce:delay-0 max-lg:[transform:none] max-lg:transition-none motion-reduce:[transform:none] motion-reduce:transition-none [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none">{meta.subtitle}</span>
					</p>
					<div className="case-domis-intro__actions case-reveal mt-6 flex flex-wrap gap-2 opacity-0 [transform:translateY(16px)] [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] [&.is-visible]:opacity-100 [&.is-visible]:[transform:translate(0)] delay-[0.21s] max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none [@media(hover:none)]:delay-0">
						<a
							className="case-domis-store-link inline-flex items-center justify-center rounded-[999px] px-4 py-[9px] text-[13px] font-medium no-underline transition-[transform_0.35s_var(--mn-ease),opacity_0.2s_ease] hover:-translate-y-px hover:opacity-[0.88] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#111]"
							href={meta.live}
							target="_blank"
							rel="noopener noreferrer"
							data-cursor="Visit ↗"
						>
							Visit {meta.liveLabel}
						</a>
					</div>
					<dl className="case-domis-meta case-reveal opacity-0 [transform:translateY(16px)] [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] [&.is-visible]:opacity-100 [&.is-visible]:[transform:translate(0)] delay-[0.29s] max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none [@media(hover:none)]:delay-0 mt-10 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-8 gap-y-5 pt-6 text-left [border-top-style:none]">
						<div className="case-domis-meta__item">
							<dt className="text-[10.5px] font-normal tracking-[0.06em] uppercase [font-family:var(--mn-sans,'Inter',system-ui,sans-serif)]!">Role</dt>
							<dd className="mt-[6px] text-[14px]/[1.5] font-normal">{meta.role}</dd>
						</div>
						<div className="case-domis-meta__item">
							<dt className="text-[10.5px] font-normal tracking-[0.06em] uppercase [font-family:var(--mn-sans,'Inter',system-ui,sans-serif)]!">Timeline</dt>
							<dd className="mt-[6px] text-[14px]/[1.5] font-normal">{meta.timeline}</dd>
						</div>
						<div className="case-domis-meta__item">
							<dt className="text-[10.5px] font-normal tracking-[0.06em] uppercase [font-family:var(--mn-sans,'Inter',system-ui,sans-serif)]!">Stack</dt>
							<dd className="mt-[6px] text-[14px]/[1.5] font-normal">{meta.stack}</dd>
						</div>
					</dl>
					<div className="case-domis-tags case-reveal mt-6 flex flex-wrap gap-[6px] opacity-0 [transform:translateY(16px)] [transition:opacity_0.8s_var(--mn-ease),transform_0.8s_var(--mn-ease)] [&.is-visible]:opacity-100 [&.is-visible]:[transform:translate(0)] delay-[0.37s] max-lg:[transform:none] max-lg:transition-none max-lg:delay-0 motion-reduce:[transform:none] motion-reduce:transition-none motion-reduce:delay-0 [@media(hover:none)]:[transform:none] [@media(hover:none)]:transition-none [@media(hover:none)]:delay-0">
						{meta.tags.map((t) => (
							<span className="case-domis-tag rounded-[999px] border-none px-[10px] py-1 text-[12px] font-normal normal-case tracking-normal" key={t}>
								{t}
							</span>
						))}
					</div>
					<figure className="case-media case-media--natural case-domis-hero mt-12! mb-2 overflow-hidden rounded-2xl">
						<img src={meta.hero} alt={meta.heroAlt} className="mx-auto block h-auto w-full max-w-full object-contain" />
						<figcaption className="case-media__caption mt-4 pb-1 text-center text-[13px]/[1.55]">{meta.heroCaption}</figcaption>
					</figure>
				</section>

				<div className="case-domis-sections">
					<Content components={blocks} />
				</div>

				<footer className="mn-case__next mt-2 pt-10 pb-24 [border-top-style:none]">
					{meta.next ? (
						<a className="mn-case__next-link group block py-6 text-inherit no-underline!" href={meta.next.href} data-cursor="Next case">
							<span className="mn-case__next-title mt-2 inline-flex items-center gap-2.5 text-[clamp(24px,4vw,30px)] font-medium tracking-[-0.02em]">
								{meta.next.title}
								<span aria-hidden="true" className="transition-[transform_0.45s_var(--mn-ease),color_0.25s_ease] group-hover:translate-x-[6px] group-hover:text-[var(--case-accent)]">→</span>
							</span>
						</a>
					) : (
						<span />
					)}
					<div className="mn-case__next-meta flex justify-between gap-4 pt-6 pb-2 text-[13px]">
						<a href="/#work" data-cursor="All work" className="text-inherit no-underline! transition-colors duration-200">
							All work
						</a>
					</div>
				</footer>

				<footer className="mt-24 pb-24 text-[14px]">
					<p className="font-medium">Thanks for stopping by.</p>
					<p className="mt-3 text-soft">
						Bored of the site?{' '}
						<a
							href="/play"
							className="font-medium text-ink underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
						>
							Play a round
						</a>
						.
					</p>
					<p className="mt-1 text-muted">
						<a
							href="/process"
							className="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
						>
							How I work
						</a>{' '}
						·{' '}
						<a
							href="/tools"
							className="underline decoration-rule underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-current"
						>
							Tools
						</a>{' '}
						· © 2026
					</p>
				</footer>
			</main>

			<CaseReveal />
		</div>
	);
}
