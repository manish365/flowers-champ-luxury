"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, ArrowRight, Trash2, Tag, Flower2 } from "lucide-react";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { removeProductByIndex, setCountByIndex } from "@/lib/store/reducers/cart";

const STATIC_ITEMS = [
  {
    id: "static-1",
    name: "Blush Romance Bouquet",
    thumb: "/birthday.jpg",
    variant: "Premium",
    variantPrice: 850000,
    qty: 1,
    delivery: { date: "2025-07-20", time: { from: "09:00", to: "12:00", type: "STANDARD" }, price: 50000 },
    cityName: "Jakarta",
    addOns: [{ name: "Teddy Bear", qty: 1, unitPrice: 120000, image: "/images/teddy.jpg" }],
    addOnPrice: 120000,
  },
  {
    id: "static-2",
    name: "Classic Red Roses",
    thumb: "/anniversary.jpg",
    variant: "Standard",
    variantPrice: 680000,
    qty: 2,
    delivery: { date: "2025-07-21", time: { from: "12:00", to: "15:00", type: "STANDARD" }, price: 50000 },
    cityName: "Surabaya",
    addOns: [],
    addOnPrice: 0,
  },
];

export default function CartPage() {
  const dispatch = useDispatch();
  const reduxItems = useSelector((state: RootState) => state.cart.cartItems);

  // Use redux items if available, else show static preview
  const cartItems: any[] = reduxItems.length > 0 ? reduxItems : STATIC_ITEMS;
  const isStatic = reduxItems.length === 0;

  const handleQtyChange = (index: number, currentQty: number, delta: number) => {
    if (isStatic) return;
    dispatch(setCountByIndex({ index, value: Math.max(1, currentQty + delta) }));
  };

  const handleRemove = (index: number) => {
    if (isStatic) return;
    dispatch(removeProductByIndex(index));
  };

  const fmt = (p: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);

  const subtotal = cartItems.reduce((s, i) => s + i.variantPrice * i.qty + (i.addOnPrice || 0), 0);
  const delivery = cartItems.reduce((s, i) => s + (i.delivery?.price || 0), 0);
  const total = subtotal + delivery;

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span>/</span>
            <span className={styles.breadcrumbActive}>Shopping Cart</span>
          </div>
          <h1 className={`${styles.pageTitle} font-serif`}>Your Cart</h1>
          <p className={styles.pageSubtitle}>{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>
        </div>
      </div>

      <div className="container">
        {isStatic && (
          <div className={styles.previewBanner}>
            <Flower2 size={14} /> Preview mode — add products to see your real cart
          </div>
        )}

        <div className={styles.layout}>
          {/* Left — Cart Items */}
          <div className={styles.itemsCol}>
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className={styles.cartCard}>
                {/* Product Row */}
                <div className={styles.productRow}>
                  <Link href={`/products/${item.id}`} className={styles.imgBox}>
                    <img src={item.thumb} alt={item.name} className={styles.img} />
                  </Link>
                  <div className={styles.info}>
                    <div className={styles.infoTop}>
                      <div>
                        <Link href={`/products/${item.id}`} className={styles.name}>{item.name}</Link>
                        <p className={styles.meta}>Variant: <span>{item.variant}</span></p>
                        {item.cityName && <p className={styles.meta}>City: <span>{item.cityName}</span></p>}
                        {item.delivery?.date && (
                          <p className={styles.meta}>
                            Delivery: <span>{item.delivery.date} · {item.delivery.time?.from}–{item.delivery.time?.to}</span>
                          </p>
                        )}
                      </div>
                      <button className={styles.removeBtn} onClick={() => handleRemove(index)} title="Remove">
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className={styles.infoBottom}>
                      <div className={styles.qtyRow}>
                        <button className={styles.qtyBtn} onClick={() => handleQtyChange(index, item.qty, -1)}>
                          <Minus size={12} />
                        </button>
                        <span className={styles.qtyVal}>{item.qty}</span>
                        <button className={styles.qtyBtn} onClick={() => handleQtyChange(index, item.qty, 1)}>
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className={styles.price}>{fmt(item.variantPrice * item.qty)}</p>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                {item.addOns?.length > 0 && (
                  <div className={styles.addonsRow}>
                    <p className={styles.addonsLabel}>Add-ons</p>
                    <div className={styles.addonsList}>
                      {item.addOns.map((a: any, ai: number) => (
                        <div key={ai} className={styles.addonItem}>
                          {a.image && <img src={a.image} alt={a.name} className={styles.addonImg} />}
                          <span className={styles.addonName}>{a.name} ×{a.qty}</span>
                          <span className={styles.addonPrice}>{fmt(a.unitPrice * a.qty)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Coupon */}
            <div className={styles.couponRow}>
              <Tag size={14} className={styles.couponIcon} />
              <input type="text" placeholder="Enter coupon code" className={styles.couponInput} />
              <button className={styles.couponBtn}>Apply</button>
            </div>
          </div>

          {/* Right — Summary */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryBox}>
              <h2 className={`${styles.summaryTitle} font-serif`}>Order Summary</h2>

              <div className={styles.summaryRows}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>{delivery > 0 ? fmt(delivery) : "Free"}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Discount</span>
                  <span className={styles.discount}>— Rp 0</span>
                </div>
              </div>

              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>

              <Link href="/collections" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </div>

            {/* Trust badges */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>🔒 Secure Payment</div>
              <div className={styles.trustItem}>🚚 Same Day Delivery</div>
              <div className={styles.trustItem}>🌸 Fresh Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
