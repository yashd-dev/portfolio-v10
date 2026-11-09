import RelayAvatar from './RelayAvatar';

export type Persona = {
	name: string;
	tag: string;
	quote: string;
	rows: { label: string; text: string }[];
};

export default function Personas({ items }: { items: Persona[] }) {
	return (
		<div className="my-7 grid gap-6 min-[900px]:grid-cols-3 min-[900px]:gap-5">
			{items.map((p) => (
				<article className="flex flex-col rounded-2xl border border-[#00000014] bg-white px-[1.3rem] pt-[1.45rem] pb-[1.4rem]" key={p.name}>
					<header className="flex items-center gap-[0.9rem]">
						<span className="block size-[46px] flex-none overflow-hidden rounded-full [&_svg]:block [&_svg]:size-full" aria-hidden="true">
							<RelayAvatar name={p.name} />
						</span>
						<div>
							<h3 className="m-0 text-[15.5px] leading-[1.3] font-[weight:650]">{p.name}</h3>
							<p className="mt-[0.15rem] text-[12.5px] text-[#999]">{p.tag}</p>
						</div>
					</header>
					<p className="mt-5 border-l-2 border-[#09a389] pl-[0.8rem] text-[14.5px] leading-[1.55] text-[#111] italic">&ldquo;{p.quote}&rdquo;</p>
					<dl className="mt-[1.35rem] flex flex-col gap-[1.1rem] [&_dd]:mt-[0.35rem] [&_dd]:text-[13.5px] [&_dd]:leading-[1.6] [&_dd]:text-[#555] [&_dt]:text-[13px] [&_dt]:font-normal [&_dt]:text-[#b5b5b5]">
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
