"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { useInView } from "./use-in-view";

type CellValue = "yes" | "dash" | "no" | "Limited";
type ColumnKey = "chitratap" | "card" | "qr" | "sign";
type Column = {
  key: ColumnKey;
  label: string;
  highlight?: boolean;
};

const columns: Column[] = [
  { key: "chitratap", label: "ChitraTap", highlight: true },
  { key: "card", label: "Traditional Business Card" },
  { key: "qr", label: "QR Code Only" },
  { key: "sign", label: "Printed Sign" },
];

const rows: Array<{
  feature: string;
  chitratap: CellValue;
  card: CellValue;
  qr: CellValue;
  sign: CellValue;
}> = [
  { feature: "One-tap access", chitratap: "yes", card: "dash", qr: "dash", sign: "dash" },
  { feature: "QR backup", chitratap: "yes", card: "dash", qr: "yes", sign: "yes" },
  { feature: "No app required", chitratap: "yes", card: "yes", qr: "yes", sign: "yes" },
  { feature: "Business information", chitratap: "yes", card: "Limited", qr: "yes", sign: "Limited" },
  { feature: "Google Maps location", chitratap: "yes", card: "dash", qr: "yes", sign: "dash" },
  { feature: "Social media links", chitratap: "yes", card: "Limited", qr: "yes", sign: "dash" },
  { feature: "Reviews & online presence", chitratap: "yes", card: "dash", qr: "yes", sign: "dash" },
  { feature: "Update information anytime", chitratap: "yes", card: "no", qr: "yes", sign: "no" },
  { feature: "Customer interaction tracking", chitratap: "yes", card: "no", qr: "Limited", sign: "no" },
  { feature: "Works digitally & physically", chitratap: "yes", card: "no", qr: "yes", sign: "yes" },
];

function CellMark({ value }: { value: CellValue }) {
  if (value === "yes") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#13b67a]/12 text-[#0f9f6d]">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-500">
        <X className="h-4 w-4" strokeWidth={2.6} />
      </span>
    );
  }

  if (value === "dash") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-400/10 text-slate-400">
        <Minus className="h-4 w-4" strokeWidth={2.6} />
      </span>
    );
  }

  return <span className="text-sm font-semibold text-[#6a7280]">{value}</span>;
}

export function Comparison() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="compare" className="bg-white py-6 sm:py-5 lg:py-8">
      <div className="container-proton" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 overflow-hidden rounded-[1.5rem] border border-[#ebe9f5] bg-white shadow-[0_18px_60px_rgba(44,26,122,0.08)] lg:mt-12"
        >
          <div className="thin-scrollbar overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left font-sans">
              <thead>
                <tr className="border-b border-[#ebe9f5]">
                  <th className="sticky left-0 z-10 bg-white px-3 py-5 text-sm font-semibold text-[#536273] sm:px-4">
                    Feature
                  </th>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`px-3 py-5 text-center text-sm font-bold sm:px-4 ${
                        column.highlight
                          ? "bg-[#f2efff] text-brand"
                          : "text-[#2c1a7a]"
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[#ebe9f5] last:border-b-0 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#fafbfc]"
                    }`}
                  >
                    <td className="sticky left-0 z-10 bg-inherit px-3 py-4 text-sm font-semibold text-[#253043] sm:px-4">
                      {row.feature}
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-3 py-4 text-center sm:px-4 ${
                          column.highlight ? "bg-[#f7f4ff]" : ""
                        }`}
                      >
                        <CellMark value={row[column.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <p className="mt-5 max-w-5xl font-sans text-xs leading-5 text-[#7a828c]">
          Notes: ChitraTap combines NFC and QR access with an editable digital
          business profile. Unlike printed materials, your business information
          can be updated without reprinting or replacing the stand. Features
          such as maps, ratings, reviews, and social links may depend on
          third-party services and their availability.
        </p>
        <p className="mt-2 max-w-5xl font-sans text-xs font-medium text-[#7a828c]">
          Last updated: August 2026
        </p>
      </div>
    </section>
  );
}
