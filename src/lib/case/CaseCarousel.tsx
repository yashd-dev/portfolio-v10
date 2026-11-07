import { useEffect, useRef } from 'react';

const SPEED = 0.35;

export type CaseSlide = [src: string, alt: string, caption: string];

export default function CaseCarousel({
	caption,
	slides: SLIDES
}: {
	caption?: string;
	slides: CaseSlide[];
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const hoverRef = useRef(false);
	const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null);
	const loop = SLIDES.length > 2;

	useEffect(() => {
		const track = trackRef.current;
		if (!track || !loop) return;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let raf = 0;
		let acc = 0;
		let visible = true;
		const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
		io.observe(track);
		const step = () => {
			const half = track.scrollWidth / 2;
			if (!reduced && visible && !hoverRef.current && !dragRef.current) {
				acc += SPEED;
				const whole = Math.floor(acc);
				if (whole) {
					track.scrollLeft += whole;
					acc -= whole;
				}
			}
			if (track.scrollLeft >= half) track.scrollLeft -= half;
			else if (track.scrollLeft <= 0 && dragRef.current) track.scrollLeft += half;
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
		};
	}, [loop]);

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.pointerType !== 'mouse') return;
		const track = trackRef.current;
		if (!track) return;
		dragRef.current = { x: e.clientX, left: track.scrollLeft, moved: false };
		track.setPointerCapture(e.pointerId);
	};
	const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current;
		if (!track || !dragRef.current) return;
		const dx = e.clientX - dragRef.current.x;
		if (Math.abs(dx) > 3) dragRef.current.moved = true;
		track.scrollLeft = dragRef.current.left - dx;
	};
	const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		const track = trackRef.current;
		if (track?.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
		dragRef.current = null;
	};
	const slideBy = (dir: number) => {
		const track = trackRef.current;
		const first = track?.firstElementChild as HTMLElement | null;
		if (!track || !first) return;
		const w = first.offsetWidth + 16;
		track.scrollBy({ left: dir * w, behavior: 'smooth' });
	};

	const slides = loop ? [...SLIDES, ...SLIDES] : SLIDES;

	return (
		<figure className="mn-carousel" aria-roledescription="carousel">
			<div
				ref={trackRef}
				className={`mn-carousel__track${loop ? ' is-loop' : ''}`}
				data-lenis-prevent-wheel="true"
				data-cursor="Drag"
				tabIndex={0}
				aria-label="Screens. Hover to pause, drag to browse."
				onPointerEnter={() => (hoverRef.current = true)}
				onPointerLeave={() => (hoverRef.current = false)}
				onFocus={() => (hoverRef.current = true)}
				onBlur={() => (hoverRef.current = false)}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onKeyDown={(e) => {
					if (e.key === 'ArrowRight') {
						e.preventDefault();
						slideBy(1);
					} else if (e.key === 'ArrowLeft') {
						e.preventDefault();
						slideBy(-1);
					}
				}}
			>
				{slides.map(([src, alt, cap], i) => (
					<div
						className="mn-carousel__slide"
						key={src + i}
						aria-hidden={i >= SLIDES.length ? true : undefined}
						role={i < SLIDES.length ? 'group' : undefined}
						aria-roledescription={i < SLIDES.length ? 'slide' : undefined}
						aria-label={i < SLIDES.length ? `${i + 1} of ${SLIDES.length}` : undefined}
					>
						{' '}
						<img
							src={src}
							alt={i < SLIDES.length ? alt : ''}
							loading="lazy"
							decoding="async"
							draggable={false}
						/>
						{cap ? <p className="mn-carousel__caption">{cap}</p> : null}
					</div>
				))}
			</div>
			{caption ? <figcaption className="case-media__caption">{caption}</figcaption> : null}
		</figure>
	);
}
