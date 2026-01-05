// Footer.tsx
import React from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Links',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'About Us', href: '#' }
      ]
    },
    {
      title: 'Customer Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Delivery Information', href: '#' },
        { label: 'Return & Refund Policy', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms & Conditions', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'FAQs', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Company Info Section */}
        <div className={styles.companySection}>
          <h2 className={styles.brandName}>Delivery Mitra</h2>
          <p className={styles.brandDescription}>
            Our platform helps businesses run delivery and hire services, efficient 
            logistics – making shipments easier to manage, track, and improve.
          </p>
          

        </div>

        {/* Links Grid */}
        <div className={styles.linksGrid}>
          {footerSections.map((section, index) => (
            <div key={index} className={styles.linkSection}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.linkList}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={styles.linkItem}>
                    <a 
                      href={link.href} 
                      className={styles.footerLink}
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className={styles.socialContainer}>
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <div className={styles.copyrightContainer}>
          <p className={styles.copyright}>
            Delivery Mitra © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;