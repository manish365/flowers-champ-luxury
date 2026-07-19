"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, X, ShoppingBag, Eye, Heart } from "lucide-react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import FlowerLoader from "@/components/shared/FlowerLoader";
import styles from "./PLPContent.module.css";

interface PLPContentProps {
  type: "tag" | "category" | "city" | "search" | "all" | string;
  value: string;
}

const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Newest Arrivals"];

export default function PLPContent({ type, value }: PLPContentProps) {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortOption, setSortOption] = useState("Recommended");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"sort" | "category" | "tags">("sort");

  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [catData, prodData] = await Promise.all([fetchCategories(), fetchProducts()]);
        const cats: any[] = catData.results || [];
        const prods: any[] = prodData.results || [];

        setCategories(cats);

        const tagSet = new Set<string>();
        prods.forEach((p: any) => p.tags?.forEach((t: any) => t?.name && tagSet.add(t.name)));
        setTags(Array.from(tagSet).sort());
        setAllProducts(prods);
      } catch {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const baseFiltered = useCallback(() => {
    if (!allProducts.length) return [];
    if (type === "search" && value.trim()) {
      const q = value.toLowerCase().trim();
      return allProducts.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some((t: any) => t?.name?.toLowerCase().includes(q))
      );
    }
    if (type === "all" || type === "search") return allProducts;
    if (type === "tag") {
      return allProducts.filter((p) =>
        p.tags?.some((t: any) => t?.name?.toLowerCase().trim() === value.toLowerCase().trim())
      );
    }
    if (type === "category") {
      const cat = categories.find((c) => c?.name?.toLowerCase().trim() === value.toLowerCase().trim());
      if (!cat) return [];
      return allProducts.filter((p) => p.categories?.includes(cat._id));
    }
    if (type === "city") {
      return allProducts.filter((p) => p.categories?.length > 0);
    }
    return allProducts;
  }, [allProducts, categories, type, value]);

  const filtered = useCallback(() => {
    let result = baseFiltered();

    if (selectedCategories.length) {
      const catIds = categories.filter((c) => selectedCategories.includes(c.name)).map((c) => c._id);
      result = result.filter((p) => p.categories?.some((id: string) => catIds.includes(id)));
    }
    if (selectedTags.length) {
      result = result.filter((p) => p.tags?.some((t: any) => selectedTags.includes(t?.name)));
    }

    return [...result].sort((a, b) => {
      const pa = parseFloat(a.countryPrice?.price?.standard?.currentPrice || 0);
      const pb = parseFloat(b.countryPrice?.price?.standard?.currentPrice || 0);
      if (sortOption === "Price: Low to High") return pa - pb;
      if (sortOption === "Price: High to Low") return pb - pa;
      if (sortOption === "Newest Arrivals") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [baseFiltered, selectedCategories, selectedTags, sortOption, categories]);

  const results = filtered();
  const totalPages = Math.ceil(results.length / PER_PAGE);
  const paginated = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) => prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]);
    setPage(1);
  };
  const toggleTag = (name: string) => {
    setSelectedTags((prev) => prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]);
    setPage(1);
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSortOption("Recommended");
    setPage(1);
  };

  const activeFilterCount = selectedCategories.length + selectedTags.length + (sortOption !== "Recommended" ? 1 : 0);
  const breadcrumbLabel =
    type === "city" ? `Flowers in ${value}` :
    type === "search" && value ? `Search: "${value}"` :
    type === "all" ? "All Collections" :
    value;

  if (loading) return (
    <div style={{ minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem", background: "var(--color-cream)" }}>
      <FlowerLoader size={120} />
      <p style={{ fontSize: "0.75rem", color: "var(--color-olive)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Loading Collection...</p>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#dc2626", fontSize: "0.875rem" }}>
      {error}
    </div>
  );

  return (
    <>
      {/* Breadcrumb Banner */}
      <div className={styles.banner}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.sep}>/</span>
            {type === "city" ? (
              <><Link href="/delivery-cities" className={styles.breadcrumbLink}>Cities</Link><span className={styles.sep}>/</span></>
            ) : type === "search" || type === "all" ? (
              <><Link href="/collections" className={styles.breadcrumbLink}>Collections</Link><span className={styles.sep}>/</span></>
            ) : (
              <><span className={styles.breadcrumbLink} style={{ textTransform: "capitalize" }}>{type}</span><span className={styles.sep}>/</span></>
            )}
            <span className={styles.breadcrumbActive} style={{ textTransform: "capitalize" }}>{breadcrumbLabel}</span>
          </div>
          <h1 className={`${styles.bannerTitle} font-serif`} style={{ textTransform: "capitalize" }}>
            {breadcrumbLabel}
          </h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className={`container ${styles.toolbar}`}>
        <p className={styles.resultCount}>
          Showing <strong>{results.length}</strong> results
          {(selectedCategories.length > 0 || selectedTags.length > 0) && (
            <span className={styles.filterSummary}> — filtered by {[...selectedCategories, ...selectedTags].join(", ")}</span>
          )}
        </p>
        <div className={styles.toolbarActions}>
          <button className={`${styles.tagBtn} ${activeFilterCount > 0 ? styles.tagBtnActive : ""}`} onClick={() => { setModalTab("category"); setModalOpen(true); }}>
            <SlidersHorizontal size={14} /> Filter
            {activeFilterCount > 0 && <span className={styles.badge}>{activeFilterCount}</span>}
          </button>
          <button className={`${styles.tagBtn} ${sortOption !== "Recommended" ? styles.tagBtnActive : ""}`} onClick={() => { setModalTab("sort"); setModalOpen(true); }}>
            <ArrowUpDown size={14} /> Sort: {sortOption}
          </button>
          {activeFilterCount > 0 && (
            <button className={styles.clearBtn} onClick={clearFilters}><X size={12} /> Clear all</button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container" style={{ paddingBottom: "3rem" }}>
        {paginated.length === 0 ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "#6b7280" }}>No products found in this collection.</div>
        ) : (
          <div className={styles.productGrid}>
            {paginated.map((product, i) => {
              const image = product.image?.default || "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=400&auto=format&fit=crop";
              const price = product.countryPrice?.price?.standard?.currentPrice || "0";
              const oldPrice = product.countryPrice?.price?.standard?.oldPrice;
              return (
                <div key={i} className={styles.productCard} onClick={() => router.push(`/products/${product._id}`)}>
                  <div className={styles.imageWrapper}>
                    <img src={image} className={styles.productImage} alt={product.name} />
                    <div className={styles.overlayActions}>
                      <button className={styles.actionBtn} onClick={(e) => e.stopPropagation()}><Eye size={15} /></button>
                      <button className={styles.actionBtn} onClick={(e) => e.stopPropagation()}><Heart size={15} /></button>
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <h5 className={styles.productTitle}>{product.name}</h5>
                    <div className={styles.priceRow}>
                      <span className={`${styles.price} ${oldPrice && oldPrice !== "0" ? styles.priceOff : ""}`}>
                        Rp {parseInt(price).toLocaleString("id-ID")}
                      </span>
                      {oldPrice && oldPrice !== "0" && (
                        <span className={styles.oldPrice}>Rp {parseInt(oldPrice).toLocaleString("id-ID")}</span>
                      )}
                    </div>
                    <button className={styles.addBtn} onClick={(e) => e.stopPropagation()}>
                      <ShoppingBag size={13} /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹ Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`${styles.pageBtn} ${p === page ? styles.pageBtnActive : ""}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className={styles.pageBtn} disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next ›</button>
          </div>
        )}
      </div>

      {/* Filter / Sort Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Refine Results</h3>
              <button className={styles.modalClose} onClick={() => setModalOpen(false)}><X size={18} /></button>
            </div>

            {/* Two-panel body */}
            <div className={styles.modalBody}>
              {/* Left nav */}
              <nav className={styles.filterNav}>
                <button className={`${styles.filterNavItem} ${modalTab === "sort" ? styles.filterNavItemActive : ""}`} onClick={() => setModalTab("sort")}>
                  <ArrowUpDown size={14} />
                  <span>Sort By</span>
                  {sortOption !== "Recommended" && <span className={styles.navDot} />}
                </button>
                <button className={`${styles.filterNavItem} ${modalTab === "category" ? styles.filterNavItemActive : ""}`} onClick={() => setModalTab("category")}>
                  <SlidersHorizontal size={14} />
                  <span>Category</span>
                  {selectedCategories.length > 0 && <span className={styles.navCount}>{selectedCategories.length}</span>}
                </button>
                <button className={`${styles.filterNavItem} ${modalTab === "tags" ? styles.filterNavItemActive : ""}`} onClick={() => setModalTab("tags")}>
                  <SlidersHorizontal size={14} />
                  <span>Tags</span>
                  {selectedTags.length > 0 && <span className={styles.navCount}>{selectedTags.length}</span>}
                </button>
              </nav>

              {/* Right panel */}
              <div className={styles.filterPanel}>
                {modalTab === "sort" && (
                  <>
                    <p className={styles.panelLabel}>Sort By</p>
                    <div className={styles.radioList}>
                      {SORT_OPTIONS.map((opt) => (
                        <label key={opt} className={`${styles.radioRow} ${sortOption === opt ? styles.radioRowActive : ""}`}>
                          <input type="radio" name="sort" checked={sortOption === opt} onChange={() => { setSortOption(opt); setPage(1); }} className={styles.radioInput} />
                          <span className={styles.radioCustom} />
                          <span className={styles.radioLabel}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
                {modalTab === "category" && (
                  <>
                    <p className={styles.panelLabel}>Category</p>
                    <div className={styles.checkList}>
                      {categories.map((cat) => (
                        <label key={cat._id} className={`${styles.checkRow} ${selectedCategories.includes(cat.name) ? styles.checkRowActive : ""}`}>
                          <input type="checkbox" checked={selectedCategories.includes(cat.name)} onChange={() => toggleCategory(cat.name)} className={styles.checkInput} />
                          <span className={styles.checkCustom} />
                          <span className={styles.checkLabel}>{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
                {modalTab === "tags" && (
                  <>
                    <p className={styles.panelLabel}>Tags</p>
                    <div className={styles.checkList}>
                      {tags.slice(0, 40).map((tag) => (
                        <label key={tag} className={`${styles.checkRow} ${selectedTags.includes(tag) ? styles.checkRowActive : ""}`}>
                          <input type="checkbox" checked={selectedTags.includes(tag)} onChange={() => toggleTag(tag)} className={styles.checkInput} />
                          <span className={styles.checkCustom} />
                          <span className={styles.checkLabel}>{tag}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.clearBtnModal} onClick={clearFilters}>Clear All</button>
              <button className={styles.applyBtn} onClick={() => setModalOpen(false)}>Show {results.length} Results</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
