"use client";

import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { removeProductByIndex, setCountByIndex } from "@/lib/store/reducers/cart";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const handleQtyChange = (index: number, currentQty: number, delta: number) => {
    const newQty = Math.max(1, currentQty + delta);
    dispatch(setCountByIndex({ index, value: newQty }));
  };

  const handleRemove = (index: number) => {
    dispatch(removeProductByIndex(index));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.variantPrice * item.qty), 0);
  const deliveryFee = subtotal > 0 ? 50000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <section className={styles.cartSection}>
      <div className="container">
        <h1 className={`${styles.pageTitle} font-serif`}>Your Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className={styles.cartLayout}>
            {/* Cart Items */}
            <div className={styles.cartItems}>
              <div className={styles.cartHeader}>
                <div>Product</div>
                <div className={styles.cartHeaderItem}>Quantity</div>
                <div className={styles.cartHeaderItem}>Total</div>
              </div>

              <div className={styles.cartList}>
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className={styles.cartItem}>
                    <div className={styles.productInfo}>
                      <Link href={`/products/${item.id}`} className={styles.productImageWrapper}>
                        <img src={item.thumb} alt={item.name} className={styles.productImage} />
                      </Link>
                      <div className={styles.productDetails}>
                        <Link href={`/products/${item.id}`} className={styles.productName}>{item.name}</Link>
                        <p className={styles.productMeta}>Variant: {item.variant}</p>
                        <p className={styles.productMeta}>{formatPrice(item.variantPrice)}</p>
                        <button onClick={() => handleRemove(index)} className={styles.removeBtn}>Remove</button>
                      </div>
                    </div>

                    <div className={styles.qtyWrapper}>
                      <div className={styles.qtySelector}>
                        <button className={styles.qtyBtn} onClick={() => handleQtyChange(index, item.qty, -1)}>
                          <Minus size={14} />
                        </button>
                        <input type="text" value={item.qty} className={styles.qtyInput} readOnly />
                        <button className={styles.qtyBtn} onClick={() => handleQtyChange(index, item.qty, 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.itemTotal}>
                      {formatPrice(item.variantPrice * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className={styles.summaryWrapper}>
              <div className={styles.summaryBox}>
                <h2 className={`${styles.summaryTitle} font-serif`}>Order Summary</h2>
                
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Estimated Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Link href="/checkout" className={styles.checkoutBtn}>
                  Proceed to Checkout <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <ShoppingBag className={styles.emptyIcon} />
            <h2 className={styles.emptyText}>Your cart is currently empty.</h2>
            <Link href="/collections" className={styles.continueShoppingBtn}>
              Continue Shopping
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
