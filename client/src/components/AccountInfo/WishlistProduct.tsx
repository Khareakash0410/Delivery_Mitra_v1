import { orders } from '../../constants/Orders';
import styles from '../../pages/AccountPage/Account.module.css';

const WishlistProduct = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Wishlist</h1>
      </div>
        <div className={styles.dropdownContent}>
        <div className={styles.tableContainer}>
            <table className={styles.orderTable}>
            <thead>
                <tr className={styles.tableHeader}>
                <th className={styles.tableHeaderCell}>Image</th>
                <th className={styles.tableHeaderCell}>Product Name</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                    <div className={styles.productImage}>
                        {order.image}
                    </div>
                    </td>
                    <td className={styles.tableCell}>
                    <span className={styles.productName}>{order.productName}</span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}

export default WishlistProduct