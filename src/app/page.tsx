"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, MessageCircle, Star, Flower2, Truck, 
  HeartHandshake, ShieldCheck, Gift, Heart, Gem, Briefcase,
  ShoppingBag, Quote
} from "lucide-react";
import { fetchWebsiteCmsData, fetchReviews } from "@/lib/api";
import Reviews from "@/components/home/Reviews";
import HeroBanner from "@/components/home/HeroBanner";
import InstagramFeed from "@/components/home/InstagramFeed";
import styles from "./page.module.css";

const FALLBACK_IMAGES = [
  "/images/flowers.jpg",
  "/images/teddy.jpg",
  "/images/ballon.jpg",
  "/images/gift.jpg",
  "/images/ballon.jpg",
  "/images/flowers.jpg",
  "/images/gift.jpg",
  "/images/teddy.jpg",
];


export default function Home() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCmsData() {
      try {
        const cmsRes = await fetchWebsiteCmsData();
        setCmsData(cmsRes?.results?.home?.[0] || null);
      } catch (e) {
        console.error("Error fetching CMS data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCmsData();
  }, []);

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  // Extract sections from CMS Data
  const promotions = cmsData?.promotions || [];
  const bestSellers = cmsData?.bestSellersSection?.midSections || [];
  const specialDeals = cmsData?.specialDeal?.products || [];
  const luxuryFlowers = cmsData?.onlyLuxuryFlower?.products || [];
  const combos = cmsData?.flowerCombo?.products || [];

  return (
    <>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <HeroBanner banners={cmsData?.banner} />
      </div>

      {/* Feature Bar */}
      <div className={styles.featureBar}>
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <Flower2 size={32} className={styles.featureIcon} strokeWidth={1} />
              <div>
                <h4 className={styles.featureTitle}>FRESH FLOWERS</h4>
                <p className={styles.featureDesc}>Handpicked Daily</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <Truck size={32} className={styles.featureIcon} strokeWidth={1} />
              <div>
                <h4 className={styles.featureTitle}>SAME DAY DELIVERY</h4>
                <p className={styles.featureDesc}>Across Your City</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <HeartHandshake size={32} className={styles.featureIcon} strokeWidth={1} />
              <div>
                <h4 className={styles.featureTitle}>CUSTOM BOUQUETS</h4>
                <p className={styles.featureDesc}>Made With Love</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <ShieldCheck size={32} className={styles.featureIcon} strokeWidth={1} />
              <div>
                <h4 className={styles.featureTitle}>SAFE & SECURE</h4>
                <p className={styles.featureDesc}>100% Secure Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop By Category / Promotions */}
      {promotions.length > 0 && (
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} font-serif`}>SHOP BY CATEGORY</h2>
              <div className={styles.sectionDivider}>
                <div className={styles.dividerLine}></div>
                <Flower2 size={16} />
                <div className={styles.dividerLine}></div>
              </div>
            </div>

            <div className={`${styles.occasionGrid} ${promotions.length < 4 ? styles.centerGrid : ''}`}>
              {promotions.map((promo: any, i: number) => {
                const titleMatch = promo.link?.match(/([^\/]+)$/);
                let title = titleMatch ? titleMatch[1].replace(/-/g, ' ').toUpperCase() : 'SPECIAL COLLECTION';
                
                if (title === 'ONLINE FLOWERS DELIVERY INDONESIA') {
                  title = 'INDONESIA DELIVERY';
                }
                
                return (
                  <Link href={promo.link || '#'} key={i} className={styles.occasionCard}>
                    <img src={promo.url} alt={title} className={`${styles.occasionImage} arch-card`} />
                    <div className={styles.occasionContent}>
                      <div className={styles.occasionIconBox}>
                        <Gift size={20} />
                      </div>
                      <div className={styles.occasionTextRight}>
                        <h4 className={styles.occasionTitle}>{title}</h4>
                        <span className={styles.occasionLink}>
                          SHOP NOW <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Our Story Section */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.storyWrapper}>
            <div className={styles.storyImageContainer}>
              <div className={styles.storyImageAccent}></div>
              <img src="/images/store.jpeg" alt="Our Store Interior" className={`${styles.storyImage} ${styles.storyImageMain}`} />
              <img src="/images/store2.jpeg" alt="Our Store Details" className={`${styles.storyImage} ${styles.storyImageSecondary}`} />
            </div>
            <div className={styles.storyContent}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <h4 className={styles.storyLabel}>OUR STORY</h4>
                <h2 className={`${styles.storyTitle} font-serif`}>Crafted With Love,<br/>Designed To Impress</h2>
                <p className={styles.storyDesc}>
                  At Flowers Champ, we believe flowers are more than gifts – they are emotions. Each bouquet is thoughtfully crafted with the freshest blooms to make every moment memorable.
                </p>
                <Link href="/aboutus" className={styles.btnStory}>
                  KNOW MORE ABOUT US <ArrowRight size={14} />
                </Link>
              </div>
              <Flower2 className={styles.storyBgIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Best Sellers */}
      {bestSellers.length > 0 && (
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} font-serif`}>{cmsData?.bestSellersSection?.title || 'BEST SELLERS'}</h2>
              <div className={styles.sectionDivider}>
                <div className={styles.dividerLine}></div>
                <Flower2 size={16} />
                <div className={styles.dividerLine}></div>
              </div>
            </div>

            <div className={styles.sliderWrapper}>
              <div className={`${styles.productGrid} ${bestSellers.length < 4 ? styles.centerGrid : ''}`}>
                {bestSellers.map((product: any, i: number) => (
                  <div key={i} className={`${styles.productCard}`}>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src={FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]}
                        className={styles.productImage} 
                        alt={product.title || product.name} 
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div>
                        <h5 className={styles.productTitle}>{product.title || product.name}</h5>
                        <p className={styles.productPrice}>Rp {product.salePrice || product.price}</p>
                      </div>
                      <button className={styles.cartButton}>
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Special Deals */}
      {specialDeals.length > 0 && (
        <section className={`${styles.section} ${styles.sectionWhite}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} font-serif`}>{cmsData?.specialDeal?.title || 'SPECIAL DEALS'}</h2>
              <div className={styles.sectionDivider}>
                <div className={styles.dividerLine}></div>
                <Flower2 size={16} />
                <div className={styles.dividerLine}></div>
              </div>
            </div>

            <div className={styles.sliderWrapper}>
              <div className={`${styles.productGrid} ${specialDeals.length < 4 ? styles.centerGrid : ''}`}>
                {specialDeals.map((product: any, i: number) => (
                  <div key={i} className={`${styles.productCard}`}>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src={product.url || (product.images && product.images[0]?.url)} 
                        className={styles.productImage} 
                        alt={product.title || product.name} 
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div>
                        <h5 className={styles.productTitle}>{product.title || product.name}</h5>
                        <p className={styles.productPrice}>Rp {product.salePrice || product.price}</p>
                      </div>
                      <button className={styles.cartButton}>
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Luxury Collection */}
      {luxuryFlowers.length > 0 && (
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} font-serif`}>{cmsData?.onlyLuxuryFlower?.header?.title || 'LUXURY COLLECTION'}</h2>
              <div className={styles.sectionDivider}>
                <div className={styles.dividerLine}></div>
                <Flower2 size={16} />
                <div className={styles.dividerLine}></div>
              </div>
            </div>

            <div className={styles.sliderWrapper}>
              <div className={`${styles.productGrid} ${luxuryFlowers.slice(0, 4).length < 4 ? styles.centerGrid : ''}`}>
                {luxuryFlowers.slice(0, 4).map((product: any, i: number) => (
                  <div key={i} className={`${styles.productCard}`}>
                    <div className={styles.productImageWrapper}>
                      <img 
                        src={product.url || (product.images && product.images[0]?.url)} 
                        className={styles.productImage} 
                        alt={product.title || product.name} 
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <div>
                        <h5 className={styles.productTitle}>{product.title || product.name}</h5>
                        <p className={styles.productPrice}>Rp {product.salePrice || product.price}</p>
                      </div>
                      <button className={styles.cartButton}>
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Exclusive Combos */}
      {combos.length > 0 && (
        <section className={`${styles.section} ${styles.sectionWhite}`}>
          <div className="container">
            <div className={styles.comboHeader}>
              <div>
                <h2 className={`${styles.comboTitle} font-serif`}>{cmsData?.flowerCombo?.title || 'EXCLUSIVE COMBOS'}</h2>
                <p className={styles.comboSubtitle}>Flowers paired with delightful treats.</p>
              </div>
              {/* <Link href="#" className={styles.viewAll}>VIEW ALL <ArrowRight size={12} /></Link> */}
            </div>
            
            <div className={`${styles.comboGrid} ${combos.length < 4 ? styles.centerGrid : ''}`}>
              {combos.map((combo: any, i: number) => (
                <div key={i} className={`${styles.comboCard}`}>
                  <img src={combo.url || (combo.images && combo.images[0]?.url)} className={styles.comboImage} alt={combo.title || combo.name} />
                  <div className={styles.comboOverlay}>
                    {combo.badge && <div className={styles.comboBadge}>{combo.badge}</div>}
                    <h4 className={`${styles.comboName} font-serif`}>{combo.title || combo.name}</h4>
                    <p className={styles.comboDesc}>{combo.desc || 'Special arrangement for you.'}</p>
                    <button className={styles.comboBtn}>SHOP COMBO</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram Feed */}
      <InstagramFeed />

      <Reviews />
    </>
  );
}
