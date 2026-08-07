import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dragonRegions } from "@/data/dragons";
import { getSourcesForDragon } from "@/data/sources";
import SourceList from "@/components/SourceList";
import CursorAura from "@/components/CursorAura";

type DragonPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getDragonById(id: string) {
  return dragonRegions.find((dragon) => dragon.id === id) ?? null;
}

export async function generateStaticParams() {
  return dragonRegions.map((dragon) => ({
    id: dragon.id,
  }));
}

export async function generateMetadata({
  params,
}: DragonPageProps): Promise<Metadata> {
  const { id } = await params;
  const dragon = getDragonById(id);

  if (!dragon) {
    return {
      title: "Dragon Not Found",
    };
  }

  const title = `${dragon.name} Dragon Myth`;
  const description = `${dragon.name} in ${dragon.tradition} mythology. Explore its region, symbolic associations, and cultural role in the Where Dragons Dwell atlas.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/dragons/${dragon.id}`,
    },
    openGraph: {
      title: `${dragon.name} - Where Dragons Dwell`,
      description,
      url: `https://dragon-map.vercel.app/dragons/${dragon.id}`,
      images: [
        {
          url: dragon.image,
          alt: `${dragon.name} illustration`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dragon.name} - Where Dragons Dwell`,
      description,
      images: [dragon.image],
    },
  };
}

export default async function DragonDetailPage({ params }: DragonPageProps) {
  const { id } = await params;
  const dragon = getDragonById(id);

  if (!dragon) {
    notFound();
  }

  return (
    <main className="dragon-detail-page min-h-screen bg-[#080705] px-5 py-8 text-stone-200 md:px-8 lg:px-12">
      <CursorAura />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-sm border px-3 py-2 text-[11px] uppercase tracking-[0.24em] transition-all duration-200 hover:-translate-y-px hover:text-stone-100 hover:shadow-[0_10px_24px_rgba(201,168,76,0.14)]"
            style={{
              color: `${dragon.color}dd`,
              borderColor: `${dragon.color}30`,
              background: `${dragon.color}10`,
            }}
          >
            Back to atlas
          </Link>
          <p className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
            Dragon Myth Entry
          </p>
        </div>

        <section
          className="overflow-hidden rounded-sm border"
          style={{
            borderColor: `${dragon.color}22`,
            background:
              "linear-gradient(180deg, rgba(14, 12, 9, 0.96), rgba(14, 12, 9, 0.82))",
            boxShadow: "0 18px 50px rgba(0, 0, 0, 0.28)",
          }}
        >
          <div className="grid gap-8 p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,420px)] md:p-8">
            <div className="flex flex-col gap-5">
              <p
                className="text-[11px] uppercase tracking-[0.28em]"
                style={{ color: `${dragon.color}aa` }}
              >
                {dragon.tradition}
              </p>
              <div>
                <h1
                  className="text-4xl font-light tracking-[0.08em] uppercase md:text-6xl"
                  style={{ color: dragon.color }}
                >
                  {dragon.name}
                </h1>
                <p className="mt-3 text-lg italic text-stone-400">{dragon.region}</p>
              </div>
              <p className="max-w-3xl text-base leading-8 text-stone-300 md:text-lg">
                {dragon.description}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-sm border border-stone-800/80 bg-black/15 p-4">
                  <h2 className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Associated With
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {dragon.associatedWith}
                  </p>
                </div>
                <div className="rounded-sm border border-stone-800/80 bg-black/15 p-4">
                  <h2 className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
                    Atmosphere
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {dragon.atmosphere}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center rounded-sm border border-stone-800/80 bg-black/20 p-6">
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle, ${dragon.glowColor} 0%, transparent 68%)`,
                  filter: "blur(22px)",
                }}
              />
              <Link
                href={`/dragons/${dragon.id}/card`}
                className="absolute right-4 top-4 z-10 rounded-sm border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_10px_22px_rgba(201,168,76,0.16)]"
                style={{
                  color: `${dragon.color}f0`,
                  borderColor: `${dragon.color}34`,
                  background: `linear-gradient(180deg, ${dragon.color}22, ${dragon.color}10)`,
                }}
              >
                Print Museum Card
              </Link>
              <Image
                src={dragon.image}
                alt={`${dragon.name} illustration`}
                width={700}
                height={700}
                priority
                sizes="(max-width: 768px) 80vw, 420px"
                className="relative h-auto max-h-[440px] w-auto object-contain"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-sm border border-stone-800/80 bg-black/10 p-5">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Name
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">{dragon.name}</p>
            <p className="mt-2 text-sm leading-7 text-stone-400">{dragon.tradition}</p>
          </article>
          <article className="rounded-sm border border-stone-800/80 bg-black/10 p-5">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Region
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">{dragon.region}</p>
            <p className="mt-2 text-sm leading-7 text-stone-400">{dragon.timelineRangeLabel}</p>
          </article>
          <article className="rounded-sm border border-stone-800/80 bg-black/10 p-5">
            <h2 className="text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Atlas Context
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              This entry is part of Where Dragons Dwell, an interactive atlas of
              dragon myths and sacred serpent traditions across world cultures.
            </p>
          </article>
        </section>

        <section
          className="rounded-sm border p-6 md:p-8"
          style={{
            borderColor: `${dragon.color}22`,
            background:
              "linear-gradient(180deg, rgba(14, 12, 9, 0.9), rgba(14, 12, 9, 0.75))",
          }}
        >
          <h2
            className="text-[11px] uppercase tracking-[0.24em]"
            style={{ color: `${dragon.color}aa` }}
          >
            Sources &amp; Further Reading
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-400">
            Every reference below was verified against a live URL or a standard
            published edition. Primary texts and foundational ethnographic
            records are marked <span className="uppercase text-[11px] tracking-[0.1em]">primary</span>;
            modern academic studies and museum resources follow.
          </p>
          <div className="mt-5">
            <SourceList
              sources={getSourcesForDragon(dragon.id)}
              locale="en"
              color={dragon.color}
              columns
            />
          </div>
        </section>
      </div>
    </main>
  );
}
