import React, { useState } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  CreditCard, 
  Copy,
  CheckCircle,
  ArrowLeft,
  Bike,
  Car,
  Truck
} from 'lucide-react';
import styles from './Delivery.module.css';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import { deliveryAgentData } from '../../constant/SingleDeliveryAgentData';

const DeliveryAgent: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const agent = deliveryAgentData;

  const handleCopy = async (text: string, field: string) => {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
  };

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType.toLowerCase()) {
      case 'motorcycle':
      case 'scooter':
        return <Bike size={20} />;
      case 'bicycle':
        return <Bike size={20} />;
      case 'auto rickshaw':
      case 'car':
        return <Car size={20} />;
      case 'truck':
        return <Truck size={20} />;
      default:
        return <Bike size={20} />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header with Back Button */}
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          aria-label="Go back" 
          onClick={() => navigate("/delivery-agent")}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>Delivery Agent Profile</h1>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Agent Profile Card */}
        <div className={styles.card}>
          <div className={styles.agentHeader}>
            <div className={styles.profileSection}>
              <img 
                src={agent.profileImage} 
                alt={`${agent.name} profile`}
                className={styles.profileImage}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=3b82f6&color=ffffff&size=128`;
                }}
              />
              <div className={styles.agentInfo}>
                <h2 className={styles.agentName}>{agent.name}</h2>
                <div className={styles.statusWrapper}>
                  <span className={styles.joinDate}>
                    Joined {formatDate(agent.joinDate)}
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
                <Phone size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Phone Number</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.contactValue}>{agent.phone}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Email Address</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.contactValue}>{agent.email}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={`${styles.contactIcon} ${styles.vehicleDefault}`}>
                {getVehicleIcon(agent.vehicleType)}
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Vehicle Type</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.contactValue}>{agent.vehicleType}</span>
                </div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.contactContent}>
                <span className={styles.contactLabel}>Vehicle Number</span>
                <div className={styles.contactValueWithAction}>
                  <span className={styles.vehicleNumber}>{agent.vehicleNumber}</span>
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
                <span className={styles.bankValue}>{agent.bankDetails.bankName}</span>
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
                    {agent.bankDetails.accountNumber}
                  </span>
                  <div className={styles.bankActions}>
                    <button 
                      className={styles.copyButton}
                      onClick={() => handleCopy(agent.bankDetails.accountNumber, 'account')}
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
                  <span className={styles.bankValue}>{agent.bankDetails.ifscCode}</span>
                  <button 
                    className={styles.copyButton}
                    onClick={() => handleCopy(agent.bankDetails.ifscCode, 'ifsc')}
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

export default DeliveryAgent;