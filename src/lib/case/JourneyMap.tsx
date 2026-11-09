import { useMemo, useState } from 'react';

// Adapted from the toobajatoi.com/livedin interactive journey map: data-driven via props.
export type JourneyRole = {
	id: string;
	label: string;
	badge?: string;
	headline: string;
	stages: string[];
	emotion: number[];
	rows: { label: string; cells: string[] }[];
};

const ZOOM_STEPS = [0.75, 0.9, 1, 1.15, 1.35, 1.6];

type Pt = { x: number; y: number };

// catmull-rom to cubic bezier spline, ported verbatim from the reference
function smoothLine(points: Pt[]): string {
	if (points.length < 2) return '';
	let d = `M ${points[0].x} ${points[0].y}`;
	for (let n = 0; n < points.length - 1; n += 1) {
		const r = points[n - 1] ?? points[n];
		const a = points[n];
		const i = points[n + 1];
		const o = points[n + 2] ?? i;
		const l = a.x + (i.x - r.x) / 6;
		const c = a.y + (i.y - r.y) / 6;
		const dd = i.x - (o.x - a.x) / 6;
		const h = i.y - (o.y - a.y) / 6;
		d += ` C ${l} ${c}, ${dd} ${h}, ${i.x} ${i.y}`;
	}
	return d;
}

function Curve({
	points,
	line,
	width,
	height,
	gradId,
	mobile
}: {
	points: Pt[];
	line: string;
	width: number;
	height: number;
	gradId: string;
	mobile?: boolean;
}) {
	return (
		<svg
			className={`case-journey__curve ml-[7.5em] block h-[7em] w-[calc(100%-7.5em)] ${mobile ? ' case-journey__curve--mobile max-[640px]:m-0 max-[640px]:mb-4 max-[640px]:h-[4.5rem] max-[640px]:w-full' : ''}`}
			viewBox={`0 0 ${width} ${height}`}
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" style={{ stopColor: 'var(--case-accent)' }} stopOpacity="0.28" />
					<stop offset="100%" style={{ stopColor: 'var(--case-accent)' }} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path
				d={`${line} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`}
				fill={`url(#${gradId})`}
			/>
			<path
				d={line}
				fill="none"
				style={{ stroke: 'var(--case-accent)' }}
				strokeWidth="2.5"
				vectorEffect="non-scaling-stroke"
			/>
			{points.map((p, i) => (
				<circle
					key={i}
					cx={p.x}
					cy={p.y}
					r="6"
					fill="#fff"
					style={{ stroke: 'var(--case-accent)' }}
					strokeWidth="2.5"
					vectorEffect="non-scaling-stroke"
				/>
			))}
		</svg>
	);
}

