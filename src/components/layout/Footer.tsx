import Link from 'next/link';
import { Camera, Share2, MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`${styles.footer} bg-olive`}>
      <div className="container">
        <div className={styles.footerGrid}>
          
          {/* Logo & Text */}
          <div className={styles.colBrand}>
            <div className={styles.logoArea}>
              <div className={`${styles.logoCircle} font-serif italic`}>FC</div>
              <div className={styles.logoTextContainer}>
                <span className={`${styles.logoTitle} font-serif`}>FLOWERS CHAMP</span>
                <span className={styles.logoDesc}>Premium Floral Boutique</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Luxury floral boutique offering premium bouquets, wedding florals & gifting solutions for every occasion.
            </p>
            <div className={styles.socialIcons}>
              <Link href="#" className={styles.socialIcon}><Camera size={14} /></Link>
              <Link href="#" className={styles.socialIcon}><Share2 size={14} /></Link>
              <Link href="#" className={styles.socialIcon}><MessageCircle size={14} /></Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>SHOP</h4>
            <ul className={styles.linkList}>
              <li><Link href="#" className={styles.linkItem}>All Bouquets</Link></li>
              <li><Link href="#" className={styles.linkItem}>Flowers By Type</Link></li>
              <li><Link href="#" className={styles.linkItem}>Occasions</Link></li>
              <li><Link href="#" className={styles.linkItem}>Gifts & Hampers</Link></li>
              <li><Link href="#" className={styles.linkItem}>Plants & Greens</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>QUICK LINKS</h4>
            <ul className={styles.linkList}>
              <li><Link href="/about-us" className={styles.linkItem}>About Us</Link></li>
              <li><Link href="#" className={styles.linkItem}>Our Story</Link></li>
              <li><Link href="#" className={styles.linkItem}>Care Guide</Link></li>
              <li><Link href="#" className={styles.linkItem}>Blog</Link></li>
              <li><Link href="/faq" className={styles.linkItem}>FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>CUSTOMER CARE</h4>
            <ul className={styles.linkList}>
              <li><Link href="/contact-us" className={styles.linkItem}>Contact Us</Link></li>
              <li><Link href="#" className={styles.linkItem}>Delivery Information</Link></li>
              <li><Link href="/refund-policy" className={styles.linkItem}>Return & Refund</Link></li>
              <li><Link href="/term-and-conditions" className={styles.linkItem}>Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className={styles.linkItem}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className={styles.colContact}>
            <h4 className={styles.colHeading}>CONTACT</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>+62 812 3456 7890</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>hello@flowerschamp.com</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>
                  Jl. Sunset Road No.88<br />
                  Bali, Indonesia<br />
                  <span className="text-cream" style={{ opacity: 0.5, marginTop: '4px', display: 'block' }}>
                    Mon - Sun (8AM - 8PM)
                  </span>
                </span>
              </li>
            </ul>

            <h4 className={styles.colHeading} style={{ marginBottom: '1rem' }}>NEWSLETTER</h4>
            <p className={styles.newsletterText}>Subscribe to get special offers and floral inspiration.</p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={styles.newsletterInput} 
              />
              <button type="submit" className={styles.newsletterBtn}>
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Flowers Champ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
