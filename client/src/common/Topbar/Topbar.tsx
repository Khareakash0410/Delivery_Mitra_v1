import { useState } from 'react';
import styles from './Topbar.module.css';
import { ShoppingCart, User } from 'lucide-react';
import CartDrawer from '../../layout/CartDrawer/CartDrawer';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleCart = () => {
    setCartDrawerOpen(!cartDrawerOpen)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Logo Section - Updated to use image */}
          <div className={styles.logo} onClick={() => navigate("/")}>
            <img 
              src="/Logo.png" 
              alt="Delivery Mitra" 
              className={styles.logoImage}
            />
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Header Actions */}
          <div className={styles.headerActions}>
            <button onClick={toggleCart} className={styles.iconButton} aria-label="Shopping Cart">
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>2</span>
            </button>
            <button onClick={() => navigate("/user/account")} className={styles.iconButton} aria-label="User Profile">
              <User size={20} />
            </button>
          </div>

        </div>
      </header>

      <CartDrawer cartDrawerOpen={cartDrawerOpen} toggleCart={toggleCart}/>
    </>
  );
};

export default Topbar;