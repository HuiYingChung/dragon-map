import { dragonRegions } from "@/data/dragons";
import { dragonSources } from "@/data/sources";

/**
 * Builds a compact, factual digest of the atlas that is injected into the
 * Oracle's system prompt. Grounding the model in the atlas's own verified
 * entries (rather than letting it answer from open-ended training data) keeps
 * responses consistent with what visitors actually see on the map, and lets
 * the Oracle cite the same sources the entry pages display.
 *
 * The digest is deterministic and derived entirely from src/data, so it can
 * never drift from the UI content.
 */
export function buildAtlasDigest(): string {
  const entries = dragonRegions.map((dragon) => {
    const sources = (dragonSources[dragon.id] ?? [])
      .slice(0, 2)
      .map((source) => `${source.title} (${source.year})`)
      .join("; ");

    const lines = [
      `### ${dragon.name} — ${dragon.tradition} (${dragon.region})`,
      `Role: ${dragon.role}. Era: ${dragon.era}.`,
      `Domains: ${dragon.domains.join(", ")}. Traits: ${dragon.traits.join(", ")}.`,
      `Comparative note: ${dragon.comparativeNote}`,
      sources ? `Key sources: ${sources}.` : null,
    ].filter(Boolean);

    return lines.join("\n");
  });

  return entries.join("\n\n");
}
