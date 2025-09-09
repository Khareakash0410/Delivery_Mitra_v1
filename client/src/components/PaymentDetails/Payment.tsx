import { useState } from 'react';
import { ChevronLeft, CreditCard, DollarSign, HelpCircle, WalletCards } from 'lucide-react';
import styles from './Payment.module.css';

const PaymentDetails = ({ onNext, onBack }: any) => {
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [formData, setFormData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    zipCode: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: any) => {
    setSelectedPayment(method);
  };

  const handleSubmit = () => {
    // if (selectedPayment === 'card') {
    //   if (formData.nameOnCard && formData.cardNumber && formData.expirationDate && formData.securityCode && formData.zipCode) {
    //     onNext({ paymentMethod: selectedPayment, ...formData });
    //   } else {
    //     alert('Please fill in all card details');
    //   }
    // } else {
    //   onNext({ paymentMethod: selectedPayment });
    // }
  };

  const tax = 2.25;
  const deliveryFee = 1.99;
  const grandTotal = 19.21;

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Give us the dough!</h1>
      <p className={styles.subtitle}>Select your payment method</p>
      
      {/* Payment Method Selection */}
      <div className={styles.paymentMethods}>
        
        <div 
          className={`${styles.paymentMethod} ${selectedPayment === 'gpay' ? styles.selected : ''}`}
          onClick={() => handlePaymentMethodChange('gpay')}
        >
          <div className={styles.gPayIcon}>
          <img src="/google-pay.svg" alt="Google Pay" />
          </div>
          <span className={styles.paymentLabel}>Google Pay</span>
        </div>
        
        <div 
          className={`${styles.paymentMethod} ${selectedPayment === 'cod' ? styles.selected : ''}`}
          onClick={() => handlePaymentMethodChange('cod')}
        >
          <DollarSign className={styles.paymentIcon} />
          <span className={styles.paymentLabel}>Cash on Delivery</span>
        </div>

        <div 
          className={`${styles.paymentMethod} ${selectedPayment === 'card' ? styles.selected : ''}`}
          onClick={() => handlePaymentMethodChange('card')}
        >
          <CreditCard className={styles.paymentIcon} />
          <span className={styles.paymentLabel}>Card</span>
        </div>

        <div 
          className={`${styles.paymentMethod} ${selectedPayment === 'payLater' ? styles.selected : ''}`}
          onClick={() => handlePaymentMethodChange('payLater')}
        >
          <WalletCards className={styles.paymentIcon} />
          <span className={styles.paymentLabel}>Pay Later</span>
        </div>
        

      </div>

      {/* Card Info */}
      {selectedPayment === 'card' && (
        <>
         <div className={styles.codInfo}>
          <div className={styles.codMessage}>
            <CreditCard className={styles.codIcon} />
            <div>
              <h4 className={styles.codTitle}>Credit Card</h4>
              <p className={styles.codDescription}>
                Pay with card now. Please have your card ready.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cardForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Name on card"
              required
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Card number"
                max="19"
                required
              />
            </div>
            
            <div className={styles.inputGroupWithIcon}>
              <input
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Security code"
                max="4"
                required
              />
              <HelpCircle className={styles.helpIcon} />
            </div>
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="MM/YY"
                max="5"
                required
              />
            </div>
            
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="ZIP"
                max="10"
                required
              />
            </div>
          </div>
        </div>
        </>
      )}

      {/* Cash on Delivery Info */}
      {selectedPayment === 'cod' && (
        <div className={styles.codInfo}>
          <div className={styles.codMessage}>
            <DollarSign className={styles.codIcon} />
            <div>
              <h4 className={styles.codTitle}>Cash on Delivery</h4>
              <p className={styles.codDescription}>
                Pay with cash when your order arrives. Please have exact change ready.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Google Pay Info */}
      {(selectedPayment === 'gpay') && (
        <div className={styles.digitalPaymentInfo}>
          <p className={styles.digitalPaymentText}>
            You'll be redirected to complete your payment securely with Google Pay or any UPI app.
          </p>
        </div>
      )}

      {/* Pay Later Info */}
      {selectedPayment === 'payLater' && (
        <div className={styles.codInfo}>
          <div className={styles.codMessage}>
            <WalletCards className={styles.codIcon} />
            <div>
              <h4 className={styles.codTitle}>Pay later</h4>
              <p className={styles.codDescription}>
                You can place order now and pay later in time. Your order will be processed if accepted by vendor.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Pricing Summary */}
      <div className={styles.pricingSummary}>
        <div className={styles.pricingRow}>
          <span className={styles.pricingLabel}>Tax:</span>
          <span className={styles.pricingValue}>${tax.toFixed(2)}</span>
        </div>
        <div className={styles.pricingRow}>
          <span className={styles.pricingLabel}>Delivery Fee:</span>
          <span className={styles.pricingValue}>${deliveryFee.toFixed(2)}</span>
        </div>
        
        <div className={styles.grandTotal}>
          <span className={styles.grandTotalLabel}>Grand Total:</span>
          <span className={styles.grandTotalAmount}>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          type="button" 
          onClick={onBack}
          className={styles.backButton}
        >
          <ChevronLeft className={styles.backIcon} />
          Back to Delivery
        </button>
        
        <button 
          type="button"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Proceed to Pay 
        </button>
      </div>

    </div>
  );
};

export default PaymentDetails;