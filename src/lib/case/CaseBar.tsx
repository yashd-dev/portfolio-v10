import { useEffect, useState } from 'react';

export default function CaseBar({ title }: { title: string }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 140);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header className={`mn-nav mn-casebar${scrolled ? ' is-scrolled' : ''}`}>
			<div className="mn-nav__inner">
				<div className="mn-casebar__left">
					<a href="/#work" className="mn-casebar__back" data-cursor="All work">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
						Back
					</a>
					<span className="mn-casebar__title">{title}</span>
				</div>
				<div className="mn-casebar__right">
					<a
						href="/"
						className="mn-casebar__close"
						aria-label="Close case study"
						data-cursor="Close"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden="true"
						>
							<path d="M6 6l12 12M18 6 6 18" />
						</svg>
					</a>
				</div>
			</div>
		</header>
	);
}
