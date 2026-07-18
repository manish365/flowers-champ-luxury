import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, MessageCircle, Star, Flower2, Truck, 
  HeartHandshake, ShieldCheck, Gift, Heart, Gem, Briefcase,
  ShoppingBag, Camera, Quote
} from "lucide-react";
import { fetchWebsiteCmsData } from "@/lib/api";
import Reviews from "@/components/home/Reviews";
import styles from "./page.module.css";

export default async function Home() {
  let cmsData = null;
  
  try {
    const cmsRes = await fetchWebsiteCmsData();
    cmsData = cmsRes?.data?.[0] || cmsRes?.[0] || null;
  } catch (e) { console.error("Error fetching CMS data:", e); }

  // Extract products from CMS Data for Best Sellers (or default to fallback if missing)
  const bestSellers = cmsData?.bestSellersSection?.midSections || [
    { name: 'Blush Romance', price: 'Rp 850.000', img: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop' },
    { name: 'Pure Passion', price: 'Rp 950.000', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop' },
    { name: 'Graceful Whites', price: 'Rp 875.000', img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop' },
    { name: 'Sunshine Delight', price: 'Rp 760.000', img: 'https://images.unsplash.com/photo-1528151478546-51f7b03a1168?q=80&w=400&auto=format&fit=crop' },
  ];

  const combos = cmsData?.flowerCombo?.products || [
    { title: 'Roses & Cake Bundle', desc: 'Perfect for birthdays and celebrations', badge: '15% OFF', img: 'https://images.unsplash.com/photo-1558304970-abd589baebe5?q=80&w=600&auto=format&fit=crop' },
    { title: 'Tulips & Chocolates', desc: 'A sweet surprise for your loved one', badge: 'HOT DEAL', img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop' },
    { title: 'Luxury Hamper', desc: 'Premium blooms with exclusive gifts', badge: 'NEW ARRIVAL', img: 'https://images.unsplash.com/photo-1513269813959-158866504cd8?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <div className={styles.heroLabel}>
              PREMIUM FLORAL BOUTIQUE
            </div>
            <h1 className={`${styles.heroTitle} font-serif`}>
              Where Every<br />Flower Tells<br />a <span className="text-gold" style={{ fontStyle: 'italic' }}>Story</span>
            </h1>
            <p className={styles.heroDesc}>
              Luxury bouquets, wedding florals, unique gifts and same-day delivery – crafted with love, just for you.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary}>
                SHOP COLLECTION <ArrowRight size={14} />
              </button>
              <button className={styles.btnSecondary}>
                <MessageCircle size={16} /> WHATSAPP ORDER
              </button>
            </div>
            
            <div className={styles.trustedBy}>
              <div className={styles.avatars}>
                <img className={styles.avatar} src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="Customer" />
                <img className={styles.avatar} src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="Customer" />
                <img className={styles.avatar} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop" alt="Customer" />
                <div className={styles.avatarMore}>4+</div>
              </div>
              <div className={styles.trustedText}>
                <div className={styles.trustedCount}>Trusted by 2,000+</div>
                <div className={styles.trustedStars}>
                  <span style={{ fontSize: '11px', color: 'rgba(247, 243, 238, 0.7)', fontWeight: 300 }}>happy customers</span>
                  <div className={styles.stars}>
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageBg}></div>
            <img 
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop" 
              alt="Luxury Bouquet" 
              className={styles.heroImage} 
            />
          </div>
        </div>
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

      {/* Shop By Flower Type */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} font-serif`}>SHOP BY FLOWER</h2>
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine}></div>
              <Flower2 size={16} />
              <div className={styles.dividerLine}></div>
            </div>
          </div>
          <div className={styles.flowerGrid}>
            {[
              { name: 'ROSES', img: 'https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=300&auto=format&fit=crop' },
              { name: 'LILIES', img: 'https://images.unsplash.com/photo-1509005084666-3cbacb4fa3ab?q=80&w=300&auto=format&fit=crop' },
              { name: 'TULIPS', img: 'https://images.unsplash.com/photo-1490750967868-88cb4ecb0704?q=80&w=300&auto=format&fit=crop' },
              { name: 'ORCHIDS', img: 'https://images.unsplash.com/photo-1508611181146-5f128e4612e5?q=80&w=300&auto=format&fit=crop' },
              { name: 'PEONIES', img: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=300&auto=format&fit=crop' },
              { name: 'SUNFLOWERS', img: 'https://images.unsplash.com/photo-1528151478546-51f7b03a1168?q=80&w=300&auto=format&fit=crop', extraClass: styles.hiddenLg },
            ].map((flower, i) => (
              <Link href="#" key={i} className={`${styles.flowerItem} ${flower.extraClass || ''}`}>
                <div className={styles.flowerImageWrapper}>
                  <img src={flower.img} className={styles.flowerImage} alt={flower.name} />
                </div>
                <span className={styles.flowerTitle}>{flower.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Occasion */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} font-serif`}>SHOP BY OCCASION</h2>
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine}></div>
              <Flower2 size={16} />
              <div className={styles.dividerLine}></div>
            </div>
          </div>

          <div className={styles.occasionGrid}>
            {[
              { name: 'BIRTHDAY', icon: <Gift size={20} />, img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=600&auto=format&fit=crop' },
              { name: 'ANNIVERSARY', icon: <Heart size={20} />, img: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=600&auto=format&fit=crop' },
              { name: 'WEDDING', icon: <Gem size={20} />, img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop' },
              { name: 'CORPORATE', icon: <Briefcase size={20} />, img: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=600&auto=format&fit=crop' },
            ].map((occasion, i) => (
              <div key={i} className={styles.occasionCard}>
                <img src={occasion.img} alt={occasion.name} className={`${styles.occasionImage} arch-card`} />
                <div className={styles.occasionContent}>
                  <div className={styles.occasionIconBox}>
                    {occasion.icon}
                  </div>
                  <div className={styles.occasionTextRight}>
                    <h4 className={styles.occasionTitle}>{occasion.name}</h4>
                    <span className={styles.occasionLink}>
                      SHOP NOW <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.storyWrapper}>
            <div className={styles.storyImageContainer}>
              <img src="https://images.unsplash.com/photo-1554520735-0a145211822a?q=80&w=1200&auto=format&fit=crop" alt="Our Store Interior" className={styles.storyImage} />
            </div>
            <div className={styles.storyContent}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <h4 className={styles.storyLabel}>OUR STORY</h4>
                <h2 className={`${styles.storyTitle} font-serif`}>Crafted With Love,<br/>Designed To Impress</h2>
                <p className={styles.storyDesc}>
                  At Flowers Champ, we believe flowers are more than gifts – they are emotions. Each bouquet is thoughtfully crafted with the freshest blooms to make every moment memorable.
                </p>
                <button className={styles.btnStory}>
                  KNOW MORE ABOUT US <ArrowRight size={14} />
                </button>
              </div>
              <Flower2 className={styles.storyBgIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Best Sellers */}
      <section className={`${styles.section} ${styles.sectionCream}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={`${styles.sectionTitle} font-serif`}>OUR BEST SELLERS</h2>
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine}></div>
              <Flower2 size={16} />
              <div className={styles.dividerLine}></div>
            </div>
          </div>

          <div className={styles.sliderWrapper}>
            <div className={styles.productGrid}>
              {bestSellers.map((product: any, i: number) => (
                <div key={i} className={`${styles.productCard}`}>
                  <div className={styles.productImageWrapper}>
                    <img 
                      src={product.images ? product.images[0]?.url : product.img} 
                      className={styles.productImage} 
                      alt={product.title || product.name} 
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <div>
                      <h5 className={styles.productTitle}>{product.title || product.name}</h5>
                      <p className={styles.productPrice}>{product.salePrice ? `Rp ${product.salePrice}` : product.price}</p>
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

      {/* Exclusive Combos */}
      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className="container">
          <div className={styles.comboHeader}>
            <div>
              <h2 className={`${styles.comboTitle} font-serif`}>{cmsData?.flowerCombo?.title || 'EXCLUSIVE COMBOS'}</h2>
              <p className={styles.comboSubtitle}>Flowers paired with delightful treats.</p>
            </div>
            <Link href="#" className={styles.viewAll}>VIEW ALL <ArrowRight size={12} /></Link>
          </div>
          
          <div className={styles.comboGrid}>
            {combos.slice(0, 3).map((combo: any, i: number) => (
              <div key={i} className={`${styles.comboCard}`}>
                <img src={combo.images ? combo.images[0]?.url : combo.img} className={styles.comboImage} alt={combo.title || combo.name} />
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


      {/* Instagram Feed */}
      <section className={`${styles.section} ${styles.sectionCream}`} style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className={styles.instaGrid}>
            <div className={styles.instaCta}>
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div className={styles.instaIconBox}>
                  <Camera size={24} className="text-gold" />
                </div>
                <h3 className={styles.instaLabel}>FOLLOW US ON INSTAGRAM</h3>
                <p className={`${styles.instaHandle} font-serif`}>@flowerschamp</p>
                <button className={styles.instaBtn}>
                  FOLLOW US <ArrowRight size={12} />
                </button>
              </div>
              <Camera className={styles.instaBgIcon} />
            </div>

            <div className={styles.instaImages}>
              {[
                'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1554520735-0a145211822a?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=400&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop',
              ].map((img, i) => (
                <Link href="#" key={i} className={styles.instaImageWrapper}>
                  <img src={img} className={styles.instaImage} alt="Instagram feed" />
                  <div className={styles.instaOverlay}>
                    <Camera className={styles.instaOverlayIcon} size={24} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
