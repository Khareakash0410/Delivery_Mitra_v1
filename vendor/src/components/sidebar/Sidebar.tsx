import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Banknote, LayoutDashboard, Package, PlusCircle, Settings, ShoppingCart } from 'lucide-react';
import styles from './sidebar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

interface AdminSidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = (): void => {
    toggleSidebar();
    navigate("/login");
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <Link to="/" onClick={toggleSidebar} className={styles.logo}>
            <img src="./Logo.png" alt="Delivery Mitra" className={styles.logoImage}/>
        </Link>
      </div>

      <nav className={styles.nav}>

        <NavLink
          to="/"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/products"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Package  />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/orders"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <ShoppingCart />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/payments"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Banknote />
          <span>Payments</span>
        </NavLink>

        <NavLink
          to="/settings"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Settings />
          <span>Setting</span>
        </NavLink>

        <NavLink
          to="/product-add"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <PlusCircle />
          <span>Add Product</span>
        </NavLink>

      </nav>

      <div className={styles.logoutSection}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;