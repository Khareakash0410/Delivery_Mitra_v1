import React from 'react';
import { Flame, Truck, DollarSign } from 'lucide-react';
import styles from './OurSpeciality.module.css';

interface SpecialityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SpecialityCard: React.FC<SpecialityCardProps> = ({ icon, title, description }) => (
  <div className={styles.card}>
    <div className={styles.iconContainer}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
    </div>
    <h2 className={styles.cardTitle}>{title}</h2>
    <p className={styles.cardDescription}>{description}</p>
  </div>
);

const OurSpeciality: React.FC = () => {
  const specialities = [
    {
      icon: <Flame className={styles.icon} />,
      title: "Great Daily Deal",
      description: "For great daily deals on proceeds in Pottola, Dinslow, and other online grocery stores like Chaddel and Shwapino"
    },
    {
      icon: <Truck className={styles.icon} />,
      title: "Quick Delivery",
      description: "Our best strategy - Create picture request: We collect payment immediately. We deliver parcel within 24 hours"
    },
    {
      icon: <DollarSign className={styles.icon} />,
      title: "Best Price Ever",
      description: "Stock up on your favorite groceries for less with our unbeatable deals... Our prices are our own but we try our best to offer them to you"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainHeading}>We Provide You The Best of the Town</h1>
      </div>
      
      <div className={styles.cardsContainer}>
        {specialities.map((item, index) => (
          <SpecialityCard 
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default OurSpeciality;