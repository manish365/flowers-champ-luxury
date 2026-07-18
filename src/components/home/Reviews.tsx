"use client";
import { useEffect, useState, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/app/page.module.css";
import { fetchReviews } from "@/lib/api";

interface Review {
  name?: string;
  rating?: string | number;
  title?: string;
  review?: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      // Loop back to start if at the end
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && reviews.length > 0) {
      interval = setInterval(() => {
        scrollRight();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const revRes = await fetchReviews(1, 100);
        let data = revRes?.results || revRes?.data || [];
        if (!Array.isArray(data)) data = [];
        setReviews(data);
      } catch (e) {
        console.error("Error fetching reviews:", e);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  if (loading) return null;
  if (!reviews || reviews.length === 0) return null;

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc: number, curr: any) => acc + Number(curr.rating || 5), 0) / totalReviews).toFixed(1)
    : "5.0";

  return (
    <section className={`${styles.section} ${styles.sectionWhite}`}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} font-serif`}>WHAT OUR CUSTOMERS SAY</h2>
          {/* <div className={styles.sectionDivider}>
            <div className={styles.dividerLine}></div>
            <Star size={16} />
            <div className={styles.dividerLine}></div>
          </div>
          <div className={styles.overallRating}>
            <div className={styles.ratingScore}>{averageRating}</div>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={16} 
                  fill={star <= Math.round(Number(averageRating)) ? "currentColor" : "none"} 
                  className={star <= Math.round(Number(averageRating)) ? "text-gold" : "text-gray-300"} 
                />
              ))}
            </div>
            <div className={styles.ratingText}>Based on {totalReviews} reviews</div>
          </div> */}
        </div>
        <div 
          className={styles.sliderWrapper}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <button className={`${styles.sliderBtn} ${styles.sliderBtnLeft}`} onClick={scrollLeft} aria-label="Previous reviews">
            <ChevronLeft size={24} />
          </button>
          
          <div className={styles.reviewScrollContainer} ref={sliderRef}>
            <div className={styles.reviewGrid}>
              {reviews.map((review, i) => (
              <div key={i} className={styles.reviewCard}>
                <Quote className={styles.quoteIcon} size={28} />
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewAvatar}>
                    {review.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className={styles.reviewMeta}>
                    <h4 className={styles.reviewName}>{review.name || 'Anonymous'}</h4>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          size={12} 
                          fill={idx < Math.round(Number(review.rating) || 5) ? "currentColor" : "none"} 
                          className="text-gold" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <h5 className={styles.reviewTitle}>{review.title || 'Great Service'}</h5>
                <p className={styles.reviewText}>"{review.review}"</p>
              </div>
            ))}
            </div>
          </div>
          
          <button className={`${styles.sliderBtn} ${styles.sliderBtnRight}`} onClick={scrollRight} aria-label="Next reviews">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
