export type AnnotateNote = { title: string; body: string };

export default function Annotate({
	src,
	alt,
	phone,
	wide,
	notes,
	caption
}: {
	src: string;
	alt: string;
	phone?: boolean;
	wide?: boolean;
	notes: AnnotateNote[];
	caption?: string;
}) {
	return (
		<div className={`case-annotate${wide ? ' case-annotate--wide' : ''}`}>
			<figure className={`case-media${phone ? ' case-media--phone' : ''}`}>
				<img src={src} alt={alt} loading="lazy" decoding="async" />
			</figure>
			<div>
				<ol className="case-annotate__notes">
					{notes.map((n, i) => (
						<li className="case-annotate__note" key={n.title}>
							<span className="case-annotate__index">{String(i + 1).padStart(2, '0')}</span>
							<div>
								<h3 className="case-annotate__title">{n.title}</h3>
								<p className="case-annotate__body">{n.body}</p>
							</div>
						</li>
					))}
				</ol>
				{caption ? <p className="case-media__caption">{caption}</p> : null}
			</div>
		</div>
	);
}
