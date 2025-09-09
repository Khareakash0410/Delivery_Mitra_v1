import React, { useState } from 'react';
import { Upload, Save, X } from 'lucide-react';
import styles from './Setting.module.css';

interface ConfigData {
  name: string;
  location: string;
  email: string;
  phone: string;
  tagline: string;
  logo: File | null;
}

interface PayoutData {
  accountNo: string;
  bankName: string;
  ifscCode: string;
}

const RestaurantConfig: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'configuration' | 'payout'>('configuration');
  const [configData, setConfigData] = useState<ConfigData>({
    name: '',
    location: '',
    email: '',
    phone: '',
    tagline: '',
    logo: null
  });
  const [payoutData, setPayoutData] = useState<PayoutData>({
    accountNo: '',
    bankName: '',
    ifscCode: ''
  });
  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleConfigChange = (field: keyof ConfigData, value: string) => {
    setConfigData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayoutChange = (field: keyof PayoutData, value: string) => {
    setPayoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setConfigData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (activeTab === 'configuration') {
      console.log('Saving configuration:', configData);
      alert('Configuration saved successfully!');
    } else {
      console.log('Saving payout details:', payoutData);
      alert('Payout details saved successfully!');
    }
  };

  const handleCancel = () => {
    if (activeTab === 'configuration') {
      setConfigData({
        name: '',
        location: '',
        email: '',
        phone: '',
        tagline: '',
        logo: null
      });
      setLogoPreview('');
    } else {
      setPayoutData({
        accountNo: '',
        bankName: '',
        ifscCode: ''
      });
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.mainheader}>
      <h2 className={styles.maintitle}>Admin &gt; Setting</h2>
      </div>
      
      {/* Header Tabs */}
      <div className={styles.header}>
        <button
          className={`${styles.tab} ${activeTab === 'configuration' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('configuration')}
        >
          Configuration
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'payout' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('payout')}
        >
          Payout Details
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 'configuration' && (
          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Restaurant Name *</label>
              <input
                type="text"
                className={styles.input}
                value={configData.name}
                onChange={(e) => handleConfigChange('name', e.target.value)}
                placeholder="Enter restaurant name"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location *</label>
              <input
                type="text"
                className={styles.input}
                value={configData.location}
                onChange={(e) => handleConfigChange('location', e.target.value)}
                placeholder="Enter restaurant location"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Email *</label>
              <input
                type="email"
                className={styles.input}
                value={configData.email}
                onChange={(e) => handleConfigChange('email', e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Phone Number *</label>
              <input
                type="tel"
                className={styles.input}
                value={configData.phone}
                onChange={(e) => handleConfigChange('phone', e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Tagline</label>
              <textarea
                className={styles.textarea}
                value={configData.tagline}
                onChange={(e) => handleConfigChange('tagline', e.target.value)}
                placeholder="Enter restaurant tagline or description"
                rows={3}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Upload Logo</label>
              <div
                className={styles.uploadArea}
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <Upload className={styles.uploadIcon} />
                <p className={styles.uploadText}>
                  {logoPreview ? 'Logo uploaded successfully' : 'Click to upload logo'}
                </p>
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className={styles.logoPreview}
                  />
                )}
              </div>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className={styles.hidden}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleCancel}
              >
                <X size={16} />
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSave}
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payout' && (
          <div className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Account Number *</label>
              <input
                type="text"
                className={styles.input}
                value={payoutData.accountNo}
                onChange={(e) => handlePayoutChange('accountNo', e.target.value)}
                placeholder="Enter bank account number"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Bank Name *</label>
              <input
                type="text"
                className={styles.input}
                value={payoutData.bankName}
                onChange={(e) => handlePayoutChange('bankName', e.target.value)}
                placeholder="Enter bank name"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>IFSC Code *</label>
              <input
                type="text"
                className={styles.input}
                value={payoutData.ifscCode}
                onChange={(e) => handlePayoutChange('ifscCode', e.target.value)}
                placeholder="Enter IFSC code"
                pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
                title="Please enter a valid IFSC code"
                required
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={handleCancel}
              >
                <X size={16} />
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.saveButton}`}
                onClick={handleSave}
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantConfig;