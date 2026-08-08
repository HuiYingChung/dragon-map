import type { DragonSource } from "@/data/sources";
import type { Locale } from "@/data/dragons";

const TYPE_LABELS: Record<DragonSource["type"], { en: string; zh: string }> = {
  primary: { en: "Primary", zh: "原典" },
  scholarship: { en: "Scholarship", zh: "學術" },
  museum: { en: "Museum", zh: "館藏" },
};

interface SourceListProps {
  sources: DragonSource[];
  locale: Locale;
  color: string;
  compact?: boolean;
  /** Lay entries out in a responsive grid instead of a single column. */
  columns?: boolean;
}

/**
 * Renders the verified references for a dragon tradition. Every source shown
 * here was checked against a live URL or a standard published edition —
 * see src/data/sources.ts.
 */
export default function SourceList({
  sources,
  locale,
  color,
  compact = false,
  columns = false,
}: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <ul
      className={
        columns
          ? "grid gap-3 md:grid-cols-2"
          : compact
            ? "space-y-2.5"
            : "space-y-3"
      }
    >
      {sources.map((source) => {
        const title = locale === "zh" ? source.titleZh : source.title;
        const note = locale === "zh" ? source.noteZh : source.note;
        const typeLabel = TYPE_LABELS[source.type][locale];

        return (
          <li
            key={source.title}
            className="rounded-sm border px-3 py-2.5"
            style={{
              borderColor: `${color}14`,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <p
                className={`${compact ? "text-[13px]" : "text-[14px]"} leading-snug text-stone-200`}
              >
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-4 transition-colors hover:text-stone-50"
                    style={{ textDecorationColor: `${color}66` }}
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </p>
              <span
                className="mt-0.5 shrink-0 rounded-sm px-1.5 py-0.5 text-[9px] uppercase tracking-[0.14em]"
                style={{
                  color: `${color}cc`,
                  border: `1px solid ${color}26`,
                  background: `${color}0d`,
                }}
              >
                {typeLabel}
              </span>
            </div>
            <p
              className="mt-1 text-[11px] uppercase tracking-[0.08em]"
              style={{ color: "rgba(191, 168, 129, 0.6)" }}
            >
              {[source.author, source.year].filter(Boolean).join(" · ")}
            </p>
            {!compact && (
              <p className="mt-1.5 text-[12px] leading-relaxed text-stone-400">
                {note}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
