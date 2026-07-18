"use client";

import { useParams } from "next/navigation";
import PLPContent from "@/components/shared/PLPContent";

export default function CityPage() {
  const params = useParams();
  const city = decodeURIComponent(params.id as string);
  return <PLPContent type="city" value={city} />;
}
