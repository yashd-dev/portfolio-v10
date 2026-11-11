import type { BlogMeta } from "#lib/blog/BlogPost.js";
import type { CaseMeta } from "#lib/case/CaseStudy.js";
import { services } from "#lib/data/services.js";
import { siteUrl } from "#lib/data/site.js";

export const prerender = true;

const blogMods = import.meta.glob("/src/lib/blog/content/*.mdx", {
  eager: true,
}) as Record<string, { meta: BlogMeta }>;
const caseMods = import.meta.glob("/src/lib/case/content/*.mdx", {
  eager: true,
}) as Record<string, { meta: CaseMeta }>;

const slugOf = (path: string) =>
  path
    .split("/")
    .at(-1)
    ?.replace(/\.mdx$/u, "") ?? "";

export const GET = () => {
  const staticPaths = [
    "/",
    "/blog",
    "/how-i-work",
    "/play",
    "/process",
    "/tools",
    "/work",
    "/services",
  ];
  const urls = [
    ...staticPaths.map((p) => ({ loc: `${siteUrl}${p}` })),
    ...services.map((s) => ({ loc: `${siteUrl}/services/${s.slug}` })),
    ...Object.entries(blogMods)
      .filter(([, m]) => !m.meta.draft)
      .map(([p, m]) => ({
        lastmod: m.meta.date,
        loc: `${siteUrl}/blog/${slugOf(p)}`,
      })),
    ...Object.keys(caseMods).map((p) => ({
      loc: `${siteUrl}/work/${slugOf(p)}`,
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${"lastmod" in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`
  )
  .join("\n")}
</urlset>
`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
