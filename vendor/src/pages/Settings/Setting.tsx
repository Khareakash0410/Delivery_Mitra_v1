import React, { useEffect, useState } from 'react';
import { Upload, Save } from 'lucide-react';
import styles from './Setting.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import useGetApi from '../../api/useGetApi';
import apiEndpoints from '../../api/Config';
import { toast } from 'react-toastify';
import axios from 'axios';
import usePutApi from '../../api/usePutApi';

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
  qrCode: string;
}

const RestaurantConfig: React.FC = () => {
  const {user, isAuthenticated} = useSelector((state: RootState) => state.user);

  const {data, error, setEnabled} = useGetApi(apiEndpoints.AUTH.GET_ME);

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
    ifscCode: '',
    qrCode: "",
  });

  const {} = usePutApi(`${apiEndpoints.AUTH.UPDATE_PROFILE}`, );

  const [logoPreview, setLogoPreview] = useState<string>('');

  const handleConfigChange = (field: keyof ConfigData, value: string) => {
    setConfigData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayoutChange = (field: keyof PayoutData, value: string) => {
    setPayoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target?.files?.[0];
  if (!file) return;
  setLogoPreview(URL.createObjectURL(file));
  const formData = new FormData();
  formData.append("image", file);
    try {
        const { data } = await axios.post(
      apiEndpoints.AUTH.UPLOAD_LOGO,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      }
    );
    setConfigData((prev) => ({
      ...prev!,
      logo: data?.imageUrl,
    }));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSave = () => {
    if (activeTab === 'configuration') {
    
    } else {
     
    }
  };

  useEffect(() => {
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (data) {
    setEnabled(false);
    setConfigData({
      name: data.data?.vendor?.name || '',
      location: data.data?.vendor?.location || '',
      email: data.data?.vendor?.email || '',
      phone: data.data?.vendor?.phone || '',
      tagline: data.data?.vendor?.tagline || '',
      logo: data.data?.vendor?.logo || null,
    });

    setPayoutData({
      accountNo: data.data?.vendor?.accountNo || '',
      bankName: data.data?.vendor?.bankName || '',
      ifscCode: data.data?.vendor?.ifscCode || '',
      qrCode: data.data?.vendor?.qrCode || "",
    });
    }
    if (error) {
      toast.error(error.message);
      setEnabled(false);
    }
  }, [data, error]);

  if (!user || !isAuthenticated) {
    return <Navigate to={"/login"}/>
  }

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