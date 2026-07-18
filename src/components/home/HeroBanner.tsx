"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import styles from "@/app/page.module.css";

interface BannerItem {
  seq?: number;
  url?: string;
  isActive?: boolean;
  link?: string;
  _id?: string;
}

interface HeroBannerProps {
  banners?: BannerItem[];
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const validBanners = [
    { url: "/banner.jpg", link: "/list/tag/for%20her", _id: "local1" },
    { url: "/banner2.jpg", link: "/list/tag/birthday", _id: "local2" },
    { url: "/banner3.jpg", link: "/list/category/chocolates", _id: "local3" }
  ];

  const nextBanner = () => {
    setActiveIndex((prev) => (prev === validBanners.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && validBanners.length > 1) {
      interval = setInterval(() => {
        nextBanner();
      }, 4000); // 4s per banner
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, validBanners.length, activeIndex]);

  return (
    <div 
      className={styles.heroSection}
      style={{ position: 'relative', width: '100%', minHeight: '500px', overflow: 'hidden', padding: 0, background: 'transparent' }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Sliding Background Track */}
      <div 
        style={{ 
          display: 'flex', 
          width: '100%', 
          height: '100%', 
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateX(-${activeIndex * 100}%)`
        }}
      >
        {validBanners.map((banner, i) => (
          <div key={banner._id || i} style={{ 
            flex: '0 0 100%', 
            width: '100%', 
            height: '100%', 
            position: 'relative',
            background: 'linear-gradient(to bottom right, var(--color-olive), var(--color-olive-dark))'
          }}>
            <div className={`container ${styles.heroContent}`} style={{ height: '100%' }}>
              <div className={styles.heroText} style={{ visibility: 'hidden' }}>
                <h1 className={`${styles.heroTitle} font-serif`}>
                  Where Every<br />Flower Tells<br />a <span>Story</span>
                </h1>
                <p className={styles.heroDesc}>
                  Luxury bouquets, wedding florals, unique gifts and same-day delivery – crafted with love, just for you.
                </p>
                <div className={styles.heroButtons}>
                  <Link href="#" className={styles.btnPrimary}>
                    SHOP COLLECTION <ArrowRight size={14} />
                  </Link>
                  <Link href="#" className={styles.btnSecondary}>
                    <MessageCircle size={16} /> WHATSAPP ORDER
                  </Link>
                </div>
              </div>
              <div className={styles.heroImageContainer}>
                <div className={styles.heroImageBg}></div>
                <img 
                  src={banner.url} 
                  alt={`Banner ${i + 1}`} 
                  className={styles.heroImage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Static Text Overlay */}
      <div className={`container ${styles.heroContent}`} style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100%' }}>
        <div className={styles.heroText} style={{ pointerEvents: 'auto' }}>
          <h1 className={`${styles.heroTitle} font-serif`}>
            Where Every<br />Flower Tells<br />a <span className="text-gold" style={{ fontStyle: 'italic' }}>Story</span>
          </h1>
          <p className={styles.heroDesc}>
            Luxury bouquets, wedding florals, unique gifts and same-day delivery – crafted with love, just for you.
          </p>
          <div className={styles.heroButtons}>
            <Link href={validBanners[activeIndex]?.link || '#'} className={styles.btnPrimary}>
              SHOP COLLECTION <ArrowRight size={14} />
            </Link>
            <Link href="https://wa.me/628159005188" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              <MessageCircle size={16} /> WHATSAPP ORDER
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dot indicators */}
      {validBanners.length > 1 && (
        <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.4rem', zIndex: 20 }}>
          {validBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to banner ${i + 1}`}
              style={{
                width: i === activeIndex ? '1.5rem' : '0.4rem',
                height: '0.4rem',
                borderRadius: '9999px',
                background: i === activeIndex ? 'var(--color-gold)' : 'rgba(255,255,255,0.45)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
