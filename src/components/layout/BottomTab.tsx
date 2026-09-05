"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Menu, MapPin, User, ShoppingBag, X, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setSelectedCity } from "@/lib/store/reducers/user";
import { fetchAreas, fetchMenu } from "@/lib/api";
import type { RootState } from "@/lib/store";
import styles from "./BottomTab.module.css";

const tabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: null, icon: Menu, label: "Menu", action: "menu" },
  { href: null, icon: MapPin, label: "Location", action: "location" },
  { href: "/login", icon: User, label: "Account" },
  { href: "/cart", icon: ShoppingBag, label: "Cart" },
];

export default function BottomTab() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [mounted, setMounted] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [areaData, setAreaData] = useState<any[]>([]);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [openMenuItem, setOpenMenuItem] = useState<string | null>(null);
  const reduxCity = useSelector((state: RootState) => (state as any).user?.selectedCity);
  const selectedCity = mounted ? reduxCity : null;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (locationOpen && areaData.length === 0) {
      fetchAreas().then((data) => {
        const arr = Array.isArray(data) ? data : data?.results || data?.data || [];
        setAreaData(arr);
      }).catch(() => {});
    }
  }, [locationOpen]);

  useEffect(() => {
    if (menuOpen && menuData.length === 0) {
      fetchMenu().then((data) => {
        const arr = Array.isArray(data) ? data : data?.results || data?.data || data?.menu || [];
        const sorted = [...arr].sort((a: any, b: any) => (a.seq || 0) - (b.seq || 0));
        setMenuData(sorted);
      }).catch(() => {});
    }
  }, [menuOpen]);

  return (
    <>
      <nav className={styles.bottomTab}>
        {tabs.map((tab) => {
          const actualHref = tab.label === "Account" && isLoggedIn ? "/account" : tab.href;
          const isActive = actualHref ? (actualHref === "/" ? pathname === "/" : pathname.startsWith(actualHref)) : false;
          const Icon = tab.icon;
          
          if (tab.action === "location") {
            return (
              <button key="location" className={`${styles.tabItem} ${selectedCity ? styles.tabItemActive : ""}`} onClick={() => setLocationOpen(true)}>
                <Icon size={20} />
                <span>{selectedCity?.name || "Location"}</span>
              </button>
            );
          }
          if (tab.action === "menu") {
            return (
              <button key="menu" className={`${styles.tabItem} ${menuOpen ? styles.tabItemActive : ""}`} onClick={() => setMenuOpen(true)}>
                <Icon size={20} />
                <span>Menu</span>
              </button>
            );
          }
          return (
            <Link key={tab.label} href={actualHref!} className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ""}`}>
              <Icon size={20} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Menu Sheet */}
      {menuOpen && (
        <div className={styles.locBackdrop} onClick={() => setMenuOpen(false)}>
          <div className={styles.locSheet} style={{ maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <div className={styles.locHeader}>
              <span className={styles.locTitle}>Menu</span>
              <button className={styles.locClose} onClick={() => setMenuOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.menuList}>
              {menuData.map((menu: any) => {
                const hasCategories = menu.categories && menu.categories.length > 0;
                const isOpen = openMenuItem === menu._id;
                return (
                  <div key={menu._id} className={styles.menuItem}>
                    <div className={styles.menuItemRow} onClick={() => {
                      if (hasCategories) { setOpenMenuItem(isOpen ? null : menu._id); }
                      else { router.push(menu.link || '#'); setMenuOpen(false); }
                    }}>
                      <span>{menu.title}</span>
                      {hasCategories && <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />}
                    </div>
                    {hasCategories && isOpen && (
                      <div className={styles.menuSubList}>
                        {menu.categories.filter((c: any) => !c.isHeader).map((cat: any, i: number) => (
                          <Link key={i} href={cat.link || '#'} className={styles.menuSubItem} onClick={() => setMenuOpen(false)}>
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
        </div>
      )}

      {/* Location Sheet */}
      {locationOpen && (
        <div className={styles.locBackdrop} onClick={() => setLocationOpen(false)}>
          <div className={styles.locSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.locHeader}>
              <span className={styles.locTitle}>Choose City</span>
              <button className={styles.locClose} onClick={() => setLocationOpen(false)}><X size={18} /></button>
            </div>
            <div className={styles.locGrid}>
              {areaData.map((item: any) => (
                <button
                  key={item._id || item.name}
                  className={`${styles.locBtn} ${selectedCity?._id === item._id ? styles.locBtnActive : ""}`}
                  onClick={() => { dispatch(setSelectedCity({ name: item.name, _id: item._id })); setLocationOpen(false); }}
                >
                  <MapPin size={13} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
