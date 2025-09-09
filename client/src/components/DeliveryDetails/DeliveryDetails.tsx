import { useState } from 'react';
import { ChevronLeft, MapPin, User } from 'lucide-react';
import styles from './DeliveryDetails.module.css';

const DeliveryDetails = ({ onNext, onBack }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone && formData.address && formData.city && formData.zipCode) {
      onNext(formData);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Delivery Details</h1>
      
      <div className={styles.formContainer}>
        {/* Personal Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <User className={styles.sectionIcon} />
            Personal Information
          </h3>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="+91 (555) 123-4567"
              required
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MapPin className={styles.sectionIcon} />
            Delivery Address
          </h3>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Street Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="123 Main Street, Apt 4B"
              required
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="New York"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="10001"
                required
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Delivery Instructions (Optional)</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              className={styles.textarea}
              placeholder="Leave at door, Ring bell twice, etc."
              rows={3}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button 
            type="button" 
            onClick={onBack}
            className={styles.backButton}
          >
            <ChevronLeft className={styles.backIcon} />
            Back to Order
          </button>
          
          <button 
            type="button"
            onClick={handleSubmit}
            className={styles.continueButton}
          >
            Continue to Payment
            <ChevronLeft className={styles.continueIcon} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default DeliveryDetails;