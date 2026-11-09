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
			className={`case-journey__curve${mobile ? ' case-journey__curve--mobile' : ''}`}
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
		<figure className="case-interactive case-journey">
			<div className="case-interactive__bar">
				<span />
				<div className="case-interactive__controls">
					{roles.length > 1 ? (
						<div className="case-segmented" role="tablist" aria-label="Persona">
							{roles.map((r) => (
								<button
									key={r.id}
									type="button"
									role="tab"
									aria-selected={roleId === r.id}
									className={`case-segmented__item${roleId === r.id ? ' is-active' : ''}`}
									onClick={() => {
										setRoleId(r.id);
										setStage(null);
									}}
								>
									{r.label}
									{r.badge ? <em>{r.badge}</em> : null}
								</button>
							))}
						</div>
					) : null}
					<div className="case-zoom">
						<button type="button" onClick={zoom.out} disabled={!zoom.canOut} aria-label="Zoom out">
							−
						</button>
						<span>{zoom.percent}%</span>
						<button type="button" onClick={zoom.in} disabled={!zoom.canIn} aria-label="Zoom in">
							+
						</button>
					</div>
				</div>
			</div>
			<p className="case-journey__headline">{role.headline}</p>
			<div className="case-interactive__scroll case-journey__desktop">
				<div className="case-journey__inner" style={{ fontSize: `${11.5 * zoom.value}px` }}>
					<Curve
						points={curve.points}
						line={curve.line}
						width={curve.width}
						height={curve.height}
						gradId="journeyFill"
					/>
					<table className="case-journey__table">
						<thead>
							<tr>
								<th scope="col" className="case-journey__corner">
									<span className="sr-only">Layer</span>
								</th>
								{role.stages.map((sName, i) => (
									<th key={sName} scope="col" className={stage === i ? 'is-active' : undefined}>
										<button type="button" onClick={() => setStage(stage === i ? null : i)}>
											{sName}
										</button>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{role.rows.map((row) => (
								<tr key={row.label}>
									<th scope="row">{row.label}</th>
									{row.cells.map((cell, i) => (
										<td key={i} className={stage === i ? 'is-active' : undefined}>
											{cell}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="case-journey__mobile">
				<Curve
					points={curve.points}
					line={curve.line}
					width={curve.width}
					height={curve.height}
					gradId="journeyFillMobile"
					mobile
				/>
				<ol className="case-journey__stages">
					{role.stages.map((sName, i) => (
						<li key={sName} className="case-journey__stage-card">
							<p className="case-journey__stage-index">Stage {i + 1}</p>
							<h4 className="case-journey__stage-title">{sName}</h4>
							<dl className="case-journey__stage-rows">
								{role.rows.map((row) => (
									<div key={row.label} className="case-journey__stage-row">
										<dt>{row.label}</dt>
										<dd>{row.cells[i]}</dd>
									</div>
								))}
							</dl>
						</li>
					))}
				</ol>
			</div>
			{caption ? <figcaption className="case-media__caption">{caption}</figcaption> : null}
		</figure>
	);
}
