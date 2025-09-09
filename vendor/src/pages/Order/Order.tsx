import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import styles from './Orders.module.css';
import { orderData, type Order } from '../../constant/Order';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const OrdersSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orderData?.orders?.length / itemsPerPage);

  const navigate = useNavigate();
  
  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return orderData?.orders?.slice(startIndex, endIndex);
  }, [currentPage, orderData?.orders]);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Order Management</h2>
      </div>
      
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Customer Name</th>
                <th className={styles.tableHeader}>Order Price</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentOrders?.length > 0 ? (
                currentOrders.map((order: Order) => (
                  <tr key={order.id} className={styles.tableRow}>
                    <td className={styles.tableCell} data-label="Customer Name">
                      <span className={styles.customerName}>{order.id}</span>
                    </td>

                    <td className={styles.tableCell} data-label="Order Price">
                      <span className={styles.orderPrice}>
                        {`₹${formatDate(order.orderDate)}`}
                      </span>
                    </td>

                    <td className={styles.tableCell} data-label="Actions">
                      <div className={styles.actionButtons}>
                        <button 
                          onClick={() => navigate(`/orders/${order.id}`)} 
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          aria-label="Reject order"
                        >
                          {loading && actionId === order.id ? (
                            <div className={styles.spinner} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noDataCell}>
                    No orders found.
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
            disabled={currentPage === totalPages || orderData?.orders.length === 0}
            className={`${styles.navButton} ${(currentPage === totalPages || orderData?.orders.length === 0) ? styles.navButtonDisabled : ''}`}
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

export default OrdersSection;