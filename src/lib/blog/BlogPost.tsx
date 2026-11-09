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
		<figure className={phone ? 'blog-fig blog-fig--phone' : 'blog-fig'}>
			<img src={src} alt={alt} loading="lazy" decoding="async" />
			{caption ? <figcaption>{caption}</figcaption> : null}
		</figure>
	);
}

export function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
	return (
		<aside className="blog-callout">
			{title ? <p className="blog-callout__title">{title}</p> : null}
			<div>{children}</div>
		</aside>
	);
}

const blocks = { Fig, Callout };

export default function BlogPost({
	meta,
	content: Content
}: {
	meta: BlogMeta;
	content: ComponentType<{ components?: typeof blocks }>;
}) {
	return (
		<article className="blog-article">
			<header className="blog-article__header">
				<h1 className="blog-article__title">{meta.title}</h1>
				<p className="blog-article__date">{formatBlogDate(meta.date)}</p>
				<p className="blog-article__summary">{meta.summary}</p>
			</header>
			<div className="blog-article__body">
				<Content components={blocks} />
			</div>
			<footer className="blog-article__footer">
				<a href="/blog">← All writing</a>
			</footer>
		</article>
	);
}
