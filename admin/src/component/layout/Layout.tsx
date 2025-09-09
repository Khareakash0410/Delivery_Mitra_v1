import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Sidebar from '../sidebar/Sidebar';


const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* main content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;