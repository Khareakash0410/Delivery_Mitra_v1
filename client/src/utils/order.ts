import styles from '../pages/AccountPage/Account.module.css';

export const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return styles.statusDelivered;
      case 'processing':
        return styles.statusProcessing;
      case 'shipped':
        return styles.statusShipped;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return styles.statusDefault;
    }
};