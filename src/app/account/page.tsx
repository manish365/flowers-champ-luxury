"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function AccountDashboard() {
  return (
    <>
      <div className={styles.dashboardCard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={`${styles.welcomeTitle} font-serif`}>Welcome, John!</h1>
            <p className={styles.subtitle}>Manage your orders, addresses, and account details here.</p>
          </div>
        </div>

        {/* Track Order Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Track Order</h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Enter your order ID below to check its current status.</p>
          <div className={styles.trackOrderForm}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Order ID</label>
              <input type="text" className={styles.input} placeholder="e.g. FC-12345" />
            </div>
            <button className={styles.submitBtn}>Track</button>
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
          <div className={styles.orderItem}>
            <div className={styles.orderInfo}>
              <span className={styles.orderId}>#FC-98765</span>
              <span className={styles.orderDate}>May 15, 2026</span>
              <span className={styles.orderStatus}>Delivered</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className={styles.orderTotal}>Rp 850.000</div>
              <button className={styles.orderAction} style={{ marginTop: '0.5rem' }}>View Details</button>
            </div>
          </div>
        </div>

        {/* Address Book Overview */}
        <div className={styles.dashboardCard} style={{ marginBottom: 0 }}>
          <div className={styles.dashboardHeader}>
            <h2 className={`${styles.welcomeTitle} font-serif`} style={{ fontSize: '1.25rem' }}>Primary Address</h2>
            <Link href="/account/addresses" className={styles.viewAllLink}>Manage</Link>
          </div>
          <div className={styles.addressCard}>
            <h4 className={styles.addressName}>Home</h4>
            <div className={styles.addressDetails}>
              John Doe<br/>
              Jl. Sudirman No. 1, Jakarta 12190<br/>
              Indonesia<br/>
              Mobile: +62 812 3456 7890
            </div>
            <div className={styles.addressActions}>
              <button className={styles.actionBtn}>Edit</button>
              <button className={styles.actionBtn} style={{ color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
