import { error } from "@sveltejs/kit";

import { projects, shenanigans } from "#lib/data/content.js";
import { serviceBySlug, services } from "#lib/data/services.js";

export const prerender = true;

export const entries = () => services.map((s) => ({ slug: s.slug }));

export const load = ({ params }) => {
  const service = serviceBySlug(params.slug);
  if (!service) {
    error(404, "Not found");
  }
  const proofProjects = service.proofProjects.map((name) => {
    const project = projects.find((p) => p.name === name);
    if (!project) {
      error(500, `Unknown project in ${service.slug}: ${name}`);
    }
    return project;
  });
  const proofShenanigans = (service.proofShenanigans ?? []).map((title) => {
    const item = shenanigans.find((s) => s.title === title);
    if (!item) {
      error(500, `Unknown shenanigan in ${service.slug}: ${title}`);
    }
    return item;
  });
  const related = service.related.map((slug) => {
    const item = serviceBySlug(slug);
    if (!item) {
      error(500, `Unknown related service in ${service.slug}: ${slug}`);
    }
    return item;
  });
  return { proofProjects, proofShenanigans, related, service };
};
