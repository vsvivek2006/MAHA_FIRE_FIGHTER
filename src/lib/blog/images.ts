/**
 * Helper to ensure every blog post always has an authentic, high-quality cover visual.
 * If an author uploaded a custom cover, it is used directly.
 * Otherwise, a topic-aware professional fire engineering fallback is provided.
 */

const FALLBACK_COVERS = {
  hydrant: "/images/hydrant.webp",
  sprinkler: "/images/sprinkler.webp",
  alarm: "/images/alarm.webp",
  extinguisher: "/images/extinguisher.webp",
  audit: "/images/audit.webp",
  drill: "/images/drill.webp",
  default: "/images/hero.webp",
};

export function getPostCoverImage(
  url: string | null | undefined,
  title: string = "",
  tags?: string[] | null
): string {
  if (url && typeof url === "string" && url.trim().length > 0) {
    return url.trim();
  }

  const tagString = Array.isArray(tags) ? tags.join(" ") : "";
  const query = `${title} ${tagString}`.toLowerCase();

  if (query.includes("hydrant") || query.includes("pump") || query.includes("standpipe") || query.includes("pipe") || query.includes("is 3844")) {
    return FALLBACK_COVERS.hydrant;
  }

  if (query.includes("sprinkler") || query.includes("suppression") || query.includes("is 15105") || query.includes("deluge")) {
    return FALLBACK_COVERS.sprinkler;
  }

  if (query.includes("alarm") || query.includes("detection") || query.includes("sensor") || query.includes("smoke") || query.includes("is 2189")) {
    return FALLBACK_COVERS.alarm;
  }

  if (query.includes("extinguisher") || query.includes("co2") || query.includes("refill") || query.includes("is 2190") || query.includes("hydro-test")) {
    return FALLBACK_COVERS.extinguisher;
  }

  if (query.includes("noc") || query.includes("audit") || query.includes("compliance") || query.includes("nbc") || query.includes("inspection") || query.includes("delhi")) {
    return FALLBACK_COVERS.audit;
  }

  if (query.includes("drill") || query.includes("evacuation") || query.includes("training") || query.includes("safety officer")) {
    return FALLBACK_COVERS.drill;
  }

  return FALLBACK_COVERS.default;
}
