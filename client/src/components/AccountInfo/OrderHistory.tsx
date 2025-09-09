import styles from '../../pages/AccountPage/Account.module.css';
import { orders } from '../../constants/Orders';
import { getStatusClass } from '../../utils/order';

const OrderHistory = () => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Orders</h1>
      </div>
        <div className={styles.dropdownContent}>
        <div className={styles.tableContainer}>
            <table className={styles.orderTable}>
            <thead>
                <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderCell}>Order ID</th>
                <th className={styles.tableHeaderCell}>Image</th>
                <th className={styles.tableHeaderCell}>Product Name</th>
                <th className={styles.tableHeaderCell}>Price</th>
                <th className={styles.tableHeaderCell}>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                    <span className={styles.orderId}>{order.id}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <div className={styles.productImage}>
                        {order.image}
                    </div>
                    </td>
                    <td className={styles.tableCell}>
                    <span className={styles.productName}>{order.productName}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span className={styles.price}>{order.price}</span>
                    </td>
                    <td className={styles.tableCell}>
                    <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                        {order.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  );
};

export default OrderHistory;