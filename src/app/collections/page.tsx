import Link from "next/link";
import { Flower, SlidersHorizontal, ChevronDown, Eye, Heart, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import styles from "./page.module.css";

export default function CollectionsPLP() {
  const products = [
    { name: "Blush Romance", price: "Rp 850.000", img: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop", badge: { text: "Best Seller", class: styles.badgeGold } },
    { name: "Pure Passion", price: "Rp 950.000", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop", badge: null },
    { name: "Graceful Whites", price: "Rp 875.000", img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=400&auto=format&fit=crop", badge: null },
    { name: "Sunshine Delight", price: "Rp 760.000", img: "https://images.unsplash.com/photo-1528151478546-51f7b03a1168?q=80&w=400&auto=format&fit=crop", badge: { text: "New", class: styles.badgeDark } },
    { name: "Elegant Charm", price: "Rp 990.000", img: "https://images.unsplash.com/photo-1508611181146-5f128e4612e5?q=80&w=400&auto=format&fit=crop", badge: null },
    { name: "Classic Red Roses", price: "Rp 680.000", originalPrice: "Rp 800.000", img: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=400&auto=format&fit=crop", badge: { text: "-15%", class: styles.badgeRed } },
    { name: "Spring Meadow", price: "Rp 725.000", img: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=400&auto=format&fit=crop", badge: null },
    { name: "Tulip Symphony", price: "Rp 890.000", img: "https://images.unsplash.com/photo-1490750967868-88cb4ecb0704?q=80&w=400&auto=format&fit=crop", badge: null },
    { name: "Golden Lilies", price: "Rp 920.000", img: "https://images.unsplash.com/photo-1509005084666-3cbacb4fa3ab?q=80&w=400&auto=format&fit=crop", badge: null },
  ];

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
            <Link href="#" className={styles.breadcrumbLink}>Flowers</Link>
            <span>/</span>
            <span className={styles.breadcrumbActive}>All Bouquets</span>
          </div>
          <h1 className={`${styles.bannerTitle} font-serif`}>All Bouquets</h1>
          <p className={styles.bannerDesc}>
            Explore our exquisite collection of premium hand-tied bouquets, perfect for any occasion.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className={`container ${styles.mainContent}`}>
        <div className={styles.layoutGrid}>
          
          {/* Sidebar Filters */}
          <aside className={styles.sidebar}>
            {/* Mobile Filter Toggle */}
            <div className={styles.filterToggleMobile}>
              <span className={`font-serif ${styles.filterToggleText}`}>Filters</span>
              <button className={styles.filterBtn}>
                <SlidersHorizontal size={16} /> Filter
              </button>
            </div>

            <div className={styles.filterDesktop}>
              {/* Category Filter */}
              <div className={styles.filterSection}>
                <h3 className={styles.filterHeading}>Flower Type</h3>
                <div className={styles.filterList}>
                  {[
                    { label: 'Roses', count: 42, checked: true },
                    { label: 'Lilies', count: 18, checked: false },
                    { label: 'Tulips', count: 24, checked: false },
                    { label: 'Orchids', count: 15, checked: false },
                    { label: 'Peonies', count: 9, checked: false },
                  ].map((filter, i) => (
                    <label key={i} className={styles.checkboxLabel}>
                      <input type="checkbox" className={styles.checkboxInput} defaultChecked={filter.checked} />
                      <div className={styles.checkboxBox}>
                        <Check className={styles.checkboxIcon} strokeWidth={3} />
                      </div>
                      <span className={styles.checkboxText}>
                        {filter.label} <span className={styles.checkboxCount}>({filter.count})</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className={styles.filterSection}>
                <h3 className={styles.filterHeading}>Occasion</h3>
                <div className={styles.filterList}>
                  {[
                    'Birthday', 'Anniversary', 'Romance', 'Sympathy', 'Congratulations'
                  ].map((label, i) => (
                    <label key={i} className={styles.checkboxLabel}>
                      <input type="checkbox" className={styles.checkboxInput} />
                      <div className={styles.checkboxBox}>
                        <Check className={styles.checkboxIcon} strokeWidth={3} />
                      </div>
                      <span className={styles.checkboxText}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className={styles.filterSection}>
                <h3 className={styles.filterHeading}>Price</h3>
                <div className={styles.filterList}>
                  {[
                    'Under Rp 500.000', 'Rp 500.000 - Rp 1.000.000', 'Over Rp 1.000.000'
                  ].map((label, i) => (
                    <label key={i} className={styles.checkboxLabel}>
                      <input type="checkbox" className={styles.checkboxInput} />
                      <div className={styles.checkboxBox}>
                        <Check className={styles.checkboxIcon} strokeWidth={3} />
                      </div>
                      <span className={styles.checkboxText}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className={styles.productArea}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <p className={styles.showingText}>
                Showing <span className={styles.showingBold}>1-9</span> of <span className={styles.showingBold}>42</span> results
              </p>
              <div className={styles.sortContainer}>
                <span className={styles.sortLabel}>Sort By:</span>
                <div className={styles.sortSelectWrapper}>
                  <select className={styles.sortSelect}>
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
            <div className={styles.productGrid}>
              {products.map((product, i) => (
                <div key={i} className={styles.productCard}>
                  {product.badge && (
                    <div className={styles.badges}>
                      <span className={`${styles.badge} ${product.badge.class}`}>{product.badge.text}</span>
                    </div>
                  )}
                  <div className={styles.imageWrapper}>
                    <img src={product.img} className={styles.productImage} alt={product.name} />
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
                      <p className={`${styles.productPrice} ${product.originalPrice ? styles.priceDiscounted : ''}`}>
                        {product.price}
                      </p>
                      {product.originalPrice && (
                        <p className={styles.priceOriginal}>{product.originalPrice}</p>
                      )}
                    </div>
                    <button className={styles.addToCartBtn}>
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <nav className={styles.pageNav}>
                <Link href="#" className={styles.pageBtn}>
                  <ChevronLeft size={16} />
                </Link>
                <Link href="#" className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</Link>
                <Link href="#" className={styles.pageBtn}>2</Link>
                <Link href="#" className={styles.pageBtn}>3</Link>
                <span className={styles.pageDots}>...</span>
                <Link href="#" className={styles.pageBtn}>5</Link>
                <Link href="#" className={styles.pageBtn}>
                  <ChevronRight size={16} />
                </Link>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
