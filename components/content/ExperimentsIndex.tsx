"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ExperimentCard,
  type ExperimentCardData,
} from "@/components/content/ExperimentCard";
import {
  EXPERIMENT_STATUSES,
  type ExperimentStatus,
} from "@/lib/experiment-status";

export function ExperimentsIndex({
  experiments,
}: {
  experiments: ExperimentCardData[];
}) {
  const [activeStatus, setActiveStatus] = useState<ExperimentStatus | "all">("all");

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(
      EXPERIMENT_STATUSES.map(({ slug }) => [slug, 0]),
    ) as Record<ExperimentStatus, number>;

    for (const experiment of experiments) {
      if (experiment.status) counts[experiment.status] += 1;
    }

    return counts;
  }, [experiments]);

  const filtered = useMemo(() => {
    if (activeStatus === "all") return experiments;
    return experiments.filter((experiment) => experiment.status === activeStatus);
  }, [experiments, activeStatus]);

  const featured = filtered.find((experiment) => experiment.featured) ?? null;
  const gridExperiments = filtered.filter(
    (experiment) => !featured || experiment.slug !== featured.slug,
  );

  return (
    <div className="experiments-page">
      <div
        className="experiments-status-bar"
        role="group"
        aria-label="Filter by status"
      >
        <button
          type="button"
          className={`experiments-status-filter experiments-status-filter--all${activeStatus === "all" ? " experiments-status-filter--active" : ""}`}
          aria-pressed={activeStatus === "all"}
          onClick={() => setActiveStatus("all")}
        >
          <span className="experiments-status-filter__label">All</span>
          <span className="experiments-status-filter__count">{experiments.length}</span>
        </button>

        {EXPERIMENT_STATUSES.map(({ slug, label, color }) => (
          <button
            key={slug}
            type="button"
            className={`experiments-status-filter experiments-status-filter--${slug}${activeStatus === slug ? " experiments-status-filter--active" : ""}`}
            style={{ "--status-base": color } as CSSProperties}
            aria-pressed={activeStatus === slug}
            onClick={() => setActiveStatus(activeStatus === slug ? "all" : slug)}
          >
            <span className="experiments-status-filter__dot" aria-hidden="true" />
            <span className="experiments-status-filter__label">{label}</span>
            <span className="experiments-status-filter__count">
              {statusCounts[slug]}
            </span>
          </button>
        ))}
      </div>

      <p className="experiments-results-meta">
        {filtered.length === 0
          ? "No experiments found"
          : `${filtered.length} experiment${filtered.length === 1 ? "" : "s"}`}
      </p>

      {filtered.length === 0 ? (
        <p className="experiments-empty">Try a different status filter.</p>
      ) : (
        <div className="experiments-layout">
          {featured && <ExperimentCard experiment={featured} featured />}

          {gridExperiments.length > 0 && (
            <div className="experiments-grid">
              {gridExperiments.map((experiment) => (
                <ExperimentCard key={experiment.slug} experiment={experiment} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
