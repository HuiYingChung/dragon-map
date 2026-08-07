import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dragonRegions } from "@/data/dragons";
import CursorAura from "@/components/CursorAura";
import PrintCardActions from "@/components/PrintCardActions";
import ZoomableMuseumCard from "@/components/ZoomableMuseumCard";

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

        <ZoomableMuseumCard dragon={dragon} />
      </div>
    </main>
  );
}
