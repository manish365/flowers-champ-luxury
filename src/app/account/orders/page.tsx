"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserOrders } from "@/lib/api";
import Link from "next/link";

export default function OrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchUserOrders(session.user.accessToken)
        .then(res => {
          if (res?.success) setOrders(res.orders || []);
        })
        .catch(console.error);
    }
  }, [session]);

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
      <h1 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Order History</h1>
      <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>You have {orders.length} previous order{orders.length === 1 ? '' : 's'}.</p>
      
      {orders.map((order, idx) => (
        <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1.5rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '1rem', fontWeight: 600, color: 'var(--color-dark)' }}>#{order.orderNumber}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
              {new Date(order.createdAt || Date.now()).toLocaleDateString()}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0.25rem 0.5rem', backgroundColor: order.status === 'Delivered' ? '#dcfce7' : '#fef3c7', color: order.status === 'Delivered' ? '#166534' : '#92400e', fontSize: '0.625rem', fontWeight: 'bold', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>
              {order.status || 'Processing'}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-dark)' }}>Rp {order.orderTotal?.toLocaleString('id-ID')}</div>
            <Link href={`/order-tracking?code=${order.orderNumber}`}>
              <button style={{ backgroundColor: 'white', border: '1px solid var(--color-gold)', color: 'var(--color-gold)', padding: '0.5rem 1rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '0.5rem', cursor: 'pointer' }}>View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
