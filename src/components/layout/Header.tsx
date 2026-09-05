"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Truck, Phone, MessageCircle, ChevronDown, Search, User, ShoppingBag, Menu, X, MapPin, PackageSearch } from 'lucide-react';
import { fetchMenu, fetchAreas } from '@/lib/api';
import { useSession } from "next-auth/react";
import { setSelectedCity } from '@/lib/store/reducers/user';
import type { RootState } from '@/lib/store';
import styles from './Header.module.css';

const headerThemes = [
  { name: "Olive Dark", hex: "#2A3522", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Olive (White Logo)", hex: "#3B4D36", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Olive (Gold Logo)", hex: "#3B4D36", text: "#ffffff", logo: "/logo-white.webp", filter: "brightness(0) saturate(100%) invert(72%) sepia(21%) saturate(1344%) hue-rotate(345deg) brightness(92%) contrast(85%)" },
  { name: "Primary", hex: "#556B4F", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "M&S Green", hex: "#123b2c", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Pine", hex: "#1c3e35", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Moss", hex: "#43523d", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Emerald Dark", hex: "#0d4036", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Matcha", hex: "#758467", text: "#ffffff", logo: "/logo-white.webp", filter: "none" },
  { name: "Ugaoo Green", hex: "#145c36", text: "#ffffff", logo: "/logo-white.webp", filter: "none" }
];

export default function Header() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const dispatch = useDispatch();
  const reduxCity = useSelector((state: RootState) => (state as any).user?.selectedCity);
  // Avoid hydration mismatch — only read persisted Redux state after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const selectedCity = mounted ? reduxCity : null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState(0);

  useEffect(() => {
    const theme = headerThemes[activeTheme];
    document.documentElement.style.setProperty('--color-olive-dark', theme.hex);
    document.documentElement.style.setProperty('--color-primary', theme.hex);
  }, [activeTheme]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    <header className={`${styles.header} bg-olive-dark ${headerThemes[activeTheme].name === 'White' ? styles.lightTheme : ''}`}>

      {/* ── Top Bar ── */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          {/* Left */}
          <div className={styles.topBarLeft}>
            <Truck size={14} className={styles.topBarIcon} aria-hidden="true" />
            <span className={styles.topBarTextSm}>Same Day Delivery</span>
            <span className={styles.topBarTextMd}>Same Day Delivery Across Your City</span>
          </div>
          {/* Center */}
          <div className={styles.topBarCenter}>Fresh Flowers • Handpicked With Love</div>
          {/* Right */}
          <div className={styles.topBarRight}>
            {/* Theme Picker */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginRight: '16px' }}>
              <span style={{ fontSize: '0.625rem', opacity: 0.8, marginRight: '4px' }}>Theme:</span>
              {headerThemes.map((t, idx) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTheme(idx)}
                  title={t.name}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: t.hex,
                    border: activeTheme === idx ? '2px solid var(--color-gold)' : '1px solid #9ca3af',
                    cursor: 'pointer',
                    padding: 0
                  }}
                />
              ))}
            </div>
            
            {/* Location pill */}
            <div className={styles.topBarLocation} onClick={() => setIsLocationModalOpen(true)}>
              <MapPin size={12} className={styles.topBarLocationIcon} />
              <span className={styles.topBarLocationText}>{selectedCity?.name || 'Choose Location'}</span>
              <ChevronDown size={10} />
            </div>
            {/* Phone */}
            <div className={styles.topBarPhone}>
              <Phone size={13} className={styles.topBarGold} />
              <span>+62 812 3456 7890</span>
            </div>
            {/* WhatsApp */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className={styles.topBarWa}>
              <MessageCircle size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className={`container ${styles.navbar}`}>
        <div className={styles.logoAndLocation}>
          <Link href="/" className={styles.logoArea}>
            <Image 
              src={headerThemes[activeTheme].logo}
              alt="Flowers Champ Logo"
              width={180}
              height={46}
              className={styles.mainLogo}
              style={{ filter: headerThemes[activeTheme].filter }}
            />
          </Link>
        </div>

        {/* Mobile inline search */}
        <form className={styles.mobileSearch} onSubmit={handleSearch}>
          <Search size={13} style={{ color: 'rgba(200,169,107,0.8)', flexShrink: 0 }} />
          <input
            type="text"
            className={styles.mobileSearchInput}
            placeholder="Search flowers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <div className={styles.navLinks}>
          {(() => {
            return (
              <>
                {menuData.map((menu: any) => {
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

            // Split each group's links into columns of max 12
            const columnarGroups: any[] = [];
            groupedCategories.forEach((col: any) => {
              const links: any[] = col.links;
              if (links.length <= 12) {
                columnarGroups.push(col);
              } else {
                for (let i = 0; i < links.length; i += 12) {
                  columnarGroups.push({
                    header: i === 0 ? col.header : '',
                    links: links.slice(i, i + 12),
                  });
                }
              }
            });

            const isActive = menu.link && menu.link !== '/' && menu.link !== '#'
              ? pathname === menu.link || pathname.startsWith(menu.link + '/')
              : !menu.link || menu.link === '#'
                ? menu.categories?.some((c: any) => c.link && c.link !== '/' && c.link !== '#' && (pathname === c.link || pathname.startsWith(c.link + '/')))
                : false;

            return (
              <div 
                key={menu._id}
                className={styles.menuParent}
                onMouseEnter={() => handleMenuEnter(menu._id)}
                onMouseLeave={handleMenuLeave}
              >
                <Link 
                  href={menu.link || '#'} 
                  className={`${styles.navLink} ${isActive || activeMenu === menu._id ? styles.navLinkActive : ''}`}
                  onClick={(e) => { if (!menu.link) e.preventDefault(); }}
                >
                  {menu.isHot && (
                    <i aria-hidden="true" style={{ color: 'var(--color-gold)', display: 'flex', alignItems: 'center' }}>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z"></path>
                      </svg>
                    </i>
                  )}
                  {menu.title}
                  {hasMega && <ChevronDown size={11} className={`${styles.navChevron} ${activeMenu === menu._id ? styles.chevronUp : ''}`} />}
                  {isActive && <span className={styles.navActiveDot} />}
                </Link>
                
                {activeMenu === menu._id && hasMega && (
                  <div className={styles.megamenuPanel}>
                    {/* top accent line */}
                    <div className={styles.megamenuAccentBar} />
                    <div className={styles.megamenuContent}>
                      <div className={styles.megamenuGrid}>
                        {columnarGroups.map((col: any, idx: number) => (
                          <div key={idx} className={styles.megamenuCol}>
                            {col.header && (
                              <div className={styles.megamenuHeaderWrap}>
                                <span className={styles.megamenuHeaderDot} />
                                <h4 className={styles.megamenuHeader}>{col.header}</h4>
                              </div>
                            )}
                            <ul className={styles.megamenuLinks}>
                              {col.links.map((link: any, lIdx: number) => {
                                const linkActive = link.link && link.link !== '/' && link.link !== '#' && (pathname === link.link || pathname.startsWith(link.link + '/'));
                                return (
                                  <li key={lIdx}>
                                    <Link href={link.link || '#'} className={`${styles.megamenuLink} ${linkActive ? styles.megamenuLinkActive : ''}`}>
                                      <span className={styles.megamenuLinkArrow}>›</span>
                                      {link.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className={styles.megamenuSidebar}>
                        {menu.image ? (
                          <div className={styles.megamenuPromo}>
                            <img src={menu.image} alt={menu.title} className={styles.megamenuImg} />
                            <div className={styles.megamenuPromoOverlay}>
                              <span className={styles.megamenuPromoLabel}>Shop {menu.title}</span>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.megamenuFeature}>
                            <div className={styles.megamenuFeatureIcon}>✦</div>
                            <p className={styles.megamenuFeatureTitle}>{menu.title}</p>
                            <p className={styles.megamenuFeatureText}>Handpicked with love, delivered fresh to your door.</p>
                            <Link href={menu.link || '/collections'} className={styles.megamenuFeatureBtn}>Explore All →</Link>
                          </div>
                        )}
                        <div className={styles.megamenuBadges}>
                          <span className={styles.megamenuBadge}>🚚 Same Day</span>
                          <span className={styles.megamenuBadge}>🌸 Fresh Picks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
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
            <button className={styles.actionIcon} onClick={() => setIsSearchOpen(true)} title="Search">
              <Search size={16} />
            </button>
          </div>

          <Link href="/order-tracking" className={`${styles.actionIcon} ${styles.desktopOnly}`} title="Track Order">
            <PackageSearch size={16} />
          </Link>
          <Link href={isLoggedIn ? "/account" : "/login"} className={`${styles.actionIcon} ${styles.desktopOnly}`} title="My Account"><User size={16} /></Link>
          <Link href="/cart" className={`${styles.actionIcon} ${styles.desktopOnly}`} title="Shopping Cart">
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
          {menuData.map((menu: any) => {
            const hasCategories = menu.categories && menu.categories.length > 0;
            const isOpen = activeMobileMenu === menu._id;
            return (
              <div key={menu._id} className={styles.mobileNavItem}>
                <div
                  className={styles.mobileNavLink}
                  onClick={() => {
                    if (hasCategories) {
                      setActiveMobileMenu(isOpen ? null : menu._id);
                    } else {
                      router.push(menu.link || '#');
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <span>{menu.title}</span>
                  {hasCategories && (
                    <ChevronDown size={14} className={isOpen ? styles.chevronUp : ''} style={{ transition: 'transform 0.3s' }} />
                  )}
                </div>
                {hasCategories && isOpen && (
                  <div className={styles.mobileSubMenu}>
                    {menu.categories.filter((c: any) => !c.isHeader).map((cat: any, i: number) => (
                      <Link
                        key={i}
                        href={cat.link || '#'}
                        className={styles.mobileSubLink}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
                    dispatch(setSelectedCity({ name: item.name, _id: item._id }));
                    setIsLocationModalOpen(false);
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
