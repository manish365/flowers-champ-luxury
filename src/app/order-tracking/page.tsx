"use client";

import { useEffect, useState } from "react";
import { fetchOrderByCode } from "@/lib/api";

export default function OrderTrackingPage() {
  const [email, setEmail] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) setOrderNo(code);
  }, []);

  const searchOrder = async () => {
    setError("");
    if (!email) { setError("Please enter a valid email first"); return; }
    if (!orderNo.trim()) { setError("Please enter a valid order code"); return; }
    try {
      setLoading(true);
      const data = await fetchOrderByCode(orderNo, email);
      if (data?.success) {
        setOrder(data.order);
      } else {
        setError("Sorry! We are unable to fetch order details");
      }
    } catch {
      setError("Sorry! We are unable to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    if (["PAYMENTRECEIVED", "NEW"].includes(status)) return "#2563eb";
    if (status === "DELETED") return "#dc2626";
    return "inherit";
  };

  const statusLabel = (status: string) => {
    if (status === "NEW") return "Payment Due";
    if (status === "PAYMENTRECEIVED") return "Pending";
    if (status === "PENDING") return "In Process";
    if (status === "DELIVERED") return "Delivered";
    return status;
  };

  return (
    <section style={{ backgroundColor: "white", padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        <h1 className="font-serif" style={{ fontSize: "2rem", color: "var(--color-dark)", marginBottom: "1.5rem" }}>
          Track Your Order
        </h1>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "0.25rem" }}>
            <strong>Error!</strong> {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 auto" }}>
            <img src="https://www.probunga.com/assets/template/templateprobunga/image/track_order.webp" alt="Track Order" style={{ maxWidth: "380px", width: "100%" }} />
          </div>

          <div style={{ flex: "1 1 300px" }}>
            {!order ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
                <h2 style={{ fontSize: "1.25rem", color: "var(--color-dark)" }}>Where is my order?</h2>
                <div>
                  <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Order No:</label>
                  <input type="text" placeholder="Order Number : FCIDXXX" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", fontSize: "0.875rem" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>Email Id:</label>
                  <input type="email" placeholder="Enter Email Id" value={email} onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", fontSize: "0.875rem" }} />
                </div>
                <button onClick={searchOrder} disabled={loading}
                  style={{ padding: "0.625rem 1.5rem", background: "var(--color-olive)", color: "white", border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}>
                  {loading ? "Searching..." : "Continue"}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  ["Order Number", order.code],
                  ["Order Amount", order.orderDetails?.totalAmount],
                  ["Order Date", new Date(order.createdAt).toLocaleDateString()],
                  ["Delivery Date", new Date(order.delivery?.date).toLocaleDateString()],
                  ["Payment Status", order.payment?.status === "PENDING" ? "Due" : order.payment?.status === "PAYMENTREFUND" ? "Refunded" : order.payment?.status],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
                    <span style={{ color: "#6b7280", minWidth: "130px" }}>{label}:</span>
                    <strong>{val}</strong>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem" }}>
                  <span style={{ color: "#6b7280", minWidth: "130px" }}>Order Status:</span>
                  <strong style={{ color: statusColor(order.orderDetails?.status) }}>{statusLabel(order.orderDetails?.status)}</strong>
                </div>
                <button onClick={() => { setOrder(null); setOrderNo(""); setError(""); }}
                  style={{ marginTop: "0.5rem", padding: "0.625rem 1.5rem", background: "transparent", color: "var(--color-olive)", border: "1px solid var(--color-olive)", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600 }}>
                  Track another order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
