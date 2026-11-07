import { useEffect, useState } from 'react';

export type CaseSectionLink = { id: string; label: string };

export default function CaseSidebar({ sections }: { sections: CaseSectionLink[] }) {
	const [active, setActive] = useState(sections[0]?.id ?? '');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: '-20% 0px -70% 0px' }
		);
		sections.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});
		return () => observer.disconnect();
	}, [sections]);

	const go = (id: string) => (e: React.MouseEvent) => {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	return (
		<>
			<aside className="case-sidebar" aria-label="Case study sections">
				<nav className="case-sidebar__nav">
					<ul>
						{sections.map((s, i) => (
							<li key={s.id}>
								<a
									href={`#${s.id}`}
									onClick={go(s.id)}
									className={`case-sidebar__link${active === s.id ? ' is-active' : ''}`}
								>
									<span className="case-sidebar__num">{String(i + 1).padStart(2, '0')}</span>
									<span className="case-sidebar__label">{s.label}</span>
								</a>
							</li>
						))}
					</ul>
				</nav>
			</aside>
			<nav className="case-mobile-nav" aria-label="Case study sections">
				<div className="case-mobile-nav__track">
					{sections.map((s) => (
						<a
							key={s.id}
							href={`#${s.id}`}
							onClick={go(s.id)}
							className={`case-mobile-nav__link${active === s.id ? ' is-active' : ''}`}
						>
							{s.label}
						</a>
					))}
				</div>
			</nav>
		</>
	);
}
