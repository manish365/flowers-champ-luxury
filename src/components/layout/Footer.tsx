import Link from 'next/link';
import Image from 'next/image';
import { Camera, Share2, MessageCircle, Phone, Mail, MapPin, Send } from 'lucide-react';
import styles from './Footer.module.css';
import { fetchFooterData, fetchWebsiteMeta } from '@/lib/api';

export default async function Footer() {
  let footerData = null;
  let websiteMeta = null;

  try {
    const [footerRes, metaRes] = await Promise.all([
      fetchFooterData().catch(() => null),
      fetchWebsiteMeta().catch(() => null)
    ]);
    
    footerData = footerRes?.success ? footerRes.results[0] : null;
    websiteMeta = metaRes?.success ? metaRes.results[0] : null;
  } catch (error) {
    console.error("Error loading footer data:", error);
  }


  const companyPhone = websiteMeta?.companyDetails?.phno || "+62 812 3456 7890";
  const companyEmail = websiteMeta?.basic?.mailSenderId || "hello@flowerschamp.com";
  const companyAddress = websiteMeta?.companyDetails?.address || "Jl. Sunset Road No.88, Bali, Indonesia";

  const sectionOne = footerData?.items?.sectionOne || [];
  const sectionTwo = footerData?.items?.sectionTwo || [];
  const sectionThree = footerData?.items?.sectionThree || [];
  const links = footerData?.links || {};
  const copyrightText = footerData?.copright || `© ${new Date().getFullYear()} Flowers Champ. All Rights Reserved.`;

  return (
    <footer className={`${styles.footer} bg-olive-dark`}>
      <div className="container">
        <div className={styles.footerGrid}>
          
          {/* Logo & Text */}
          <div className={styles.colBrand}>
            <Link href="/" className={styles.logoArea}>
              <Image 
                src="/logo-white.webp"
                alt="Flowers Champ Logo"
                width={180}
                height={46}
                className={styles.mainLogo}
              />
            </Link>
            <p className={styles.brandDesc}>
              Luxury floral boutique offering premium bouquets, wedding florals & gifting solutions for every occasion.
            </p>
            <div className={styles.socialIcons}>
              <Link href={links.instagram || "#"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                <Camera size={14} />
              </Link>
              <Link href={links.fb || "#"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialIcon}>
                <Share2 size={14} />
              </Link>
              <Link href={`https://wa.me/${companyPhone}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialIcon}>
                <MessageCircle size={14} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>SHOP</h4>
            <ul className={styles.linkList}>
              {sectionOne.length > 0 ? (
                sectionOne.map((item: any) => (
                  <li key={item?._id}>
                    <Link href={item?.link || "#"} className={styles.linkItem}>{item?.title}</Link>
                  </li>
                ))
              ) : null}
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>QUICK LINKS</h4>
            <ul className={styles.linkList}>
              {sectionTwo.length > 0 ? (
                sectionTwo.map((item: any) => (
                  <li key={item?._id}>
                    <Link href={item?.link || "#"} className={styles.linkItem}>{item?.title}</Link>
                  </li>
                ))
              ) : null}
            </ul>
          </div>

          {/* Customer Care */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeading}>CUSTOMER CARE</h4>
            <ul className={styles.linkList}>
              {sectionThree.length > 0 ? (
                sectionThree.map((item: any) => (
                  <li key={item?._id}>
                    <Link href={item?.link || "#"} className={styles.linkItem}>{item?.title}</Link>
                  </li>
                ))
              ) : null}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className={styles.colContact}>
            <h4 className={styles.colHeading}>CONTACT</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>{companyPhone}</span>
              </li>
              <li className={styles.contactItem}>
                <Mail size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>{companyEmail}</span>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>
                  {companyAddress}
                  {/* <span className="text-cream" style={{ opacity: 0.5, marginTop: '4px', display: 'block' }}>
                    Mon - Sun (8AM - 8PM)
                  </span> */}
                </span>
              </li>
            </ul>

            {/* <h4 className={styles.colHeading} style={{ marginBottom: '1rem' }}>NEWSLETTER</h4>
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
            </form> */}
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
