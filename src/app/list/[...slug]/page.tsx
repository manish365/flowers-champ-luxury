"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Flower, SlidersHorizontal, ChevronDown, Eye, Heart, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import styles from "@/app/collections/page.module.css";

export default function DynamicListPage() {
  const params = useParams();
  const slugArray = params.slug as string[];
  
  // Extract listing type and value
  const type = slugArray?.[0] || ""; // "tag" or "category"
  const rawValue = slugArray?.[1] || ""; // e.g. "for%20her", "birthday"
  const value = decodeURIComponent(rawValue).replace(/-/g, " ");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("Recommended");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Fetch categories to resolve IDs if category search
        const catRes = await fetch("https://flowerschamp-service-prod.up.railway.app/category");
        const catData = await catRes.json();
        const categories = catData.results || [];

        // Fetch products
        const prodRes = await fetch("https://flowerschamp-service-prod.up.railway.app/product?limit=1000");
        const prodData = await prodRes.json();
        const allProducts = prodData.results || [];

        let filtered: any[] = [];

        if (type.toLowerCase() === "tag") {
          // Filter by tag (case-insensitive match)
          filtered = allProducts.filter((prod: any) => {
            return prod.tags?.some((t: any) => 
              t?.name?.toLowerCase().trim() === value.toLowerCase().trim()
            );
          });
        } else if (type.toLowerCase() === "category") {
          // Find matching category ID
          const matchedCat = categories.find((cat: any) => 
            cat?.name?.toLowerCase().trim() === value.toLowerCase().trim()
          );
          if (matchedCat) {
            filtered = allProducts.filter((prod: any) => 
              prod.categories?.includes(matchedCat._id)
            );
          }
        } else {
          filtered = allProducts;
        }

        setProducts(filtered);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (type && value) {
      loadData();
    }
  }, [type, value]);

  // Handle Sorting
  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.countryPrice?.price?.standard?.currentPrice || 0);
    const priceB = parseFloat(b.countryPrice?.price?.standard?.currentPrice || 0);

    if (sortOption === "Price: Low to High") {
      return priceA - priceB;
    } else if (sortOption === "Price: High to Low") {
      return priceB - priceA;
    } else if (sortOption === "Newest Arrivals") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0; // Recommended / default
  });

  if (loading) {
    return <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading Collection...</div>;
  }

  if (error) {
    return <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <>
      {/* Page Banner */}
      <div className={styles.banner}>
        <Flower className={styles.bannerBgIcon1} />
        <Flower className={styles.bannerBgIcon2} />
        <div className={`container ${styles.bannerContent}`}>
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span>/</span>
            <span className={styles.breadcrumbLink}>{type.toUpperCase()}</span>
            <span>/</span>
            <span className={styles.breadcrumbActive}>{value}</span>
          </div>
          <h1 className={`${styles.bannerTitle} font-serif`} style={{ textTransform: 'capitalize' }}>{value}</h1>
          <p className={styles.bannerDesc}>
            Explore our exquisite collection of premium luxury arrangements matching "{value}".
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`container ${styles.mainContent}`}>
        <div className={styles.layoutGrid}>
          
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            <div className={styles.filterDesktop}>
              <div className={styles.filterSection}>
                <h3 className={styles.filterHeading}>Collection Details</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Showing handpicked items filtered specifically by the requested {type}: <strong>{value}</strong>.
                </p>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className={styles.productArea}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.showingText}>
                Showing <span className={styles.showingBold}>{sortedProducts.length}</span> results
              </p>
              <div className={styles.sortContainer}>
                <span className={styles.sortLabel}>Sort By:</span>
                <div className={styles.sortSelectWrapper}>
                  <select 
                    className={styles.sortSelect} 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                  <ChevronDown className={styles.sortIcon} />
                </div>
              </div>
            </div>

            {/* Grid */}
            {sortedProducts.length === 0 ? (
              <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#6b7280' }}>
                No products found in this collection.
              </div>
            ) : (
              <div className={styles.productGrid}>
                {sortedProducts.map((product, i) => {
                  const image = product.image?.default || "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop";
                  const price = product.countryPrice?.price?.standard?.currentPrice || "0";
                  const oldPrice = product.countryPrice?.price?.standard?.oldPrice;
                  
                  return (
                    <div key={i} className={styles.productCard}>
                      <div className={styles.imageWrapper}>
                        <img src={image} className={styles.productImage} alt={product.name} />
                        <div className={styles.overlayActions}>
                          <button className={styles.actionBtn}>
                            <Eye size={16} />
                          </button>
                          <button className={styles.actionBtn}>
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                      <div className={styles.productInfo}>
                        <h5 className={styles.productTitle}>{product.name}</h5>
                        <div className={styles.priceContainer}>
                          <p className={`${styles.productPrice} ${oldPrice && oldPrice !== "0" ? styles.priceDiscounted : ''}`}>
                            Rp {parseInt(price).toLocaleString('id-ID')}
                          </p>
                          {oldPrice && oldPrice !== "0" && (
                            <p className={styles.priceOriginal}>Rp {parseInt(oldPrice).toLocaleString('id-ID')}</p>
                          )}
                        </div>
                        <button className={styles.addToCartBtn}>
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
