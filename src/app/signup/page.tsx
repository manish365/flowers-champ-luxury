"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";
import styles from "@/components/auth/Auth.module.css";
import homeStyles from "@/app/page.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const firstName = fd.get("firstName") as string;
    const lastName = fd.get("lastName") as string;
    const email = fd.get("email") as string;
    const phone = fd.get("phone") as string;
    const password = fd.get("password") as string;
    const confirm = fd.get("confirm") as string;
    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    try {
      const res = await registerUser({
        email,
        name: `${firstName} ${lastName}`,
        mobile: phone,
        password
      });

      if (!res?.success) {
        if (res?.error?.code?.toString() === '11000') {
           const isMobile = res?.error?.message?.includes('mobile') || (res?.error?.keyValue && res?.error?.keyValue?.mobile);
           setError(isMobile ? 'Mobile Number already exists.' : 'Email already exists.');
        } else {
           setError(res?.error?.message || res?.message || "Registration failed");
        }
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.log(err)
      setError("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authSection}>
      <div className={styles.authContainer}>

        {/* Left — store images */}
        <div
          className={styles.imageSection}
          style={{ alignItems: "center", justifyContent: "center", padding: "3rem", position: "relative" }}
        >
          <div className={homeStyles.storyImageContainer} style={{ width: "100%", height: "100%", minHeight: "350px" }}>
            <div className={homeStyles.storyImageAccent} />
            <img src="/images/store.jpeg" alt="Store Interior" className={`${homeStyles.storyImage} ${homeStyles.storyImageMain}`} />
            <img src="/images/store2.jpeg" alt="Store Front" className={`${homeStyles.storyImage} ${homeStyles.storyImageSecondary}`} />
          </div>
          <div
            className={styles.imageOverlay}
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)", zIndex: 10 }}
          >
            <h2 className={styles.imageTitle}>Join Us Today</h2>
            <p className={styles.imageDesc}>Create your account and enjoy exclusive floral arrangements, same-day delivery, and personalised gifting.</p>
          </div>
        </div>

        {/* Right — form */}
        <div className={styles.formSection}>
          <div className={styles.authCard}>
            <div className={styles.authHeader}>
              <button onClick={() => router.back()} className={styles.backBtn}>
                <ArrowLeft size={15} /> Back
              </button>
              <h1 className={`${styles.authTitle} font-serif`}>Create Account</h1>
              <p className={styles.authSubtitle}>Join Flowers Champ for an exclusive floral experience</p>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", color: "#991b1b", padding: "0.6rem 1rem", marginBottom: "0.75rem", borderRadius: "0.375rem", fontSize: "0.8rem" }}>
                {error}
              </div>
            )}

            <form className={styles.authForm} onSubmit={handleSubmit}>
              {/* Name row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={15} />
                    <input name="firstName" type="text" className={styles.input} placeholder="John" required />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} size={15} />
                    <input name="lastName" type="text" className={styles.input} placeholder="Doe" required />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} size={15} />
                  <input name="email" type="email" className={styles.input} placeholder="your@email.com" required />
                </div>
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <Phone className={styles.inputIcon} size={15} />
                  <input name="phone" type="tel" className={styles.input} placeholder="+62 812 3456 7890" required />
                </div>
              </div>

              {/* Password row */}
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={15} />
                    <input name="password" type={showPassword ? "text" : "password"} className={styles.input} placeholder="••••••••" required />
                    <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Confirm Password</label>
                  <div className={styles.inputWrapper}>
                    <Lock className={styles.inputIcon} size={15} />
                    <input name="confirm" type={showConfirm ? "text" : "password"} className={styles.input} placeholder="••••••••" required />
                    <button type="button" className={styles.passwordToggle} onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className={styles.formOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} required />
                  <span>I agree to the{" "}
                    <Link href="/term-and-conditions" className={styles.forgotLink}>Terms & Conditions</Link>
                    {" "}and{" "}
                    <Link href="/privacy-policy" className={styles.forgotLink}>Privacy Policy</Link>
                  </span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className={styles.divider}><span>or sign up with</span></div>

            <div className={styles.socialBtns}>
              <button type="button" className={styles.socialBtn} onClick={() => signIn("google", { callbackUrl: "/account" })}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className={`${styles.socialBtn} ${styles.socialBtnFb}`} onClick={() => signIn("facebook", { callbackUrl: "/account" })}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <p className={styles.authFooter}>
              Already have an account?{" "}
              <Link href="/login" className={styles.authLink}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
