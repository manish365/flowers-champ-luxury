"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PLPContent from "@/components/shared/PLPContent";
import FlowerLoader from "@/components/shared/FlowerLoader";

function CollectionsInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  return <PLPContent type={q ? "search" : "all"} value={q} />;
}

export default function CollectionsPLP() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", background: "var(--color-cream)" }}>
        <FlowerLoader size={120} />
        <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Loading Collection...</p>
      </div>
    }>
      <CollectionsInner />
    </Suspense>
  );
}
