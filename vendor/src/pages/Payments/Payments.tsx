import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Payments.module.css';
import { paymentData, type Payments } from '../../constant/Payment';
import { formatDate } from '../../utils/formatDate';

const ProductSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(paymentData?.payments?.length / itemsPerPage);
  
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return paymentData?.payments?.slice(startIndex, endIndex);
  }, [currentPage, paymentData?.payments]);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Payments View</h2>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Date</th>
                <th className={styles.tableHeader}>Amount</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentProducts?.length > 0 ? (
                currentProducts.map((product: Payments) => (
                  <tr key={product.id} className={styles.tableRow}>

                    <td className={styles.tableCell} data-label="Price">
                      <span className={styles.productName}>
                        {formatDate(product.date)}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Price">
                      <span className={styles.productPrice}>
                        {`₹${product.amount}`}
                      </span>
                    </td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noDataCell}>
                    No products found.
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
            onClick={() =>  setCurrentPage(prev => Math.max(prev - 1, 1))}
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
            disabled={currentPage === totalPages || paymentData?.payments.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || paymentData?.payments.length === 0) ? styles.navButtonDisabled : ''}`}
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

export default ProductSection;