"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        username: email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/account");
      }
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authSection}>
      <div className={styles.authContainer}>
        {/* Left Side: Image (Hidden on mobile) */}
        <div className={styles.imageSection}>
          <div className={styles.imageOverlay}>
            <h2 className={styles.imageTitle}>Welcome to Luxury</h2>
            <p className={styles.imageDesc}>Sign in to experience the finest floral arrangements and exclusive benefits tailored just for you.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className={styles.formSection}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <h1 className={`${styles.authTitle} font-serif`}>Welcome Back</h1>
              <p className={styles.authSubtitle}>Sign in to access your luxury floral experience</p>
            </div>

            <form className={styles.authForm} onSubmit={handleSubmit}>
              {error && <div className={styles.errorMessage} style={{color: 'red', marginBottom: '1rem', fontSize: '0.875rem'}}>{error}</div>}
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <input name="email" type="email" className={styles.input} placeholder="your@email.com" required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    className={styles.input} 
                    placeholder="••••••••" 
                    required 
                  />
                  <button 
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  Remember me
                </label>
                <Link href="/forgot-password" className={styles.forgotLink}>
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <button type="button" className={styles.socialBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <p className={styles.authFooter}>
              Don't have an account? <Link href="/signup" className={styles.authLink}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
