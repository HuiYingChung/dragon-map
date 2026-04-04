"use client";

import Link from "next/link";

type PrintCardActionsProps = {
  dragonId: string;
};

export default function PrintCardActions({ dragonId }: PrintCardActionsProps) {
  return (
    <div className="postcard-print-actions flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-sm border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(201,168,76,0.18)] hover:brightness-110"
        style={{
          color: "rgba(224, 196, 118, 0.92)",
          borderColor: "rgba(201, 168, 76, 0.34)",
          background: "linear-gradient(180deg, rgba(201, 168, 76, 0.18), rgba(201, 168, 76, 0.08))",
        }}
      >
        Print Card
      </button>

      <Link
        href={`/dragons/${dragonId}`}
        className="rounded-sm border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-px hover:border-[rgba(201,168,76,0.28)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[rgba(236,220,190,0.95)]"
        style={{
          color: "rgba(214, 193, 160, 0.86)",
          borderColor: "rgba(201, 168, 76, 0.14)",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        Dragon Entry
      </Link>

      <Link
        href="/"
        className="rounded-sm border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-200 hover:-translate-y-px hover:border-[rgba(201,168,76,0.28)] hover:bg-[rgba(201,168,76,0.08)] hover:text-[rgba(236,220,190,0.95)]"
        style={{
          color: "rgba(214, 193, 160, 0.86)",
          borderColor: "rgba(201, 168, 76, 0.14)",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        Atlas
      </Link>
    </div>
  );
}
