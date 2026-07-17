"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, Heart, MapPin, Info, Minus, Plus, ShoppingBag, Flower2, Truck, Flower, Eye, Play } from "lucide-react";
import styles from "./page.module.css";

export default function ProductPDP() {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('premium');

  const handleQtyChange = (delta: number) => {
    setQty(prev => Math.max(1, prev + delta));
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbsWrapper}>
        <div className={`container ${styles.breadcrumbs}`}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span>/</span>
          <Link href="/collections" className={styles.breadcrumbLink}>Flowers</Link>
          <span>/</span>
          <Link href="/collections" className={styles.breadcrumbLink}>Roses</Link>
          <span>/</span>
          <span className={styles.breadcrumbActive}>Blush Romance</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className={styles.mainSection}>
        <div className={`container ${styles.productLayout}`}>
          
          {/* Product Images (Left) */}
          <div className={styles.imageGallery}>
            {/* Main Image */}
            <div className={styles.mainImageWrapper}>
              <span className={styles.badge}>Best Seller</span>
              <button className={styles.favButton}>
                <Heart size={16} />
              </button>
              <img 
                src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format&fit=crop" 
                className={styles.mainImage} 
                alt="Blush Romance Bouquet" 
              />
            </div>
            
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              <button className={`${styles.thumbnailBtn} ${styles.thumbnailActive}`}>
                <img src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=200&auto=format&fit=crop" className={styles.thumbnailImg} alt="Thumbnail 1" />
              </button>
              <button className={styles.thumbnailBtn}>
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=200&auto=format&fit=crop" className={styles.thumbnailImg} alt="Thumbnail 2" />
              </button>
              <button className={styles.thumbnailBtn}>
                <img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=200&auto=format&fit=crop" className={styles.thumbnailImg} alt="Thumbnail 3" />
              </button>
              <button className={styles.thumbnailBtn} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1509005084666-3cbacb4fa3ab?q=80&w=200&auto=format&fit=crop" className={styles.thumbnailImg} style={{ opacity: 0.5 }} alt="Thumbnail 4" />
                <Play size={32} style={{ position: 'absolute', fill: 'var(--color-dark)', color: 'var(--color-dark)' }} />
              </button>
            </div>
          </div>

          {/* Product Details (Right) */}
          <div className={styles.productDetails}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div className={styles.reviews}>
                <div className={styles.stars}>
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <span className={styles.reviewLink}>(128 Reviews)</span>
              </div>
              <h1 className={`${styles.title} font-serif`}>Blush Romance</h1>
              <p className={styles.description}>
                A delicate blend of premium blush pink roses and elegant white lilies, carefully arranged to capture the essence of romance.
              </p>
              <p className={styles.price}>Rp 850.000</p>
            </div>

            {/* Options: Size */}
            <div className={styles.optionsSection}>
              <div className={styles.optionsHeader}>
                <h3 className={styles.optionsLabel}>Select Size</h3>
                <button className={styles.sizeGuide}>Size Guide</button>
              </div>
              <div className={styles.sizeGrid}>
                <label style={{ cursor: 'pointer', position: 'relative' }}>
                  <input type="radio" name="size" className={styles.sizeInput} checked={size === 'standard'} onChange={() => setSize('standard')} />
                  <div className={styles.sizeCard}>
                    <p className={styles.sizeName}>Standard</p>
                    <p className={styles.sizeDesc}>12 Stems</p>
                  </div>
                </label>
                <label style={{ cursor: 'pointer', position: 'relative' }}>
                  <input type="radio" name="size" className={styles.sizeInput} checked={size === 'premium'} onChange={() => setSize('premium')} />
                  <div className={styles.sizeCard}>
                    <p className={styles.sizeName}>Premium</p>
                    <p className={styles.sizeDesc}>24 Stems <span className={styles.sizePriceAdd}>+ Rp 450k</span></p>
                  </div>
                </label>
                <label style={{ cursor: 'pointer', position: 'relative' }}>
                  <input type="radio" name="size" className={styles.sizeInput} checked={size === 'luxury'} onChange={() => setSize('luxury')} />
                  <div className={styles.sizeCard}>
                    <p className={styles.sizeName}>Luxury</p>
                    <p className={styles.sizeDesc}>36 Stems <span className={styles.sizePriceAdd}>+ Rp 850k</span></p>
                  </div>
                </label>
              </div>
            </div>

            {/* Delivery Check */}
            <div className={styles.deliveryCheck}>
              <h3 className={styles.deliveryTitle}>
                <MapPin size={16} className="text-gold" /> Check Delivery Availability
              </h3>
              <div className={styles.deliveryInputGroup}>
                <input type="text" placeholder="Enter Pincode or Area" className={styles.deliveryInput} />
                <button className={styles.deliveryBtn}>Check</button>
              </div>
              <p className={styles.deliveryInfo}>
                <Info size={12} /> Same day delivery available for orders placed before 4 PM.
              </p>
            </div>

            {/* Add to Cart Actions */}
            <div className={styles.actionGroup}>
              {/* Quantity */}
              <div className={styles.qtySelector}>
                <button className={styles.qtyBtn} onClick={() => handleQtyChange(-1)}>
                  <Minus size={16} />
                </button>
                <input type="text" value={qty} className={styles.qtyInput} readOnly />
                <button className={styles.qtyBtn} onClick={() => handleQtyChange(1)}>
                  <Plus size={16} />
                </button>
              </div>
              
              {/* Add to Cart */}
              <button className={styles.addToCartBig}>
                <ShoppingBag size={16} /> Add To Cart
              </button>
            </div>

            {/* Buy Now Button */}
            <button className={styles.buyNowBtn}>
              Buy It Now
            </button>

            {/* Features */}
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}>
                  <Flower2 size={20} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Fresh Blooms</h4>
                  <p className={styles.featureDesc}>Handpicked daily</p>
                </div>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIconBox}>
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className={styles.featureTitle}>Same Day</h4>
                  <p className={styles.featureDesc}>Express Delivery</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className={styles.tabsSection}>
        <div className={`container ${styles.tabsContainer}`}>
          {/* Tab Headers */}
          <div className={styles.tabHeaders}>
            <button className={`${styles.tabBtn} ${styles.tabActive}`}>Description</button>
            <button className={styles.tabBtn}>Care Guide</button>
            <button className={styles.tabBtn}>Delivery</button>
          </div>
          
          {/* Tab Content */}
          <div className={styles.tabContent}>
            <p className={styles.tabText}>
              The Blush Romance bouquet is a timeless expression of affection. Featuring our finest, hand-selected blush pink roses intertwined with fragrant white lilies and delicate eucalyptus greens. This arrangement is carefully designed by our master florists to create a soft, romantic palette that speaks volumes without saying a word.
            </p>
            <p className={styles.tabText}>
              Perfect for anniversaries, Valentine's Day, or simply to remind someone special how much they mean to you. Each bouquet comes wrapped in our signature premium paper and finished with a silk ribbon.
            </p>
            <ul className={styles.tabList}>
              <li>12-36 Premium Blush Pink Roses</li>
              <li>White Oriental Lilies</li>
              <li>Fresh Eucalyptus & Seasonal Greens</li>
              <li>Signature Luxury Wrapping</li>
              <li>Complimentary Gift Card</li>
            </ul>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className={styles.relatedSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} font-serif`}>YOU MAY ALSO LIKE</h2>
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine}></div>
              <Flower size={16} />
              <div className={styles.dividerLine}></div>
            </div>
          </div>

          {/* Product Grid */}
          <div className={styles.relatedGrid}>
            {[
              { name: 'Pure Passion', price: 'Rp 950.000', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop', badge: null },
              { name: 'Graceful Whites', price: 'Rp 875.000', img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop', badge: { text: "New", class: styles.badgeDark } },
              { name: 'Classic Red Roses', price: 'Rp 680.000', img: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=400&auto=format&fit=crop', badge: { text: "-15%", class: styles.badgeRed }, extraClass: styles.hiddenMd },
              { name: 'Elegant Charm', price: 'Rp 990.000', img: 'https://images.unsplash.com/photo-1508611181146-5f128e4612e5?q=80&w=400&auto=format&fit=crop', badge: null, extraClass: styles.hiddenMd },
            ].map((product, i) => (
              <div key={i} className={`${styles.productCard} ${product.extraClass || ''}`}>
                {product.badge && (
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${product.badge.class}`}>{product.badge.text}</span>
                  </div>
                )}
                <div className={styles.relatedImageWrapper}>
                  <img src={product.img} className={styles.relatedImage} alt={product.name} />
                  <div className={styles.relatedOverlayActions}>
                    <button className={styles.relatedActionBtn}>
                      <Eye size={16} />
                    </button>
                    <button className={styles.relatedActionBtn}>
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
                <div className={styles.relatedProductInfo}>
                  <h5 className={styles.relatedProductTitle}>{product.name}</h5>
                  <p className={styles.relatedProductPrice}>{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
