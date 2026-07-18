import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import styles from "@/app/page.module.css";

interface InstagramFeedProps {
  cmsData?: any;
}

export default function InstagramFeed({ cmsData }: InstagramFeedProps) {
  // If the backend adds an instagram images array to the CMS data, it will be used here. 
  // Otherwise, it falls back to placeholder images.
  const feedImages = cmsData?.instagramImages || cmsData?.socialFeed || [
    'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1554520735-0a145211822a?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop',
  ];

  return (
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
            {feedImages.map((img: string | any, i: number) => {
              const src = typeof img === 'string' ? img : img.url || img.image;
              const link = typeof img === 'string' ? '#' : img.link || '#';
              return (
                <Link href={link} key={i} className={styles.instaImageWrapper}>
                  <img src={src} className={styles.instaImage} alt="Instagram feed" />
                  <div className={styles.instaOverlay}>
                    <Camera className={styles.instaOverlayIcon} size={24} />
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
