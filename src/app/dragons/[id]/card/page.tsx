import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { dragonRegions } from "@/data/dragons";
import CursorAura from "@/components/CursorAura";
import PrintCardActions from "@/components/PrintCardActions";

type DragonCardPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getDragonById(id: string) {
  return dragonRegions.find((dragon) => dragon.id === id) ?? null;
}

export async function generateMetadata({
  params,
}: DragonCardPageProps): Promise<Metadata> {
  const { id } = await params;
  const dragon = getDragonById(id);

  if (!dragon) {
    return {
      title: "Museum Card Not Found",
    };
  }

  return {
    title: `${dragon.name} Museum Card`,
    description: `Printable museum postcard for ${dragon.name} from Where Dragons Dwell.`,
  };
}

export default async function DragonCardPage({ params }: DragonCardPageProps) {
  const { id } = await params;
  const dragon = getDragonById(id);

  if (!dragon) {
    notFound();
  }

  return (
    <main className="postcard-print-page min-h-screen bg-[#0b0906] px-4 py-6 text-stone-200 md:px-6 md:py-8">
      <CursorAura />
      <div className="print-shell mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="print-page-header flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-stone-500">
              Museum postcard preview
            </p>
            <h1 className="mt-2 text-[24px] uppercase tracking-[0.08em] text-stone-100 md:text-[30px]">
              {dragon.name} Museum Card
            </h1>
          </div>

          <PrintCardActions dragonId={dragon.id} />
        </div>

        <section
          className="museum-postcard business-card screen-card print-card-surface mx-auto grid aspect-[7/4] w-full max-w-[42rem] overflow-hidden rounded-sm border md:grid-cols-[1.05fr_0.95fr]"
          style={{
            borderColor: `${dragon.color}33`,
            background:
              "linear-gradient(135deg, rgba(232, 223, 204, 0.99), rgba(210, 196, 169, 0.98))",
            boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div className="print-card-panel relative flex min-h-[14rem] flex-col justify-between overflow-hidden border-b border-black/10 p-4 md:border-b-0 md:border-r md:p-5">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 18% 18%, ${dragon.color}26 0%, transparent 28%), radial-gradient(circle at 78% 78%, ${dragon.glowColor} 0%, transparent 34%)`,
              }}
            />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p
                  className="text-[9px] uppercase tracking-[0.24em]"
                  style={{ color: "rgba(84, 62, 35, 0.78)" }}
                >
                  Where Dragons Dwell Archive
                </p>
                <h2
                  className="mt-2 text-[22px] uppercase tracking-[0.1em] md:text-[26px]"
                  style={{ color: "#2f2417" }}
                >
                  {dragon.name}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#5c4a33]">
                  {dragon.tradition}
                </p>
              </div>

              <div
                className="rounded-sm border px-2 py-1"
                style={{
                  borderColor: "rgba(47, 36, 23, 0.18)",
                  background: "rgba(255,255,255,0.28)",
                }}
              >
                <p className="text-[9px] uppercase tracking-[0.16em] text-[#5c4a33]">
                  Museum card
                </p>
              </div>
            </div>

            <div className="relative mx-auto mt-3 flex w-full max-w-[16rem] flex-1 items-center justify-center">
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 68%)`,
                  filter: "blur(16px)",
                }}
              />
                <Image
                  src={dragon.image}
                  alt={`${dragon.name} museum card artwork`}
                  fill
                  sizes="(max-width: 768px) 70vw, 260px"
                  className="object-contain p-2"
                priority
              />
            </div>

            <div className="relative mt-3 grid grid-cols-2 gap-3 text-[#5c4a33]">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#7a6549]">
                  Region
                </p>
                <p className="mt-1 text-[11px] leading-relaxed">{dragon.region}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#7a6549]">
                  Era
                </p>
                <p className="mt-1 text-[11px] leading-relaxed">{dragon.timelineRangeLabel}</p>
              </div>
            </div>
          </div>

          <div className="print-card-panel flex flex-col justify-between p-4 text-[#372a1d] md:p-5">
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#7a6549]">
                  Collection note
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#7a6549]">
                  {dragon.timelineRangeLabel}
                </p>
              </div>

              <p className="mt-3 text-[12px] leading-[1.62]">
                {dragon.description}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#7a6549]">
                    Role
                  </p>
                  <p className="mt-1.5 text-[11px] leading-[1.55]">{dragon.role}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-[#7a6549]">
                    Associated with
                  </p>
                  <p className="mt-1.5 text-[11px] leading-[1.55]">
                    {dragon.associatedWith}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#7a6549]">
                  Keywords
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {dragon.domains.slice(0, 4).map((domain) => (
                    <span
                      key={domain}
                      className="rounded-sm border px-2 py-0.5 text-[9px] uppercase tracking-[0.14em]"
                      style={{
                        borderColor: "rgba(55, 42, 29, 0.16)",
                        background: "rgba(255,255,255,0.26)",
                      }}
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-black/10 pt-3">
              <p className="text-[10px] italic leading-[1.6] text-[#4a3826]">
                {dragon.atmosphere}
              </p>
              <p className="mt-3 text-[8px] uppercase tracking-[0.16em] text-[#7a6549]">
                Collectible business-card format from the Where Dragons Dwell atlas.
              </p>
            </div>
          </div>
        </section>

        <section
          className="museum-postcard business-card print-only-card mx-auto hidden aspect-[7/4] w-full max-w-[42rem] overflow-hidden rounded-none border"
          style={{
            borderColor: `${dragon.color}30`,
            background:
              "linear-gradient(135deg, rgba(232, 223, 204, 1), rgba(210, 196, 169, 1))",
          }}
        >
          <div className="grid h-full grid-cols-[1fr_1fr]">
            <div
              className="relative flex flex-col justify-between overflow-hidden border-r border-black/10 p-[0.1in]"
              style={{
                background: `radial-gradient(circle at 20% 18%, ${dragon.color}22 0%, transparent 28%), radial-gradient(circle at 76% 82%, ${dragon.glowColor} 0%, transparent 34%)`,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[5pt] uppercase tracking-[0.18em] text-[#6b563d]">
                    Where Dragons Dwell
                  </p>
                  <h2 className="mt-[0.04in] text-[13pt] uppercase leading-none tracking-[0.08em] text-[#2f2417]">
                    {dragon.name}
                  </h2>
                  <p className="mt-[0.04in] text-[5.5pt] uppercase tracking-[0.18em] text-[#5c4a33]">
                    {dragon.tradition}
                  </p>
                </div>
                <span className="rounded-sm border border-black/10 px-[0.04in] py-[0.02in] text-[4.5pt] uppercase tracking-[0.14em] text-[#7a6549]">
                  Atlas card
                </span>
              </div>

              <div className="relative mx-auto my-[0.02in] h-[0.82in] w-full max-w-[1.35in]">
                <div
                  className="absolute inset-[0.06in] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 68%)`,
                    filter: "blur(10px)",
                  }}
                />
                {/* next/image can fail to render inside print-only hidden layouts in Chrome preview */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dragon.image}
                  alt={`${dragon.name} print card artwork`}
                  className="relative z-[1] h-full w-full object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-[0.06in] text-[#4b3826]">
                <div>
                  <p className="text-[4.5pt] uppercase tracking-[0.16em] text-[#7a6549]">
                    Region
                  </p>
                  <p className="mt-[0.02in] text-[5.5pt] leading-[1.2]">{dragon.region}</p>
                </div>
                <div>
                  <p className="text-[4.5pt] uppercase tracking-[0.16em] text-[#7a6549]">
                    Era
                  </p>
                  <p className="mt-[0.02in] text-[5.5pt] leading-[1.2]">
                    {dragon.timelineRangeLabel}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-[0.1in] text-[#372a1d]">
              <div>
                <div className="flex items-center justify-between gap-[0.06in]">
                  <p className="text-[4.8pt] uppercase tracking-[0.18em] text-[#7a6549]">
                    Collection note
                  </p>
                  <p className="text-[4.5pt] uppercase tracking-[0.16em] text-[#7a6549]">
                    Atlas card
                  </p>
                </div>

                <p className="mt-[0.05in] text-[7pt] leading-[1.25]">
                  {dragon.description}
                </p>

                <div className="mt-[0.06in] grid grid-cols-2 gap-[0.06in]">
                  <div>
                    <p className="text-[4.5pt] uppercase tracking-[0.16em] text-[#7a6549]">
                      Role
                    </p>
                    <p className="mt-[0.02in] text-[5.5pt] leading-[1.2]">{dragon.role}</p>
                  </div>
                  <div>
                    <p className="text-[4.5pt] uppercase tracking-[0.16em] text-[#7a6549]">
                      Keywords
                    </p>
                    <p className="mt-[0.02in] text-[5.5pt] leading-[1.2]">
                      {dragon.domains.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/10 pt-[0.05in]">
                <p className="text-[5pt] italic leading-[1.2] text-[#4a3826]">
                  {dragon.atmosphere}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
