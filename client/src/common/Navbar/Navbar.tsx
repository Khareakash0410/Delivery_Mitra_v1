// Navbar.tsx
import styles from './Navbar.module.css';


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* All Categories Section */}
      <div className={styles.categoriesSection}>
        <button className={styles.categoriesButton}>
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
        <a href="#" className={styles.navLink}>Home</a>
        <a href="#" className={styles.navLink}>Grocery</a>
        <a href="#" className={styles.navLink}>Electronics</a>
        <a href="#" className={styles.navLink}>Pharmacy</a>
        <a href="#" className={styles.navLink}>Collection</a>
        <a href="#" className={styles.navLink}>Food & Breverage</a>
        <a href="#" className={styles.navLink}>Wholesale</a>
      </div>
    </nav>
  );
};

export default Navbar;