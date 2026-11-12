import {
  PUBLIC_POSTHOG_HOST,
  PUBLIC_POSTHOG_PROJECT_TOKEN,
} from "$app/env/public";
import { posthog } from "posthog-js";

const ALLOWED_HOSTS = new Set([
  "yashd.in",
  "www.yashd.in",
  "portfolio-v10-nine.vercel.app",
]);

export const initAnalytics = (): void => {
  if (!ALLOWED_HOSTS.has(location.hostname) || posthog.__loaded) {
    return;
  }
  posthog.init(PUBLIC_POSTHOG_PROJECT_TOKEN, {
    api_host: PUBLIC_POSTHOG_HOST,
    autocapture: { dom_event_allowlist: ["click"] },
    capture_pageleave: true,
    capture_pageview: "history_change",
    disable_session_recording: true,
    person_profiles: "identified_only",
    respect_dnt: true,
  });
};
