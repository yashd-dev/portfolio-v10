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
		<header className={`mn-casebar px-6${scrolled ? ' is-scrolled' : ''}`}>
			<div className="max-w-none">
				<div className="pointer-events-auto inline-flex max-w-[calc(100vw-140px)] items-center gap-1 rounded-full p-[3px] transition-[background-color,box-shadow] duration-[0.35s] [.mn-casebar.is-scrolled_&]:backdrop-blur-[14px] [.mn-casebar.is-scrolled_&]:backdrop-saturate-150">
					<a
						href="/#work"
						className="group inline-flex h-8 items-center gap-1 rounded-full pr-[14px] pl-[9px] text-[13px] font-medium no-underline shadow-[0_1px_2px_#00000014] transition-[background-color] duration-[0.25s]"
						data-cursor="All work"
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
							className="size-[15px] transition-transform duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5"
						>
							<path d="M19 12H5M12 19l-7-7 7-7" />
						</svg>
						Back
					</a>
					<span className="max-w-0 truncate overflow-hidden p-0 text-[13px] font-medium whitespace-nowrap opacity-0 transition-[max-width_0.6s_cubic-bezier(0.22,1,0.36,1),opacity_0.35s_ease,padding_0.6s_cubic-bezier(0.22,1,0.36,1)] [.mn-casebar.is-scrolled_&]:max-w-[260px] [.mn-casebar.is-scrolled_&]:pr-3 [.mn-casebar.is-scrolled_&]:pl-1.5 [.mn-casebar.is-scrolled_&]:opacity-100 max-sm:[.mn-casebar.is-scrolled_&]:hidden">
							{title}
						</span>
				</div>
				<div className="pointer-events-auto inline-flex items-center gap-2">
					<a
						href="/"
						className="inline-grid size-[34px] place-items-center rounded-full backdrop-blur-[14px] backdrop-saturate-150 transition-[transform_0.25s_cubic-bezier(0.34,1.56,0.64,1),background-color_0.2s_ease] hover:rotate-90 hover:scale-[1.06]"
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
