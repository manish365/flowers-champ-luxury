"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Truck, Phone, MessageCircle, ChevronDown, Search, User, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { fetchMenu } from '@/lib/api';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Choose Location');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const [menuData, setMenuData] = useState<any[]>([]);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenu();
        
        let menuArray = [];
        if (Array.isArray(data)) {
          menuArray = data;
        } else if (data && Array.isArray(data.data)) {
          menuArray = data.data;
        } else if (data && Array.isArray(data.menu)) {
          menuArray = data.menu;
        }
        
        // Sort by sequence if available
        const sortedMenu = [...menuArray].sort((a: any, b: any) => (a.seq || 0) - (b.seq || 0));
        setMenuData(sortedMenu);
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    }
    loadMenu();
  }, []);

  return (
    <header className={`${styles.header} bg-olive-dark`}>
      {/* Navbar */}
      <nav className={`container ${styles.navbar}`}>
        <div className={styles.logoAndLocation}>
          <Link href="/" className={styles.logoArea}>
            <Image 
              src="https://www.flowerschamp.com/_next/image?url=%2Fimages%2Flogos%2Flogo.png&w=828&q=75"
              alt="Flowers Champ Logo"
              width={180}
              height={46}
              className={styles.mainLogo}
            />
          </Link>
          
          <div className={styles.locationSelector} onClick={() => setIsLocationModalOpen(true)}>
            <span className={styles.locationLabel}>Send Gifts To:</span>
            <div className={styles.locationDropdown}>
              <MapPin size={16} className={styles.locationIcon} />
              <span className={styles.locationText}>{location}</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
        
        <div className={styles.navLinks}>
          {menuData.slice(0, 7).map((menu: any) => {
            const hasCategories = menu.categories && menu.categories.length > 0;
            // The API returns a flat list of categories, some are headers
            // We group them here
            const groupedCategories: any[] = [];
            let currentGroup: any = null;

            if (hasCategories) {
              menu.categories.forEach((cat: any) => {
                if (cat.isHeader) {
                  if (currentGroup) groupedCategories.push(currentGroup);
                  currentGroup = { header: cat.title, links: [] };
                } else {
                  if (!currentGroup) currentGroup = { header: '', links: [] };
                  currentGroup.links.push(cat);
                }
              });
              if (currentGroup) groupedCategories.push(currentGroup);
            }

            const hasMega = groupedCategories.length > 0;

            return (
              <div 
                key={menu._id}
                className={styles.menuParent}
                onMouseEnter={() => setActiveMenu(menu._id)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href={menu.link || '#'} className={styles.navLink}>
                  {menu.title} {hasMega && <ChevronDown size={12} className={activeMenu === menu._id ? styles.chevronUp : ''} />}
                </Link>
                
                {activeMenu === menu._id && hasMega && (
                  <div className={styles.megamenuPanel}>
                    <div className={styles.megamenuContent}>
                      <div className={styles.megamenuGrid}>
                        {groupedCategories.map((col: any, idx: number) => (
                          <div key={idx} className={styles.megamenuCol}>
                            {col.header && <h4 className={styles.megamenuHeader}>{col.header}</h4>}
                            <div className={styles.megamenuLinks}>
                              {col.links.map((link: any, lIdx: number) => (
                                <Link key={lIdx} href={link.link || '#'} className={styles.megamenuLink}>{link.title}</Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {menu.image && (
                        <div className={styles.megamenuPromo}>
                          <img src={menu.image} alt={menu.title} className={styles.megamenuImg} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.navActions}>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className={styles.searchContainer}>
            <button className={styles.actionIcon} onClick={() => setIsSearchOpen(true)}>
              <Search size={16} />
            </button>
          </div>

          <Link href="/login" className={styles.actionIcon}><User size={16} /></Link>
          <Link href="/cart" className={styles.actionIcon}>
            <ShoppingBag size={16} />
            <span className={styles.cartBadge}>0</span>
          </Link>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className={styles.searchOverlay}>
            <form className={styles.searchFormExpanded} onSubmit={handleSearch}>
              <Search size={20} className={styles.searchIconLeft} />
              <input 
                type="text" 
                className={styles.searchInputExpanded} 
                placeholder="Search for flowers, cakes, gifts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setIsSearchOpen(false)} className={styles.searchCloseBtnExpanded}>
                <X size={20} />
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileNavLinks}>
          <Link href="#" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Express Delivery</Link>
          <Link href="#" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Premium Flowers</Link>
          <div className={styles.mobileNavLink}>
            Flowers <ChevronDown size={12} />
          </div>
          <div className={styles.mobileNavLink}>
            Occasion <ChevronDown size={12} />
          </div>
          <Link href="#" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Gift Bundles</Link>
          <Link href="#" className={`${styles.mobileNavLink} ${styles.navLinkActive}`} onClick={() => setIsMobileMenuOpen(false)}>Deals</Link>
          <Link href="#" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Cakes</Link>
          <div className={styles.mobileNavLink}>
            Collections <ChevronDown size={12} />
          </div>
          <Link href="#" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>Plants</Link>
        </div>
      </div>

      {/* Location Modal */}
      {isLocationModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsLocationModalOpen(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Select Delivery City</h3>
              <button onClick={() => setIsLocationModalOpen(false)} className={styles.modalCloseBtn}><X size={20} /></button>
            </div>
            <div className={styles.cityGrid}>
              {['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan'].map(city => (
                <button 
                  key={city} 
                  className={styles.cityBtn}
                  onClick={() => {
                    setLocation(city);
                    setIsLocationModalOpen(false);
                  }}
                >
                  <MapPin size={16} />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
