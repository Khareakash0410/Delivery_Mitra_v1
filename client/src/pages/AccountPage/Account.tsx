import { User, ShoppingBag, LogOut, ChevronRight } from 'lucide-react';
import styles from './Account.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import dayjs from "dayjs";
import useGetApi from '../../api/useGetApi';
import apiEndpoints from '../../api/Config';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { logoutSuccess } from '../../store/slices/authSlice';


interface UserProfile {
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
}


const UserAccount = () => {

  const [user, setUser] = useState<UserProfile | null>(null);
  const {user: storeUser, isAuthenticated} = useSelector((state: RootState) => state.auth);

  const { data, error, setEnabled } = useGetApi(
    `${apiEndpoints.AUTH.GET_MY_PROFILE}`,
  );

  const {data: logoutData, error: logoutError, setEnabled: logoutEnabled} = useGetApi(`${apiEndpoints.AUTH.LOGOUT}`);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Details',
      navigate: "/user/account/profile"
    },
    {
      id: 'orders',
      icon: ShoppingBag,
      title: 'Order History',
      navigate: "/user/account/orders"
    }
  ];

    useEffect(() => {
      setEnabled(true);
    }, []);
  
    useEffect(() => {
      if (data) {
        setUser(data?.data?.user);
        setEnabled(false);
      }
      if (error) {
        setEnabled(false);
      }
    }, [data, error]);

    useEffect(() => {
      if(logoutData) {
        toast.success(logoutData?.message);
        logoutEnabled(false);
        dispatch(logoutSuccess());
      }

      if(logoutError) {
        toast.error(logoutError?.message);
        logoutEnabled(false);
      }
    }, [logoutData, logoutError]);

  if(!storeUser || !isAuthenticated) {
    return <Navigate to={"/auth"}/>
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Account</h1>
      </div>

      {/* User Profile Section */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <img alt={user?.name} src={user?.profilePic} className={styles.userAvatar} />
          <div className={styles.userDetails}>
            <h2 className={styles.userName}>{user?.name}</h2>
            <p className={styles.userMeta}>Account Since - {dayjs(user?.createdAt).format("DD MMM YYYY")}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className={styles.menuSection}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <div key={item.id} className={styles.menuItem}>
              <button
                className={styles.menuButton}
                onClick={() => navigate(`${item.navigate}`)}
              >
                <div className={styles.menuButtonLeft}>
                  <IconComponent className={styles.menuIcon} />
                  <span className={styles.menuTitle}>{item.title}</span>
                </div>
                <ChevronRight className={styles.chevronIcon} />
              </button>
            </div>
          );
        })}

        {/* Logout Button */}
        <div className={styles.menuItem}>
          <button
            className={`${styles.menuButton} ${styles.logoutButton}`}
            onClick={() => logoutEnabled(true)}
          >
            <div className={styles.menuButtonLeft}>
              <LogOut className={styles.menuIcon} />
              <span className={styles.menuTitle}>Logout</span>
            </div>
          </button>
        </div>

      </div>

    </div>
  );
};

export default UserAccount;