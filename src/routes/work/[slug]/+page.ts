import { browser } from "$app/env";
import type { ComponentType } from "react";

import type { CaseMeta } from "#lib/case/CaseStudy.js";

const mods = import.meta.glob("/src/lib/case/content/*.mdx", {
  eager: true,
}) as Record<string, { default: ComponentType; meta: CaseMeta }>;

export const load = async ({ params }) => {
  const mod = mods[`/src/lib/case/content/${params.slug}.mdx`];
  if (!mod || browser) {
    return { html: "" };
  }
  const [{ renderToStaticMarkup }, { createElement }, { default: CaseStudy }] =
    await Promise.all([
      import("react-dom/server"),
      import("react"),
      import("#lib/case/CaseStudy.js"),
    ]);
  return {
    html: renderToStaticMarkup(
      createElement(CaseStudy, { content: mod.default, meta: mod.meta })
    ),
  };
};
