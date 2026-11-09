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
		<div
			className={`case-annotate grid gap-6${wide ? ' case-annotate--wide min-[900px]:grid-cols-[minmax(0,1fr)] min-[900px]:items-start min-[900px]:gap-8' : ' min-[900px]:grid-cols-[minmax(0,360px)_minmax(0,1fr)] min-[900px]:items-start min-[900px]:gap-8'}`}
		>
			<figure className={`case-media my-2 mx-auto${phone ? ' case-media--phone' : ''}`}>
				<img
					src={src}
					alt={alt}
					loading="lazy"
					decoding="async"
					className={wide ? 'mx-auto block h-auto w-full! max-w-full! object-contain' : phone ? 'mx-auto block h-auto w-full object-contain max-w-[min(100%,232px)]' : 'mx-auto block h-auto w-full object-contain max-w-[min(100%,232px)]'}
				/>
			</figure>
			<div>
				<ol
					className={`case-annotate__notes m-0 flex list-none flex-col gap-[0.85rem] p-0${wide ? ' min-[900px]:grid min-[900px]:grid-cols-3 min-[900px]:items-start min-[900px]:gap-4' : ''}`}
				>
					{notes.map((n, i) => (
						<li
							className="case-annotate__note grid grid-cols-[auto_1fr] gap-[0.85rem] rounded-[14px] border-none p-[1rem_1.1rem] text-left"
							key={n.title}
						>
							<span className="case-annotate__index pt-[0.15rem] text-[12px] font-medium [color:var(--case-accent-text,#16a34a)]">
								{String(i + 1).padStart(2, '0')}
							</span>
							<div>
								<h3 className="case-annotate__title m-0 text-[15px] font-medium text-ink">
									{n.title}
								</h3>
								<p className="case-annotate__body m-0 mt-[0.25rem] text-[14px] leading-[1.55] text-soft">
									{n.body}
								</p>
							</div>
						</li>
					))}
				</ol>
				{caption ? <p className="case-media__caption mt-4 pb-1 text-center text-[13px]/[1.55]">{caption}</p> : null}
			</div>
		</div>
	);
}
