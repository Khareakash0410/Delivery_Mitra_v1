import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        
        <div className={styles.leftSection}>
          <div className={styles.badge}>
            🍃 Best Grocery Delivery Service
          </div>
          
          <h1 className={styles.title}>
            Fresh Groceries,<br />
            <span className={styles.titleSecondary}>
              Delivered Fast to<br />Your Door.
            </span>
          </h1>
          
          <p className={styles.description}>
            A grocery shop, also known as a grocery store or <br />
             supermarket, is a retail store that primarily sells food and<br />
            other household items.
          </p>
          
          <div className={styles.actions}>
            <button className={styles.primaryButton}>
              Shop Now →
            </button>
          </div>
          
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.imageContainer}>
            <div className={styles.deliveryPerson}>
              <img
                src="./Hero2.png"
                alt="Delivery Person"
                className={styles.personImage}
              />
            </div>
          </div>
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🚚</div>
              <div className={styles.featureContent}>
                <div className={styles.featureTitle}>Fastest service</div>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.featureIcon}>✅</div>
              <div className={styles.featureContent}>
                <div className={styles.featureTitle}>100% Fresh & Halal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;