import { posthog } from "posthog-js";

const POSTHOG_KEY = "phc_vEdCGGo4tZ2N8zUw37ntYRaS3dNq6vcrLLAfwiML423Z";
const POSTHOG_HOST = "https://us.i.posthog.com";
const ALLOWED_HOSTS = new Set([
  "yashd.in",
  "www.yashd.in",
  "portfolio-v10-nine.vercel.app",
]);

export const initAnalytics = (): void => {
  if (!ALLOWED_HOSTS.has(location.hostname) || posthog.__loaded) {
    return;
  }
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    autocapture: { dom_event_allowlist: ["click"] },
    capture_pageleave: true,
    capture_pageview: "history_change",
    disable_session_recording: true,
    person_profiles: "identified_only",
    respect_dnt: true,
  });
};
