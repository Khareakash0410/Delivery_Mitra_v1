import { useState } from 'react';
import styles from './OrderPage.module.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import DeliveryDetails from '../../components/DeliveryDetails/DeliveryDetails';
import PaymentDetails from '../../components/PaymentDetails/Payment';

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryData, setDeliveryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  
  const steps = ['Order', 'Delivery', 'Payment'];

  const handleOrderNext = () => {
    setCurrentStep(1);
  };

  const handleDeliveryNext = (data: any) => {
    setDeliveryData(data);
    setCurrentStep(2);
  };

  const handlePaymentNext = (data: any) => {
    setPaymentData(data);
    alert('Order placed successfully!');
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <OrderDetails onNext={handleOrderNext} />;
      case 1:
        return (
          <DeliveryDetails 
            onNext={handleDeliveryNext} 
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <PaymentDetails 
            onNext={handlePaymentNext} 
            onBack={handleBack}
          />
        );
      default:
        return <OrderDetails onNext={handleOrderNext} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {steps.map((step, index) => (
            <span 
              key={step}
              className={
                index === currentStep 
                  ? styles.activeTab 
                  : index < currentStep 
                    ? styles.completedTab 
                    : styles.inactiveTab
              }
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
};

export default OrderPage;