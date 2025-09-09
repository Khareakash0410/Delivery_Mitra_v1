// OrderView.tsx
import React, { useState } from 'react';
import { Package, CheckCircle, XCircle, ListCheck } from 'lucide-react';
import styles from './OrderView.module.css';
import { formatDate } from '../../utils/formatDate';
import { orderData } from '../../constant/SingleOrder';

type OrderStatus = 'pending' | 'accepted' | 'rejected';

const OrderView: React.FC = () => {

  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const totalProducts = orderData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalFees = orderData.items.reduce((acc, item) => acc + item.platformFees * item.quantity, 0);
  const finalTotal = totalProducts - totalFees;

  const handleStatusChange = (status: OrderStatus): void => {
    setOrderStatus(status);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        {/* Order ID */}
        <div className={styles.card}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Order #{orderData.id}</h1>
            </div>
            <div className={styles.dateInfo}>
              <p>Order Date: {formatDate(orderData.orderDate)}</p>
            </div>
            <div className={`${styles.statusBadge}`}>
            <div className={styles.statusDot}></div>
              {orderStatus}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>
            <Package className={styles.icon} />
            Order Items
          </h2>
          <div className={styles.tableContainer}>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderLeft}>Item</th>
                  <th className={styles.tableHeaderCenter}>Category</th>
                  <th className={styles.tableHeaderRight}>Qty</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item) => (
                  <tr key={item.id} className={styles.tableRow}>
                    <td className={styles.itemCell}>
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <div className={styles.itemOptions}>
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className={styles.optionTag}>
                              {key}: <span className={styles.optionValue}>{value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className={styles.quantityCell}>
                      <span className={styles.quantityBadge}>
                       {item.category} 
                      </span>
                    </td>
                    <td className={styles.priceCell}>
                       {item.quantity}  
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Actions */}
        {orderStatus === 'pending' && (
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Order Actions</h2>
            <div className={styles.actionButtons}>
              <button
                onClick={() => handleStatusChange('accepted')}
                className={`${styles.button} ${styles.acceptButton}`}
              >
                <CheckCircle className={styles.buttonIcon} />
                Accept Order
              </button>
              <button
                onClick={() => handleStatusChange('rejected')}
                className={`${styles.button} ${styles.rejectButton}`}
              >
                <XCircle className={styles.buttonIcon} />
                Reject Order
              </button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        {orderStatus === "accepted" && (
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>
            <ListCheck className={styles.icon} />
            Order Summary
          </h2>
          <div className={styles.tableContainer}>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th className={styles.tableHeaderLeft}>Item</th>
                  <th className={styles.tableHeaderCenter}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item) => (
                  <tr key={item.id} className={styles.tableRow}>
                    <td className={styles.itemCell}>
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <div className={styles.itemOptions}>
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className={styles.optionTag}>
                              {key}: <span className={styles.optionValue}>{value}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className={styles.quantityCell}>
                      <span className={styles.quantityBadge}>
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.orderSummary}>
            <div className={styles.summaryContainer}>
              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>₹{totalProducts}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Platform Deduction:</span>
                <span>₹{totalFees}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
    </div>
  );
};

export default OrderView;