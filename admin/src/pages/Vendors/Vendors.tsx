import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import styles from './Vendors.module.css';
import { useNavigate } from 'react-router-dom';
import { vendorData, type Vendor } from '../../constant/VendorData';

const VendorsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(vendorData?.vendors?.length / itemsPerPage);
  const navigate = useNavigate();
  
  const currentVendors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return vendorData?.vendors?.slice(startIndex, endIndex);
  }, [currentPage]);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Vendor Management</h2>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Vendor Name</th>
                <th className={styles.tableHeader}>Location</th>
                <th className={styles.tableHeader}>Phone</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentVendors?.length > 0 ? (
                (currentVendors as Vendor[]).map((vendor) => (
                  <tr key={vendor.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Vendor Name">
                      <div className={styles.vendorInfo}>
                        <span className={styles.vendorName}>{vendor.name}</span>
                      </div>
                    </td>

                    <td className={styles.tableCell} data-label="Location">
                      <span className={styles.vendorLocation}>
                        {vendor.location}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Phone">
                      <span className={styles.vendorPhone}>
                        {vendor.phone}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Actions">
                      <div className={styles.actionButtons}>
                        <button 
                          onClick={() =>  navigate(`/vendor/${vendor.id}`)} 
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          aria-label="View vendor details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noDataCell}>
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
            <button
              className={`${styles.pageButton} ${styles.pageButtonActive}`}
              aria-label={`Page ${currentPage}`}
            >
              {currentPage}
            </button>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || vendorData?.vendors.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || vendorData?.vendors.length === 0) ? styles.navButtonDisabled : ''}`}
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

export default VendorsSection;