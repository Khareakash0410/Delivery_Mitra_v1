import { 
  User, 
  ShoppingBag, 
  Heart, 
  LogOut,
  Edit,
  ChevronRight
} from 'lucide-react';
import styles from './Account.module.css';
import { useNavigate } from 'react-router-dom';


const UserAccount = ({ userData }: any) => {

  const defaultUserData = {
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 (415) 555-1234',
    joinDate: 'Member since May 2022'
  };

  const user = userData || defaultUserData;

  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Details',
      navigate: "/user/account/update"
    },
    {
      id: 'orders',
      icon: ShoppingBag,
      title: 'Order History',
      navigate: "/user/account/orders"
    },
    {
      id: 'wishlist',
      icon: Heart,
      title: 'Saved Wishlist',
      navigate: "/user/account/wishlist"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Your Account</h1>
      </div>

      {/* User Profile Section */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <User className={styles.avatarIcon} />
            <div className={styles.editBadge}>
              <Edit className={styles.editBadgeIcon} />
            </div>
          </div>
          <div className={styles.userDetails}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userMeta}>{user.joinDate}</p>
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
            // onClick={handleLogout}
          >
            <div className={styles.menuButtonLeft}>
              <LogOut className={styles.menuIcon} />
              <span className={styles.menuTitle}>Logout Option</span>
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};

export default UserAccount;