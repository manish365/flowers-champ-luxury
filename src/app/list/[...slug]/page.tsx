"use client";

import { useParams } from "next/navigation";
import PLPContent from "@/components/shared/PLPContent";

export default function DynamicListPage() {
  const params = useParams();
  const slugArray = params.slug as string[];
  const type = slugArray?.[0] || "";
  const rawValue = slugArray?.[1] || "";
  const value = decodeURIComponent(rawValue).replace(/-/g, " ");

  return <PLPContent type={type} value={value} />;
}
