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
		<div className="mn-page mn-case devatri-case devatri-case--domis devatri-case--yash">
			<CaseBar title={meta.title} />
			<CaseSidebar sections={meta.sections} />

			<main className="case-domis-main">
				<section id="intro" className="case-domis-intro scroll-mt-28">
					<h1 className="case-domis-intro__title case-reveal">
						<span className="case-rise">{meta.title}</span>
					</h1>
					<p className="case-domis-intro__subtitle case-reveal">
						<span className="case-rise">{meta.subtitle}</span>
					</p>
					<div className="case-domis-intro__actions case-reveal">
						<a
							className="case-domis-store-link"
							href={meta.live}
							target="_blank"
							rel="noopener noreferrer"
							data-cursor="Visit ↗"
						>
							Visit {meta.liveLabel}
						</a>
					</div>
					<dl className="case-domis-meta case-reveal">
						<div className="case-domis-meta__item">
							<dt>Role</dt>
							<dd>{meta.role}</dd>
						</div>
						<div className="case-domis-meta__item">
							<dt>Timeline</dt>
							<dd>{meta.timeline}</dd>
						</div>
						<div className="case-domis-meta__item">
							<dt>Stack</dt>
							<dd>{meta.stack}</dd>
						</div>
					</dl>
					<div className="case-domis-tags case-reveal">
						{meta.tags.map((t) => (
							<span className="case-domis-tag" key={t}>
								{t}
							</span>
						))}
					</div>
					<figure className="case-media case-media--natural case-domis-hero">
						<img src={meta.hero} alt={meta.heroAlt} />
						<figcaption className="case-media__caption">{meta.heroCaption}</figcaption>
					</figure>
				</section>

				<div className="case-domis-sections">
					<Content components={blocks} />
				</div>

				<footer className="mn-case__next">
					{meta.next ? (
						<a className="mn-case__next-link" href={meta.next.href} data-cursor="Next case">
														<span className="mn-case__next-title">
								{meta.next.title}
								<span aria-hidden="true">→</span>
							</span>
						</a>
					) : (
						<span />
					)}
					<div className="mn-case__next-meta">
						<a href="/#work" data-cursor="All work">
							All work
						</a>
					</div>
				</footer>
			</main>

			<CaseReveal />
		</div>
	);
}
