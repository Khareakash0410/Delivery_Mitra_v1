// Navbar.tsx
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      {/* All Categories Section */}
      <div className={styles.categoriesSection}>
        <button className={styles.categoriesButton} onClick={() => navigate("/collections/all")}>
          <svg className={styles.menuIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          All Categories
        </button>
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <button onClick={() => navigate("/collections/grocery")} className={styles.navLink}>Grocery</button>
        <button onClick={() => navigate("/collections/electronics")} className={styles.navLink}>Electronics</button>
        <button onClick={() => navigate("/collections/vegetables")} className={styles.navLink}>Vegetables</button>
        <button onClick={() => navigate("/collections/dairy")} className={styles.navLink}>Dairy</button>
        <button onClick={() => navigate("/collections/personalcare")} className={styles.navLink}>Personalcare</button>
        <button onClick={() => navigate("/collections/household")} className={styles.navLink}>Household</button>
        <button onClick={() => navigate("/collections/sweets")} className={styles.navLink}>Sweets</button>
        <button onClick={() => navigate("/collections/stationery")} className={styles.navLink}>Stationery</button>
        <button onClick={() => navigate("/collections/agriculture")} className={styles.navLink}>Agriculture</button>
        <button onClick={() => navigate("/collections/fertilizers")} className={styles.navLink}>Fertilizers</button>
        <button onClick={() => navigate("/collections/fashion")} className={styles.navLink}>Fashion</button>
        <button onClick={() => navigate("/collections/footwear")} className={styles.navLink}>Footwear</button>
        <button onClick={() => navigate("/collections/toys")} className={styles.navLink}>Toys</button>
      </div>
    </nav>
  );
};

export default Navbar;