export default function JourneyMap({
	roles,
	caption
}: {
	roles: JourneyRole[];
	caption?: string;
}) {
	const [roleId, setRoleId] = useState(roles[0].id);
	const [stage, setStage] = useState<number | null>(null);
	const [zoomIdx, setZoomIdx] = useState(() => {
		const i = ZOOM_STEPS.indexOf(0.75);
		return i === -1 ? 2 : i;
	});
	const zoom = {
		value: ZOOM_STEPS[zoomIdx],
		percent: Math.round(ZOOM_STEPS[zoomIdx] * 100),
		canOut: zoomIdx > 0,
		canIn: zoomIdx < ZOOM_STEPS.length - 1,
		out: () => setZoomIdx((i) => Math.max(0, i - 1)),
		in: () => setZoomIdx((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))
	};
	const role = roles.find((r) => r.id === roleId) ?? roles[0];
	const curve = useMemo(() => {
		const step = 1000 / role.emotion.length;
		const points = role.emotion.map((m, i) => ({ x: step * i + step / 2, y: 108 - m * 90 }));
		return { width: 1000, height: 120, points, line: smoothLine(points) };
	}, [role]);

	return (
		<figure className="case-interactive case-journey mx-auto my-10 w-full max-w-[52rem] text-left max-[640px]:mb-4">
			<div className="case-interactive__bar flex flex-wrap items-center justify-between gap-3 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-[0.85rem]">
				<span />
				<div className="case-interactive__controls flex flex-wrap items-center gap-2 max-[640px]:w-full max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-[0.65rem]">
					{roles.length > 1 ? (
						<div className="case-segmented flex items-center gap-1 rounded-[999px] border border-[#00000014] bg-[#f5f5f7] p-[0.2rem] max-[640px]:w-full max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-[0.35rem] max-[640px]:rounded-xl max-[640px]:p-[0.35rem]" role="tablist" aria-label="Persona">
							{roles.map((r) => (
								<button
									key={r.id}
									type="button"
									role="tab"
									aria-selected={roleId === r.id}
									className={`case-segmented__item${roleId === r.id ? ' is-active' : ''} inline-flex cursor-pointer items-center gap-[0.4rem] rounded-[999px] border-none px-[0.85rem] py-[0.4rem] text-[12.5px] font-medium text-muted transition-[background_0.18s,color_0.18s] hover:text-[#111] [&.is-active]:bg-[#111] [&.is-active]:text-white max-[640px]:min-h-[2.75rem] max-[640px]:w-full max-[640px]:flex-auto max-[640px]:flex-wrap max-[640px]:items-center max-[640px]:justify-start max-[640px]:rounded-[10px] max-[640px]:px-[0.85rem] max-[640px]:py-[0.6rem] max-[640px]:text-left max-[640px]:leading-[1.25]`}
									onClick={() => {
										setRoleId(r.id);
										setStage(null);
									}}
								>
									{r.label}
									{r.badge ? <em className="text-[10px] font-normal not-italic opacity-[0.6] max-[640px]:ml-auto max-[640px]:whitespace-nowrap">{r.badge}</em> : null}
								</button>
							))}
						</div>
					) : null}
					<div className="case-zoom inline-flex items-center gap-1 rounded-[999px] border border-[#00000014] bg-[#f5f5f7] py-[0.2rem] px-[0.35rem] max-[640px]:hidden">
						<button type="button" onClick={zoom.out} disabled={!zoom.canOut} aria-label="Zoom out" className="size-9 cursor-pointer rounded-[999px] border-none text-[16px] leading-none text-[#444] hover:not-disabled:bg-white hover:not-disabled:text-[#111] disabled:cursor-default disabled:opacity-30">
							−
						</button>
						<span className="min-w-12 text-center text-[12px] font-medium tabular-nums text-soft">{zoom.percent}%</span>
						<button type="button" onClick={zoom.in} disabled={!zoom.canIn} aria-label="Zoom in" className="size-9 cursor-pointer rounded-[999px] border-none text-[16px] leading-none text-[#444] hover:not-disabled:bg-white hover:not-disabled:text-[#111] disabled:cursor-default disabled:opacity-30">
							+
						</button>
					</div>
				</div>
			</div>
			<p className="case-journey__headline mt-4 text-[16px] font-medium leading-[1.4]">{role.headline}</p>
			<div className="case-interactive__scroll case-journey__desktop mt-5 flex justify-center overflow-x-auto overscroll-x-contain max-[640px]:hidden">
				<div className="case-journey__inner mx-auto max-w-full min-w-[34em]" style={{ fontSize: `${11.5 * zoom.value}px` }}>
					<Curve
						points={curve.points}
						line={curve.line}
						width={curve.width}
						height={curve.height}
						gradId="journeyFill"
					/>
					<table className="case-journey__table w-full table-fixed border-collapse text-[1em]">
						<thead>
							<tr>
								<th scope="col" className="case-journey__corner w-[7.5em] border border-[#00000012] border-transparent! bg-[#f5f5f7] bg-transparent! p-0 text-left align-top text-[0.95em] font-medium leading-[1.45] text-ink">
									<span className="sr-only">Layer</span>
								</th>
								{role.stages.map((sName, i) => (
									<th key={sName} scope="col" className={`border border-[#00000012] bg-[#f5f5f7] p-0 text-left align-top text-[0.95em] font-medium leading-[1.45] text-ink [&.is-active]:bg-[#111] [&.is-active]:text-white${stage === i ? ' is-active' : ''}`}>
										<button type="button" onClick={() => setStage(stage === i ? null : i)} className="w-full cursor-pointer border-none px-[0.8em] py-[0.7em] text-left [color:inherit]">
											{sName}
										</button>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{role.rows.map((row, ri) => (
								<tr key={row.label}>
									<th scope="row" className="w-[7.5em] border border-[#00000012] bg-[#fafafa] px-[0.8em] py-[0.7em] text-left align-top text-[0.8em] font-medium leading-[1.45] text-muted">{row.label}</th>
									{row.cells.map((cell, i) => (
										<td key={i} className={`border border-[#00000012] px-[0.8em] py-[0.7em] text-left align-top leading-[1.45] transition-[background_0.18s] [&.is-active]:text-[#111] [&.is-active]:[background:var(--case-accent-wash)] [&.is-active]:shadow-[inset_0_0_0_1px_var(--case-accent-line)] ${ri === role.rows.length - 1 ? ' font-medium text-ink' : ' text-soft'}${stage === i ? ' is-active' : ''}`}>
											{cell}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="case-journey__mobile hidden max-[640px]:mt-4 max-[640px]:block max-[640px]:pb-2">
				<Curve
					points={curve.points}
					line={curve.line}
					width={curve.width}
					height={curve.height}
					gradId="journeyFillMobile"
					mobile
				/>
				<ol className="case-journey__stages m-0 grid list-none! gap-[0.85rem] pl-0!">
					{role.stages.map((sName, i) => (
						<li key={sName} className="case-journey__stage-card rounded-[14px] border border-[#00000014] bg-[#fafafa] px-4 py-[0.95rem]">
							<p className="case-journey__stage-index m-0 text-[12px] font-normal text-muted">Stage {i + 1}</p>
							<h4 className="case-journey__stage-title mt-[0.35rem] text-[15px] font-medium leading-[1.3] text-ink">{sName}</h4>
							<dl className="case-journey__stage-rows mt-[0.85rem] grid gap-[0.7rem]">
								{role.rows.map((row, ri) => (
									<div key={row.label} className="case-journey__stage-row">
										<dt className="m-0 text-[12px] font-normal text-muted">{row.label}</dt>
										<dd className="mt-1 text-[14px] leading-[1.5] text-soft [overflow-wrap:anywhere]">{row.cells[i]}</dd>
									</div>
								))}
							</dl>
						</li>
					))}
				</ol>
			</div>
			{caption ? <figcaption className="case-media__caption mt-4 pb-1 text-center text-[13px]/[1.55]">{caption}</figcaption> : null}
		</figure>
	);
}


