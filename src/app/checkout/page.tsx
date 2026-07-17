"use client";

import { useState } from "react";
import Link from "next/link";
import { User, MapPin, Calendar, CreditCard, Lock, Check } from "lucide-react";
import styles from "./page.module.css";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const cartItems = [
    {
      id: 1,
      name: "Blush Romance",
      size: "Premium",
      price: 850000,
      qty: 1,
      img: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Classic Red Roses",
      size: "Standard",
      price: 680000,
      qty: 2,
      img: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=200&auto=format&fit=crop"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = 50000;
  const tax = subtotal * 0.11; // 11% PPN
  const total = subtotal + deliveryFee + tax;

  return (
    <section className={styles.checkoutSection}>
      <div className={`container ${styles.checkoutLayout}`}>
        
        {/* Form Area */}
        <div className={styles.formArea}>
          <form>
            {/* Contact Information */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <User className={styles.sectionIcon} size={20} /> Contact Information
              </h2>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Email Address</label>
                  <input type="email" className={styles.input} placeholder="your@email.com" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>First Name</label>
                  <input type="text" className={styles.input} placeholder="John" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input type="text" className={styles.input} placeholder="Doe" />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Phone Number</label>
                  <input type="tel" className={styles.input} placeholder="+62 812 3456 7890" />
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MapPin className={styles.sectionIcon} size={20} /> Delivery Details
              </h2>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Recipient Name</label>
                  <input type="text" className={styles.input} placeholder="Jane Doe" />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Street Address</label>
                  <input type="text" className={styles.input} placeholder="Jl. Sudirman No. 1" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City</label>
                  <input type="text" className={styles.input} placeholder="Jakarta" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Postal Code</label>
                  <input type="text" className={styles.input} placeholder="12190" />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Delivery Instructions (Optional)</label>
                  <input type="text" className={styles.input} placeholder="E.g. Leave at reception" />
                </div>
              </div>
            </div>

            {/* Delivery Date & Time */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Calendar className={styles.sectionIcon} size={20} /> Delivery Schedule
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Date</label>
                  <input type="date" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Time Slot</label>
                  <select className={`${styles.input} ${styles.select}`}>
                    <option>09:00 - 12:00 (Morning)</option>
                    <option>12:00 - 15:00 (Afternoon)</option>
                    <option>15:00 - 18:00 (Late Afternoon)</option>
                    <option>18:00 - 21:00 (Evening)</option>
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Card Message</label>
                  <textarea className={styles.input} rows={3} placeholder="Write a message for the recipient..."></textarea>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <CreditCard className={styles.sectionIcon} size={20} /> Payment Method
              </h2>
              <div className={styles.paymentOptions}>
                <label className={`${styles.paymentOption} ${paymentMethod === 'credit_card' ? styles.paymentOptionActive : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="credit_card" 
                    className={styles.radioInput} 
                    checked={paymentMethod === 'credit_card'}
                    onChange={() => setPaymentMethod('credit_card')}
                  />
                  <div className={styles.paymentLabel}>
                    Credit Card
                    <div className={styles.paymentIcons}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Visa, MC, Amex</span>
                    </div>
                  </div>
                </label>

                {paymentMethod === 'credit_card' && (
                  <div className={styles.formGrid} style={{ marginTop: '0.5rem', marginBottom: '0.5rem', marginLeft: '2.25rem' }}>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <input type="text" className={styles.input} placeholder="Card Number" />
                    </div>
                    <div className={styles.formGroup}>
                      <input type="text" className={styles.input} placeholder="MM / YY" />
                    </div>
                    <div className={styles.formGroup}>
                      <input type="text" className={styles.input} placeholder="CVC" />
                    </div>
                  </div>
                )}

                <label className={`${styles.paymentOption} ${paymentMethod === 'bank_transfer' ? styles.paymentOptionActive : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="bank_transfer" 
                    className={styles.radioInput}
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                  />
                  <div className={styles.paymentLabel}>Virtual Account (Bank Transfer)</div>
                </label>
                
                <label className={`${styles.paymentOption} ${paymentMethod === 'ewallet' ? styles.paymentOptionActive : ''}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="ewallet" 
                    className={styles.radioInput}
                    checked={paymentMethod === 'ewallet'}
                    onChange={() => setPaymentMethod('ewallet')}
                  />
                  <div className={styles.paymentLabel}>GoPay / OVO / ShopeePay</div>
                </label>
              </div>
            </div>

          </form>
        </div>

        {/* Order Summary Area */}
        <div className={styles.summaryArea}>
          <div className={styles.summaryBox}>
            <h2 className={`${styles.summaryTitle} font-serif`}>Order Summary</h2>
            
            <div className={styles.summaryItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.itemImageWrapper}>
                    <img src={item.img} alt={item.name} className={styles.itemImage} />
                    <span className={styles.itemQty}>{item.qty}</span>
                  </div>
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemMeta}>{item.size}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Taxes (11%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            
            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button type="button" className={styles.placeOrderBtn}>
              Place Order <Check size={16} />
            </button>
            <p className={styles.securityNote}>
              <Lock size={12} /> Secure encrypted payment
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
