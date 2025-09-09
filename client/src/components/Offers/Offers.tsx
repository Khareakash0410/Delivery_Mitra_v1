import React from 'react';
import styles from './Offer.module.css';

interface Offer {
  id: number;
  badge: string;
  title: string;
  description: string;
  type: 'delivery' | 'discount' | 'premium';
  image: string;
  imageAlt: string;
}

const OffersComponent: React.FC = () => {
  const offers: Offer[] = [
    {
      id: 1,
      badge: "Free Delivery",
      title: "Get up to 60% off Delivery by Purchasing 2000 fake Fast food",
      description: "Save big on your favorite meals with our special delivery discount.",
      type: "delivery",
      image: "./Offer1.webp",
      imageAlt: "Food delivery illustration"
    },
    {
      id: 2,
      badge: "Membership Card",
      title: "Enjoy 8% Discount using our Membership Card",
      description: "Exclusive benefits for our premium members on every order.",
      type: "discount",
      image: "./Offer1.webp",
      imageAlt: "Membership card illustration"
    },
    {
      id: 3,
      badge: "Premium Offer",
      title: "Special Weekend Deals Up to 50% Off",
      description: "Limited time weekend specials on selected items.",
      type: "premium",
      image: "./Offer1.webp",
      imageAlt: "Special offers illustration"
    }
  ];


  return (
    <div className={styles.container}>
      <div className={styles.offersGrid}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${styles.offerCard} ${styles[offer.type]}`}
          >
            {/* Decorative elements */}
            <div className={styles.decorativeElements}></div>
            <div className={`${styles.decorativeElements} ${styles.decorativeSecond}`}></div>
            
            {/* Badge */}
            <div className={styles.offerBadge}>
              <span className={styles.badgeText}>{offer.badge}</span>
            </div>

           <div className={styles.OfferContent}>
            {/* Title */}
            <h3 className={styles.offerTitle}>{offer.title}</h3>

            {/* Image */}
            <div className={styles.imageContainer}>
              <img 
                src={offer.image} 
                alt={offer.imageAlt}
                className={styles.offerImage}
              />
            </div>
           </div>
           

            {/* Hover overlay */}
            <div className={styles.hoverOverlay}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersComponent;