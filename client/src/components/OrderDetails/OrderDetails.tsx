import { ChevronLeft } from 'lucide-react';
import styles from './OrderDetails.module.css';
import { orderItems } from '../../constants/OrderItem';
import { useNavigate } from 'react-router-dom';

const OrderDetails = ({onNext}: any) => {

  const navigate = useNavigate();

  const tax = 2.25;
  const deliveryFee = 1.99;
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal + tax + deliveryFee;

  return (
      <div className={styles.content}>
        
        <h1 className={styles.title}>We got your goods!</h1>
        
        {/* Order Items */}
        <div className={styles.orderItems}>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              {/* Product Image */}
              <div className={styles.productImage}>
                {item.image}
              </div>
              
              {/* Product Details */}
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{item.name}</h3>
                <p className={styles.productDescription}>{item.description}</p>
                <p className={styles.productQuantity}>Quantity: {item.quantity}</p>
              </div>
              
              {/* Price */}
              <div className={styles.price}>
                ${item.price.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pricing Breakdown */}
        <div className={styles.pricingBreakdown}>
          <div className={styles.pricingRow}>
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className={styles.pricingRow}>
            <span>Delivery Fee:</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Grand Total */}
        <div className={styles.grandTotal}>
          <span className={styles.grandTotalLabel}>Grand Total:</span>
          <span className={styles.grandTotalAmount}>${grandTotal.toFixed(2)}</span>
        </div>
        
        {/* Action Button */}
        <div className={styles.actionButtons}>
        <button 
          type="button" 
          onClick={() => navigate("/")}
          className={styles.backButton}
        >
          <ChevronLeft className={styles.backIcon} />
          Cancel
        </button>
        
        <button 
          type="button"
          onClick={() => onNext()}
          className={styles.submitButton}
        >
          Proceed to Checkout 
        </button>
        </div>

      </div>
  )
}

export default OrderDetails