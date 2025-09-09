import { useState } from 'react';
import { Mail, Phone, User, Save } from "lucide-react";
import styles from '../../pages/AccountPage/Account.module.css';

const AccountInfo = () => {
  const defaultUserData = {
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (415) 555-1234',
  };

  const [user, setUser] = useState(defaultUserData);

  const handleInputChange = (field: string, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Profile</h1>
      </div>

      <div className={styles.dropdownContent}>
        <div className={styles.profileItem}>
          <Mail className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Email</span>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={styles.profileInput}
            />
          </div>
        </div>
        
        <div className={styles.profileItem}>
          <Phone className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Phone</span>
            <span className={styles.profileValue}>{user.phone}</span>
          </div>
        </div>
        
        <div className={styles.profileItem}>
          <User className={styles.profileIcon} />
          <div className={styles.profileInfo}>
            <span className={styles.profileLabel}>Username</span>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={styles.profileInput}
            />
          </div>
        </div>
        
        <button 
           className={styles.updateButton} 
        //    onClick={handleUpdateProfile}
        >
          <Save className={styles.editIcon} />
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;