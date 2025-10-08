import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Banknote, LayoutDashboard, Package, PlusCircle, Settings, ShoppingCart } from 'lucide-react';
import styles from './sidebar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import useGetApi from '../../api/useGetApi';
import apiEndpoints from '../../api/Config';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../store/slices/UserSlice';

interface AdminSidebarProps {
  toggleSidebar: () => void;
}

const Sidebar: React.FC<AdminSidebarProps> = ({ toggleSidebar }) => {

  const {data: getData, error: getError, setEnabled: getEnabled} = useGetApi(apiEndpoints.AUTH.GET_ME);

  const [status, setStatus] = useState<boolean>();

  const {data, error, setEnabled} = useGetApi(apiEndpoints.AUTH.LOGOUT);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {data: statusData, error: statusError, setEnabled: statusEnabled} = useGetApi(`${apiEndpoints.AUTH.STORE_STATUS}`);

  useEffect(() => {
    getEnabled(true);
  }, [statusData]);

  useEffect(() => {
    if (getData) {
      setStatus(getData.data?.vendor?.vendor.is_active);
    }
    if (getError) {
      toast.error(getError?.message);
    }
  }, [getData, getEnabled]);

  useEffect(() => {
    if(data) {
      toast.success(data?.message);
      navigate("/login");
      dispatch(logoutSuccess());
      setEnabled(false);
    }
    if(error) {
      toast.error(error?.message);
      setEnabled(false);
    }
   }, [data, error]);

   useEffect(() => {
     if (statusData) {
      toast.success(statusData?.message);
      statusEnabled(false);
      setStatus(statusData?.vendor?.vendor.is_active);
     }
     if (statusError) {
      toast.error(statusError?.message);
      statusEnabled(false);
     }
   }, [statusData, statusError]);


  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <Link to="/" onClick={toggleSidebar} className={styles.logo}>
            <img src="./Logo.png" alt="Delivery Mitra" className={styles.logoImage}/>
        </Link>
      </div>

      {/* Toggle Section */}
      <div className={styles.toggleSection}>
        <div className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>
            {status}
          </span>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={status === true}
              onChange={() => statusEnabled(true)}
              className={styles.toggleInput}
            />
            <span className={styles.toggleSlider}></span>
          </label>
        </div>
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
        <button onClick={() => {setEnabled(true); toggleSidebar();}} className={styles.logoutButton}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
     
    </div>
  );
};

export default Sidebar;