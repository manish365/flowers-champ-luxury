"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User, MapPin, Package, Settings, LogOut } from "lucide-react";
import styles from "./layout.module.css";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const avatarInitials = userName.substring(0, 2).toUpperCase();

  const navItems = [
    { name: "Dashboard", href: "/account", icon: User },
    { name: "Order History", href: "/account/orders", icon: Package },
    { name: "Address Book", href: "/account/addresses", icon: MapPin },
    { name: "Account Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <section className={styles.accountSection}>
      <div className={`container ${styles.accountLayout}`}>
        
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>{avatarInitials}</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{userName}</span>
                <span className={styles.userEmail}>{userEmail}</span>
              </div>
            </div>

            <nav className={styles.navMenu}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                  >
                    <Icon className={styles.navIcon} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.logoutBtn}>
              <button onClick={() => signOut({ callbackUrl: '/' })} className={`${styles.navItem} w-full text-left`} style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}>
                <LogOut className={styles.navIcon} />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={styles.mainContent}>
          {children}
        </main>

      </div>
    </section>
  );
}
