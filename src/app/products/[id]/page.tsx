"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, Heart, MapPin, Minus, Plus, ShoppingBag, Flower2, Truck, Flower, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addProduct, updateCartCity, updateWorkingCartAddons, toggleAddonModal, updateWorkingCart } from "@/lib/store/reducers/cart";
import { toggleFavProduct } from "@/lib/store/reducers/user";
import { fetchProduct, fetchProductDetailsMeta, fetchAddonProducts } from "@/lib/api";
import FlowerLoader from "@/components/shared/FlowerLoader";
import styles from "./page.module.css";

export default function ProductPDP() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const id = params?.id as string;

  const { cartItems, workingCart, metaData } = useSelector((s: RootState) => s.cart);
  const { favProducts } = useSelector((s: RootState) => s.user);

  const [product, setProduct] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // selections
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("classic");
  const [variantPrice, setVariantPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  // delivery date/slot
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [showSlots, setShowSlots] = useState(false);

  // addon modal
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [addons, setAddons] = useState<any[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  // tabs
  const [activeTab, setActiveTab] = useState<"description" | "care" | "delivery">("description");

  const isFav = favProducts?.includes(id);
  const inCart = cartItems.some((c: any) => c.id === id);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const [prodRes, metaRes] = await Promise.all([
          fetchProduct(id),
          fetchProductDetailsMeta(),
        ]);
        if (prodRes?.success) {
          const p = prodRes.results;
          setProduct(p);
          setVariantPrice(+p.countryPrice?.price?.standard?.currentPrice || 0);
        } else {
          setError("Product not found.");
        }
        if (metaRes?.success) {
          const sorted = (metaRes.results?.area || []).sort((a: any, b: any) =>
            a.name > b.name ? 1 : -1
          );
          setCities(sorted);
          setSlots(metaRes.results?.deliverySlot || []);
        }
      } catch {
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleCityChange = (cityId: string) => {
    setSelectedCity(cityId);
    const city = cities.find((c) => c._id === cityId);
    setSelectedCityName(city?.name || "");
    setShowSlots(false);
    setSelectedSlot(null);
    setDeliveryDate("");

    if (!product?.cityPrice?.length) return;
    const cp = product.cityPrice.find((c: any) => c._id === cityId);
    if (cp) {
      setVariantPrice(+(cp.price?.standard?.currentPrice || 0));
      setDeliveryPrice(+(cp.price?.standard?.deliveryPrice || 0));
    } else {
      setVariantPrice(+product.countryPrice?.price?.standard?.currentPrice || 0);
      setDeliveryPrice(100000);
    }
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
    setDeliveryDate(new Date().toISOString().split("T")[0]);
    setShowSlots(false);
  };

  const handleAddToCart = async () => {
    if (!selectedCity) { setError("Please select a city first."); return; }
    if (!selectedSlot) { setError("Please select a delivery slot first."); return; }
    setError("");

    // load addons
    try {
      const addonRes = await fetchAddonProducts();
      const list = addonRes?.results || product?.related?.products || [];
      setAddons(list);
    } catch {
      setAddons(product?.related?.products || []);
    }

    dispatch(updateWorkingCart({ variant: selectedVariant, price: variantPrice, city: selectedCity }));
    setShowAddonModal(true);
  };

  const confirmAddToCart = (addonList: any[] = []) => {
    const cartProduct = {
      id: product._id,
      code: product.code,
      name: product.name,
      thumb: product.image?.default,
      qty: 1,
      variant: selectedVariant,
      variantPrice,
      glassVaseAdded: false,
      glassVasePrice: 0,
      eggLess: false,
      eggLessPrice: 0,
      delivery: {
        type: selectedSlot?.type || "STANDARD",
        date: deliveryDate,
        time: selectedSlot,
        price: deliveryPrice,
      },
      giftOption: { message: "", messageType: "", occaision: "", senderName: "", errors: {} },
      addOns: addonList,
      addOnQty: addonList.reduce((s: number, a: any) => s + (a.qty || 0), 0),
      addOnPrice: addonList.reduce((s: number, a: any) => s + (a.unitPrice || 0) * (a.qty || 0), 0),
      cityId: selectedCity,
      cityName: selectedCityName,
    };
    dispatch(updateCartCity(selectedCity));
    dispatch(addProduct({ product: cartProduct, qty: 1 }));
    dispatch(updateWorkingCartAddons());
    setShowAddonModal(false);
    router.push("/cart");
  };

  const toggleAddon = (addon: any) => {
    setSelectedAddons((prev) => {
      const next = { ...prev };
      if (next[addon._id]) delete next[addon._id];
      else next[addon._id] = 1;
      return next;
    });
  };

  const changeAddonQty = (id: string, delta: number) => {
    setSelectedAddons((prev) => {
      const next = { ...prev };
      const newQty = (next[id] || 0) + delta;
      if (newQty <= 0) delete next[id];
      else next[id] = newQty;
      return next;
    });
  };

  const buildAddonList = () =>
    Object.entries(selectedAddons).map(([addonId, qty]) => {
      const a = addons.find((x) => x._id === addonId);
      return { _id: addonId, qty, unitPrice: +a?.price || 0, image: a?.image, name: a?.name };
    });

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(p);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", background: "var(--color-cream)" }}>
      <FlowerLoader size={130} />
      <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Loading Product...</p>
    </div>
  );

  if (error && !product) return (
    <div style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#dc2626", fontSize: "0.875rem" }}>
      {error}
    </div>
  );

  if (!product) return null;

  const price = variantPrice || +product.countryPrice?.price?.standard?.currentPrice || 0;
  const oldPrice = +product.countryPrice?.price?.standard?.oldPrice || 0;
  const rating = product.review?.rating || 5;
  const reviewCount = product.review?.count || 0;
  const standardSlots = slots.filter((s) => s.type === "STANDARD");

  return (
    <>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbsWrapper}>
        <div className={`container ${styles.breadcrumbs}`}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span>/</span>
          <Link href="/collections" className={styles.breadcrumbLink}>Collections</Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>{product.name}</span>
        </div>
      </div>

      {/* Main Section */}
      <section className={styles.mainSection}>
        <div className={`container ${styles.productLayout}`}>

          {/* Image */}
          <div className={styles.imageGallery}>
            <div className={styles.mainImageWrapper}>
              {product.extraTags?.some((t: any) => t?.name) && (
                <span className={styles.badge}>{product.extraTags[0].name}</span>
              )}
              <button
                className={styles.favButton}
                onClick={() => dispatch(toggleFavProduct({ id }))}
                style={{ color: isFav ? "var(--color-gold)" : undefined }}
              >
                <Heart size={16} fill={isFav ? "currentColor" : "none"} />
              </button>
              <img src={product.image?.default} className={styles.mainImage} alt={product.name} />
            </div>
          </div>

          {/* Details */}
          <div className={styles.productDetails}>
            {/* Rating */}
            <div className={styles.reviews}>
              <div className={styles.stars}>
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} fill={s <= Math.round(rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className={styles.reviewLink}>({reviewCount} Reviews)</span>
            </div>

            <h1 className={`${styles.title} font-serif`}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <p className={styles.price}>{formatPrice(price)}</p>
              {oldPrice > 0 && (
                <p style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "line-through" }}>{formatPrice(oldPrice)}</p>
              )}
            </div>

            {/* City Select */}
            <div className={styles.deliveryCheck}>
              <h3 className={styles.deliveryTitle}>
                <MapPin size={14} /> Select Delivery City
              </h3>
              <select
                className={styles.deliveryInput}
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <option value="">-- Choose a city --</option>
                {cities.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Delivery Slot */}
            {selectedCity && (
              <div className={styles.deliveryCheck} style={{ marginTop: "1rem" }}>
                <h3 className={styles.deliveryTitle}>
                  <Truck size={14} /> Select Delivery Slot
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {standardSlots.map((slot: any) => (
                    <button
                      key={slot._id}
                      onClick={() => handleSlotSelect(slot)}
                      style={{
                        padding: "0.4rem 0.75rem",
                        fontSize: "0.75rem",
                        border: `1px solid ${selectedSlot?._id === slot._id ? "var(--color-gold)" : "#e5e7eb"}`,
                        borderRadius: "0.25rem",
                        background: selectedSlot?._id === slot._id ? "rgba(200,169,107,0.15)" : "white",
                        color: selectedSlot?._id === slot._id ? "var(--color-gold)" : "var(--color-dark)",
                        cursor: "pointer",
                        fontWeight: selectedSlot?._id === slot._id ? 600 : 400,
                      }}
                    >
                      {slot.from} – {slot.to}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.5rem" }}>{error}</p>
            )}

            {/* Actions */}
            <div className={styles.actionGroup} style={{ marginTop: "1.5rem" }}>
              {!inCart ? (
                <button className={styles.addToCartBig} onClick={handleAddToCart}>
                  <ShoppingBag size={16} /> Add To Cart
                </button>
              ) : (
                <button className={styles.addToCartBig} onClick={() => router.push("/cart")}
                  style={{ background: "var(--color-gold)" }}>
                  <ShoppingBag size={16} /> Go To Cart
                </button>
              )}
            </div>

            <button className={styles.buyNowBtn} onClick={handleAddToCart}>
              Buy It Now
            </button>

            {/* Features */}
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}><Flower2 size={20} /></div>
                <div>
                  <h4 className={styles.featureTitle}>Fresh Blooms</h4>
                  <p className={styles.featureDesc}>Handpicked daily</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}><Truck size={20} /></div>
                <div>
                  <h4 className={styles.featureTitle}>Same Day</h4>
                  <p className={styles.featureDesc}>Express Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.tabsSection}>
        <div className={`container ${styles.tabsContainer}`}>
          <div className={styles.tabHeaders}>
            {(["description", "care", "delivery"] as const).map((tab) => (
              <button
                key={tab}
                className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
                style={{ textTransform: "capitalize" }}
              >
                {tab === "care" ? "Care Guide" : tab}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            {activeTab === "description" && (
              <>
                <p className={styles.tabText}>{product.description || "Premium quality flowers, carefully arranged by our expert florists."}</p>
                <p className={styles.tabText}>Product Code: #{product.code}</p>
              </>
            )}
            {activeTab === "care" && (
              <ul className={styles.tabList}>
                <li>Keep flowers in a cool, shaded area away from direct sunlight.</li>
                <li>Change water every 2 days and trim stems at an angle.</li>
                <li>Remove wilted petals to extend the life of the arrangement.</li>
                <li>Avoid placing near fruits or heat sources.</li>
              </ul>
            )}
            {activeTab === "delivery" && (
              <ul className={styles.tabList}>
                <li>Same-day delivery available for orders placed before 4 PM.</li>
                <li>Delivery available across all major cities in Indonesia.</li>
                <li>Midnight delivery available in select cities.</li>
                <li>Fragile items are packed with extra care.</li>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Addon Modal */}
      {showAddonModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
          onClick={() => setShowAddonModal(false)}>
          <div style={{ background: "white", width: "100%", maxWidth: "560px", borderRadius: "1rem 1rem 0 0", padding: "1.5rem", maxHeight: "80vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-dark)" }}>Add Gifts & Extras</h3>

            {addons.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {addons.map((a: any) => (
                  <div key={a._id}
                    style={{ border: `1px solid ${selectedAddons[a._id] ? "var(--color-gold)" : "#e5e7eb"}`, borderRadius: "0.5rem", padding: "0.75rem", textAlign: "center", cursor: "pointer", background: selectedAddons[a._id] ? "rgba(200,169,107,0.08)" : "white" }}
                    onClick={() => toggleAddon(a)}>
                    <img src={a.image} alt={a.name} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "0.25rem", marginBottom: "0.4rem" }} />
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-dark)", marginBottom: "0.2rem" }}>{a.name}</p>
                    <p style={{ fontSize: "0.65rem", color: "#6b7280" }}>{formatPrice(+a.price)}</p>
                    {selectedAddons[a._id] && (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.4rem" }}
                        onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => changeAddonQty(a._id, -1)} style={{ width: "20px", height: "20px", border: "1px solid #e5e7eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>−</button>
                        <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{selectedAddons[a._id]}</span>
                        <button onClick={() => changeAddonQty(a._id, 1)} style={{ width: "20px", height: "20px", border: "1px solid #e5e7eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>+</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "0.8rem", color: "#6b7280", marginBottom: "1rem" }}>No add-ons available for this product.</p>
            )}

            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Base: {formatPrice(price)}</p>
                {Object.keys(selectedAddons).length > 0 && (
                  <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    Add-ons: {formatPrice(Object.entries(selectedAddons).reduce((s, [aid, qty]) => {
                      const a = addons.find((x) => x._id === aid);
                      return s + (+a?.price || 0) * qty;
                    }, 0))}
                  </p>
                )}
              </div>
              <button
                onClick={() => confirmAddToCart(buildAddonList())}
                style={{ background: "var(--color-olive)", color: "white", padding: "0.625rem 1.5rem", borderRadius: "0.25rem", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Confirm & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
