"use client";

import { useState } from "react";

const BASE_URL = "https://flowerschamp-service-prod.up.railway.app";

export default function FloristLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vendor, setVendor] = useState<any>(null);
  const [orderCode, setOrderCode] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle = { width: "100%", padding: "0.5rem 0.75rem", border: "1px solid #d1d5db", borderRadius: "0.25rem", fontSize: "0.875rem" };
  const labelStyle = { display: "block" as const, marginBottom: "0.25rem", fontSize: "0.875rem", color: "#374151" };

  const fetchVendor = async () => {
    setError("");
    if (!email) { setError("Please enter a valid email first"); return; }
    if (!password) { setError("Invalid credentials"); return; }
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/user-auth/vendor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data?.success) {
        setVendor(data.results);
        setOrderCode("");
      } else {
        setError("Sorry. We are unable to fetch vendor details currently");
      }
    } catch {
      setError("Sorry! Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderData = async () => {
    setError(""); setSuccess("");
    if (!orderCode) { setError("Please enter order id first"); return; }
    if (!orderStatus) { setError("Please select an order status"); return; }
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/user-auth/update-order-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: orderCode, status: orderStatus, receivedBy }),
      });
      const data = await res.json();
      if (data?.success) {
        setSuccess("Successfully updated status");
        setVendor(null); setOrderStatus(""); setReceivedBy("");
      } else {
        setError("Sorry. We are unable to update order status");
        setOrderCode("");
      }
    } catch {
      setError("Sorry! Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const btnStyle = { padding: "0.625rem 1.5rem", background: "var(--color-olive)", color: "white", border: "none", borderRadius: "0.25rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, opacity: loading ? 0.7 : 1 };

  return (
    <section style={{ backgroundColor: "white", padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        <h1 className="font-serif" style={{ fontSize: "2rem", color: "var(--color-dark)", marginBottom: "1.5rem" }}>
          Florist Login
        </h1>

        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "0.25rem" }}>
            <strong>Error!</strong> {error}
          </div>
        )}
        {success && (
          <div style={{ background: "#dcfce7", color: "#166534", padding: "0.75rem 1rem", marginBottom: "1rem", borderRadius: "0.25rem" }}>
            <strong>Success!</strong> {success}
          </div>
        )}

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "0 0 auto" }}>
            <img src="/images/florist-login.webp" alt="Florist Login" style={{ maxWidth: "380px", width: "100%" }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          <div style={{ flex: "1 1 300px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!vendor ? (
              <>
                <div>
                  <label style={labelStyle}>Email Id:</label>
                  <input type="email" placeholder="Enter Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password:</label>
                  <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
                </div>
                <button onClick={fetchVendor} disabled={loading} style={btnStyle}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#2563eb" }}>{vendor?.company?.name}</p>
                  <p style={{ fontSize: "0.875rem", color: "#2563eb" }}>[{vendor?.email?.address}]</p>
                </div>
                <div>
                  <label style={labelStyle}>Enter Order Code:</label>
                  <input type="text" placeholder="ex: FCIDXXXXX" value={orderCode} onChange={(e) => setOrderCode(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Order Status:</label>
                  <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} style={inputStyle}>
                    <option value="">Select a status</option>
                    <option value="PENDING">Pending</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Received By:</label>
                  <input type="text" placeholder="Person name who received the order" value={receivedBy} onChange={(e) => setReceivedBy(e.target.value)} style={inputStyle} />
                </div>
                <button onClick={updateOrderData} disabled={loading} style={btnStyle}>
                  {loading ? "Updating..." : "Update Order Status"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
