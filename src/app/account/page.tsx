"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserOrders, fetchUserProfile } from "@/lib/api";
import styles from "./page.module.css";

export default function AccountDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userName = session?.user?.name || "User";
  const userFirstName = userName.split(' ')[0];
  const [orders, setOrders] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.accessToken) {
      fetchUserOrders(session.user.accessToken)
        .then(res => {
          if (res?.success) setOrders(res.orders || []);
        })
        .catch(console.error);

      fetchUserProfile(session.user.accessToken)
        .then(res => {
          if (res?.success) {
            if (res.user?.profile?.name) {
              setProfileName(res.user.profile.name);
            } else if (res.user?.name) {
              setProfileName(res.user.name);
            }
            if (res.user?.address?.length > 0) {
              setAddress(res.user.address[0]); // first address as primary
            }
          }
        })
        .catch(console.error);
    }
  }, [session]);
  return (
    <>
      <div className={styles.dashboardCard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={`${styles.welcomeTitle} font-serif`}>Welcome, {(profileName || userName).split(' ')[0]}!</h1>
            <p className={styles.subtitle}>Manage your orders, addresses, and account details here.</p>
          </div>
        </div>

        {/* Track Order Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Track Order</h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Enter your order ID below to check its current status.</p>
          <div className={styles.trackOrderForm}>
            <form className={styles.formGroup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const orderId = formData.get("orderId");
              if (orderId) {
                router.push(`/order-tracking?code=${orderId}`);
              }
            }}>
              <div>
                <label className={styles.label}>Order ID</label>
                <input type="text" name="orderId" className={styles.input} placeholder="e.g. FC-12345" required />
              </div>
              <button type="submit" className={styles.submitBtn} style={{ marginTop: 0 }}>Track</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Recent Orders Overview */}
        <div className={styles.dashboardCard} style={{ marginBottom: 0 }}>
          <div className={styles.dashboardHeader}>
            <h2 className={`${styles.welcomeTitle} font-serif`} style={{ fontSize: '1.25rem' }}>Recent Orders</h2>
            <Link href="/account/orders" className={styles.viewAllLink}>View All</Link>
          </div>
          {orders.length > 0 ? (
            <div className={styles.orderItem}>
              <div className={styles.orderInfo}>
                <span className={styles.orderId}>#{orders[0].orderNumber}</span>
                <span className={styles.orderDate}>{new Date(orders[0].createdAt || Date.now()).toLocaleDateString()}</span>
                <span className={styles.orderStatus}>{orders[0].status || 'Processing'}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={styles.orderTotal}>Rp {orders[0].orderTotal?.toLocaleString('id-ID')}</div>
                <Link href={`/order-tracking?code=${orders[0].orderNumber}`}>
                  <button className={styles.orderAction} style={{ marginTop: '0.5rem' }}>View Details</button>
                </Link>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>No recent orders found.</p>
          )}
        </div>

        {/* Address Book Overview */}
        <div className={styles.dashboardCard} style={{ marginBottom: 0 }}>
          <div className={styles.dashboardHeader}>
            <h2 className={`${styles.welcomeTitle} font-serif`} style={{ fontSize: '1.25rem' }}>Primary Address</h2>
            <Link href="/account/addresses" className={styles.viewAllLink}>Manage</Link>
          </div>
          {address ? (
            <div className={styles.addressCard}>
              <h4 className={styles.addressName}>{address.addressType || 'Home'}</h4>
              <div className={styles.addressDetails}>
                {address.title} {address.name}<br/>
                {address.address}<br/>
                {address.city}, {address.state} {address.zipCode}<br/>
                {address.country}<br/>
                Mobile: {address.mobile?.number}
              </div>
              <div className={styles.addressActions}>
                <Link href="/account/addresses"><button className={styles.actionBtn}>Edit</button></Link>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>No primary address saved yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
