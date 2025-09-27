import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import styles from './PasswordUpdate.module.css';
import usePutApi from '../../api/usePutApi';
import apiEndpoints from '../../api/Config';
import { toast } from 'react-toastify';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const {data, loading, error, setEnabled} = usePutApi(`${apiEndpoints.AUTH.UPDATE_PASSWORD}`, formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = (): void => {
    setFormData({
      currentPassword: '',
      newPassword: '',
    });
  };

  const handleClose = (): void => {
    resetForm();
    onClose();
  };

  const handlePasswordSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setEnabled(true);
  };

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
      resetForm();
      setEnabled(false);
    }
    if (error) {
      toast.error(error?.message);
      setEnabled(false);
    }
  }, [data, error]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Change Password</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <X className={styles.closeIcon} />
          </button>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className={styles.modalForm}>
          {/* Current Password */}
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword" className={styles.label}>
              Current Password
            </label>
            <div className={styles.passwordInputContainer}>
              <input
                type="text"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter current password"
                required
              />
            </div>
          </div>

          {/* New Password */}
          <div className={styles.formGroup}>
            <label htmlFor="newPassword" className={styles.label}>
              New Password
            </label>
            <div className={styles.passwordInputContainer}>
              <input
                type= "text"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={handleClose}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;