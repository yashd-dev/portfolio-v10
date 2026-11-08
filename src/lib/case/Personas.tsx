export type Persona = {
	name: string;
	tag: string;
	quote: string;
	rows: { label: string; text: string }[];
};

function initials(name: string): string {
	return name
		.replace(/^(The|A|An)\s+/i, '')
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0]?.toUpperCase() ?? '')
		.join('');
}

export default function Personas({ items }: { items: Persona[] }) {
	return (
		<div className="case-personas">
			{items.map((p) => (
				<article className="case-persona" key={p.name}>
					<header className="case-persona__head">
						<span className="case-persona__avatar" aria-hidden="true">
							{initials(p.name)}
						</span>
						<div>
							<h3 className="case-persona__name">{p.name}</h3>
							<p className="case-persona__tag">{p.tag}</p>
						</div>
					</header>
					<p className="case-persona__quote">&ldquo;{p.quote}&rdquo;</p>
					<dl className="case-persona__rows">
						{p.rows.map((r) => (
							<div key={r.label}>
								<dt>{r.label}</dt>
								<dd>{r.text}</dd>
							</div>
						))}
					</dl>
				</article>
			))}
		</div>
	);
}
