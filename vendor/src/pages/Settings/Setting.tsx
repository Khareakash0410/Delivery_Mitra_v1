import React, { useEffect, useState } from 'react';
import { Upload, Save, Camera } from 'lucide-react';
import styles from './Setting.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';
import useGetApi from '../../api/useGetApi';
import apiEndpoints from '../../api/Config';
import { toast } from 'react-toastify';
import usePutApi from '../../api/usePutApi';
import { uploadImage } from '../../utils/ImageUploader';

interface ConfigData {
  shop_name: string;
  shop_address: string;
  email: string;
  phone: string;
  gst_number: string;
  profilePic: string;
}

interface PayoutData {
  account_number: string;
  bank_name: string;
  ifsc_code: string;
  qrCode: string;
}

const RestaurantConfig: React.FC = () => {
  
  const {user, isAuthenticated} = useSelector((state: RootState) => state.user);

  const {data, error, setEnabled} = useGetApi(apiEndpoints.AUTH.GET_ME);

  const [activeTab, setActiveTab] = useState<'configuration' | 'payout'>('configuration');

  const [configData, setConfigData] = useState<ConfigData>({
    shop_name: '',
    shop_address: '',
    email: '',
    phone: '',
    gst_number: '',
    profilePic: ''
  });

  const [payoutData, setPayoutData] = useState<PayoutData>({
    account_number: '',
    bank_name: '',
    ifsc_code: '',
    qrCode: "",
  });

  const [sendData, setSendData] = useState({});

  const {data: updateData, loading: updateLoading, error: updateError, setEnabled: updateProfileEnabled} = usePutApi(`${apiEndpoints.AUTH.UPDATE_PROFILE}`, sendData);

  const handleConfigChange = (field: keyof ConfigData, value: string) => {
    setConfigData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayoutChange = (field: keyof PayoutData, value: string) => {
    setPayoutData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const data = await uploadImage(file);
    toast.success(data?.message);

    if (activeTab === 'configuration') {
      setConfigData((prev) => ({...prev, profilePic: data?.imageUrl}));
    } else {
      setPayoutData((prev) => ({...prev, qrCode: data?.imageUrl}));
    }
  };

  const handleSave = () => {
    if (activeTab === 'configuration') {
      setSendData({
        shop_name: configData?.shop_name, 
        shop_address: configData?.shop_address,
        gst_number: configData?.gst_number,
        profilePic: configData?.profilePic
      });
    } else {
      setSendData({
         account_number: payoutData?.account_number,
         bank_name: payoutData?.bank_name,
         ifsc_code: payoutData?.ifsc_code,
         qrCode: payoutData?.qrCode,
      });
    }
    updateProfileEnabled(true);
  };

  useEffect(() => {
    setEnabled(true);
  }, [updateData]);

  useEffect(() => {
    if (data) {
    setConfigData({
      shop_name: data.data?.vendor?.vendor?.shop_name || '',
      shop_address: data.data?.vendor?.vendor.shop_address || '',
      email: data.data?.vendor?.email || '',
      phone: data.data?.vendor?.phone || '',
      gst_number: data.data?.vendor?.vendor.gst_number || '',
      profilePic: data.data?.vendor?.profilePic || '',
    });

    setPayoutData({
      account_number: data.data?.vendor?.vendor.account_number || '',
      bank_name: data.data?.vendor?.vendor.bank_name || '',
      ifsc_code: data.data?.vendor?.vendor.ifsc_code || '',
      qrCode: data.data?.vendor?.vendor.qrCode || "",
    });

    setEnabled(false);
    }
    if (error) {
      toast.error(error.message);
      setEnabled(false);
    }
  }, [data, error]);

  useEffect(() => {
    if (updateData) {
       toast.success(updateData?.message);  
       updateProfileEnabled(false);
    }
    if (updateError) {
      toast.error(updateError?.message);
      updateProfileEnabled(false);
    }
  }, [updateData, updateError]);

  if (!user || !isAuthenticated) {
    return <Navigate to={"/login"}/>
  };




  return (
    <div className={styles.container}>

      <div className={styles.mainheader}>
      <h2 className={styles.maintitle}>Vendor &gt; Setting</h2>
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
                value={configData.shop_name}
                onChange={(e) => handleConfigChange('shop_name', e.target.value)}
                placeholder="Enter restaurant name"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Location *</label>
              <input
                type="text"
                className={styles.input}
                value={configData.shop_address}
                onChange={(e) => handleConfigChange('shop_address', e.target.value)}
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
                disabled
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
                disabled
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>GST Number</label>
              <input
                className={styles.input}
                value={configData.gst_number}
                onChange={(e) => handleConfigChange('gst_number', e.target.value)}
                placeholder="Enter gst number"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Upload Logo</label>
              
              {configData?.profilePic ? (
                <div className={styles.logoContainer}>
                  <img
                    src={configData?.profilePic}
                    alt="Restaurant logo"
                    className={styles.currentLogo}
                  />
                  <button
                    type="button"
                    className={styles.logoUploadButton}
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Camera className={styles.cameraIcon} />
                  </button>
                </div>
              ) : (
                <div
                  className={styles.uploadArea}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className={styles.uploadIcon} />
                  <p className={styles.uploadText}>
                    Click to upload logo
                  </p>
                </div>
              )}
              
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
                {updateLoading ? "Saving" : "Save"}
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
                value={payoutData.account_number}
                onChange={(e) => handlePayoutChange('account_number', e.target.value)}
                placeholder="Enter bank account number"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Bank Name *</label>
              <input
                type="text"
                className={styles.input}
                value={payoutData.bank_name}
                onChange={(e) => handlePayoutChange('bank_name', e.target.value)}
                placeholder="Enter bank name"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>IFSC Code *</label>
              <input
                type="text"
                className={styles.input}
                value={payoutData.ifsc_code}
                onChange={(e) => handlePayoutChange('ifsc_code', e.target.value)}
                placeholder="Enter IFSC code"
                pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
                title="Please enter a valid IFSC code"
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Upload QR Code</label>
              
              {payoutData?.qrCode ? (
                <div className={styles.logoContainer}>
                  <img
                    src={payoutData?.qrCode}
                    alt="QR Code"
                    className={styles.currentLogo}
                  />
                  <button
                    type="button"
                    className={styles.logoUploadButton}
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    <Camera className={styles.cameraIcon} />
                  </button>
                </div>
              ) : (
                <div
                  className={styles.uploadArea}
                  onClick={() => document.getElementById('logo-upload')?.click()}
                >
                  <Upload className={styles.uploadIcon} />
                  <p className={styles.uploadText}>
                    Upload QR Code
                  </p>
                </div>
              )}
              
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
               {updateLoading ? "Saving" : "Save"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantConfig;