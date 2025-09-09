import styles from './OrderConfirmation.module.css';

const OrderConfirmation = ({ orderData }: any) => {

  const defaultOrderData = {
    orderNumber: '024 123478956',
    date: '02 May 2023',
    paymentMethod: 'Mastercard',
    billingAddress: {
      name: 'Jane Smith',
      address: '456 Oak St #3b, San Francisco,',
      city: 'CA 94102, United States',
      phone: '+1 (415) 555-1234',
      email: 'jane.smith@email.com'
    },
    items: [
      {
        id: 1,
        name: 'All In One Chocolate Combo',
        size: 'Pack: Medium',
        quantity: 1,
        price: 50.00,
        image: '🍫'
      },
      {
        id: 2,
        name: 'Desire Of Hearts',
        size: 'Pack: Large',
        quantity: 1,
        price: 50.00,
        image: '❤️'
      }
    ],
    pricing: {
      subTotal: 100.00,
      shipping: 2.00,
      tax: 5.00,
      total: 107.00
    }
  };

  const order = orderData || defaultOrderData;

  return (
    <div className={styles.container}>
      {/* Left Section - Thank You Message */}
      <div className={styles.leftSection}>
        <div className={styles.thankYouCard}>
          <h1 className={styles.thankYouTitle}>
            Thank you for your purchase!
          </h1>
          
          <p className={styles.thankYouMessage}>
            Your order will be processed within 24 hours during working days. We will 
            notify you by email once your order has been shipped.
          </p>

          {/* Billing Address */}
          <div className={styles.billingSection}>
            <h3 className={styles.sectionTitle}>Billing address</h3>
            
            <div className={styles.billingDetails}>
              <div className={styles.billingRow}>
                <span className={styles.billingLabel}>Name</span>
                <span className={styles.billingValue}>{order.billingAddress.name}</span>
              </div>
              
              <div className={styles.billingRow}>
                <span className={styles.billingLabel}>Address</span>
                <span className={styles.billingValue}>
                  {order.billingAddress.address}<br />
                  {order.billingAddress.city}
                </span>
              </div>
              
              <div className={styles.billingRow}>
                <span className={styles.billingLabel}>Phone</span>
                <span className={styles.billingValue}>{order.billingAddress.phone}</span>
              </div>
              
              <div className={styles.billingRow}>
                <span className={styles.billingLabel}>Email</span>
                <span className={styles.billingValue}>{order.billingAddress.email}</span>
              </div>
            </div>
          </div>

          <button 
            // onClick={} 
            className={styles.trackButton}>
            View Order Status
          </button>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className={styles.rightSection}>
        <div className={styles.orderSummaryCard}>
          <h2 className={styles.orderSummaryTitle}>Order Summary</h2>
          
          {/* Order Info */}
          <div className={styles.orderInfo}>
            <div className={styles.orderInfoRow}>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Date</span>
                <span className={styles.orderInfoValue}>{order.date}</span>
              </div>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Order Number</span>
                <span className={styles.orderInfoValue}>{order.orderNumber}</span>
              </div>
              <div className={styles.orderInfoItem}>
                <span className={styles.orderInfoLabel}>Payment Method</span>
                <span className={styles.orderInfoValue}>{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className={styles.orderItems}>
            {order.items.map((item: any) => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.itemImage}>
                  {item.image}
                </div>
                <div className={styles.itemDetails}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <p className={styles.itemSize}>{item.size}</p>
                  <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                </div>
                <div className={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className={styles.pricingSummary}>
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Sub Total</span>
              <span className={styles.pricingValue}>${order.pricing.subTotal.toFixed(2)}</span>
            </div>
            
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Shipping</span>
              <span className={styles.pricingValue}>${order.pricing.shipping.toFixed(2)}</span>
            </div>
            
            <div className={styles.pricingRow}>
              <span className={styles.pricingLabel}>Tax</span>
              <span className={styles.pricingValue}>${order.pricing.tax.toFixed(2)}</span>
            </div>
            
            <div className={styles.orderTotal}>
              <span className={styles.orderTotalLabel}>Order Total</span>
              <span className={styles.orderTotalValue}>${order.pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;