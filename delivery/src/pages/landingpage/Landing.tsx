import React, { useState } from 'react';
import styles from './Landing.module.css';

interface Order {
  id: string;
  restaurant: {
    name: string;
    address: string;
    icon: string;
  };
  customer: {
    name: string;
    initials: string;
    address: string;
  };
  distance: string;
  deliveryTime: string;
}

const Landing: React.FC = () => {
  const [loadingOrder, setLoadingOrder] = useState<string | null>(null);

  const orders: Order[] = [
    {
      id: '#ORDER1260',
      restaurant: {
        name: 'King Of Burger',
        address: '181 Mercer Street, New York, NY\n10012, United States',
        icon: '🍔'
      },
      customer: {
        name: 'Gordon Humes',
        initials: 'GH',
        address: '70 Washington Square South, New York, NY\n10012, United States'
      },
      distance: '2.6 KM',
      deliveryTime: 'Deliver Within 30min'
    },
    {
      id: '#ORDER1261',
      restaurant: {
        name: 'Mario\'s Pizza',
        address: '245 East 14th Street, New York, NY\n10003, United States',
        icon: '🍕'
      },
      customer: {
        name: 'Jessica Smith',
        initials: 'JS',
        address: '89 University Place, New York, NY\n10003, United States'
      },
      distance: '1.8 KM',
      deliveryTime: 'Deliver Within 25min'
    },
    {
      id: '#ORDER1261',
      restaurant: {
        name: 'Mario\'s Pizza',
        address: '245 East 14th Street, New York, NY\n10003, United States',
        icon: '🍕'
      },
      customer: {
        name: 'Jessica Smith',
        initials: 'JS',
        address: '89 University Place, New York, NY\n10003, United States'
      },
      distance: '1.8 KM',
      deliveryTime: 'Deliver Within 25min'
    },
    {
      id: '#ORDER1261',
      restaurant: {
        name: 'Mario\'s Pizza',
        address: '245 East 14th Street, New York, NY\n10003, United States',
        icon: '🍕'
      },
      customer: {
        name: 'Jessica Smith',
        initials: 'JS',
        address: '89 University Place, New York, NY\n10003, United States'
      },
      distance: '1.8 KM',
      deliveryTime: 'Deliver Within 25min'
    }
  ];

  const handleAccept = async (orderId: string) => {
    setLoadingOrder(orderId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingOrder(null);
    // Here you would typically update the order status
  };

  const handleReject = (orderId: string) => {
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.earningsCard}>
          <div className={styles.earningsInfo}>
            <div className={styles.earningsLabel}>Total's Earning</div>
            <div className={styles.earningsAmount}>$16.00</div>
            <div className={styles.driverName}>Sam Curren</div>
          </div>
          <div className={styles.riderAvatar}>
           <img 
            src="./Rider.jpg"
            alt="Delivery Rider"
            className={styles.riderImage}
          />
          </div>
        </div>
      </header>

      {/* Jobs Section */}
      <main className={styles.jobsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your New Pickup</h2>
        </div>

        {orders.map((order, index) => (
          <article key={order.id} className={`${styles.jobCard} ${index === 0 ? styles.newOrder : ''}`}>
            {/* Restaurant Header */}
            <div className={styles.jobHeader}>
              <div className={styles.restaurantInfo}>
                <div className={styles.restaurantIcon}>{order.restaurant.icon}</div>
                <div className={styles.restaurantDetails}>
                  <h3 className={styles.restaurantName}>{order.restaurant.name}</h3>
                  <p className={styles.restaurantAddress}>
                    {order.restaurant.address.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < order.restaurant.address.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
              <span className={styles.distanceBadge}>{order.distance}</span>
            </div>

            {/* Customer Section */}
            <div className={styles.customerSection}>
              <div className={styles.customerInfo}>
                <div className={styles.customerAvatar}>{order.customer.initials}</div>
                <div className={styles.customerDetails}>
                  <h4 className={styles.customerName}>{order.customer.name}</h4>
                  <p className={styles.orderId}>Order Id: {order.id}</p>
                </div>
                <span className={styles.deliveryTime}>{order.deliveryTime}</span>
              </div>
              <p className={styles.deliveryAddress}>
                🏠 {order.customer.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < order.customer.address.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button
                className={`${styles.acceptButton} ${loadingOrder === order.id ? styles.loading : ''}`}
                onClick={() => handleAccept(order.id)}
                disabled={loadingOrder === order.id}
              >
                {loadingOrder === order.id ? (
                  'Processing...'
                ) : (
                  <>
                    ✓ Swipe to Accept Order
                  </>
                )}
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => handleReject(order.id)}
                disabled={loadingOrder === order.id}
              >
                Reject
              </button>
            </div>
          </article>
        ))}

        {/* Empty state when no orders */}
        {orders.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h3 className={styles.emptyTitle}>No new orders</h3>
            <p className={styles.emptyMessage}>
              New delivery requests will appear here. Stay online to receive orders!
            </p>
          </div>
        )}
      </main>
      
    </div>
  );
};

export default Landing;