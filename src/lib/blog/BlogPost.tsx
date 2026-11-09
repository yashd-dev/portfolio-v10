import type { ComponentType } from 'react';

export type BlogMeta = {
	title: string;
	date: string; // ISO date, e.g. '2026-11-10'
	summary: string;
	draft?: boolean;
};

export function formatBlogDate(date: string): string {
	return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
		timeZone: 'UTC',
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

export function Fig({
	src,
	alt,
	caption,
	phone
}: {
	src: string;
	alt: string;
	caption?: string;
	phone?: boolean;
}) {
	return (
		<figure className={phone ? 'my-7 text-center' : 'my-7'}>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				className={
					phone
						? 'mx-auto w-auto max-w-[300px] rounded-[14px] border border-[#00000014] bg-white'
						: 'w-full rounded-[14px] border border-[#00000014] bg-white'
				}
			/>
			{caption ? (
				<figcaption className="mt-[0.6rem] text-center text-[13px] text-[#999]">
					{caption}
				</figcaption>
			) : null}
		</figure>
	);
}

export function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
	return (
		<aside className="my-7 rounded-[14px] border border-[#00000014] bg-white px-[1.15rem] py-4 text-[14.5px] leading-[1.6] [&_p]:my-2">
			{title ? <p className="mb-[0.4rem] text-[14px] font-medium text-[#999]">{title}</p> : null}
			<div>{children}</div>
		</aside>
	);
}

export function FigRow({ children }: { children: React.ReactNode }) {
	return (
		<div className="my-7 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 [&_figure]:m-0">
			{children}
		</div>
	);
}

const P = (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="my-5" {...p} />;
const H2 = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h2
		className="mt-[2.75rem] mb-[0.9rem] text-[22px] font-[weight:650] tracking-[-0.01em]"
		{...p}
	/>
);
const H3 = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
	<h3 className="mt-[2.1rem] mb-[0.7rem] text-[17px] font-[weight:650]" {...p} />
);
const Ul = (p: React.HTMLAttributes<HTMLUListElement>) => (
	<ul className="my-5 pl-[1.4rem]" {...p} />
);
const Ol = (p: React.HTMLAttributes<HTMLOListElement>) => (
	<ol className="my-5 pl-[1.4rem]" {...p} />
);
const Li = (p: React.HTMLAttributes<HTMLLIElement>) => (
	<li className="mt-[0.4rem] first:mt-0" {...p} />
);
const A = (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a className="text-[#2667ff] underline decoration-dotted underline-offset-[0.2em]" {...p} />
);
const Strong = (p: React.HTMLAttributes<HTMLElement>) => (
	<strong className="font-[weight:650]" {...p} />
);
const Blockquote = (p: React.HTMLAttributes<HTMLQuoteElement>) => (
	<blockquote className="my-6 border-l-2 border-[#00000014] pl-4 text-[#555]" {...p} />
);
const Code = (p: React.HTMLAttributes<HTMLElement>) => (
	<code
		className="rounded-[5px] bg-black/5 px-[0.4em] py-[0.15em] font-mono text-[0.86em]"
		{...p}
	/>
);
const Pre = (p: React.HTMLAttributes<HTMLPreElement>) => (
	<pre
		className="my-6 overflow-x-auto rounded-xl bg-[#111318] px-[1.15rem] py-4 text-[13.5px] leading-[1.6] text-[#e6e8ec] [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
		{...p}
	/>
);
const Hr = () => <hr className="my-10 border-t border-[#00000014]" />;
const Img = (p: React.ImgHTMLAttributes<HTMLImageElement>) => (
	<img className="max-w-full rounded-xl" {...p} />
);

const blocks = {
	Fig,
	FigRow,
	Callout,
	p: P,
	h2: H2,
	h3: H3,
	ul: Ul,
	ol: Ol,
	li: Li,
	a: A,
	strong: Strong,
	blockquote: Blockquote,
	code: Code,
	pre: Pre,
	hr: Hr,
	img: Img
};

export default function BlogPost({
	meta,
	content: Content
}: {
	meta: BlogMeta;
	content: ComponentType<{ components?: typeof blocks }>;
}) {
	return (
		<article className="mx-auto max-w-[680px] px-5 pt-[160px] pb-[120px] text-[16px] leading-[1.75] text-[#111] max-sm:pt-[120px]">
			<header className="mb-10">
				<h1 className="m-0 text-[34px] leading-[1.15] font-[weight:650] tracking-[-0.02em] max-sm:text-[27px]">
					{meta.title}
				</h1>
				<p className="mt-[0.9rem] mb-0 text-[13px] text-[#999]">{formatBlogDate(meta.date)}</p>
				<p className="mt-[1.1rem] mb-0 text-[17px] leading-[1.6] text-[#555]">{meta.summary}</p>
			</header>
			<div>
				<Content components={blocks} />
			</div>
			<footer className="mt-[3.5rem] border-t border-[#00000014] pt-6 text-[14px]">
				<a href="/blog" className="font-medium text-[#111] no-underline hover:text-[#2667ff]">
					← All writing
				</a>
			</footer>
		</article>
	);
}
