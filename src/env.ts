import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  PUBLIC_POSTHOG_HOST: {
    description: "PostHog ingestion host",
    public: true,
    static: true,
  },
  PUBLIC_POSTHOG_PROJECT_TOKEN: {
    description: "PostHog public project token",
    public: true,
    static: true,
  },
  VISITORS_SHARE_TOKEN: {
    description: "Read-only share token for the traffic score insight",
    schema: (value) => value || undefined,
  },
});
