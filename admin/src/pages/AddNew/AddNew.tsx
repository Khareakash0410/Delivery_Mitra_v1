// AdminVendorRegister.tsx
import React, { useState } from 'react';
import { Save, X, User, UserPlus } from 'lucide-react';
import styles from './AddNew.module.css';

interface FormData {
  email: string;
  password: string;
}

const AddNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admin' | 'vendor'>('admin');
  const [adminForm, setAdminForm] = useState<FormData>({ email: '', password: '' });
  const [vendorForm, setVendorForm] = useState<FormData>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAdminChange = (field: keyof FormData, value: string) => {
    setAdminForm(prev => ({ ...prev, [field]: value }));
  };

  const handleVendorChange = (field: keyof FormData, value: string) => {
    setVendorForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  const handleCancel = () => {
    if (activeTab === 'admin') {
      setAdminForm({ email: '', password: '' });
    } else {
      setVendorForm({ email: '', password: '' });
    }
  };

  const currentForm = activeTab === 'admin' ? adminForm : vendorForm;
  const handleChange = activeTab === 'admin' ? handleAdminChange : handleVendorChange;

  return (
    <div className={styles.container}>
      <div className={styles.mainheader}>
        <h2 className={styles.maintitle}>Admin &gt; Add Role</h2>
      </div>
      
      {/* Header Tabs */}
      <div className={styles.header}>
        <button
          className={`${styles.tab} ${activeTab === 'admin' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('admin')}
        >
          <User size={16} />
          Add Admin
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'vendor' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('vendor')}
        >
          <UserPlus size={16} />
          Add Vendor
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        <div className={styles.form}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>
              {activeTab === 'admin' ? 'Register New Admin' : 'Register New Vendor'}
            </h3>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Email Address *</label>
            <input
              type="email"
              className={styles.input}
              value={currentForm.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.label}>Password *</label>
            <input
              type="password"
              className={styles.input}
              value={currentForm.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Enter secure password"
              minLength={8}
              required
            />
            <div className={styles.passwordHint}>
              Password should be at least 8 characters long
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.saveButton} ${isSubmitting ? styles.loading : ''}`}
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner} />
                  Processing...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {activeTab === 'admin' ? 'Register Admin' : 'Register Vendor'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNew;