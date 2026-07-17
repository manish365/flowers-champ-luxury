"use client";

import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <div className={styles.aboutHeader}>
          <h1 className={`${styles.aboutTitle} font-serif`}>Our Story</h1>
          <p className={styles.aboutSubtitle}>
            Cultivating elegance and delivering emotions through the language of luxury floral design since 2010.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1558234857-4b8c9d1a8e1b?q=80&w=800&auto=format&fit=crop" 
              alt="Florist arranging flowers" 
              className={styles.image} 
            />
          </div>

          <div className={styles.textContent}>
            <h2 className={`${styles.sectionHeading} font-serif`}>A Passion for Petals</h2>
            <p className={styles.textParagraph}>
              At Flowers Champ, we believe that every bouquet tells a story. What started as a small, passionate endeavor in a corner boutique has blossomed into a premier destination for luxury floral arrangements. 
            </p>
            <p className={styles.textParagraph}>
              Our master florists carefully source the freshest, most exquisite blooms from trusted growers locally and globally. We treat every stem with respect, weaving colors, textures, and fragrances into breathtaking masterpieces designed to captivate and inspire.
            </p>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>12+</span>
                <span className={styles.statLabel}>Years of Excellence</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50k+</span>
                <span className={styles.statLabel}>Happy Customers</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Freshness Guarantee</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
