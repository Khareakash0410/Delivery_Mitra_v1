import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Banknote, BikeIcon, LayoutDashboard, Package, Settings, ShoppingCart } from 'lucide-react';
import styles from './Sidebar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

interface AdminSidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ toggleSidebar }) => {

  const navigate = useNavigate();

  const handleLogout = (): void => {
    toggleSidebar();
    navigate("/login-admin");
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
          to="/vendors"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Package  />
          <span>Vendors</span>
        </NavLink>

        <NavLink
          to="/payments"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <ShoppingCart />
          <span>Payments</span>
        </NavLink>

        <NavLink
          to="/delivery-agent"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <BikeIcon />
          <span>Delivery Agent</span>
        </NavLink>

        <NavLink
          to="/view-role"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Banknote />
          <span>View Role</span>
        </NavLink>

        <NavLink
          to="/add-new"
          onClick={toggleSidebar}
          className={({ isActive }) =>
            isActive ? styles.navLinkActive : styles.navLink
          }
        >
          <Settings />
          <span>Add Role</span>
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