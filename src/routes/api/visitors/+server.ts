import { VISITORS_SHARE_TOKEN } from "$app/env/private";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const prerender = false;

const INSIGHT_URL =
  "https://us.posthog.com/api/projects/676656/insights/7GgN8ZAE/";
const MULTIPLIER = 13;
const TTL_MS = 10 * 60 * 1000;

let cached: { at: number; visitors: number } | null = null;

const fetchVisitors = async (): Promise<number | null> => {
  if (!VISITORS_SHARE_TOKEN) {
    return null;
  }
  try {
    const res = await fetch(
      `${INSIGHT_URL}?sharing_access_token=${VISITORS_SHARE_TOKEN}`,
      {
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as {
      result?: { aggregated_value?: number }[];
    };
    const value = data.result?.[0]?.aggregated_value;
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
};

export const GET: RequestHandler = async ({ setHeaders }) => {
  setHeaders({
    "cache-control": "public, s-maxage=600, stale-while-revalidate=3600",
  });
  if (!cached || Date.now() - cached.at > TTL_MS) {
    const visitors = await fetchVisitors();
    if (visitors !== null) {
      cached = { at: Date.now(), visitors };
    }
  }
  if (!cached) {
    return json({ multiplier: MULTIPLIER, score: null, visitors: null });
  }
  return json({
    multiplier: MULTIPLIER,
    score: cached.visitors * MULTIPLIER,
    visitors: cached.visitors,
  });
};
