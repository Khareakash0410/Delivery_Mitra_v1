import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import AdminSidebar from '../sidebar/Sidebar';
import PasswordChangeModal from '../PasswordUpdate/PasswordUpdate';
import { Settings } from 'lucide-react';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
   const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const toggleSettingsModal = (): void => {
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleCloseModal = (): void => {
    setIsSettingsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* mobile toggle button */}
      <div className={styles.mobileHeader}>
        <button onClick={toggleSidebar} className={styles.profileButton}>
          <img
            src={"./Logo.png"}
            alt={"Delivery Mitra"}
            className={styles.profileImage}
          />
        </button>

        <button onClick={toggleSettingsModal} className={styles.settingsButton}>
          <Settings className={styles.settingsIcon} />
        </button>
        
      </div>

      {/* overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className={styles.overlay} 
          onClick={toggleSidebar}
        />
      )}

      {/* sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        {/* sidebar component */}
        <AdminSidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* main content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>

      <PasswordChangeModal 
        isOpen={isSettingsModalOpen} 
        onClose={handleCloseModal} 
      />

    </div>
  );
};

export default Layout;