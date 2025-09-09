import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, User, UserCheck } from 'lucide-react';
import styles from './ViewRole.module.css';
import { adminData, type Admin } from '../../constant/AdminData';
import { userData, type User as UserType } from '../../constant/UserData';

const UserAdminManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'admins'>('users');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const currentData = activeTab === 'users' ? userData.users : adminData.admins;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return currentData.slice(startIndex, endIndex);
  }, [currentData, currentPage]);

  const handleTabChange = (tab: 'users' | 'admins') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const renderUsersTable = () => (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableHeader}>Name</th>
          <th className={styles.tableHeader}>Phone</th>
          <th className={styles.tableHeader}>Email</th>
          <th className={styles.tableHeader}>Address</th>
          <th className={styles.tableHeader}>Created Date</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {currentItems.length > 0 ? (
          (currentItems as UserType[]).map((user) => (
            <tr key={user.id} className={styles.tableRow}>
              <td className={styles.tableCell} data-label="Name">
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                </div>
              </td>
              <td className={styles.tableCell} data-label="Phone">
                <span className={styles.userPhone}>
                  {user.phone}
                </span>
              </td>
              <td className={styles.tableCell} data-label="Email">
                <span className={styles.userEmail}>
                  {user.email}
                </span>
              </td>
              <td className={styles.tableCell} data-label="Address">
                <span className={styles.userAddress}>
                  {user.address}
                </span>
              </td>
              <td className={styles.tableCell} data-label="Created Date">
                <span className={styles.userDate}>
                  {user.createdDate}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className={styles.noDataCell}>
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderAdminsTable = () => (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th className={styles.tableHeader}>Name</th>
          <th className={styles.tableHeader}>Email</th>
          <th className={styles.tableHeader}>Created Date</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {currentItems.length > 0 ? (
          (currentItems as Admin[]).map((admin) => (
            <tr key={admin.id} className={styles.tableRow}>
              <td className={styles.tableCell} data-label="Name">
                <div className={styles.adminInfo}>
                  <span className={styles.adminName}>{admin.name}</span>
                </div>
              </td>
              <td className={styles.tableCell} data-label="Email">
                <span className={styles.adminEmail}>
                  {admin.email}
                </span>
              </td>
              <td className={styles.tableCell} data-label="Created Date">
                <span className={styles.adminDate}>
                  {admin.createdDate}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className={styles.noDataCell}>
              No admins found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; View Role</h2>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('users')}
        >
          <User size={16} />
          Users
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'admins' ? styles.tabActive : ''}`}
          onClick={() => handleTabChange('admins')}
        >
          <UserCheck size={16} />
          Admins 
        </button>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          {activeTab === 'users' ? renderUsersTable() : renderAdminsTable()}
        </div>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.paginationControls}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${styles.navButton} ${currentPage === 1 ? styles.navButtonDisabled : ''}`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} className={styles.navIcon} />
            Previous
          </button>
          
          <div className={styles.pageButtons}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`${styles.pageButton} ${currentPage === pageNumber ? styles.pageButtonActive : ''}`}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || currentData.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || currentData.length === 0) ? styles.navButtonDisabled : ''}`}
            aria-label="Next page"
          >
            Next
            <ChevronRight size={16} className={styles.navIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAdminManagement;