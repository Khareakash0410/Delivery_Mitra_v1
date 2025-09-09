import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  CreditCard, 
  Copy,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import styles from './Vendor.module.css';
import { useNavigate } from 'react-router-dom';
import { vendor } from '../../constant/SingleVendorData';
import { formatDate } from '../../utils/formatDate';


const Vendor: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCopy = async (text: string, field: string) => {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className={styles.container}>
      {/* Header with Back Button */}
      <div className={styles.header}>
        <button className={styles.backButton} aria-label="Go back" onClick={() => navigate("/vendors")}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>Vendor Profile</h1>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Restaurant Info Card */}
        <div className={styles.card}>
          <div className={styles.restaurantHeader}>
            <div className={styles.logoSection}>
              <img 
                src={vendor.logo} 
                alt={`${vendor.name} logo`}
                className={styles.logo}
              />
              <div className={styles.restaurantInfo}>
                <h2 className={styles.restaurantName}>{vendor.name}</h2>
                <p className={styles.tagline}>{vendor.tagline}</p>
                <div className={styles.statusWrapper}>
                  <span className={styles.joinDate}>
                    Joined {formatDate(vendor.joinDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Contact Information</h3>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Location</span>
                <span className={styles.contactValue}>{vendor.location}</span>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Email</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.contactValue}>{vendor.email}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Phone size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Phone</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.contactValue}>{vendor.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Card */}
        <div className={styles.card}>
          <div className={styles.bankHeader}>
            <h3 className={styles.cardTitle}>Banking Information</h3>
          </div>
          
          <div className={styles.bankGrid}>
            <div className={styles.bankItem}>
              <div className={styles.bankIcon}>
                <Building2 size={20} />
              </div>
              <div className={styles.bankContent}>
                <span className={styles.bankLabel}>Bank Name</span>
                <span className={styles.bankValue}>{vendor.bankDetails.bankName}</span>
              </div>
            </div>

            <div className={styles.bankItem}>
              <div className={styles.bankIcon}>
                <CreditCard size={20} />
              </div>
              <div className={styles.bankContent}>
                <span className={styles.bankLabel}>Account Number</span>
                <div className={styles.bankValueWithActions}>
                  <span className={styles.bankValue}>
                    {vendor.bankDetails.accountNumber}
                  </span>
                  <div className={styles.bankActions}>
                    <button 
                      className={styles.copyButton}
                      onClick={() => handleCopy(vendor.bankDetails.accountNumber, 'account')}
                      aria-label="Copy account number"
                    >
                      {copiedField === 'account' ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.bankItem}>
              <div className={styles.bankIcon}>
                <Building2 size={20} />
              </div>
              <div className={styles.bankContent}>
                <span className={styles.bankLabel}>IFSC Code</span>
                <div className={styles.bankValueWithActions}>
                  <span className={styles.bankValue}>{vendor.bankDetails.ifscCode}</span>
                  <button 
                    className={styles.copyButton}
                    onClick={() => handleCopy(vendor.bankDetails.ifscCode, 'ifsc')}
                    aria-label="Copy IFSC code"
                  >
                    {copiedField === 'ifsc' ? <CheckCircle size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Vendor;