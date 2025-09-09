import React from 'react';
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Links',
      links: [
        { label: 'Home', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'About Us', href: '#' },
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

  const contactInfo = {
    address: 'Plot No. 5A, GIDC Industrial Estate, Ahmedabad',
    email: 'logistix@gmail.com',
    phone: '+91 9978146323'
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Company Info Section */}
        <div className={styles.companySection}>
          <div className={styles.brandContainer}>
            <h2 className={styles.brandName}>Delivery Mitra</h2>
            <p className={styles.brandDescription}>
              Our platform helps businesses run delivery and hire services, efficient 
              logistics – making shipments easier to manage, track, and improve.
            </p>
          </div>
          
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>{contactInfo.address}</span>
            </div>
            
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <a 
                href={`mailto:${contactInfo.email}`} 
                className={styles.contactLink}
              >
                {contactInfo.email}
              </a>
            </div>
            
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <a 
                href={`tel:${contactInfo.phone}`} 
                className={styles.contactLink}
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links Sections */}
        <div className={styles.linksContainer}>
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
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>
              Delivery Mitra © {currentYear}
            </p>
            
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
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;