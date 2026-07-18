"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAreas } from "@/lib/api";

export default function DeliveryCitiesPage() {
  const [cities, setCities] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAreas();
        if (data?.success) {
          setCities(data.results);
          setFiltered(data.results);
        }
      } catch {
        setError("Sorry! City list not found. Try again later.");
      }
    }
    load();
  }, []);

  const onSearch = (val: string) => {
    setSearch(val);
    setFiltered(val.trim() ? cities.filter((c) => c.name.toLowerCase().includes(val.toLowerCase())) : cities);
  };

  return (
    <section style={{ backgroundColor: "white", padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        <h1 className="font-serif" style={{ fontSize: "2rem", color: "var(--color-dark)", marginBottom: "1.5rem" }}>
          Indonesia Delivery Cities
        </h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", maxWidth: "400px" }}>
          <input type="text" placeholder="Search city..." value={search} onChange={(e) => onSearch(e.target.value)}
            style={{ flex: 1, padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", fontSize: "0.875rem" }} />
          <button onClick={() => onSearch(search)}
            style={{ padding: "0.5rem 1rem", background: "var(--color-olive)", color: "white", border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.875rem" }}>
            Search
          </button>
        </div>

        {error && <p style={{ color: "#dc2626", marginBottom: "1rem" }}>{error}</p>}

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
          {filtered.map((c) => (
            <Link key={c._id} href={`/city/${c.name}`}
              style={{ fontSize: "0.875rem", color: "var(--color-olive)", textDecoration: "none", padding: "0.25rem 0" }}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
