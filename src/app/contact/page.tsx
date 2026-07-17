"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <section className={styles.contactSection}>
      <div className="container">
        <div className={styles.contactHeader}>
          <h1 className={`${styles.contactTitle} font-serif`}>Get in Touch</h1>
          <p className={styles.contactSubtitle}>
            We would love to hear from you. Whether you have a question about an order, our floral arrangements, or bespoke services, our team is ready to assist.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Contact Info */}
          <div className={styles.infoBox}>
            <h2 className={`${styles.infoTitle} font-serif`}>Contact Information</h2>
            
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <MapPin className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Boutique Address</span>
                  <span className={styles.infoText}>Jl. Sunset Road No.88<br/>Seminyak, Bali<br/>Indonesia 80361</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Phone Number</span>
                  <span className={styles.infoText}>+62 812 3456 7890<br/>+62 361 987 654</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Mail className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Email</span>
                  <span className={styles.infoText}>hello@flowerschamp.com<br/>support@flowerschamp.com</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <Clock className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>Opening Hours</span>
                  <span className={styles.infoText}>Monday - Sunday<br/>8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formBox}>
            <form className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>First Name</label>
                <input type="text" className={styles.input} placeholder="Jane" required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Last Name</label>
                <input type="text" className={styles.input} placeholder="Doe" required />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Email Address</label>
                <input type="email" className={styles.input} placeholder="jane@example.com" required />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Subject</label>
                <input type="text" className={styles.input} placeholder="How can we help?" required />
              </div>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.label}>Message</label>
                <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Your message here..." required></textarea>
              </div>
              <div className={styles.fullWidth}>
                <button type="submit" className={styles.submitBtn}>
                  Send Message <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
