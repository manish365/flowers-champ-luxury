"use client";

import { useState } from "react";
import Link from "next/link";
import { User, MapPin, Calendar, CreditCard, Lock, Check, ChevronDown, Flower2 } from "lucide-react";
import styles from "./page.module.css";

const STATIC_ITEMS = [
  { id: 1, name: "Blush Romance Bouquet", variant: "Premium", price: 850000, qty: 1, img: "/birthday.jpg" },
  { id: 2, name: "Classic Red Roses", variant: "Standard", price: 680000, qty: 2, img: "/anniversary.jpg" },
];

const STEPS = ["Cart", "Details", "Payment", "Confirm"];

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [step] = useState(1); // 0-based index of current step

  const fmt = (p: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);

  const subtotal = STATIC_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = 50000;
  const total = subtotal + delivery;

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span>/</span>
            <Link href="/cart" className={styles.breadcrumbLink}>Cart</Link>
            <span>/</span>
            <span className={styles.breadcrumbActive}>Checkout</span>
          </div>
          <h1 className={`${styles.pageTitle} font-serif`}>Checkout</h1>

          {/* Step indicator */}
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s} className={styles.stepItem}>
                <div className={`${styles.stepDot} ${i <= step ? styles.stepDotActive : ""} ${i < step ? styles.stepDotDone : ""}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className={`${styles.stepLabel} ${i <= step ? styles.stepLabelActive : ""}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ""}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.layout}>

          {/* Left — Form */}
          <div className={styles.formCol}>

            {/* Contact */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}><User size={16} className={styles.cardIcon} /> Contact Information</h2>
              <div className={styles.grid2}>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Email Address</label>
                  <input type="email" className={styles.input} placeholder="your@email.com" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>First Name</label>
                  <input type="text" className={styles.input} placeholder="John" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last Name</label>
                  <input type="text" className={styles.input} placeholder="Doe" />
                </div>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Phone Number</label>
                  <div className={styles.phoneRow}>
                    <div className={styles.phoneCode}>
                      <span>🇮🇩</span> +62 <ChevronDown size={12} />
                    </div>
                    <input type="tel" className={`${styles.input} ${styles.phoneInput}`} placeholder="812 3456 7890" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}><MapPin size={16} className={styles.cardIcon} /> Delivery Details</h2>
              <div className={styles.grid2}>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Recipient Name</label>
                  <input type="text" className={styles.input} placeholder="Jane Doe" />
                </div>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Street Address</label>
                  <input type="text" className={styles.input} placeholder="Jl. Sudirman No. 1, RT 01/RW 02" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>City</label>
                  <select className={`${styles.input} ${styles.select}`}>
                    <option>Jakarta</option>
                    <option>Surabaya</option>
                    <option>Bandung</option>
                    <option>Bali</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Postal Code</label>
                  <input type="text" className={styles.input} placeholder="12190" />
                </div>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Delivery Note <span className={styles.optional}>(optional)</span></label>
                  <input type="text" className={styles.input} placeholder="E.g. Leave at reception, call on arrival" />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}><Calendar size={16} className={styles.cardIcon} /> Delivery Schedule</h2>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label}>Date</label>
                  <input type="date" className={styles.input} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Time Slot</label>
                  <select className={`${styles.input} ${styles.select}`}>
                    <option>09:00 – 12:00 (Morning)</option>
                    <option>12:00 – 15:00 (Afternoon)</option>
                    <option>15:00 – 18:00 (Late Afternoon)</option>
                    <option>18:00 – 21:00 (Evening)</option>
                  </select>
                </div>
                <div className={`${styles.field} ${styles.span2}`}>
                  <label className={styles.label}>Gift Message <span className={styles.optional}>(optional)</span></label>
                  <textarea className={`${styles.input} ${styles.textarea}`} rows={3} placeholder="Write a heartfelt message for the recipient..." />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}><CreditCard size={16} className={styles.cardIcon} /> Payment Method</h2>

              <div className={styles.paymentList}>
                {[
                  { id: "bank_transfer", label: "Virtual Account", sub: "BCA · Mandiri · BNI · BRI", emoji: "🏦" },
                  { id: "ewallet", label: "E-Wallet", sub: "GoPay · OVO · ShopeePay · DANA", emoji: "📱" },
                  { id: "credit_card", label: "Credit / Debit Card", sub: "Visa · Mastercard · Amex", emoji: "💳" },
                  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", emoji: "💵" },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`${styles.paymentOption} ${paymentMethod === pm.id ? styles.paymentActive : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={pm.id}
                      className={styles.radioHidden}
                      checked={paymentMethod === pm.id}
                      onChange={() => setPaymentMethod(pm.id)}
                    />
                    <div className={styles.paymentEmoji}>{pm.emoji}</div>
                    <div className={styles.paymentInfo}>
                      <span className={styles.paymentLabel}>{pm.label}</span>
                      <span className={styles.paymentSub}>{pm.sub}</span>
                    </div>
                    <div className={`${styles.radioCircle} ${paymentMethod === pm.id ? styles.radioCircleActive : ""}`}>
                      {paymentMethod === pm.id && <div className={styles.radioDot} />}
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "credit_card" && (
                <div className={styles.cardFields}>
                  <div className={`${styles.field} ${styles.span2}`}>
                    <label className={styles.label}>Card Number</label>
                    <input type="text" className={styles.input} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Expiry</label>
                    <input type="text" className={styles.input} placeholder="MM / YY" />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>CVC</label>
                    <input type="text" className={styles.input} placeholder="123" maxLength={4} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryBox}>
              <h2 className={`${styles.summaryTitle} font-serif`}>Order Summary</h2>

              <div className={styles.summaryItems}>
                {STATIC_ITEMS.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.summaryImgBox}>
                      <img src={item.img} alt={item.name} className={styles.summaryImg} />
                      <span className={styles.summaryQty}>{item.qty}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <p className={styles.summaryItemName}>{item.name}</p>
                      <p className={styles.summaryItemMeta}>{item.variant}</p>
                    </div>
                    <p className={styles.summaryItemPrice}>{fmt(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className={styles.summaryRow}><span>Delivery</span><span>{fmt(delivery)}</span></div>
                <div className={styles.summaryRow}><span>Discount</span><span className={styles.green}>— Rp 0</span></div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>

              <button className={styles.placeOrderBtn}>
                <Lock size={14} /> Place Order
              </button>

              <p className={styles.secureNote}>
                <Lock size={11} /> 256-bit SSL encrypted &amp; secure checkout
              </p>
            </div>

            {/* Delivery promise */}
            <div className={styles.promiseBox}>
              <Flower2 size={16} className={styles.promiseIcon} />
              <div>
                <p className={styles.promiseTitle}>Freshness Guaranteed</p>
                <p className={styles.promiseSub}>All bouquets are prepared fresh on the day of delivery.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
