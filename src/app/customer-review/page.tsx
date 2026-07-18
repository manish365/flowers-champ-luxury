"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { fetchReviews } from "@/lib/api";

export default function CustomerReviewPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchReviews(page, 9);
        const results = data?.results || [];
        setReviews(results);
        setHasMore(results.length === 9);
      } catch {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [page]);

  return (
    <section style={{ backgroundColor: "white", padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        <h1 className="font-serif" style={{ fontSize: "2rem", color: "var(--color-dark)", marginBottom: "1.5rem" }}>
          Customer Reviews
        </h1>

        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading reviews...</p>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {reviews.map((r: any) => (
                <div key={r._id} style={{ border: "1px solid #e5e7eb", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.25rem" }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill={i < r.rating ? "var(--color-gold)" : "none"} color={i < r.rating ? "var(--color-gold)" : "#d1d5db"} />
                    ))}
                  </div>
                  {r.title && <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--color-dark)" }}>{r.title}</p>}
                  <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.6 }}>{r.review}</p>
                  <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9ca3af" }}>
                    <span>{r.name}</span>
                    <span>{new Date(r.updatedAt || r.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem" }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                style={{ padding: "0.5rem 1.25rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1, fontSize: "0.875rem" }}>
                Previous
              </button>
              <span style={{ padding: "0.5rem 1rem", fontSize: "0.875rem", color: "#6b7280" }}>Page {page}</span>
              <button onClick={() => setPage((p) => p + 1)} disabled={!hasMore}
                style={{ padding: "0.5rem 1.25rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", cursor: !hasMore ? "not-allowed" : "pointer", opacity: !hasMore ? 0.4 : 1, fontSize: "0.875rem" }}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
