import React, { useMemo, useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Receipt,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Store,
  IndianRupee
} from 'lucide-react';
import styles from './Payments.module.css';
import { generatePayments, type PaymentRow } from '../../constant/PaymentData';
import { formatDate } from '../../utils/formatDate';
import { formatCurrency } from '../../utils/formatCurrency';

const Payments: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const payments = generatePayments?.basePayments;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(payments?.length / itemsPerPage);
  
  const currentPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return payments?.slice(startIndex, endIndex);
  }, [currentPage]);

  const toggleRow = (paymentId: string) => {
    setExpandedRow(expandedRow === paymentId ? null : paymentId);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Admin &gt; Payments Management</h2>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Payment Details</th>
                <th className={styles.tableHeader}>Customer</th>
                <th className={styles.tableHeader}>Amount</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentPayments.length > 0 ? (
                (currentPayments as PaymentRow[]).map((payment) => (
                  <React.Fragment key={payment.paymentId}>
                    <tr className={styles.tableRow}>
                      {/* Payment Details */}
                      <td className={styles.tableCell}>
                        <div className={styles.paymentInfo}>
                          <div className={styles.paymentIds}>
                            <span className={styles.paymentId}>{payment.paymentId}</span>
                            <span className={styles.orderId}>Order: {payment.orderId}</span>
                          </div>
                          <div className={styles.paymentMeta}>
                            <div className={styles.metaItem}>
                              <Calendar size={14} />
                              <span>{formatDate(payment.paymentDate)}</span>
                            </div>
                            <div className={styles.metaItem}>
                              <span className={styles.paymentMethod}>{payment.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className={styles.tableCell}>
                        <div className={styles.customerInfo}>
                          <div className={styles.customerDetails}>
                            <span className={styles.customerName}>{payment.customerName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Amount & Status */}
                      <td className={styles.tableCell}>
                        <div className={styles.amountInfo}>
                          <span className={styles.totalAmount}>{formatCurrency(payment.totalAmount)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className={styles.tableCell}>
                        <button
                          onClick={() => toggleRow(payment.paymentId)}
                          className={`${styles.viewButton} ${expandedRow === payment.paymentId ? styles.viewButtonActive : ''}`}
                          aria-label={expandedRow === payment.paymentId ? "Hide seller details" : "View seller details"}
                        >
                          <Eye size={16} />
                          {expandedRow === payment.paymentId ? (
                            <>
                              Hide <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              View <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row - Improved Design */}
                    {expandedRow === payment.paymentId && (
                      <tr className={styles.expandedRow}>
                        <td colSpan={4} className={styles.expandedCell}>
                          <div className={styles.sellersContainer}>
                            <div className={styles.sellersHeader}>
                              <h4 className={styles.sellersTitle}>
                                <Store size={18} />
                                Seller Breakdown ({payment.sellers.length} sellers)
                              </h4>
                            </div>
                            <div className={styles.sellersGrid}>
                              {payment.sellers.map((seller) => (
                                <div key={seller.sellerId} className={styles.sellerCard}>
                                  <div className={styles.sellerCardHeader}>
                                    <div className={styles.sellerInfo}>
                                      <h5 className={styles.sellerName}>{seller.sellerName}</h5>
                                      <span className={styles.sellerCategory}>{seller.category}</span>
                                    </div>
                                  </div>
                                  
                                  <div className={styles.sellerAmounts}>
                                    <div className={styles.amountRow}>
                                      <span className={styles.amountLabel}>Sales Amount</span>
                                      <span className={styles.sellerAmount}>
                                        <IndianRupee size={14} />
                                        {formatCurrency(seller.amount).replace('₹', '')}
                                      </span>
                                    </div>
                                    <div className={styles.amountRow}>
                                      <span className={styles.commissionLabel}>Platform Commission</span>
                                      <span className={styles.commissionAmount}>
                                      -  <IndianRupee size={12} />
                                        {formatCurrency(seller.commission).replace('₹', '')}
                                      </span>
                                    </div>
                                    <div className={styles.amountRow}>
                                      <span className={styles.amountLabel}>Pay Vendor</span>
                                      <span className={styles.sellerAmount}>
                                        <IndianRupee size={12} />
                                        {formatCurrency(seller.amount - seller.commission).replace('₹', '')}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noDataCell}>
                    <div className={styles.noDataContent}>
                      <Receipt size={48} />
                      <h3>No payments found</h3>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          
          <div className={styles.paginationControls}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            
            {currentPage}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;