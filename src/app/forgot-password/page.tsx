"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";

export default function ForgotPasswordPage() {
  return (
    <section className={styles.authSection}>
      <div className={styles.authCard}>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#6b7280', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.3s ease' }}>
          <ArrowLeft size={14} /> Back to Login
        </Link>
        
        <div className={styles.authHeader} style={{ marginBottom: '1.5rem' }}>
          <h1 className={`${styles.authTitle} font-serif`}>Reset Password</h1>
          <p className={styles.authSubtitle}>Enter your email address to receive a password reset link.</p>
        </div>

        <form className={styles.authForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} />
              <input type="email" className={styles.input} placeholder="your@email.com" required />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Send Reset Link
          </button>
        </form>

      </div>
    </section>
  );
}
