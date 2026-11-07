import type { ReactNode } from 'react';

export function Section({
	id,
	title,
	children
}: {
	id: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section id={id} className="case-section case-reveal scroll-mt-28">
			<h2 className="case-section__title">
				<span className="case-rise">{title}</span>
			</h2>
			<div className="case-section__body">{children}</div>
		</section>
	);
}

export function Lead({ children }: { children: ReactNode }) {
	return (
		<p className="case-lead">
			<span className="case-rise">{children}</span>
		</p>
	);
}

export function Subhead({ children }: { children: ReactNode }) {
	return <h3 className="case-subhead">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
	return <p>{children}</p>;
}

export function Pullquote({ children }: { children: ReactNode }) {
	return (
		<blockquote className="case-pullquote">
			<p>{children}</p>
		</blockquote>
	);
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
	return (
		<aside className="case-callout">
			<p className="case-callout__title">{title}</p>
			<div className="case-callout__body">{children}</div>
		</aside>
	);
}

export function Tbl({ head, rows }: { head: string[]; rows: string[][] }) {
	return (
		<div className="case-table-wrap">
			<table className="case-table">
				<thead>
					<tr>
						{head.map((h) => (
							<th key={h}>{h}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((r, i) => (
						<tr key={i}>
							{r.map((c, j) => (
								<td key={j}>{c}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export function Metrics({ items }: { items: { value: string; label: string }[] }) {
	return (
		<div className="case-metric-grid">
			{items.map((m) => (
				<div className="case-metric" key={m.label}>
					<p className="case-metric__value">{m.value}</p>
					<p className="case-metric__label">{m.label}</p>
				</div>
			))}
		</div>
	);
}

export function Fig({
	src,
	alt,
	caption,
	video,
	wide,
	phone,
	natural
}: {
	src: string;
	alt: string;
	caption: string;
	video?: boolean;
	wide?: boolean;
	phone?: boolean;
	natural?: boolean;
}) {
	return (
		<figure
			className={`case-media${wide ? ' case-media--wide' : ''}${phone ? ' case-media--phone' : ''}${natural ? ' case-media--natural' : ''}`}
		>
			{video ? (
				<video src={src} autoPlay loop muted playsInline aria-label={alt} />
			) : (
				<img src={src} alt={alt} loading="lazy" />
			)}
			<figcaption className="case-media__caption">{caption}</figcaption>
		</figure>
	);
}

export function MediaGrid({
	kind,
	children
}: {
	kind: 'phones' | 'screens' | 'solo' | '2' | '3';
	children: ReactNode;
}) {
	const cls =
		kind === 'phones'
			? 'case-media-grid case-media-grid--2 case-media-grid--phones'
			: kind === 'screens'
				? 'case-media-grid case-media-grid--3'
				: kind === '2'
					? 'case-media-grid case-media-grid--2'
					: kind === '3'
						? 'case-media-grid case-media-grid--3'
						: 'case-media-grid';
	return <div className={cls}>{children}</div>;
}

export function Spot({
	src,
	alt,
	title,
	body
}: {
	src: string;
	alt: string;
	title: string;
	body: string;
}) {
	return (
		<figure className="mn-spot">
			<div className="mn-spot__phone">
				{' '}
				<img
					src={src}
					alt={alt}
					loading="lazy"
					decoding="async"
					draggable="false"
					data-zoom="1"
					data-cursor="Open"
					tabIndex={0}
					role="button"
					aria-label={`Open larger: ${alt}`}
				/>
			</div>
			<figcaption className="mn-spot__note">
				<span className="mn-spot__line" aria-hidden="true" />
				<span className="mn-spot__title">{title}</span>
				<span className="mn-spot__body">{body}</span>
			</figcaption>
		</figure>
	);
}

export function Pair({ items }: { items: { src: string; alt: string; caption: string }[] }) {
	return (
		<div className="mn-pair">
			{items.map((it) => (
				<figure className="mn-pair__item" key={it.src}>
					{' '}
					<img
						src={it.src}
						alt={it.alt}
						loading="lazy"
						decoding="async"
						draggable="false"
						data-zoom="1"
						data-cursor="Open"
						tabIndex={0}
						role="button"
						aria-label={`Open larger: ${it.alt}`}
					/>
					<figcaption>{it.caption}</figcaption>
				</figure>
			))}
		</div>
	);
}

export function StepRow({ steps }: { steps: string[] }) {
	return (
		<div className="case-step-row">
			<div className="case-step-row__track">
				{steps.map((s, i) => (
					<span className="case-step-row__item" key={s}>
						<span className="case-step-row__pill">{s}</span>
						{i < steps.length - 1 && (
							<span className="case-step-row__arrow" aria-hidden="true">
								→
							</span>
						)}
					</span>
				))}
			</div>
		</div>
	);
}

export function Tokens({ items }: { items: { name: string; value: string; role: string }[] }) {
	return (
		<div className="case-token-grid">
			{items.map((t) => (
				<div className="case-token" key={t.name}>
					<span className="case-token__swatch" style={{ background: t.value }} aria-hidden="true" />
					<span className="case-token__name">{t.name}</span>
					<span className="case-token__value">{t.value}</span>
					<span className="case-token__role">{t.role}</span>
				</div>
			))}
		</div>
	);
}
