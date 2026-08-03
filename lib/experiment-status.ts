export const EXPERIMENT_STATUSES = [
  { slug: "idea", label: "Idea", color: "#7209b7", sort: 0 },
  { slug: "wip", label: "In progress", color: "#f72585", sort: 1 },
  { slug: "live", label: "Live", color: "#4cc9f0", sort: 2 },
  { slug: "archive", label: "Archive", color: "#57606a", sort: 3 },
] as const;

export type ExperimentStatus = (typeof EXPERIMENT_STATUSES)[number]["slug"];

const STATUS_BY_SLUG = Object.fromEntries(
  EXPERIMENT_STATUSES.map((status) => [status.slug, status]),
) as Record<ExperimentStatus, (typeof EXPERIMENT_STATUSES)[number]>;

const LEGACY_STATUS_MAP: Record<string, ExperimentStatus> = {
  archived: "archive",
};

export function normalizeExperimentStatus(value?: string): ExperimentStatus | undefined {
  if (!value) return undefined;
  const slug = value.trim().toLowerCase();
  if (slug in STATUS_BY_SLUG) return slug as ExperimentStatus;
  return LEGACY_STATUS_MAP[slug];
}

export function getExperimentStatusMeta(status?: ExperimentStatus) {
  if (!status) return null;
  return STATUS_BY_SLUG[status];
}

export function compareExperimentsByStatus(
  a: ExperimentStatus | undefined,
  b: ExperimentStatus | undefined,
): number {
  const aSort = a ? STATUS_BY_SLUG[a].sort : 99;
  const bSort = b ? STATUS_BY_SLUG[b].sort : 99;
  return aSort - bSort;
}
