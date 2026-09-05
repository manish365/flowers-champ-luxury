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

  // product options
  const [glassVaseAdded, setGlassVaseAdded] = useState(false);
  const [eggLessAdded, setEggLessAdded] = useState(false);

  // Constants (replace with API/config if needed)
  const VASE_PRICE = 399000;
  const EGGLESS_PRICE = 99000;

  // tabs removed

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
      setVariantPrice(+(cp.price?.[selectedVariant === 'classic' ? 'standard' : selectedVariant]?.currentPrice || cp.price?.standard?.currentPrice || 0));
      setDeliveryPrice(+(cp.price?.standard?.deliveryPrice || 0));
    } else {
      setVariantPrice(+(product.countryPrice?.price?.[selectedVariant === 'classic' ? 'standard' : selectedVariant]?.currentPrice || product.countryPrice?.price?.standard?.currentPrice || 0));
      setDeliveryPrice(100000);
    }
  };

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
    setShowSlots(false);
  };

  const handleAddToCart = async () => {
    if (!selectedCity) { setError("Please select a city first."); return; }
    if (!deliveryDate) { setError("Please select a delivery date first."); return; }
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
      glassVaseAdded,
      glassVasePrice: glassVaseAdded ? VASE_PRICE : 0,
      eggLess: eggLessAdded,
      eggLessPrice: eggLessAdded ? EGGLESS_PRICE : 0,
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
            
            <p className={styles.subTitle} style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "-0.5rem", marginBottom: "0.5rem", fontWeight: 500 }}>
              {product.country?.name || "Indonesia"} {product.delivery?.deliveryFrequency ? `, ${product.delivery.deliveryFrequency} Delivery` : ""}
            </p>
            
            {product.vendorDescription?.standard && (
              <p className={styles.vendorDesc} style={{ fontSize: "0.875rem", color: "var(--color-dark)", fontWeight: 600, marginBottom: "0.5rem" }}>
                {product.vendorDescription.standard}
              </p>
            )}

            <p className={styles.description}>{product.description}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <p className={styles.price}>{formatPrice(price)}</p>
              {oldPrice > 0 && (
                <p style={{ fontSize: "0.875rem", color: "#9ca3af", textDecoration: "line-through" }}>{formatPrice(oldPrice)}</p>
              )}
            </div>

            {/* Select Variant / Size */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 className={styles.deliveryTitle} style={{ marginBottom: "0.75rem" }}>Select Size</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["classic", "deluxe", "premium"] as const).map((v) => {
                  const pPrice = product.cityPrice?.find((c: any) => c._id === selectedCity)?.price || product.countryPrice?.price;
                  if (!pPrice || !pPrice[v === 'classic' ? 'standard' : v]?.currentPrice) return null;
                  return (
                    <button
                      key={v}
                      onClick={() => {
                        setSelectedVariant(v);
                        setVariantPrice(+pPrice[v === 'classic' ? 'standard' : v].currentPrice);
                      }}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        fontSize: "0.75rem",
                        border: `1px solid ${selectedVariant === v ? "var(--color-gold)" : "#e5e7eb"}`,
                        borderRadius: "0.25rem",
                        background: selectedVariant === v ? "rgba(200,169,107,0.15)" : "white",
                        color: selectedVariant === v ? "var(--color-gold)" : "var(--color-dark)",
                        cursor: "pointer",
                        fontWeight: selectedVariant === v ? 600 : 400,
                        textTransform: "capitalize"
                      }}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={{display:"flex"}}>
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

            {/* Delivery Date & Slot */}
            {selectedCity && (
              <div className={styles.deliveryCheck} style={{ marginTop: "0rem", marginLeft:"1rem" }}>
                <h3 className={styles.deliveryTitle}>
                  <Truck size={14} /> Select Delivery Details
                </h3>
                
                <div style={{ marginTop: "1rem" }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Delivery Date</label>
                  <input 
                    type="date" 
                    className={styles.deliveryInput}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    style={{ width: "100%", cursor: "pointer", marginBottom: "1rem" }}
                  />
                </div>

                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Delivery Slot</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
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
            </div>

           

            {/* Variant / Upgrades (Eggless / Vase) */}
            <div style={{ marginTop: "1.5rem" }}>
              {product.categories?.some((c: any) => c.name?.toLowerCase().includes("cake")) && (
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <input type="checkbox" checked={eggLessAdded} onChange={(e) => setEggLessAdded(e.target.checked)} />
                  <span>Make it Eggless (+ {formatPrice(EGGLESS_PRICE)})</span>
                </label>
              )}
              {product.categories?.some((c: any) => c.name?.toLowerCase().includes("flower")) && (
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                  <input type="checkbox" checked={glassVaseAdded} onChange={(e) => setGlassVaseAdded(e.target.checked)} />
                  <span>Include Glass Vase (+ {formatPrice(VASE_PRICE)})</span>
                </label>
              )}
            </div>

            {error && (
              <p style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.5rem" }}>{error}</p>
            )}

            {/* Actions */}
            <div className={styles.actionGroup} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "row", gap: "1rem" }}>
              {!inCart ? (
                <button className={styles.addToCartBig} onClick={handleAddToCart} style={{ flex: 1, marginBottom: 0 }}>
                  <ShoppingBag size={16} /> Add To Cart
                </button>
              ) : (
                <button className={styles.addToCartBig} onClick={() => router.push("/cart")}
                  style={{ flex: 1, background: "var(--color-gold)", marginBottom: 0 }}>
                  <ShoppingBag size={16} /> Go To Cart
                </button>
              )}
              <button className={styles.buyNowBtn} onClick={handleAddToCart} style={{ flex: 1, marginBottom: 0 }}>
                Buy It Now
              </button>
            </div>

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

      {/* Details Section */}
      <section className={styles.detailsSection} style={{ padding: "2rem 0", background: "white", color: "var(--color-dark)" }}>
        <div className={`container ${styles.detailsContainer}`} style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          <div className={styles.detailBlock} style={{ marginBottom: "2rem" }}>
            <h3 className={styles.detailTitle} style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-dark)", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid var(--color-gold)", paddingBottom: "0.5rem", display: "inline-block" }}>Description</h3>
            <p className={styles.detailText} style={{ lineHeight: 1.7, color: "#4b5563" }}>
              {product.description || "Premium quality flowers, carefully arranged by our expert florists."}
            </p>
            {product.code && <p className={styles.detailText} style={{ lineHeight: 1.7, color: "#4b5563", marginTop: "1rem", fontWeight: 600 }}>Product Code: #{product.code}</p>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div className={styles.detailBlock}>
              <h3 className={styles.detailTitle} style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-dark)", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid var(--color-gold)", paddingBottom: "0.5rem", display: "inline-block" }}>Flower Care Guide</h3>
              {product.leftContent ? (
                <div className={styles.detailHtml} style={{ lineHeight: 1.7, color: "#4b5563" }} dangerouslySetInnerHTML={{ __html: product.leftContent }} />
              ) : (
                <ul className={styles.tabList} style={{ lineHeight: 1.7, color: "#4b5563", paddingLeft: "1.5rem", listStyleType: "disc" }}>
                  <li style={{ marginBottom: "0.5rem" }}>Keep flowers in a cool, shaded area away from direct sunlight.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Change water every 2 days and trim stems at an angle.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Remove wilted petals to extend the life of the arrangement.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Avoid placing near fruits or heat sources.</li>
                </ul>
              )}
            </div>

            <div className={styles.detailBlock}>
              <h3 className={styles.detailTitle} style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-dark)", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "2px solid var(--color-gold)", paddingBottom: "0.5rem", display: "inline-block" }}>Delivery Information</h3>
              {product.rightContent ? (
                <div className={styles.detailHtml} style={{ lineHeight: 1.7, color: "#4b5563" }} dangerouslySetInnerHTML={{ __html: product.rightContent }} />
              ) : (
                <ul className={styles.tabList} style={{ lineHeight: 1.7, color: "#4b5563", paddingLeft: "1.5rem", listStyleType: "disc" }}>
                  <li style={{ marginBottom: "0.5rem" }}>Same-day delivery available for orders placed before 4 PM.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Delivery available across all major cities in Indonesia.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Midnight delivery available in select cities.</li>
                  <li style={{ marginBottom: "0.5rem" }}>Fragile items are packed with extra care.</li>
                </ul>
              )}
            </div>
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
