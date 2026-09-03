"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchOrderByCode } from "@/lib/api";
import { PackageSearch, Hash, Mail, RotateCcw, ArrowLeft } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";
import homeStyles from "@/app/page.module.css";

export default function OrderTrackingPage() {
  const [email, setEmail] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    if (status === "DELIVERED") return "#16a34a";
    return "var(--color-olive)";
  };

  const statusLabel = (status: string) => {
    if (status === "NEW") return "Payment Due";
    if (status === "PAYMENTRECEIVED") return "Pending";
    if (status === "PENDING") return "In Process";
    if (status === "DELIVERED") return "Delivered";
    return status;
  };

  return (
    <section className={styles.authSection}>
      <div className={styles.authContainer}>

        {/* Left — same store images as login */}
        <div
          className={styles.imageSection}
          style={{ alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative' }}
        >
          <div className={homeStyles.storyImageContainer} style={{ width: '100%', height: '100%', minHeight: '350px' }}>
            <div className={homeStyles.storyImageAccent} />
            <img src="/images/store.jpeg" alt="Store Interior" className={`${homeStyles.storyImage} ${homeStyles.storyImageMain}`} />
            <img src="/images/store2.jpeg" alt="Store Front" className={`${homeStyles.storyImage} ${homeStyles.storyImageSecondary}`} />
          </div>
          <div
            className={styles.imageOverlay}
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', zIndex: 10 }}
          >
            <h2 className={styles.imageTitle}>Track Your Order</h2>
            <p className={styles.imageDesc}>Enter your order number and email to get real-time updates on your delivery.</p>
          </div>
        </div>

        {/* Right — form */}
        <div className={styles.formSection}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <button onClick={() => router.back()} className={styles.backBtn}>
                <ArrowLeft size={15} /> Back
              </button>
              <h1 className={`${styles.authTitle} font-serif`}>Where is my order?</h1>
              <p className={styles.authSubtitle}>Enter your details below to track your order status</p>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.65rem 1rem", marginBottom: "1rem", borderRadius: "0.375rem", fontSize: "0.8rem" }}>
                {error}
              </div>
            )}

            {!order ? (
              <div className={styles.authForm}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Order Number</label>
                  <div className={styles.inputWrapper}>
                    <Hash className={styles.inputIcon} size={16} />
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g. FCID123"
                      value={orderNo}
                      onChange={(e) => setOrderNo(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchOrder()}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <div className={styles.inputWrapper}>
                    <Mail className={styles.inputIcon} size={16} />
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchOrder()}
                    />
                  </div>
                </div>

                <button className={styles.submitBtn} onClick={searchOrder} disabled={loading}>
                  {loading ? "Searching..." : <><PackageSearch size={15} style={{ marginRight: '0.5rem' }} />Track Order</>}
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  ["Order Number", order.code],
                  ["Order Amount", order.orderDetails?.totalAmount],
                  ["Order Date", new Date(order.createdAt).toLocaleDateString()],
                  ["Delivery Date", new Date(order.delivery?.date).toLocaleDateString()],
                  ["Payment Status", order.payment?.status === "PENDING" ? "Due" : order.payment?.status === "PAYMENTREFUND" ? "Refunded" : order.payment?.status],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span style={{ color: "#6b7280", minWidth: "130px", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
                    <strong style={{ color: "var(--color-dark)" }}>{val}</strong>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.875rem", padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6" }}>
                  <span style={{ color: "#6b7280", minWidth: "130px", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Order Status</span>
                  <strong style={{ color: statusColor(order.orderDetails?.status) }}>{statusLabel(order.orderDetails?.status)}</strong>
                </div>

                <button
                  className={styles.submitBtn}
                  style={{ marginTop: "0.75rem", background: "transparent", color: "var(--color-olive)", border: "1px solid var(--color-olive)", boxShadow: "none" }}
                  onClick={() => { setOrder(null); setOrderNo(""); setError(""); }}
                >
                  <RotateCcw size={14} style={{ marginRight: '0.5rem' }} /> Track Another Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
