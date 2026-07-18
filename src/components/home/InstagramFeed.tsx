"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import styles from "./InstagramFeed.module.css";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const IG_URL = "https://www.instagram.com/flowerschamp.id";

export default function InstagramFeed() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts(12).then((data) => {
      const all: any[] = data?.results || [];
      const withImg = all.filter((p) => p.image?.default);
      const shuffled = withImg.sort(() => Math.random() - 0.5).slice(0, 8);
      setProducts(shuffled);
    }).catch(() => {});
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          {/* Left CTA */}
          <div className={styles.ctaCard}>
            <div className={styles.ctaIcon}><InstagramIcon size={26} /></div>
            <p className={styles.ctaLabel}>FOLLOW US ON</p>
            <h2 className={`${styles.ctaHandle} font-serif`}>@flowerschamp.id</h2>
            <p className={styles.ctaDesc}>
              Fresh bouquets, behind-the-scenes &amp; daily floral inspiration — straight from our studio.
            </p>
            <Link href={IG_URL} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              <InstagramIcon size={13} />
              Follow on Instagram
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Right product tiles */}
          <div className={styles.tilesGrid}>
            {products.length === 0
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={styles.skeleton} />
                ))
              : products.map((p) => {
                  const price = p.countryPrice?.price?.standard?.currentPrice;
                  return (
                    <Link
                      key={p._id}
                      href={`/products/${p._id}`}
                      className={styles.tile}
                    >
                      <img
                        src={p.image.default}
                        alt={p.name}
                        className={styles.tileImg}
                      />
                      <div className={styles.tileOverlay}>
                        <button
                          className={styles.heartBtn}
                          onClick={(e) => e.preventDefault()}
                          aria-label="Wishlist"
                        >
                          <Heart size={11} />
                        </button>
                        <div className={styles.tileInfo}>
                          <p className={styles.tileName}>{p.name}</p>
                          {price && (
                            <p className={styles.tilePrice}>
                              Rp {parseInt(price).toLocaleString("id-ID")}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
}
