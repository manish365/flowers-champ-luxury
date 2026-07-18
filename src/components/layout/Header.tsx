"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Truck, Phone, MessageCircle, ChevronDown, Search, User, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { fetchMenu, fetchAreas } from '@/lib/api';
import styles from './Header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('Choose Location');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const router = useRouter();

  const [menuData, setMenuData] = useState<any[]>([]);
  const [areaData, setAreaData] = useState<any[]>([]);
  
  const menuTimer = useRef<NodeJS.Timeout | null>(null);
  const subMenuTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (id: string) => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => {
      setActiveMenu(id);
    }, 200);
  };

  const handleMenuLeave = () => {
    if (menuTimer.current) clearTimeout(menuTimer.current);
    menuTimer.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  const handleSubMenuEnter = (id: string) => {
    if (subMenuTimer.current) clearTimeout(subMenuTimer.current);
    subMenuTimer.current = setTimeout(() => {
      setActiveSubMenu(id);
    }, 200);
  };

  const handleSubMenuLeave = () => {
    if (subMenuTimer.current) clearTimeout(subMenuTimer.current);
    subMenuTimer.current = setTimeout(() => {
      setActiveSubMenu(null);
    }, 200);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };


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
        } else if (data && Array.isArray(data.results)) {
          menuArray = data.results;
        }
        
        // Sort by sequence if available
        const sortedMenu = [...menuArray].sort((a: any, b: any) => (a.seq || 0) - (b.seq || 0));
        setMenuData(sortedMenu);
      } catch (error) {
        console.error("Failed to load menu", error);
      }
    }
    async function loadAreas() {
      try {
        const data = await fetchAreas();
        let areasArray = [];
        if (Array.isArray(data)) {
          areasArray = data;
        } else if (data && Array.isArray(data.results)) {
          areasArray = data.results;
        } else if (data && Array.isArray(data.data)) {
          areasArray = data.data;
        }
        setAreaData(areasArray);
      } catch (error) {
        console.error("Failed to load areas", error);
      }
    }
    loadMenu();
    loadAreas();
  }, []);

  return (
    <header className={`${styles.header} bg-olive-dark`}>
      {/* Navbar */}
      <nav className={`container ${styles.navbar}`}>
        <div className={styles.logoAndLocation}>
          <Link href="/" className={styles.logoArea}>
            <Image 
              src="/logo-white.webp"
              alt="Flowers Champ Logo"
              width={180}
              height={46}
              className={styles.mainLogo}
            />
          </Link>
          
          <div className={styles.locationSelector} onClick={() => setIsLocationModalOpen(true)}>
            <MapPin size={16} className={styles.locationIconMobile} />
            <span className={styles.locationText}>{location}</span>
            <ChevronDown size={12} className={styles.locationChevron} />
          </div>
        </div>
        
        <div className={styles.navLinks}>
          {(() => {
            const visibleCount = menuData.length > 7 ? 6 : 7;
            return (
              <>
                {menuData.slice(0, visibleCount).map((menu: any) => {
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
                onMouseEnter={() => handleMenuEnter(menu._id)}
                onMouseLeave={handleMenuLeave}
              >
                <Link 
                  href={menu.link || '#'} 
                  className={styles.navLink}
                  onClick={(e) => { if (!menu.link) e.preventDefault(); }}
                >
                  {menu.isHot && (
                    <i aria-hidden="true" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
                      </svg>
                    </i>
                  )}
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
          
          {menuData.length > 7 && (
            <div 
              className={styles.menuParent}
              onMouseEnter={() => handleMenuEnter('more')}
              onMouseLeave={handleMenuLeave}
            >
              <div className={styles.navLink} style={{ cursor: 'pointer' }}>
                More <ChevronDown size={12} className={activeMenu === 'more' ? styles.chevronUp : ''} />
              </div>
              
              {activeMenu === 'more' && (
                <div className={styles.dropdownPanel}>
                  {menuData.slice(6).map((menu: any, idx: number) => {
                    const hasCategories = menu.categories && menu.categories.length > 0;
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
                        key={menu._id || idx}
                        onMouseEnter={() => handleSubMenuEnter(menu._id)}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        <Link 
                          href={menu.link || '#'} 
                          className={styles.dropdownLink}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                          onClick={(e) => { if (!menu.link) e.preventDefault(); }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {menu.isHot && (
                              <i aria-hidden="true" style={{ color: 'var(--color-gold)', display: 'flex' }}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
                                </svg>
                              </i>
                            )}
                            {menu.title}
                          </span>
                          {hasMega && <ChevronDown size={12} style={{ transform: 'rotate(-90deg)' }} />}
                        </Link>
                        
                        {activeSubMenu === menu._id && hasMega && (
                          <div className={styles.megamenuPanel}>
                            <div className={styles.megamenuContent}>
                              <div className={styles.megamenuGrid}>
                                {groupedCategories.map((col: any, colIdx: number) => (
                                  <div key={colIdx} className={styles.megamenuCol}>
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
              )}
            </div>
          )}
              </>
            );
          })()}
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
              <div>
                <h3 className={styles.modalTitle}>Choose Your Favorite Gifting Destination</h3>
                <p className={styles.modalSubtitle}>Select a city to continue shopping</p>
              </div>
              <button onClick={() => setIsLocationModalOpen(false)} className={styles.modalCloseBtn}><X size={20} /></button>
            </div>
            <div className={styles.cityGrid}>
              {areaData.map((item: any) => (
                <button 
                  key={item._id || item.name} 
                  className={styles.cityBtn}
                  onClick={() => {
                    setLocation(item.name);
                    setIsLocationModalOpen(false);
                    window.location.href = `/city/${encodeURIComponent(item.name)}`;
                  }}
                >
                  <MapPin size={16} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
